import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import API_BASE from '../config';

const DEFAULT_STATS = [
  { value: '4+', label: 'Projects Delivered' },
  { value: '3+', label: 'Happy Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
];

const Hero = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    fetch(`${API_BASE}/settings`)
      .then((r) => r.json())
      .then((data) => {
        const s = data.settings || [];
        if (s.length > 0) {
          setStats(DEFAULT_STATS.map((def) => {
            const key = 'stat_' + def.label.toLowerCase().replace(/[^a-z]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
            const found = s.find((x) =>
              x.label === def.label ||
              x.key === key ||
              x.key.includes(def.label.toLowerCase().split(' ')[0])
            );
            return found ? { ...def, value: found.value } : def;
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="home"
      className="noise-overlay"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--surface-lowest)',
      }}
    >
      {/* Background — Aurora Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Primary purple aurora */}
        <div style={{
          position: 'absolute', top: '8%', right: '15%', width: '550px', height: '550px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.09) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }} />
        {/* Secondary cyan aurora */}
        <div style={{
          position: 'absolute', bottom: '15%', left: '5%', width: '450px', height: '450px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, transparent 60%)',
          filter: 'blur(70px)',
        }} />
        {/* Tertiary rose aurora */}
        <div style={{
          position: 'absolute', top: '55%', right: '5%', width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }} />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.018) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: '140px',
        paddingBottom: '80px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }} className="hero-grid">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="overline"
              style={{ marginBottom: 'var(--space-5)' }}
            >
              <span style={{
                display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--primary)', marginRight: '0.6rem',
                animation: 'data-pulse 2s ease-in-out infinite',
              }} />
              Digital Products Agency
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                marginBottom: 'var(--space-6)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
              }}
            >
              We Build Digital
              <br />
              Products{' '}
              <span className="gradient-text">That Drive Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--on-surface-variant)',
                maxWidth: '480px',
                marginBottom: 'var(--space-10)',
              }}
            >
              Comprehensive digital transformation services tailored for modern enterprises
              and startups looking to scale. From concept to deployment, we turn your vision into reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
            >
              <a href="#contact" className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem', cursor: 'pointer' }}>
                Get Started <ArrowRight size={18} />
              </a>
              <a href="#portfolio" className="btn-secondary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem', cursor: 'pointer' }}>
                <Play size={16} /> View Our Work
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Abstract Premium Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              height: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Central glowing orb */}
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(139, 92, 246, 0.03) 45%, transparent 65%)',
              filter: 'blur(2px)',
            }} />

            {/* Orbital rings */}
            {[270, 210, 145].map((size, i) => (
              <div
                key={size}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  border: `1px solid rgba(139, 92, 246, ${0.06 + i * 0.04})`,
                  animation: `float ${7 + i * 2.5}s ease-in-out infinite`,
                  animationDelay: `${-i * 1.5}s`,
                }}
              />
            ))}

            {/* Center element — Purple crystal */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-bright), var(--secondary))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 5s ease infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 80px rgba(139, 92, 246, 0.25), 0 0 160px rgba(139, 92, 246, 0.06)',
                transform: 'rotate(45deg)',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(8, 8, 13, 0.35)',
                backdropFilter: 'blur(8px)',
              }} />
            </motion.div>

            {/* Floating accent dots */}
            {[
              { top: '18%', left: '22%', size: 6, color: 'var(--primary-bright)', delay: '-1s' },
              { top: '72%', left: '25%', size: 4, color: 'var(--secondary)', delay: '-3s' },
              { top: '20%', right: '18%', size: 7, color: 'var(--primary)', delay: '-2s' },
              { top: '68%', right: '22%', size: 5, color: 'var(--tertiary)', delay: '-4s' },
              { top: '45%', left: '10%', size: 3, color: 'var(--primary-bright)', delay: '-0.5s' },
              { top: '50%', right: '8%', size: 4, color: 'var(--secondary)', delay: '-2.5s' },
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
                  opacity: 0.45,
                  animationDelay: dot.delay,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          style={{
            marginTop: 'var(--space-16)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--space-6)',
            maxWidth: '700px',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.1, duration: 0.4 }}
              style={{
                padding: 'var(--space-4)',
                borderLeft: '2px solid',
                borderImage: 'linear-gradient(to bottom, var(--primary), transparent) 1',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800,
                color: 'var(--on-surface)', letterSpacing: '-0.03em',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--outline)', marginTop: '0.3rem', letterSpacing: '0.02em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px',
        background: 'linear-gradient(to top, var(--surface-dim), transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
