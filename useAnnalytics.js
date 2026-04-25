const PROJECT_ID = "websiteanyalticsoffearflip";
const FUNCTIONS_REGION = "us-central1";
const CLOUD_FUNCTIONS_API_BASE = `https://${FUNCTIONS_REGION}-${PROJECT_ID}.cloudfunctions.net/api`;
const FIREBASE_WEB_API_KEY_FALLBACK = "AIzaSyA8hVHlTtSN8uHcKMUq_OTEoThA14URw8c";
const API_BASE = resolveApiBase();
const EVENT_QUEUE_KEY = "fearflip:event-queue:v1";
const FORM_TIMEOUT_MS = 12000;
const FIREBASE_BOOT_TIMEOUT_MS = 7000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WAITLIST_COLLECTION = "waitlistEntries";
const ANALYTICS_COLLECTION = "analyticsEvents";

let firebaseClientPromise = null;
let firestoreClient = null;

function resolveApiBase() {
  const runtimeOverride = window.FEARFLIP_API_BASE;

  if (typeof runtimeOverride === "string" && runtimeOverride.trim()) {
    return runtimeOverride.trim().replace(/\/+$/, "");
  }

  const host = window.location.hostname;
  const isLocalHost = !host || host === "localhost" || host === "127.0.0.1";

  if (isLocalHost) {
    return `https://${PROJECT_ID}.web.app/api`;
  }

  return "/api";
}

function readQueue() {
  try {
    const raw = window.localStorage.getItem(EVENT_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function createRequestError(code, message, status) {
  const error = new Error(message);
  error.code = code;

  if (typeof status === "number") {
    error.status = status;
  }

  return error;
}

function sanitizeString(value, maxLength = 400) {
  return String(value || "").trim().slice(0, maxLength);
}

function writeQueue(queue) {
  try {
    window.localStorage.setItem(EVENT_QUEUE_KEY, JSON.stringify(queue.slice(-30)));
  } catch (error) {
    console.warn("Unable to persist analytics queue.", error);
  }
}

function buildMetadata(metadata = {}) {
  return {
    ...metadata,
    path: window.location.pathname,
    referrer: document.referrer || "",
    locale: navigator.language || "en-US",
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toISOString(),
  };
}

function shouldUseFirestoreFallback(error) {
  const status = Number.parseInt(String(error?.status || ""), 10);

  return (
    error?.code === "network_error" ||
    error?.code === "request_timeout" ||
    status === 404 ||
    status === 405 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

function waitForFirebaseClient() {
  if (firebaseClientPromise) {
    return firebaseClientPromise;
  }

  firebaseClientPromise = new Promise((resolve) => {
    const startedAt = Date.now();

    const resolveIfReady = () => {
      const firebase = window.firebase;
      const isReady =
        Boolean(firebase) &&
        typeof firebase.app === "function" &&
        Array.isArray(firebase.apps) &&
        firebase.apps.length > 0;

      if (isReady) {
        resolve(firebase);
        return true;
      }

      return false;
    };

    if (resolveIfReady()) {
      return;
    }

    const timer = window.setInterval(() => {
      if (resolveIfReady()) {
        window.clearInterval(timer);
        return;
      }

      if (Date.now() - startedAt >= FIREBASE_BOOT_TIMEOUT_MS) {
        window.clearInterval(timer);
        resolve(null);
      }
    }, 120);
  });

  return firebaseClientPromise;
}

function getFirestoreFieldValue(firebase) {
  return firebase?.firestore?.FieldValue || null;
}

function getFirebaseApiKey() {
  const runtimeApiKey = window.firebase?.apps?.[0]?.options?.apiKey;

  if (typeof runtimeApiKey === "string" && runtimeApiKey.trim()) {
    return runtimeApiKey.trim();
  }

  return FIREBASE_WEB_API_KEY_FALLBACK;
}

async function getFirestoreClient() {
  if (firestoreClient) {
    return firestoreClient;
  }

  const firebase = await waitForFirebaseClient();

  if (!firebase || typeof firebase.firestore !== "function") {
    return null;
  }

  try {
    firestoreClient = firebase.firestore();
    return firestoreClient;
  } catch (error) {
    return null;
  }
}

async function hashValue(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (window.crypto?.subtle && typeof TextEncoder !== "undefined") {
    const encoded = new TextEncoder().encode(normalized);
    const digest = await window.crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(digest))
      .map((part) => part.toString(16).padStart(2, "0"))
      .join("");
  }

  return encodeURIComponent(normalized).replace(/%/g, "").slice(0, 180);
}

async function submitWaitlistViaFirestore({ email, source }) {
  const firebase = await waitForFirebaseClient();
  const db = await getFirestoreClient();
  const fieldValue = getFirestoreFieldValue(firebase);

  if (!firebase || !db || !fieldValue) {
    throw createRequestError(
      "firebase_unavailable",
      "Firebase Firestore client could not be initialized.",
    );
  }

  const docId = await hashValue(email);
  const docRef = db.collection(WAITLIST_COLLECTION).doc(docId);
  const payload = {
    email,
    source: sanitizeString(source, 40) || "unknown",
    landingPath: sanitizeString(window.location.pathname, 200) || "/",
    referrer: sanitizeString(document.referrer, 300),
    locale: sanitizeString(navigator.language || "en-US", 140),
    userAgent: sanitizeString(navigator.userAgent || "", 400),
    createdAt: fieldValue.serverTimestamp(),
    updatedAt: fieldValue.serverTimestamp(),
  };

  try {
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(docRef);

      if (snapshot.exists) {
        throw createRequestError(
          "duplicate_submission",
          "This email is already on the waitlist.",
          409,
        );
      }

      transaction.set(docRef, payload);
    });
  } catch (error) {
    if (error?.code === "duplicate_submission") {
      throw error;
    }

    if (error?.code === "already-exists" || error?.code === "failed-precondition") {
      throw createRequestError(
        "duplicate_submission",
        "This email is already on the waitlist.",
        409,
      );
    }

    if (error?.code === "permission-denied") {
      throw createRequestError(
        "backend_unavailable",
        "Waitlist storage permissions are not configured.",
        403,
      );
    }

    throw createRequestError(
      "backend_unavailable",
      "Waitlist storage is temporarily unavailable.",
    );
  }

  return {
    ok: true,
    code: "waitlist_saved",
  };
}

async function submitWaitlistViaFirestoreRest({ email, source }) {
  const docId = await hashValue(email);
  const timestamp = new Date().toISOString();
  const apiKey = getFirebaseApiKey();
  const endpoint =
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${WAITLIST_COLLECTION}` +
    `?documentId=${encodeURIComponent(docId)}&key=${encodeURIComponent(apiKey)}`;

  const payload = {
    fields: {
      email: { stringValue: email },
      source: { stringValue: sanitizeString(source, 40) || "unknown" },
      landingPath: { stringValue: sanitizeString(window.location.pathname, 200) || "/" },
      referrer: { stringValue: sanitizeString(document.referrer, 300) },
      locale: { stringValue: sanitizeString(navigator.language || "en-US", 140) },
      userAgent: { stringValue: sanitizeString(navigator.userAgent || "", 400) },
      createdAt: { timestampValue: timestamp },
      updatedAt: { timestampValue: timestamp },
    },
  };

  let response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw createRequestError("network_error", "Network request failed.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;
  const firestoreStatus = sanitizeString(data?.error?.status, 80);

  if (!response.ok) {
    if (response.status === 409 || firestoreStatus === "ALREADY_EXISTS") {
      throw createRequestError(
        "duplicate_submission",
        "This email is already on the waitlist.",
        409,
      );
    }

    if (response.status === 403 || firestoreStatus === "PERMISSION_DENIED") {
      throw createRequestError(
        "backend_unavailable",
        "Waitlist storage permissions are not configured.",
        403,
      );
    }

    throw createRequestError(
      "backend_unavailable",
      "Waitlist storage is temporarily unavailable.",
      response.status,
    );
  }

  return {
    ok: true,
    code: "waitlist_saved",
  };
}

async function trackEventViaFirestore(name, metadata = {}) {
  const firebase = await waitForFirebaseClient();
  const db = await getFirestoreClient();
  const fieldValue = getFirestoreFieldValue(firebase);

  if (!firebase || !db || !fieldValue) {
    throw createRequestError(
      "firebase_unavailable",
      "Firebase Firestore client could not be initialized.",
    );
  }

  await db.collection(ANALYTICS_COLLECTION).add({
    name: sanitizeString(name, 80),
    routePath: sanitizeString(metadata.path || window.location.pathname, 200) || "/",
    referrer: sanitizeString(document.referrer, 300),
    userAgent: sanitizeString(navigator.userAgent || "", 400),
    createdAt: fieldValue.serverTimestamp(),
  });
}

async function requestJson(path, { method = "POST", payload, timeout = FORM_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);

  try {
    const headers = {
      Accept: "application/json",
    };

    const requestInit = {
      method,
      headers,
      signal: controller.signal,
      credentials: "same-origin",
    };

    if (payload !== undefined) {
      headers["Content-Type"] = "application/json";
      requestInit.body = JSON.stringify(payload);
    }

    let response;

    try {
      response = await fetch(`${API_BASE}${path}`, {
        ...requestInit,
      });
    } catch (error) {
      if (error?.name === "AbortError") {
        throw createRequestError("request_timeout", "Request timed out.");
      }

      throw createRequestError("network_error", "Network request failed.");
    }

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      throw createRequestError(data?.code || "request_failed", data?.message || "Request failed.", response.status);
    }

    return data;
  } finally {
    window.clearTimeout(timer);
  }
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value || "").trim().toLowerCase());
}

export async function submitWaitlist({ email, source }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!isValidEmail(normalizedEmail)) {
    const error = new Error("Please enter a valid email address.");
    error.code = "invalid_email";
    throw error;
  }

  try {
    return await submitWaitlistViaFirestore({
      email: normalizedEmail,
      source,
    });
  } catch (firestoreError) {
    if (firestoreError.code === "duplicate_submission") {
      throw firestoreError;
    }
  }

  try {
    return await submitWaitlistViaFirestoreRest({
      email: normalizedEmail,
      source,
    });
  } catch (restError) {
    if (restError.code === "duplicate_submission") {
      throw restError;
    }
  }

  try {
    return await requestJson("/waitlist", {
      payload: {
        email: normalizedEmail,
        source,
        landingPath: window.location.pathname,
      },
    });
  } catch (error) {
    const unavailable = createRequestError(
      "backend_unavailable",
      "Waitlist backend is not available right now.",
    );
    unavailable.cause = error;
    throw unavailable;
  }
}

function queueEvent(payload) {
  const queue = readQueue();
  queue.push(payload);
  writeQueue(queue);
}

async function sendEventPayload(payload) {
  try {
    await trackEventViaFirestore(payload.name, payload.metadata || {});
    return;
  } catch (firestoreError) {
    if (firestoreError.code !== "firebase_unavailable") {
      return;
    }
  }

  try {
    await requestJson("/track", {
      payload,
      timeout: 6000,
    });
  } catch (error) {
    if (!shouldUseFirestoreFallback(error)) {
      throw error;
    }

    throw error;
  }
}

export async function trackEvent(name, metadata = {}) {
  if (!name) {
    return;
  }

  const payload = {
    name,
    metadata: buildMetadata(metadata),
  };

  try {
    await sendEventPayload(payload);
  } catch (error) {
    queueEvent(payload);
  }
}

export async function fetchWaitlistStats() {
  let data;

  try {
    data = await requestJson("/waitlist/stats", {
      method: "GET",
      timeout: 6000,
    });
  } catch (error) {
    if (shouldUseFirestoreFallback(error)) {
      return 0;
    }

    throw error;
  }

  const totalEntries = Number.parseInt(String(data?.totalEntries ?? ""), 10);

  if (!Number.isFinite(totalEntries) || totalEntries < 0) {
    throw new Error("Invalid waitlist stats response.");
  }

  return totalEntries;
}

export async function flushQueuedEvents() {
  const queue = readQueue();

  if (!queue.length) {
    return;
  }

  const pending = [...queue];
  writeQueue([]);

  for (const item of pending) {
    try {
      await sendEventPayload(item);
    } catch (error) {
      const latestQueue = readQueue();
      latestQueue.unshift(item);
      writeQueue(latestQueue);
      break;
    }
  }
}
