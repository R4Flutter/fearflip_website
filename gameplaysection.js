"import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Eye, Ghost, ShieldOff } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Reality Distortion',
    desc: 'Reality flips mid-game. What was up is now down.',
    color: '#FF2E63',
  },
  {
    icon: Eye,
    title: 'Adaptive AI',
    desc: 'Controls become unpredictable. Trust nothing.',
    color: '#8A2BE2',
  },
  {
    icon: Ghost,
    title: 'The Hunter',
    desc: 'A hidden entity hunts you. It learns your patterns.',
    color: '#00FF88',
  },
  {
    icon: ShieldOff,
    title: 'No Safe Zone',
    desc: 'Safe zones are not always safe. Nowhere to hide.',
    color: '#FF2E63',
  },
];

export default function GameplaySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-testid=\"gameplay-section\"
      ref={ref}
      className=\"relative py-24 sm:py-32\"
      style={{ backgroundColor: '#060606' }}
    >
      <div className=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className=\"mb-16\"
        >
          <p className=\"mono text-xs tracking-[0.2em] uppercase font-bold mb-3\" style={{ color: '#FF2E63' }}>
            GAMEPLAY PREVIEW
          </p>
          <h2
            data-testid=\"gameplay-heading\"
            className=\"text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight\"
          >
            Every level is a new nightmare
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className=\"grid grid-cols-1 lg:grid-cols-12 gap-4\">
          {/* Gameplay images - tall left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className=\"lg:col-span-5 lg:row-span-2 bento-card rounded-sm overflow-hidden relative group\"
          >
            <div className=\"relative h-full min-h-[400px] lg:min-h-full\">
              <img
                src=\"https://customer-assets.emergentagent.com/job_fearflip-waitlist/artifacts/x0pdpr8y_image.png\"
                alt=\"FearFlip maze gameplay\"
                className=\"w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105\"
                loading=\"lazy\"
                data-testid=\"gameplay-image-maze\"
              />
              <div className=\"absolute inset-0 bg-gradient-to-t from-[#060606]/80 via-transparent to-transparent\" />
              <div className=\"absolute bottom-4 left-4 right-4\">
                <p className=\"mono text-xs uppercase tracking-widest\" style={{ color: '#00FF88' }}>Live Gameplay</p>
                <p className=\"text-sm mt-1\" style={{ color: '#B8B8C2' }}>Navigate the dark. Survive the maze.</p>
              </div>
            </div>
          </motion.div>

          {/* Game menu screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className=\"lg:col-span-3 bento-card rounded-sm overflow-hidden relative group\"
          >
            <div className=\"relative h-full min-h-[220px]\">
              <img
                src=\"https://customer-assets.emergentagent.com/job_fearflip-waitlist/artifacts/9cs8edkf_image.png\"
                alt=\"FearFlip game menu\"
                className=\"w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105\"
                loading=\"lazy\"
                data-testid=\"gameplay-image-menu\"
              />
              <div className=\"absolute inset-0 bg-gradient-to-t from-[#060606]/70 via-transparent to-transparent\" />
            </div>
          </motion.div>

          {/* Feature cards - right column */}
          {features.slice(0, 2).map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              data-testid={`gameplay-feature-${i}`}
              className=\"lg:col-span-2 bento-card rounded-sm p-5 flex flex-col justify-between min-h-[220px] group cursor-default\"
            >
              <f.icon
                size={24}
                style={{ color: f.color }}
                className=\"mb-4 transition-transform duration-300 group-hover:scale-110\"
              />
              <div>
                <h3 className=\"text-sm font-bold uppercase tracking-wide mb-1\">{f.title}</h3>
                <p className=\"text-xs leading-relaxed\" style={{ color: '#B8B8C2' }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Bottom feature cards */}
          {features.slice(2).map((f, i) => (
            <motion.div
              key={i + 2}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              data-testid={`gameplay-feature-${i + 2}`}
              className=\"lg:col-span-3 bento-card rounded-sm p-5 flex flex-col justify-between min-h-[180px] group cursor-default\"
            >
              <f.icon
                size={24}
                style={{ color: f.color }}
                className=\"mb-4 transition-transform duration-300 group-hover:scale-110\"
              />
              <div>
                <h3 className=\"text-sm font-bold uppercase tracking-wide mb-1\">{f.title}</h3>
                <p className=\"text-xs leading-relaxed\" style={{ color: '#B8B8C2' }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Risk reversal card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            data-testid=\"gameplay-risk-card\"
            className=\"lg:col-span-1 bento-card rounded-sm p-4 flex items-center justify-center\"
            style={{ borderColor: 'rgba(255,46,99,0.3)' }}
          >
            <p
              className=\"mono text-[10px] uppercase tracking-widest text-center leading-relaxed\"
              style={{ color: '#FF2E63' }}
            >
              IF YOU'RE NOT READY, LEAVE NOW.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"