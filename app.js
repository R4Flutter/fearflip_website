import { renderLandingPage } from "./landing_page.js";
import {
  fetchWaitlistStats,
  flushQueuedEvents,
  isValidEmail,
  submitWaitlist,
  trackEvent,
} from "./useAnnalytics.js";

const sectionViewState = new Set();
const scrollMilestones = new Set();

function renderApp() {
  const appRoot = document.querySelector("#app");

  if (!appRoot) {
    throw new Error("Missing #app root element.");
  }

  appRoot.innerHTML = renderLandingPage();
}

function updateCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function setHeaderState() {
  const header = document.querySelector("[data-header]");

  if (!header) {
    return;
  }

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function setFormStatus(form, type, message) {
  const statusNode = form.querySelector("[data-form-status]");

  if (!statusNode) {
    return;
  }

  statusNode.textContent = message;
  statusNode.classList.remove("is-success", "is-error", "is-info");

  if (type) {
    statusNode.classList.add(type);
  }
}

function setFormPending(form, pending) {
  const button = form.querySelector('button[type="submit"]');
  const input = form.querySelector('input[name="email"]');

  if (button) {
    button.disabled = pending;
    button.textContent = pending
      ? "Joining..."
      : form.dataset.waitlistForm === "hero"
        ? "Get Early Access"
        : "Join Now";
  }

  if (input) {
    input.disabled = pending;
  }
}

function trackClicks() {
  document.addEventListener("click", (event) => {
    const target =
      event.target instanceof Element
        ? event.target.closest("[data-scroll-target], [data-track-click]")
        : null;

    if (!target) {
      return;
    }

    const selector = target.getAttribute("data-scroll-target");
    const trackLabel = target.getAttribute("data-track-click");

    if (trackLabel) {
      trackEvent("cta_click", {
        label: trackLabel,
      });
    }

    if (selector) {
      event.preventDefault();
      scrollToTarget(selector);
    }
  });
}

function initRevealObserver() {
  const revealNodes = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function initSectionTracking() {
  const sections = document.querySelectorAll("[data-track-section]");

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const key = entry.target.getAttribute("data-track-section");

        if (key && !sectionViewState.has(key)) {
          sectionViewState.add(key);
          trackEvent("section_view", { section: key });
        }

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.34,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function initMobileSticky() {
  const sticky = document.querySelector("[data-mobile-sticky]");
  const finalCapture = document.querySelector("#final-capture");

  if (!sticky) {
    return;
  }

  const setStickyState = (visible) => {
    sticky.classList.toggle("is-visible", visible);
    document.body.classList.toggle("has-mobile-sticky", visible);
  };

  const onScroll = () => {
    const isMobile = window.innerWidth <= 720;

    if (!isMobile) {
      setStickyState(false);
      return;
    }

    const doc = document.documentElement;
    const scrollableHeight = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const progress = window.scrollY / scrollableHeight;
    const hasReachedLaterSections = progress > 0.58;

    let nearFinalCapture = false;

    if (finalCapture instanceof HTMLElement) {
      const finalRect = finalCapture.getBoundingClientRect();
      nearFinalCapture = finalRect.top <= window.innerHeight * 0.9;
    }

    setStickyState(hasReachedLaterSections && !nearFinalCapture);
  };

  onScroll();
  window.addEventListener("resize", onScroll);
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initScrollMilestones() {
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollableHeight = doc.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
      return;
    }

    const progress = (window.scrollY / scrollableHeight) * 100;

    if (progress >= 50 && !scrollMilestones.has(50)) {
      scrollMilestones.add(50);
      trackEvent("scroll_depth", { milestone: 50 });
    }

    if (progress >= 90 && !scrollMilestones.has(90)) {
      scrollMilestones.add(90);
      trackEvent("scroll_depth", { milestone: 90 });
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

function initHeroMotion() {
  const hero = document.querySelector("[data-hero]");

  if (!(hero instanceof HTMLElement)) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let frameId = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    hero.style.setProperty("--hero-parallax-x", `${currentX.toFixed(2)}px`);
    hero.style.setProperty("--hero-parallax-y", `${currentY.toFixed(2)}px`);

    if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
      frameId = window.requestAnimationFrame(render);
    } else {
      frameId = 0;
    }
  };

  const requestRender = () => {
    if (!frameId) {
      frameId = window.requestAnimationFrame(render);
    }
  };

  const handlePointerMove = (event) => {
    const bounds = hero.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    targetX = relativeX * 26;
    targetY = relativeY * 22;
    requestRender();
  };

  const handleScroll = () => {
    const scrollInfluence = Math.max(-12, Math.min(12, window.scrollY * -0.015));
    targetY = scrollInfluence;
    requestRender();
  };

  const resetPointer = () => {
    targetX = 0;
    handleScroll();
  };

  hero.addEventListener("pointermove", handlePointerMove);
  hero.addEventListener("pointerleave", resetPointer);
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

async function initWaitlistCount() {
  const nodes = document.querySelectorAll("[data-waitlist-count]");

  if (!nodes.length) {
    return;
  }

  try {
    const totalEntries = await fetchWaitlistStats();

    if (totalEntries <= 0) {
      return;
    }

    const message = `${formatNumber(totalEntries)}+ players already on the waitlist`;

    nodes.forEach((node) => {
      node.textContent = message;
    });
  } catch (error) {
    console.warn("Unable to load waitlist stats.", error);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const emailInput = form.querySelector('input[name="email"]');

  if (!(emailInput instanceof HTMLInputElement)) {
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  const source = form.dataset.waitlistForm || "unknown";

  if (!isValidEmail(email)) {
    setFormStatus(form, "is-error", "Enter a valid email address to join the FearFlip waitlist.");
    emailInput.focus();
    return;
  }

  setFormPending(form, true);
  setFormStatus(form, "is-info", "Securing your early-access slot...");
  trackEvent("waitlist_submit_started", { source });

  try {
    await submitWaitlist({ email, source });
    setFormStatus(form, "is-success", "You're in. Watch your inbox for the first FearFlip drop.");
    emailInput.value = "";
    trackEvent("waitlist_submit_succeeded", { source });
  } catch (error) {
    if (error.code === "duplicate_submission") {
      setFormStatus(form, "is-info", "You're already on the list. We'll contact you when the experiment opens.");
      trackEvent("waitlist_duplicate_detected", { source });
    } else if (error.code === "invalid_email") {
      setFormStatus(form, "is-error", "Enter a valid email address to join the FearFlip waitlist.");
    } else if (error.code === "backend_unavailable") {
      setFormStatus(form, "is-error", "Waitlist storage is temporarily unavailable. Please try again in a moment.");
      trackEvent("waitlist_submit_failed", {
        source,
        reason: "backend_unavailable",
      });
    } else {
      setFormStatus(form, "is-error", "Something went wrong while saving your slot. Please try again.");
      trackEvent("waitlist_submit_failed", {
        source,
        reason: error.code || "unknown_error",
      });
    }
  } finally {
    setFormPending(form, false);
  }
}

function initForms() {
  document.querySelectorAll("[data-waitlist-form]").forEach((form) => {
    form.addEventListener("submit", handleFormSubmit);
  });
}

function initLifecycleTracking() {
  trackEvent("page_view", {
    title: document.title,
  });

  window.addEventListener("online", () => {
    flushQueuedEvents();
    trackEvent("network_restored");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      flushQueuedEvents();
    }
  });
}

async function bootstrap() {
  renderApp();
  updateCurrentYear();
  setHeaderState();
  trackClicks();
  initRevealObserver();
  initHeroMotion();
  initSectionTracking();
  initMobileSticky();
  initScrollMilestones();
  initForms();
  initLifecycleTracking();
  void initWaitlistCount();
  await flushQueuedEvents();
}

bootstrap().catch((error) => {
  console.error("FearFlip bootstrap failed.", error);
});
