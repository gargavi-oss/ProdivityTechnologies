import React from 'react';
import { motion } from 'motion/react';
import { Code, Smartphone, Palette, Cloud, Brain, Shield } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    desc: 'Custom web applications built with React, Next.js, and cutting-edge frameworks. Fast, scalable, and pixel-perfect.',
    accent: '#6200ee',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.',
    accent: '#006874',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'User research, wireframing, and prototyping to create intuitive interfaces that users love.',
    accent: '#004eb5',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'AWS, GCP, and Azure infrastructure with DevOps automation for reliable, scalable deployments.',
    accent: '#6200ee',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    desc: 'Intelligent automation, data analytics, and custom ML models to unlock actionable business insights.',
    accent: '#006874',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    desc: 'Security audits, penetration testing, and compliance solutions to protect your digital assets.',
    accent: '#004eb5',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Services = () => {
  return (
    <section
      id="services"
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
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>What We Do</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Services That <span className="gradient-text">Accelerate</span> Your Business
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--on-surface-variant)',
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            End-to-end digital solutions designed to transform your ideas into
            powerful, market-ready products.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card"
              style={{
                padding: 'var(--space-8)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent glow */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: svc.accent,
                opacity: 0.04,
                filter: 'blur(40px)',
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-lg)',
                background: `${svc.accent}0d`,
                border: `1px solid ${svc.accent}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)',
              }}>
                <svc.icon size={22} style={{ color: svc.accent }} />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: 'var(--space-3)',
                color: 'var(--on-surface)',
              }}>
                {svc.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'var(--on-surface-variant)',
              }}>
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
