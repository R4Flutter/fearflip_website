"import { useEffect, useRef } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import GameplaySection from '@/components/GameplaySection';
import PsychologicalHookSection from '@/components/PsychologicalHookSection';
import FinalCaptureSection from '@/components/FinalCaptureSection';
import MobileStickyCTA from '@/components/MobileStickyCTA';

export default function LandingPage() {
  const { trackEvent } = useAnalytics();
  const tracked50 = useRef(false);
  const tracked90 = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      if (scrollPercent >= 50 && !tracked50.current) {
        tracked50.current = true;
        trackEvent('scroll_50');
      }
      if (scrollPercent >= 90 && !tracked90.current) {
        tracked90.current = true;
        trackEvent('scroll_90');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  const scrollToCapture = () => {
    document.getElementById('final-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div data-testid=\"landing-page\" className=\"relative\">
      {/* Noise overlay */}
      <div className=\"noise-overlay\" />

      <Header onCtaClick={scrollToCapture} />
      <main>
        <HeroSection />
        <SocialProofSection />
        <GameplaySection />
        <PsychologicalHookSection />
        <FinalCaptureSection />
      </main>
      <MobileStickyCTA onCtaClick={scrollToCapture} />
    </div>
  );
}
"