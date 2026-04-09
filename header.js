"import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Header({ onCtaClick }) {
  const [scrolled, setScrolled] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      data-testid=\"site-header\"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-header' : 'bg-transparent'
      }`}
    >
      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16\">
        <div className=\"flex items-center gap-2\">
          <span
            data-testid=\"header-logo\"
            className=\"text-xl font-black uppercase tracking-tighter\"
            style={{ fontFamily: \"'Unbounded', cursive\", color: '#FF2E63' }}
          >
            FEAR<span style={{ color: '#00FF88' }}>FLIP</span>
          </span>
        </div>

        <button
          data-testid=\"header-join-btn\"
          onClick={() => {
            trackEvent('header_cta_click');
            onCtaClick?.();
          }}
          className=\"cta-btn px-4 py-2 text-xs rounded-sm hidden sm:block\"
        >
          JOIN WAITLIST
        </button>
      </div>
    </motion.header>
  );
}
"