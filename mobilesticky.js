export function renderMobileStickyCTA() {
  return `
    <aside class="mobile-sticky" data-mobile-sticky>
      <div class="mobile-sticky__card">
        <div class="mobile-sticky__text">
          <div class="mobile-sticky__eyebrow mono">Early Access</div>
          <div class="mobile-sticky__headline">Step into the first FearFlip build.</div>
        </div>
        <button
          class="cta-button"
          type="button"
          data-scroll-target="#final-capture"
          data-track-click="mobile_sticky_waitlist"
        >
          Join
        </button>
      </div>
    </aside>
  `;
}
