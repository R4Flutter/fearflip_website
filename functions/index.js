const crypto = require("crypto");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedOriginPatterns = [
  /^https:\/\/[a-z0-9-]+\.web\.app$/i,
  /^https:\/\/[a-z0-9-]+\.firebaseapp\.com$/i,
  /^http:\/\/localhost(?::\d+)?$/i,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/i,
];

function allowOrigin(origin) {
  return Boolean(origin && allowedOriginPatterns.some((pattern) => pattern.test(origin)));
}

function setCorsHeaders(req, res) {
  const origin = req.get("origin");

  if (allowOrigin(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }

  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
}

function sanitizeString(value, maxLength = 512) {
  return String(value || "").trim().slice(0, maxLength);
}

function sanitizeMetadata(metadata) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return {};
  }

  return Object.entries(metadata).reduce((accumulator, [key, value]) => {
    const safeKey = sanitizeString(key, 60);

    if (!safeKey) {
      return accumulator;
    }

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      accumulator[safeKey] = typeof value === "string" ? sanitizeString(value) : value;
    }

    return accumulator;
  }, {});
}

function buildRoutePath(req) {
  const requestUrl = new URL(req.url, "https://fearflip.local");
  return requestUrl.pathname.replace(/^\/api/, "") || "/";
}

function getClientIp(req) {
  const forwarded = req.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : req.ip || "unknown";
}

function hashValue(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function createJsonResponse(res, statusCode, body) {
  res.status(statusCode).set("Cache-Control", "no-store").json(body);
}

async function handleWaitlistSubmission(req, res) {
  const email = sanitizeString(req.body?.email, 180).toLowerCase();
  const source = sanitizeString(req.body?.source, 40) || "unknown";
  const landingPath = sanitizeString(req.body?.landingPath, 200) || "/";

  if (!EMAIL_PATTERN.test(email)) {
    return createJsonResponse(res, 400, {
      code: "invalid_email",
      message: "A valid email address is required.",
    });
  }

  const docId = hashValue(email);

  try {
    await db.collection("waitlistEntries").doc(docId).create({
      email,
      source,
      landingPath,
      referrer: sanitizeString(req.get("referer"), 300),
      locale: sanitizeString(req.get("accept-language"), 140),
      userAgent: sanitizeString(req.get("user-agent"), 400),
      ipHash: hashValue(getClientIp(req)),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return createJsonResponse(res, 201, {
      ok: true,
      code: "waitlist_saved",
    });
  } catch (error) {
    if (error?.code === 6 || error?.code === "already-exists") {
      return createJsonResponse(res, 409, {
        code: "duplicate_submission",
        message: "This email is already on the waitlist.",
      });
    }

    logger.error("waitlist_submission_failed", error);
    return createJsonResponse(res, 500, {
      code: "server_error",
      message: "Unable to store this submission right now.",
    });
  }
}

async function handleTrackEvent(req, res) {
  const name = sanitizeString(req.body?.name, 80);

  if (!name) {
    return createJsonResponse(res, 400, {
      code: "invalid_event",
      message: "Event name is required.",
    });
  }

  try {
    await db.collection("analyticsEvents").add({
      name,
      metadata: sanitizeMetadata(req.body?.metadata),
      routePath: sanitizeString(req.body?.metadata?.path, 200) || "/",
      referrer: sanitizeString(req.get("referer"), 300),
      userAgent: sanitizeString(req.get("user-agent"), 400),
      ipHash: hashValue(getClientIp(req)),
      createdAt: serverTimestamp(),
    });

    return createJsonResponse(res, 202, {
      ok: true,
      code: "event_logged",
    });
  } catch (error) {
    logger.error("analytics_event_failed", error);
    return createJsonResponse(res, 500, {
      code: "server_error",
      message: "Unable to log the event right now.",
    });
  }
}

exports.api = onRequest(
  {
    region: "us-central1",
    maxInstances: 10,
    timeoutSeconds: 15,
    memory: "256MiB",
  },
  async (req, res) => {
    setCorsHeaders(req, res);

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      createJsonResponse(res, 405, {
        code: "method_not_allowed",
        message: "Only POST requests are allowed.",
      });
      return;
    }

    const routePath = buildRoutePath(req);

    if (routePath === "/waitlist") {
      await handleWaitlistSubmission(req, res);
      return;
    }

    if (routePath === "/track") {
      await handleTrackEvent(req, res);
      return;
    }

    createJsonResponse(res, 404, {
      code: "not_found",
      message: "Endpoint not found.",
    });
  },
);
