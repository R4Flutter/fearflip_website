"import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PsychologicalHookSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-testid=\"psych-hook-section\"
      ref={ref}
      className=\"relative py-24 sm:py-32 overflow-hidden\"
      style={{ backgroundColor: '#0B0B0F' }}
    >
      {/* Ambient neon glow */}
      <div
        className=\"absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none\"
        style={{
          background: 'radial-gradient(circle, rgba(138,43,226,0.06) 0%, transparent 70%)',
        }}
      />

      <div className=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">
        <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center\">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className=\"relative animate-float order-2 lg:order-1\"
          >
            <img
              src=\"https://static.prod-images.emergentagent.com/jobs/381d835d-c436-4210-964d-a6762b1a80f9/images/f11fa68b3064e0f3b6a30455fa4111ba46a0f469e1591055b6f91d49bef369a1.png\"
              alt=\"Psychological inkblot art\"
              className=\"w-full max-w-lg mx-auto rounded-sm\"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              loading=\"lazy\"
              data-testid=\"psych-hook-image\"
            />
            {/* Glow underneath */}
            <div
              className=\"absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full\"
              style={{
                background: 'radial-gradient(ellipse, rgba(138,43,226,0.15) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className=\"order-1 lg:order-2\"
          >
            <p className=\"mono text-xs tracking-[0.2em] uppercase font-bold mb-4\" style={{ color: '#8A2BE2' }}>
              PSYCHOLOGICAL ENGINE
            </p>
            <h2
              data-testid=\"psych-hook-heading\"
              className=\"text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-6\"
            >
              This is not<br />just a game.
            </h2>
            <p className=\"text-base leading-relaxed mb-6\" style={{ color: '#B8B8C2' }}>
              FearFlip is designed to break your focus, test your reflexes, and push your mind to its limit.
            </p>
            <p className=\"text-base leading-relaxed mb-8\" style={{ color: '#B8B8C2' }}>
              The maze adapts. The controls shift. The entity learns. Every session is a new psychological trial engineered to exploit your instincts.
            </p>

            {/* Feature list */}
            <div className=\"space-y-3\">
              {[
                'Adaptive difficulty that reads your behavior',
                'Sensory disruption through visual and audio shifts',
                'Pattern recognition that punishes predictability',
              ].map((item, i) => (
                <div key={i} className=\"flex items-start gap-3\">
                  <span className=\"w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0\" style={{ backgroundColor: '#FF2E63' }} />
                  <p className=\"text-sm\" style={{ color: '#B8B8C2' }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"