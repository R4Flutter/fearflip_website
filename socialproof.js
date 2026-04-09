"import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '100+', label: 'Brutal Levels' },
  { value: '10K+', label: 'Test Subjects' },
  { value: '<1%', label: 'Survival Rate' },
];

const testimonials = [
  {
    quote: \"This game messes with your brain.\",
    author: \"@ghostrunner_x\",
    avatar: \"https://images.unsplash.com/photo-1618193139062-2c5bf4f935b7?w=80&h=80&fit=crop&crop=face\",
  },
  {
    quote: \"I couldn't stop playing even after losing 20 times.\",
    author: \"@maze_addict\",
    avatar: \"https://images.unsplash.com/photo-1537158345907-c4fb34477bd6?w=80&h=80&fit=crop&crop=face\",
  },
  {
    quote: \"It feels unfair... but I keep coming back.\",
    author: \"@dark_player99\",
    avatar: \"https://images.unsplash.com/photo-1760612484753-2311a768798a?w=80&h=80&fit=crop&crop=face\",
  },
];

export default function SocialProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-testid=\"social-proof-section\"
      ref={ref}
      className=\"relative py-24 sm:py-32\"
      style={{ backgroundColor: '#0B0B0F' }}
    >
      <div className=\"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8\">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className=\"grid grid-cols-3 gap-4 mb-20\"
          data-testid=\"social-proof-stats\"
        >
          {stats.map((stat, i) => (
            <div key={i} className=\"text-center\">
              <p className=\"text-2xl sm:text-4xl font-black\" style={{ fontFamily: \"'Unbounded', cursive\", color: '#FF2E63' }}>
                {stat.value}
              </p>
              <p className=\"mono text-xs tracking-[0.15em] uppercase mt-2\" style={{ color: '#B8B8C2' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=\"text-center mb-12\"
        >
          <p className=\"mono text-xs tracking-[0.2em] uppercase font-bold\" style={{ color: '#8A2BE2' }}>
            NOT FOR CASUAL PLAYERS
          </p>
          <h2
            data-testid=\"social-proof-heading\"
            className=\"text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-3\"
          >
            Insanely addictive gameplay
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-5\">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              data-testid={`testimonial-card-${i}`}
              className=\"testimonial-card rounded-sm p-6 relative overflow-hidden\"
            >
              {/* Subtle top accent */}
              <div className=\"absolute top-0 left-0 right-0 h-[1px]\" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,46,99,0.4), transparent)' }} />

              <p className=\"text-base leading-relaxed mb-6\" style={{ color: '#F5F5F5' }}>
                \"{t.quote}\"
              </p>
              <div className=\"flex items-center gap-3\">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className=\"w-8 h-8 rounded-full object-cover\"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  loading=\"lazy\"
                />
                <span className=\"mono text-xs\" style={{ color: '#B8B8C2' }}>
                  {t.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"