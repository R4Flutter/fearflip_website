import { renderHeader } from "./header.js";
import { renderHeroSection } from "./herosection.js";
import { renderSocialProofSection } from "./socialproof.js";
import { renderGameplaySection } from "./gameplaysection.js";
import { renderPsychologicalSection } from "./physcological.js";
import { renderFinalCaptureSection } from "./finalcapture.js";
import { renderMobileStickyCTA } from "./mobilesticky.js";

export function renderLandingPage() {
  return `
    <div>
      ${renderHeader()}
      <main>
        ${renderHeroSection()}
        ${renderSocialProofSection()}
        ${renderGameplaySection()}
        ${renderPsychologicalSection()}
        ${renderFinalCaptureSection()}
      </main>
      ${renderMobileStickyCTA()}
    </div>
  `;
}
