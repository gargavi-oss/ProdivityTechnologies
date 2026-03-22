import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Target, Users, TrendingUp, Lightbulb } from 'lucide-react';

const differentiators = [
  { icon: Target, text: 'Results-driven approach with measurable outcomes' },
  { icon: Users, text: 'Dedicated team of 40+ senior engineers & designers' },
  { icon: TrendingUp, text: 'Agile methodology with transparent communication' },
  { icon: Lightbulb, text: 'Innovation-first mindset backed by industry research' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const About = () => {
  return (
    <section
      id="about"
      className="section"
      style={{ background: 'var(--surface-lowest)' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}
          className="about-grid"
        >
          {/* Left – Text */}
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Why Choose Us</p>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              marginBottom: 'var(--space-6)',
            }}>
              Engineering <span className="gradient-text">Excellence</span>,{' '}
              Delivered at Scale
            </h2>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: 'var(--on-surface-variant)',
              marginBottom: 'var(--space-8)',
            }}>
              At Prodivity Technologies, we don&apos;t just build software — we engineer
              digital experiences that transform businesses. Our team combines deep
              technical expertise with creative vision to deliver solutions that
              drive real, measurable impact.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {differentiators.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(98, 0, 238, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <item.icon size={18} style={{ color: 'var(--primary)' }} />
                  </div>
                  <span style={{ fontSize: '0.95rem', color: 'var(--on-surface-variant)' }}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – Abstract Visual */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              position: 'relative',
              height: '460px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Main glow */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(98, 0, 238, 0.06) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }} />

            {/* Rings */}
            {[280, 220, 160].map((size, i) => (
              <div
                key={size}
                className="animate-float"
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  border: `1px solid rgba(98, 0, 238, ${0.06 + i * 0.03})`,
                  animationDelay: `${-i * 1.5}s`,
                }}
              />
            ))}

            {/* Center element */}
            <div style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, var(--primary), var(--tertiary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 60px rgba(98, 0, 238, 0.15)',
            }}>
              <CheckCircle size={40} style={{ color: '#ffffff' }} />
            </div>

            {/* Floating tech dots */}
            {[
              { top: '15%', left: '20%', delay: '-0.5s', size: 8, color: 'var(--secondary)' },
              { top: '75%', left: '30%', delay: '-2s', size: 6, color: 'var(--primary)' },
              { top: '25%', right: '15%', delay: '-3s', size: 10, color: 'var(--tertiary)' },
              { top: '70%', right: '20%', delay: '-1.5s', size: 5, color: 'var(--primary)' },
            ].map((dot, i) => (
              <div
                key={i}
                className="animate-float"
                style={{
                  position: 'absolute',
                  top: dot.top,
                  left: dot.left,
                  right: dot.right,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  borderRadius: '50%',
                  background: dot.color,
                  opacity: 0.4,
                  animationDelay: dot.delay,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
