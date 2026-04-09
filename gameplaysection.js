const featureCards = [
  {
    modifier: "",
    icon: "⚡",
    title: "Reality Distortion",
    copy: "Reality flips mid-game. What was up is now down.",
  },
  {
    modifier: "feature-card--purple",
    icon: "◉",
    title: "Adaptive AI",
    copy: "Controls become unpredictable. Trust nothing.",
  },
  {
    modifier: "feature-card--green",
    icon: "⌁",
    title: "The Hunter",
    copy: "A hidden entity studies your routes and closes the gap.",
  },
  {
    modifier: "",
    icon: "∆",
    title: "No Safe Zone",
    copy: "Safe rooms collapse, patterns shift, and panic becomes part of play.",
  },
];

export function renderGameplaySection() {
  return `
    <section class="section" id="gameplay" data-track-section="gameplay">
      <div class="container">
        <div class="reveal" style="margin-bottom: 32px;">
          <div class="eyebrow">Gameplay Preview</div>
          <h2 class="section-title" style="font-size: clamp(3.2rem, 9vw, 6.2rem);">Every Level Is A New Nightmare</h2>
        </div>

        <div class="gameplay-layout">
          <article class="panel preview-card preview-card--hero reveal">
            <div class="preview-card__media">
              <img
                src="/assets/images/app_basic_gameplay.jpeg"
                alt="FearFlip maze gameplay screenshot"
              />
            </div>
            <div class="preview-card__label">
              <div class="preview-card__kicker mono">Live Gameplay</div>
              <div class="preview-card__title">Maze Logic That Punishes Comfort</div>
            </div>
          </article>

          <article class="panel preview-card preview-card--art reveal">
            <div class="preview-card__media">
              <img
                src="/assets/images/app_dashboard%20.jpeg"
                alt="FearFlip game menu screenshot"
              />
            </div>
          </article>

          ${featureCards
            .map(
              (card) => `
                <article class="panel feature-card ${card.modifier} reveal">
                  <div class="feature-card__icon" aria-hidden="true">${card.icon}</div>
                  <div>
                    <h3 class="feature-card__title">${card.title}</h3>
                    <p class="feature-card__copy">${card.copy}</p>
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
