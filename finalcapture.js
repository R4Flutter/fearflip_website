"import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import axios from 'axios';
import { useAnalytics } from '@/hooks/useAnalytics';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function FinalCaptureSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { trackEvent } = useAnalytics();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setStatus(null);
    trackEvent('final_cta_click', { email });

    try {
      await axios.post(`${API}/subscribe`, { email, source: 'final' });
      setStatus('success');
      setEmail('');
    } catch (err) {
      if (err.response?.status === 409) {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      data-testid=\"final-capture-section\"
      id=\"final-capture\"
      ref={ref}
      className=\"relative py-24 sm:py-32 overflow-hidden\"
      style={{ backgroundColor: '#060606' }}
    >
      {/* Ambient red glow */}
      <div
        className=\"absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none\"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,46,99,0.06) 0%, transparent 70%)',
        }}
      />

      <div className=\"relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center\">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className=\"mono text-xs tracking-[0.2em] uppercase font-bold mb-4\" style={{ color: '#FF2E63' }}>
            ACCEPT THE INVITE
          </p>
          <h2
            data-testid=\"final-capture-heading\"
            className=\"text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-none mb-4\"
          >
            Get early access<br />before anyone else
          </h2>
          <p className=\"text-base mb-8\" style={{ color: '#B8B8C2' }}>
            Be the first to play. Get exclusive updates and rewards.
          </p>

          <form
            onSubmit={handleSubmit}
            className=\"flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4\"
            data-testid=\"final-email-form\"
          >
            <input
              data-testid=\"final-email-input\"
              type=\"email\"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=\"Enter your email\"
              required
              className=\"fearflip-input flex-1 px-4 py-3 rounded-sm text-sm animate-border-glow\"
              aria-label=\"Email address\"
            />
            <button
              data-testid=\"final-submit-btn\"
              type=\"submit\"
              disabled={loading}
              className=\"cta-btn px-6 py-3 rounded-sm text-sm\"
            >
              {loading ? 'JOINING...' : 'JOIN NOW'}
            </button>
          </form>

          {status === 'success' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} data-testid=\"final-success-msg\" className=\"text-sm mb-3\" style={{ color: '#00FF88' }}>
              Welcome to the experiment.
            </motion.p>
          )}
          {status === 'duplicate' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} data-testid=\"final-duplicate-msg\" className=\"text-sm mb-3\" style={{ color: '#FF2E63' }}>
              Already registered. The maze awaits.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} data-testid=\"final-error-msg\" className=\"text-sm mb-3\" style={{ color: '#FF2E63' }}>
              Something went wrong. Try again.
            </motion.p>
          )}

          {/* Urgency */}
          <p className=\"mono text-xs animate-urgency mt-2\" style={{ color: '#FF2E63' }} data-testid=\"final-urgency\">
            Limited early slots. First wave closes soon.
          </p>
          <p className=\"text-xs mt-3\" style={{ color: 'rgba(184,184,194,0.5)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-8\" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className=\"flex flex-col sm:flex-row items-center justify-between gap-4\">
          <span
            className=\"text-lg font-black uppercase tracking-tighter\"
            style={{ fontFamily: \"'Unbounded', cursive\", color: '#FF2E63' }}
          >
            FEAR<span style={{ color: '#00FF88' }}>FLIP</span>
          </span>
          <p className=\"text-xs\" style={{ color: 'rgba(184,184,194,0.4)' }}>
            &copy; {new Date().getFullYear()} FearFlip. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
"