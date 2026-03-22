import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const stats = [
  { value: '4+', label: 'Projects Delivered' },
  { value: '3+', label: 'Happy Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
];

const growthData = [
  { month: 'Jan', projects: 0 },
  { month: 'Feb', projects: 2 },
  { month: 'Mar', projects: 2 },
 
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(98,0,238,0.12)',
        borderRadius: 'var(--radius-md)',
        padding: '0.6rem 0.85rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.8rem', color: 'var(--on-surface)', marginBottom: '0.25rem' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ fontSize: '0.75rem', color: p.color, margin: 0 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Hero = () => {
  return (
    <section
      id="home"
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
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="animate-float" style={{
          position: 'absolute', top: '10%', right: '15%', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(98, 0, 238, 0.06) 0%, transparent 70%)', filter: 'blur(60px)',
        }} />
        <div className="animate-float" style={{
          position: 'absolute', bottom: '20%', left: '10%', width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 104, 116, 0.05) 0%, transparent 70%)', filter: 'blur(50px)', animationDelay: '-2s',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(98, 0, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(98, 0, 238, 0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="animate-float" style={{
          position: 'absolute', top: '25%', left: '8%', width: '60px', height: '60px',
          border: '1px solid rgba(98, 0, 238, 0.08)', borderRadius: 'var(--radius-lg)', transform: 'rotate(45deg)', animationDelay: '-1s',
        }} />
        <div className="animate-float" style={{
          position: 'absolute', top: '60%', right: '12%', width: '40px', height: '40px',
          border: '1px solid rgba(0, 104, 116, 0.08)', borderRadius: '50%', animationDelay: '-3s',
        }} />
      </div>

      {/* Content — Two Column: Text Left, Chart Right */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: '120px',
        paddingBottom: '60px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)',
          alignItems: 'center',
        }} className="hero-grid">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="overline"
              style={{ marginBottom: 'var(--space-4)' }}
            >
              <span style={{
                display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--primary)', marginRight: '0.5rem', animation: 'data-pulse 2s ease-in-out infinite',
              }} />
              Digital Products Agency
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', lineHeight: 1.08, marginBottom: 'var(--space-6)' }}
            >
              We Build Digital Products{' '}
              <span className="gradient-text">That Drive Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--on-surface-variant)', maxWidth: '520px', marginBottom: 'var(--space-8)' }}
            >
              Comprehensive digital transformation services tailored for modern enterprises
              and startups looking to scale. From concept to deployment, we turn your vision into reality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
            >
              <a href="#contact" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '0.95rem' }}>
                Get Started <ArrowRight size={18} />
              </a>
              <a href="#portfolio" className="btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '0.95rem' }}>
                <Play size={16} /> View Our Work
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Projects Completed Chart */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="glass-card" style={{ padding: 'var(--space-6)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.25rem' }}>Projects Completed</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>
                    4 <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#16a34a' }}>↑ 58%</span>
                  </h3>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--outline)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'rgba(0,104,116,0.05)', border: '1px solid rgba(0,104,116,0.1)' }}>2024</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={growthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,196,209,0.3)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="projects" name="Projects" fill="#006874" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            marginTop: 'var(--space-12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--space-4)',
            maxWidth: '700px',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
              style={{
                padding: 'var(--space-4)',
                borderLeft: '2px solid',
                borderImage: 'linear-gradient(to bottom, var(--primary), transparent) 1',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
                color: 'var(--on-surface)', letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--outline)', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(to top, var(--surface-low), transparent)', pointerEvents: 'none',
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
