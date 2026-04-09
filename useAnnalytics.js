const API_BASE = "/api";
const EVENT_QUEUE_KEY = "fearflip:event-queue:v1";
const FORM_TIMEOUT_MS = 12000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readQueue() {
  try {
    const raw = window.localStorage.getItem(EVENT_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
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

async function postJson(path, payload, { timeout = FORM_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: "same-origin",
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const error = new Error(data?.message || "Request failed.");
      error.code = data?.code || "request_failed";
      error.status = response.status;
      throw error;
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

  return postJson("/waitlist", {
    email: normalizedEmail,
    source,
    landingPath: window.location.pathname,
  });
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
    await postJson("/track", payload, { timeout: 6000 });
  } catch (error) {
    const queue = readQueue();
    queue.push(payload);
    writeQueue(queue);
  }
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
      await postJson("/track", item, { timeout: 6000 });
    } catch (error) {
      const latestQueue = readQueue();
      latestQueue.unshift(item);
      writeQueue(latestQueue);
      break;
    }
  }
}
