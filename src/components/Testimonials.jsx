import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, FinFlow Inc.',
    quote: 'Prodivity Technologies transformed our legacy platform into a modern, scalable solution. Their team\'s technical depth and proactive communication made the entire process seamless.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Founder, MedSync Health',
    quote: 'From concept to App Store launch in 14 weeks — the Prodivity team delivered beyond our expectations. The app now serves over 100,000 healthcare professionals daily.',
    rating: 5,
  },
  {
    name: 'Elena Kowalski',
    role: 'VP Engineering, CloudNest',
    quote: 'Their cloud architecture expertise cut our infrastructure costs by 40% while improving our uptime to 99.99%. A truly world-class engineering partner.',
    rating: 5,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="section"
      style={{ background: 'var(--surface-lowest)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}
        >
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Testimonials</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--on-surface-variant)',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            Hear what our clients say about working with us.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
                position: 'relative',
              }}
            >
              {/* Quote icon */}
              <Quote size={28} style={{
                color: 'var(--primary)',
                opacity: 0.15,
                position: 'absolute',
                top: 'var(--space-6)',
                right: 'var(--space-6)',
              }} />

              {/* Stars */}
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={16}
                    fill={si < t.rating ? '#facc15' : 'transparent'}
                    style={{ color: si < t.rating ? '#facc15' : 'var(--outline-variant)' }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.75,
                color: 'var(--on-surface-variant)',
                fontStyle: 'italic',
                flex: 1,
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                {/* Avatar */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--tertiary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--on-surface)',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--outline)',
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
