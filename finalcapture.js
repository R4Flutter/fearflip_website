export function renderFinalCaptureSection() {
  return `
    <section class="section" id="final-capture" data-track-section="final-capture">
      <div class="container">
        <div class="final-grid">
          <article class="panel final-card reveal">
            <div class="eyebrow">Accept The Invite</div>
            <h2 class="section-title" style="font-size: clamp(2.6rem, 7vw, 4.8rem);">Get Early Access Before Anyone Else.</h2>
            <div class="final-card__meta">
              <p class="section-copy">
                Join the waitlist to unlock launch announcements, first-wave invites, and the earliest build of FearFlip.
              </p>
              <div class="final-card__list">
                <span>Priority access when the first public build opens</span>
                <span>Launch notes, balance drops, and private test updates</span>
                <span>Production-ready email capture backed by Firebase</span>
              </div>
            </div>
          </article>

          <article class="panel final-card reveal">
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
                Your email is used for waitlist communication only. Duplicate signups are safely handled and private data stays behind your Firebase backend.
              </p>
            </form>
          </article>
        </div>

        <footer class="panel footer-card reveal">
          <a class="brand-mark" href="#top" aria-label="FearFlip home">
            <span class="accent-text">Fear</span><span class="accent-text--green">Flip</span>
          </a>
          <div class="footer-meta">
            <span class="mono">Psychological Maze Launch Experience</span>
            <span>© <span data-current-year></span> FearFlip. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </section>
  `;
}
