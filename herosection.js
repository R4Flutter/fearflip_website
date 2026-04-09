export function renderHeroSection() {
  return `
    <section class="hero" id="top" data-track-section="hero">
      <div class="hero__backdrop"></div>
      <div class="hero__scanlines"></div>
      <div class="hero__squares"></div>
      <div class="hero__vignette"></div>
      <img
        class="hero__entity reveal"
        data-reveal="scale"
        src="/assets/images/hero-entity.svg"
        alt="Abstract FearFlip entity artwork"
      />
      <div class="container hero__inner">
        <div class="hero__content reveal">
          <div class="eyebrow">The Experiment Begins Soon</div>
          <h1 class="display-title">
            You Won't
            <span class="glitch-word accent-text" data-text="Survive This">Survive This</span>
            Game.
          </h1>
          <p class="hero__copy">
            FearFlip is a psychological maze where reality flips, controls betray you, and something is always chasing you.
          </p>
          <div class="hero__actions">
            <form class="waitlist-form" data-waitlist-form="hero" novalidate>
              <div class="waitlist-form__group">
                <div>
                  <label class="sr-only" for="hero-email">Email address</label>
                  <input
                    class="input-field"
                    id="hero-email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    inputmode="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button class="cta-button" type="submit">
                  Get Early Access
                </button>
              </div>
              <p class="status-message" data-form-status aria-live="polite"></p>
            </form>
            <div class="hero__meta">
              <button
                class="link-button"
                type="button"
                data-scroll-target="#final-capture"
                data-track-click="hero_secondary_cta"
              >
                Or Join The Fear List
              </button>
              <div class="hero__microcopy mono">Only the top 1% reach level 20</div>
              <div class="hero__support">No spam. Early access updates only.</div>
            </div>
          </div>
          <div class="hero__ticker reveal">
            <div class="ticker-chip mono">100+ brutal levels</div>
            <div class="ticker-chip mono">Adaptive psychological engine</div>
            <div class="ticker-chip mono">Survival rate below 1%</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
