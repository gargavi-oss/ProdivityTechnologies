import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'FinFlow Dashboard',
    category: 'Web Application',
    desc: 'A real-time financial analytics dashboard with AI-powered insights for enterprise clients. Built with React and Node.js.',
    tags: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
    color: '#6200ee',
    span: 'large',
  },
  {
    title: 'MedSync Mobile',
    category: 'Mobile App',
    desc: 'Cross-platform healthcare appointment and records management app serving 100k+ users.',
    tags: ['React Native', 'Firebase', 'HIPAA'],
    color: '#006874',
    span: 'small',
  },
  {
    title: 'CloudNest Platform',
    category: 'Cloud Infrastructure',
    desc: 'Multi-tenant SaaS platform with auto-scaling infrastructure and 99.99% uptime guarantee.',
    tags: ['AWS', 'Kubernetes', 'Terraform'],
    color: '#004eb5',
    span: 'small',
  },
  {
    title: 'InsightAI Analytics',
    category: 'AI / Machine Learning',
    desc: 'Predictive analytics engine processing 2M+ data points daily for e-commerce personalization.',
    tags: ['Python', 'TensorFlow', 'BigQuery', 'GCP'],
    color: '#6200ee',
    span: 'large',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="section"
      style={{ background: 'var(--surface-dim)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}
        >
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Our Work</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Projects That <span className="gradient-text">Speak</span> for Themselves
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--on-surface-variant)',
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            A showcase of our recent work across industries — from fintech to healthcare, cloud to AI.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-5)',
        }}
          className="portfolio-grid"
        >
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: 'var(--space-8)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                gridColumn: proj.span === 'large' ? 'span 1' : 'span 1',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Color accent bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${proj.color}, transparent)`,
              }} />

              {/* Ambient glow */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: proj.color,
                opacity: 0.03,
                filter: 'blur(50px)',
                pointerEvents: 'none',
              }} />

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'var(--space-4)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: proj.color,
                  }}>
                    {proj.category}
                  </span>
                  <ExternalLink size={16} style={{ color: 'var(--outline)', opacity: 0.4 }} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  color: 'var(--on-surface)',
                  marginBottom: 'var(--space-3)',
                }}>
                  {proj.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'var(--on-surface-variant)',
                  marginBottom: 'var(--space-5)',
                }}>
                  {proj.desc}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(98, 0, 238, 0.05)',
                      border: '1px solid rgba(98, 0, 238, 0.1)',
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
