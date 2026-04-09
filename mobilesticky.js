"import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function MobileStickyCTA({ onCtaClick }) {
  const [visible, setVisible] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          data-testid=\"mobile-sticky-cta\"
          className=\"fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden\"
          style={{ backgroundColor: 'rgba(6,6,6,0.95)', borderTop: '1px solid rgba(255,46,99,0.3)' }}
        >
          <button
            data-testid=\"mobile-sticky-btn\"
            onClick={() => {
              trackEvent('mobile_sticky_cta_click');
              onCtaClick?.();
            }}
            className=\"cta-btn w-full py-3 rounded-sm text-sm\"
          >
            JOIN WAITLIST
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"