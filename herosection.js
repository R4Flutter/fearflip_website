export function renderHeroSection() {
  return `
    <section class="hero" id="top" data-track-section="hero" data-hero>
      <div class="hero__backdrop"></div>
      <div class="hero__scanlines"></div>
      <div class="hero__squares"></div>
      <div class="hero__aurora hero__aurora--one"></div>
      <div class="hero__aurora hero__aurora--two"></div>
      <div class="hero__vignette"></div>
      <img
        class="hero__entity reveal"
        data-reveal="scale"
        src="/assets/images/hero-entity.svg"
        alt="Abstract FearFlip entity artwork"
      />
      <div class="container hero__inner">
        <div class="hero__content reveal">
          <div class="eyebrow">Survival Maze Horror Strategy Game</div>
          <h1 class="display-title" aria-label="ESCAPE THIS. CURSED MAZE.">
            <span class="display-title__line hero__title-main">ESCAPE THIS</span>
            <span class="display-title__line hero__title-accent">CURSED MAZE</span>
          </h1>
          <div class="hero__kicker mono">The Maze Changes. The Devil Doesn't.</div>
          <p class="hero__copy">
            FearFlip is a high-intensity survival maze game where every second matters and one wrong move gets punished.
          </p>
          <p class="hero__subheadline">
            Use the Flip mechanic to reshape the labyrinth in real time, open escape routes, trap danger, and reach safety before the Devil reaches you.
          </p>
          <div class="hero__actions">
            <div class="hero__primary-ctas">
              <button
                class="cta-button"
                type="button"
                data-scroll-target="#final-capture"
                data-track-click="hero_wishlist"
              >
                Wishlist Now
              </button>
              <button
                class="cta-button cta-button--ghost"
                type="button"
                data-scroll-target="#gameplay"
                data-track-click="hero_watch_trailer"
              >
                Watch Trailer
              </button>
            </div>
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
                data-scroll-target="#features"
                data-track-click="hero_secondary_features"
              >
                Run Fast. Think Faster.
              </button>
              <div class="hero__microcopy mono" data-waitlist-count>
                Most players fail. Only the smartest survive.
              </div>
              <div class="hero__support">No spam. Launch alerts and early access drops only.</div>
            </div>
          </div>
          <div class="hero__ticker reveal" data-stagger-parent>
            <div class="ticker-chip mono" data-stagger-item>Every Flip Can Save You. Or Kill You.</div>
            <div class="ticker-chip mono" data-stagger-item>Procedural Mazes. Infinite Replay.</div>
            <div class="ticker-chip mono" data-stagger-item>Can You Escape FearFlip?</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
