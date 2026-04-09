const identities = [
  { initials: "GX", name: "@ghostrunner_x" },
  { initials: "MA", name: "@maze_addict" },
  { initials: "DP", name: "@dark_player99" },
];

const quotes = [
  {
    quote: "This game messes with your brain.",
    author: "@ghostrunner_x",
    rating: "4.9 chaos score",
  },
  {
    quote: "I couldn't stop playing even after losing 20 times.",
    author: "@maze_addict",
    rating: "Top 1% retention",
  },
  {
    quote: "It feels unfair... but I keep coming back.",
    author: "@dark_player99",
    rating: "Obsessive replay loop",
  },
];

export function renderSocialProofSection() {
  return `
    <section class="section section--dark" id="proof" data-track-section="social-proof">
      <div class="container">
        <div class="stats-grid">
          <article class="panel stat-card reveal">
            <div class="stat-card__value">100+</div>
            <div class="stat-card__label mono">Brutal Levels</div>
          </article>
          <article class="panel stat-card reveal">
            <div class="stat-card__value">10K+</div>
            <div class="stat-card__label mono">Test Subjects</div>
          </article>
          <article class="panel stat-card reveal">
            <div class="stat-card__value">&lt;1%</div>
            <div class="stat-card__label mono">Survival Rate</div>
          </article>
        </div>

        <div class="section-heading reveal">
          <div class="eyebrow">Not For Casual Players</div>
          <h2 class="section-title">Insanely Addictive Gameplay</h2>
        </div>

        <div class="identity-strip">
          ${identities
            .map(
              (identity) => `
                <article class="panel identity-card reveal">
                  <span class="avatar-badge">${identity.initials}</span>
                  <div class="identity-card__name mono">${identity.name}</div>
                </article>
              `,
            )
            .join("")}
        </div>

        <div class="quote-grid">
          ${quotes
            .map(
              (quote) => `
                <article class="panel quote-card reveal">
                  <p class="quote-card__copy">"${quote.quote}"</p>
                  <div class="quote-card__footer mono">
                    <span>${quote.author}</span>
                    <span>${quote.rating}</span>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
