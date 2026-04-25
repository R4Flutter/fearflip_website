export function renderHeader() {
  return `
    <header class="site-header" data-header>
      <div class="container site-header__inner">
        <a class="brand-mark" href="#top" aria-label="FearFlip home">
          <span class="accent-text">Fear</span><span class="accent-text--white">Flip</span>
        </a>
        <nav class="site-header__nav mono" aria-label="Primary">
          <a
            class="site-header__link"
            href="#features"
            data-scroll-target="#features"
            data-track-click="nav_features"
          >
            Features
          </a>
          <a
            class="site-header__link"
            href="#gameplay"
            data-scroll-target="#gameplay"
            data-track-click="nav_gameplay"
          >
            Gameplay
          </a>
          <a
            class="site-header__link"
            href="#final-capture"
            data-scroll-target="#final-capture"
            data-track-click="nav_prelaunch"
          >
            Pre-Launch
          </a>
        </nav>
        <button
          class="cta-button cta-button--sm"
          type="button"
          data-scroll-target="#final-capture"
          data-track-click="header_wishlist"
        >
          Wishlist Now
        </button>
      </div>
    </header>
  `;
}
