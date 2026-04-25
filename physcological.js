export function renderPsychologicalSection() {
  return `
    <section class="section section--dark" id="engine" data-track-section="survival-systems">
      <div class="container psych-layout">
        <article class="panel psych-art reveal">
          <div class="psych-art__frame">
            <img
              src="/assets/images/app_dashboard.jpeg"
              alt="FearFlip level progression and chase dashboard art"
            />
          </div>
        </article>

        <div class="reveal">
          <div class="eyebrow">Progression And Pressure</div>
          <h2 class="section-title" style="font-size: clamp(3rem, 8vw, 5.5rem);">Every Level Gets More Brutal.</h2>
          <p class="section-copy" style="margin-top: 24px;">
            FearFlip scales danger every level. You get less reaction time, harder routes, and an enemy that keeps getting faster.
          </p>
          <p class="section-copy" style="margin-top: 26px;">
            Every run feels different because maze generation and chase patterns keep changing. You cannot rely on memorized routes.
          </p>
          <div class="detail-list">
            <div class="detail-item">Faster Devil speed</div>
            <div class="detail-item">More confusing maze layouts</div>
            <div class="detail-item">Less safe reaction time</div>
            <div class="detail-item">Harder escape paths</div>
            <div class="detail-item">Higher pressure survival moments</div>
          </div>
        </div>
      </div>

      <div class="container progression-grid">
        <article class="panel quote-card reveal">
          <p class="quote-card__copy">Infinite replay value with fresh challenges every match.</p>
          <div class="final-card__list" style="margin-top: 22px;">
            <span>No memorized routes</span>
            <span>Unpredictable danger every run</span>
            <span>Dynamic chase outcomes and close calls</span>
          </div>
        </article>

        <article class="panel quote-card reveal">
          <p class="quote-card__copy">Choose your fighter style before entering the maze.</p>
          <div class="tag-row">
            <span class="tag-chip mono">Knight</span>
            <span class="tag-chip mono">Shadow Warrior</span>
            <span class="tag-chip mono">Raider</span>
            <span class="tag-chip mono">Rogue</span>
            <span class="tag-chip mono">Mystic Fighter</span>
          </div>
        </article>

        <article class="panel quote-card reveal">
          <p class="quote-card__copy">Feel the full survival arc: fear, panic, rage, relief, and victory.</p>
          <div class="tag-row">
            <span class="tag-chip mono">Fear</span>
            <span class="tag-chip mono">Panic</span>
            <span class="tag-chip mono">Adrenaline</span>
            <span class="tag-chip mono">Relief</span>
            <span class="tag-chip mono">Victory</span>
          </div>
        </article>
      </div>
    </section>
  `;
}
