const featureCards = [
  {
    modifier: "",
    icon: "FX",
    title: "Dynamic Maze Flipping",
    copy: "Turn walls into paths, paths into walls, and create emergency exits in real time.",
  },
  {
    modifier: "feature-card--purple",
    icon: "DV",
    title: "Relentless Devil Chase",
    copy: "The Devil hunts constantly, punishes hesitation, and accelerates in higher levels.",
  },
  {
    modifier: "feature-card--green",
    icon: "PR",
    title: "Procedural Mazes",
    copy: "No run is the same. Every route, chase, and close call feels fresh.",
  },
  {
    modifier: "",
    icon: "SK",
    title: "High Skill Gameplay",
    copy: "Reflexes, timing, and strategy decide survival when pressure peaks.",
  },
];

const flipFunctions = [
  "Turn walls into paths",
  "Turn paths into walls",
  "Create emergency escape routes",
  "Trap the Devil temporarily",
  "Open shortcuts to the safe zone",
  "Break dead-end situations",
];

const devilTraits = [
  "Never stops chasing",
  "Punishes hesitation",
  "Gets faster in higher levels",
  "Creates constant pressure",
  "Turns every second into panic",
];

export function renderGameplaySection() {
  return `
    <section class="section" id="gameplay" data-track-section="gameplay">
      <div class="container">
        <div class="reveal" style="margin-bottom: 32px;">
          <div class="eyebrow">Core Loop</div>
          <h2 class="section-title" style="font-size: clamp(3.2rem, 9vw, 6.2rem);">Spawn. Flip. Escape. Repeat.</h2>
          <p class="section-copy" style="margin-top: 18px; max-width: 72ch;">
            You spawn inside a procedurally generated labyrinth and must reach the safe zone before the Devil catches you.
            One smart flip can save your run. One bad flip can destroy your route.
          </p>
        </div>

        <div class="gameplay-layout">
          <article class="panel preview-card preview-card--hero reveal">
            <div class="preview-card__media">
              <div class="maze-game-card" data-maze-preview>
                <div class="maze-frame">
                  <div class="maze-stage">
                    <img
                      class="maze-image"
                      src="/assets/images/app_basic_gameplay.jpeg"
                      alt="FearFlip gameplay preview"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div class="maze-hook">
                  <h3 class="maze-hook__title">One wrong turn and the Devil catches you.</h3>
                  <p class="maze-hook__copy">
                    Get early access before public launch and secure your spot for the first FearFlip build.
                  </p>
                  <button
                    class="maze-cta-button"
                    type="button"
                    data-scroll-target="#final-signup"
                    data-track-click="maze_preview_early_access"
                  >
                    Reserve Early Access
                  </button>
                  <p class="maze-controls-text">Limited pre-launch slots. Join now before the list fills.</p>
                </div>
              </div>
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

        <div class="gameplay-detail-grid">
          <article class="panel gameplay-detail reveal">
            <h3 class="feature-card__title">The Flip System</h3>
            <p class="feature-card__copy">
              FearFlip's signature mechanic lets you manipulate the maze itself. Timing matters because one reckless move can block your own escape.
            </p>
            <div class="final-card__list">
              ${flipFunctions.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </article>

          <article class="panel gameplay-detail reveal">
            <h3 class="feature-card__title">The Devil</h3>
            <p class="feature-card__copy">
              This AI enemy is relentless. It does not wait, it does not forgive, and it turns every moment into a pressure test.
            </p>
            <div class="final-card__list">
              ${devilTraits.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}
