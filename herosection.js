"import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAnalytics } from '@/hooks/useAnalytics';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'duplicate'
  const [loading, setLoading] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setStatus(null);
    trackEvent('hero_email_submit', { email });

    try {
      await axios.post(`${API}/subscribe`, { email, source: 'hero' });
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
      data-testid=\"hero-section\"
      className=\"relative min-h-screen flex items-center justify-center overflow-hidden\"
      style={{ background: '#060606' }}
    >
      {/* Background image */}
      <div
        className=\"absolute inset-0 bg-cover bg-center opacity-40\"
        style={{
          backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/381d835d-c436-4210-964d-a6762b1a80f9/images/e05d71a150fea89bd521b5358d9c7805093b7de05d2592ccc6e63e870738b76d.png)`,
        }}
      />
      <div className=\"absolute inset-0 bg-gradient-to-b from-[#060606]/60 via-transparent to-[#060606]\" />

      {/* Scanline overlay */}
      <div className=\"scanline absolute inset-0 pointer-events-none\" />

      {/* Red ambient glow */}
      <div
        className=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none\"
        style={{
          background: 'radial-gradient(circle, rgba(255,46,99,0.08) 0%, transparent 70%)',
        }}
      />

      <div className=\"relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center pt-24 pb-20\">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=\"mono text-xs tracking-[0.2em] uppercase font-bold mb-8\"
          style={{ color: '#FF2E63' }}
          data-testid=\"hero-overline\"
        >
          THE EXPERIMENT BEGINS SOON
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className=\"glitch-text text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6\"
          data-text=\"You won't survive this game.\"
          data-testid=\"hero-headline\"
        >
          You won't survive this game.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className=\"text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto\"
          style={{ color: '#B8B8C2' }}
          data-testid=\"hero-subheadline\"
        >
          FearFlip is a psychological maze where reality flips, controls betray you, and something is always chasing you.
        </motion.p>

        {/* Email form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onSubmit={handleSubmit}
          className=\"flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4\"
          data-testid=\"hero-email-form\"
        >
          <input
            data-testid=\"hero-email-input\"
            type=\"email\"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=\"Enter your email\"
            required
            className=\"fearflip-input flex-1 px-4 py-3 rounded-sm text-sm\"
            aria-label=\"Email address\"
          />
          <button
            data-testid=\"hero-submit-btn\"
            type=\"submit\"
            disabled={loading}
            onClick={() => trackEvent('hero_cta_click')}
            className=\"cta-btn px-6 py-3 rounded-sm text-sm animate-pulse-danger disabled:opacity-50\"
          >
            {loading ? 'JOINING...' : 'GET EARLY ACCESS'}
          </button>
        </motion.form>

        {/* Status messages */}
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-testid=\"hero-success-msg\"
            className=\"text-sm mb-3\"
            style={{ color: '#00FF88' }}
          >
            You're in. Prepare yourself.
          </motion.p>
        )}
        {status === 'duplicate' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-testid=\"hero-duplicate-msg\"
            className=\"text-sm mb-3\"
            style={{ color: '#FF2E63' }}
          >
            Already registered. There's no escaping now.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-testid=\"hero-error-msg\"
            className=\"text-sm mb-3\"
            style={{ color: '#FF2E63' }}
          >
            Something went wrong. Try again.
          </motion.p>
        )}

        {/* Secondary CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          data-testid=\"hero-secondary-cta\"
          onClick={() => {
            trackEvent('hero_secondary_cta_click');
            document.getElementById('final-capture')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className=\"text-xs uppercase tracking-widest font-semibold mb-6 hover:underline transition-colors\"
          style={{ color: '#B8B8C2' }}
        >
          or join the fear list
        </motion.button>

        {/* Microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p
            data-testid=\"hero-microcopy\"
            className=\"mono text-xs animate-urgency\"
            style={{ color: '#FF2E63' }}
          >
            Only the top 1% reach level 20
          </p>
          <p className=\"text-xs mt-2\" style={{ color: 'rgba(184,184,194,0.5)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
"