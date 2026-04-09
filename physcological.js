export function renderPsychologicalSection() {
  return `
    <section class="section section--dark" id="engine" data-track-section="psychological-engine">
      <div class="container psych-layout">
        <article class="panel psych-art reveal">
          <div class="psych-art__frame">
            <img
              src="/assets/images/psych-engine.svg"
              alt="FearFlip psychological engine abstract artwork"
            />
          </div>
        </article>

        <div class="reveal">
          <div class="eyebrow">Psychological Engine</div>
          <h2 class="section-title" style="font-size: clamp(3rem, 8vw, 5.5rem);">This Is Not Just A Game.</h2>
          <p class="section-copy" style="margin-top: 24px;">
            FearFlip is designed to break your focus, test your reflexes, and push your mind to its limit.
          </p>
          <p class="section-copy" style="margin-top: 26px;">
            The maze adapts. The controls shift. The entity learns. Every session becomes a new psychological trial engineered to exploit your instincts.
          </p>
          <div class="detail-list">
            <div class="detail-item">Adaptive difficulty that reacts to your behavior</div>
            <div class="detail-item">Sensory disruption through visual rhythm and pacing shifts</div>
            <div class="detail-item">Pattern recognition that punishes predictable movement</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
