const characterShowcase = [
  { initials: "KN", name: "Knight" },
  { initials: "SW", name: "Shadow Warrior" },
  { initials: "RD", name: "Raider" },
  { initials: "RG", name: "Rogue" },
  { initials: "MF", name: "Mystic Fighter" },
];

const featureHighlights = [
  {
    quote: "Dynamic Maze Flipping",
    author: "Core Feature",
    rating: "Change the map in real time and build your own survival path.",
  },
  {
    quote: "Relentless Devil Chase",
    author: "Core Feature",
    rating: "The Devil never stops hunting and punishes hesitation.",
  },
  {
    quote: "Procedural Mazes",
    author: "Core Feature",
    rating: "Every run is unique. No memorized route can save you.",
  },
  {
    quote: "High Skill Gameplay",
    author: "Core Feature",
    rating: "Reflexes, timing, and strategy decide who survives.",
  },
];

export function renderSocialProofSection() {
  return `
    <section class="section section--dark" id="features" data-track-section="features">
      <div class="container">
        <div class="stats-grid">
          <article class="panel stat-card reveal">
            <div class="stat-card__value">100</div>
            <div class="stat-card__label mono">Target Level</div>
          </article>
          <article class="panel stat-card reveal">
            <div class="stat-card__value">1</div>
            <div class="stat-card__label mono">Bad Flip To Fail</div>
          </article>
          <article class="panel stat-card reveal">
            <div class="stat-card__value">INF</div>
            <div class="stat-card__label mono">Replay Value</div>
          </article>
        </div>

        <div class="section-heading reveal">
          <div class="eyebrow">FearFlip Features</div>
          <h2 class="section-title">Run Fast. Think Faster.</h2>
          <p class="section-copy" style="margin-top: 18px;">
            FearFlip drops you into a brutal chase where the maze keeps changing and panic is part of the design.
          </p>
        </div>

        <div class="quote-grid">
          ${featureHighlights
            .map(
              (feature) => `
                <article class="panel quote-card reveal">
                  <p class="quote-card__copy">${feature.quote}</p>
                  <div class="quote-card__footer mono">
                    <span>${feature.author}</span>
                    <span>${feature.rating}</span>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>

        <div class="identity-strip">
          ${characterShowcase
            .map(
              (character) => `
                <article class="panel identity-card reveal">
                  <span class="avatar-badge">${character.initials}</span>
                  <div class="identity-card__name mono">${character.name}</div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
