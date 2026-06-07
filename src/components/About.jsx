import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Target, Users, Zap, Lightbulb } from 'lucide-react';
import API_BASE from '../config';

const DEFAULT_STATS = [
  { icon: Target, value: '98%', label: 'Client Retention', color: 'var(--primary-bright)' },
  { icon: Zap, value: '4+', label: 'Successful Projects', color: 'var(--secondary)' },
  { icon: Users, value: '3+', label: 'Happy Clients', color: 'var(--tertiary)' },
  { icon: Lightbulb, value: '2+', label: 'Years in Business', color: 'var(--primary)' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const About = () => {
  const [aboutData, setAboutData] = useState({ mission: '', vision: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/about`)
      .then((r) => r.json())
      .then((data) => setAboutData({ mission: data.mission, vision: data.vision, description: data.description }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="about" className="section" style={{ background: 'var(--surface-lowest)' }}>
      <div className="container">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>About Us</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Building the <span className="gradient-text">Future of Digital</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.75 }}>
            {aboutData.description || 'We combine cutting-edge technology with thoughtful design to create digital products that make a real difference.'}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)',
          alignItems: 'center',
          marginBottom: 'var(--space-16)',
        }} className="about-grid">

          {/* Left — Stats Cards Grid */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-4)',
            }} className="stats-grid">
              {DEFAULT_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass-card"
                  style={{
                    padding: 'var(--space-6)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                  }} />

                  <div style={{
                    width: '40px', height: '40px', borderRadius: 'var(--radius-lg)',
                    background: `rgba(139, 92, 246, 0.06)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto var(--space-3)',
                  }}>
                    <stat.icon size={18} style={{ color: stat.color }} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800,
                    color: 'var(--on-surface)', letterSpacing: '-0.03em',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--outline)', marginTop: '0.25rem' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Mission & Vision */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            {/* Mission */}
            <div className="glass-card" style={{
              padding: 'var(--space-8)',
              marginBottom: 'var(--space-5)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, var(--primary-bright), transparent)',
              }} />
              <div style={{
                width: '36px', height: '36px', borderRadius: 'var(--radius-lg)',
                background: 'var(--primary-container)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}>
                <Target size={18} style={{ color: 'var(--primary-bright)' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700,
                color: 'var(--on-surface)', marginBottom: 'var(--space-3)',
              }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--on-surface-variant)' }}>
                {aboutData.mission || 'To empower businesses with innovative digital solutions that drive measurable growth and create lasting impact.'}
              </p>
            </div>

            {/* Vision */}
            <div className="glass-card" style={{
              padding: 'var(--space-8)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, var(--secondary), transparent)',
              }} />
              <div style={{
                width: '36px', height: '36px', borderRadius: 'var(--radius-lg)',
                background: 'var(--secondary-container)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}>
                <Lightbulb size={18} style={{ color: 'var(--secondary)' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700,
                color: 'var(--on-surface)', marginBottom: 'var(--space-3)',
              }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--on-surface-variant)' }}>
                {aboutData.vision || 'To be the go-to digital partner for forward-thinking companies worldwide, setting the standard for innovation and quality.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Differentiators row */}
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {[
              { label: 'Custom Solutions', desc: 'Every project built from scratch for your unique needs' },
              { label: 'Agile Delivery', desc: 'Rapid iteration with clear milestones and sprints' },
              { label: 'Full Ownership', desc: 'You own 100% of the code and intellectual property' },
              { label: '24/7 Support', desc: 'Round-the-clock assistance post-launch' },
            ].map((item, i) => (
              <div key={i} style={{ padding: 'var(--space-5)', borderLeft: '2px solid', borderImage: `linear-gradient(to bottom, var(--primary), transparent) 1` }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700,
                  color: 'var(--on-surface)', marginBottom: '0.5rem',
                }}>
                  {item.label}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
