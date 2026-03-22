import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
];

const growthData = [
  { month: 'Jan', revenue: 32, projects: 8 },
  { month: 'Feb', revenue: 40, projects: 12 },
  { month: 'Mar', revenue: 45, projects: 10 },
  { month: 'Apr', revenue: 55, projects: 15 },
  { month: 'May', revenue: 62, projects: 18 },
  { month: 'Jun', revenue: 58, projects: 14 },
  { month: 'Jul', revenue: 72, projects: 20 },
  { month: 'Aug', revenue: 80, projects: 22 },
  { month: 'Sep', revenue: 88, projects: 25 },
  { month: 'Oct', revenue: 95, projects: 28 },
  { month: 'Nov', revenue: 105, projects: 30 },
  { month: 'Dec', revenue: 120, projects: 35 },
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
            {p.name}: {p.name === 'Revenue' ? `$${p.value}k` : p.value}
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
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(98, 0, 238, 0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Cyan orb */}
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 104, 116, 0.05) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animationDelay: '-2s',
          }}
        />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(98, 0, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 0, 238, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Floating shapes */}
        <div className="animate-float" style={{
          position: 'absolute', top: '25%', left: '8%',
          width: '60px', height: '60px',
          border: '1px solid rgba(98, 0, 238, 0.08)',
          borderRadius: 'var(--radius-lg)',
          transform: 'rotate(45deg)',
          animationDelay: '-1s',
        }} />
        <div className="animate-float" style={{
          position: 'absolute', top: '60%', right: '12%',
          width: '40px', height: '40px',
          border: '1px solid rgba(0, 104, 116, 0.08)',
          borderRadius: '50%',
          animationDelay: '-3s',
        }} />
        <div className="animate-float" style={{
          position: 'absolute', top: '15%', left: '45%',
          width: '20px', height: '20px',
          background: 'rgba(98, 0, 238, 0.08)',
          borderRadius: '50%',
          animationDelay: '-4s',
        }} />
      </div>

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: '120px',
        paddingBottom: '60px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ maxWidth: '800px' }}
        >
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="overline"
            style={{ marginBottom: 'var(--space-4)' }}
          >
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--primary)',
              marginRight: '0.5rem',
              animation: 'data-pulse 2s ease-in-out infinite',
            }} />
            Digital Products Agency
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              lineHeight: 1.08,
              marginBottom: 'var(--space-6)',
            }}
          >
            We Build Digital Products{' '}
            <span className="gradient-text">
              That Drive Growth
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'var(--on-surface-variant)',
              maxWidth: '600px',
              marginBottom: 'var(--space-8)',
            }}
          >
            Comprehensive digital transformation services tailored for modern enterprises
            and startups looking to scale. From concept to deployment, we turn your vision into reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
          >
            <a href="#contact" className="btn-primary" style={{
              padding: '0.875rem 2rem',
              fontSize: '0.95rem',
            }}>
              Get Started <ArrowRight size={18} />
            </a>
            <a href="#portfolio" className="btn-secondary" style={{
              padding: '0.875rem 2rem',
              fontSize: '0.95rem',
            }}>
              <Play size={16} /> View Our Work
            </a>
          </motion.div>
        </motion.div>

        {/* Growth Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          style={{
            marginTop: 'var(--space-10)',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 'var(--space-5)',
          }}
          className="hero-charts"
        >
          {/* Revenue Area Chart */}
          <div className="glass-card" style={{ padding: 'var(--space-6)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.25rem' }}>Revenue Growth</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--on-surface)' }}>$120k <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#16a34a' }}>↑ 275%</span></h3>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--outline)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'rgba(98,0,238,0.05)', border: '1px solid rgba(98,0,238,0.1)' }}>2024</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6200ee" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#6200ee" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,196,209,0.3)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6200ee" strokeWidth={2.5} fill="url(#purpleGradient)" dot={false} activeDot={{ r: 5, fill: '#6200ee', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Projects Bar Chart */}
          <div className="glass-card" style={{ padding: 'var(--space-6)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.25rem' }}>Projects Completed</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--on-surface)' }}>237 <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#16a34a' }}>↑ 58%</span></h3>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--outline)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'rgba(0,104,116,0.05)', border: '1px solid rgba(0,104,116,0.1)' }}>2024</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={growthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,196,209,0.3)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="projects" name="Projects" fill="#006874" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            marginTop: 'var(--space-10)',
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
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--on-surface)',
                letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--outline)',
                marginTop: '0.25rem',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to top, var(--surface-low), transparent)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 768px) {
          .hero-charts {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
