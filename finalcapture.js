export function renderFinalCaptureSection() {
  return `
    <section class="section" id="final-capture" data-track-section="final-capture">
      <div class="container">
        <div class="final-grid">
          <article class="panel final-card reveal">
            <div class="eyebrow">Final Challenge</div>
            <h2 class="section-title" style="font-size: clamp(2.6rem, 7vw, 4.8rem);">Can You Reach Level 100?</h2>
            <div class="final-card__meta">
              <p class="section-copy">
                Only the strongest players will survive the nightmare. Reach the safe zone, master the Flip mechanic, and climb.
              </p>
              <div class="hero__primary-ctas hero__primary-ctas--left">
                <button
                  class="cta-button cta-button--outline"
                  type="button"
                  data-scroll-target="#final-signup"
                  data-track-click="final_notify_me"
                >
                  Notify Me
                </button>
                <button
                  class="cta-button cta-button--ghost"
                  type="button"
                  data-scroll-target="#final-signup"
                  data-track-click="final_join_prelaunch"
                >
                  Join Pre-Launch
                </button>
              </div>
              <div class="final-card__list">
                <span>Priority access when the first public build opens</span>
                <span>Launch notes and balancing updates from each new level block</span>
                <span>Private pre-launch communication through your signup email</span>
              </div>
            </div>
          </article>

          <article class="panel final-card reveal" id="final-signup">
            <form class="waitlist-form waitlist-form--stacked" data-waitlist-form="final" novalidate>
              <div class="waitlist-form__group">
                <div>
                  <label class="sr-only" for="final-email">Email address</label>
                  <input
                    class="input-field"
                    id="final-email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    inputmode="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button class="cta-button" type="submit">Join Now</button>
              </div>
              <p class="status-message" data-form-status aria-live="polite"></p>
              <p class="form-note">
                Your email is used for waitlist communication only. Existing signup reliability stays unchanged.
              </p>
            </form>
          </article>
        </div>

        <footer class="panel footer-card reveal">
          <a class="brand-mark" href="#top" aria-label="FearFlip home">
            <span class="accent-text">Fear</span><span class="accent-text--white">Flip</span>
          </a>
          <div class="footer-meta">
            <span class="mono">Survival Maze Horror Strategy Game</span>
            <span>© <span data-current-year></span> FearFlip. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </section>
  `;
}
