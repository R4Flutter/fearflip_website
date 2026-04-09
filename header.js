export function renderHeader() {
  return `
    <header class="site-header" data-header>
      <div class="container site-header__inner">
        <a class="brand-mark" href="#top" aria-label="FearFlip home">
          <span class="accent-text">Fear</span><span class="accent-text--green">Flip</span>
        </a>
        <button
          class="cta-button"
          type="button"
          data-scroll-target="#final-capture"
          data-track-click="header_waitlist"
        >
          Join Waitlist
        </button>
      </div>
    </header>
  `;
}
