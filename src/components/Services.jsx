import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Palette, Cloud, Brain, Shield } from 'lucide-react';
import API_BASE from '../config';

const SERVICE_ICONS = {
  'Web Development': Globe,
  'Mobile App Development': Smartphone,
  'UI/UX Design': Palette,
  'Cloud Solutions': Cloud,
  'AI Solutions': Brain,
  'Cybersecurity': Shield,
};

const ACCENT_COLORS = [
  { bg: 'rgba(139, 92, 246, 0.08)', border: 'rgba(139, 92, 246, 0.15)', color: 'var(--primary-bright)' },
  { bg: 'rgba(34, 211, 238, 0.08)', border: 'rgba(34, 211, 238, 0.12)', color: 'var(--secondary)' },
  { bg: 'rgba(244, 114, 182, 0.08)', border: 'rgba(244, 114, 182, 0.12)', color: 'var(--tertiary)' },
  { bg: 'rgba(139, 92, 246, 0.08)', border: 'rgba(139, 92, 246, 0.15)', color: 'var(--primary)' },
  { bg: 'rgba(34, 211, 238, 0.08)', border: 'rgba(34, 211, 238, 0.12)', color: 'var(--secondary)' },
  { bg: 'rgba(244, 114, 182, 0.08)', border: 'rgba(244, 114, 182, 0.12)', color: 'var(--tertiary)' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((r) => r.json())
      .then((data) => setServices(data.services || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="section" style={{ background: 'var(--surface-dim)' }}>
      <div className="container">
        {/* Header — asymmetric layout */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-8)',
            alignItems: 'end',
            marginBottom: 'var(--space-16)',
          }}
          className="services-header"
        >
          <div>
            <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>What We Do</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              Services That <span className="gradient-text">Transform</span> Your Business
            </h2>
          </div>
          <p style={{
            fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface-variant)',
            maxWidth: '440px', justifySelf: 'end',
          }}>
            From concept to deployment, we deliver end-to-end solutions
            engineered for performance, security, and scale.
          </p>
        </motion.div>

        {/* Loading skeleton — per UX guidelines: show skeleton or spinner for operations >300ms */}
        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-5)',
          }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass-card animate-pulse-glow"
                style={{ height: '220px', opacity: 0.3 }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        {/* Cards Grid */}
        {!loading && services.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-5)',
          }}>
            {services.map((svc, i) => {
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
              const IconComp = SERVICE_ICONS[svc.title] || Globe;
              return (
                <motion.div
                  key={svc._id}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card"
                  style={{
                    padding: 'var(--space-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-5)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${accent.color}, transparent)`,
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-lg)',
                    background: accent.bg,
                    border: `1px solid ${accent.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}>
                    <IconComp size={22} style={{ color: accent.color }} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--on-surface)',
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.75,
                    color: 'var(--on-surface-variant)',
                    flexGrow: 1,
                  }}>
                    {svc.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && services.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--outline)' }}>
            No services listed yet — add them from the admin panel.
          </p>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;
