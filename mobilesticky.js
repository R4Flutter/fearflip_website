export function renderMobileStickyCTA() {
  return `
    <aside class="mobile-sticky" data-mobile-sticky>
      <div class="mobile-sticky__card">
        <div class="mobile-sticky__text">
          <div class="mobile-sticky__eyebrow mono">Can You Reach Level 100?</div>
          <div class="mobile-sticky__headline">Join pre-launch before the maze opens.</div>
        </div>
        <button
          class="cta-button"
          type="button"
          data-scroll-target="#final-capture"
          data-track-click="mobile_sticky_prelaunch"
        >
          Notify Me
        </button>
      </div>
    </aside>
  `;
}
