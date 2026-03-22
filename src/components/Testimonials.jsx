import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import API_BASE from '../config';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px', marginBottom: 'var(--space-4)' }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} size={14} fill={n <= rating ? '#f59e0b' : 'none'} stroke={n <= rating ? '#f59e0b' : '#ccc'} />
    ))}
  </div>
);

// Fallback avatar initials
const Avatar = ({ name, avatarUrl }) => {
  const initials = name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#6200ee', '#006874', '#004eb5', '#9c27b0', '#0097a7'];
  const color = colors[name?.charCodeAt(0) % colors.length] || '#6200ee';

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        onError={(e) => { e.target.style.display = 'none'; }}
        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(98,0,238,0.1)' }}
      />
    );
  }
  return (
    <div style={{
      width: '48px', height: '48px', borderRadius: '50%',
      background: color, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem',
      fontFamily: 'var(--font-display)',
    }}>
      {initials}
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/testimonials`)
      .then((r) => r.json())
      .then((data) => setTestimonials(data.testimonials || []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="testimonials" className="section" style={{ background: 'var(--surface-lowest)' }}>
      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Client Feedback</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto' }}>
            Real feedback from real clients who trusted us to build their vision.
          </p>
        </motion.div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card" style={{ height: '200px', opacity: 0.4 }} />
            ))}
          </div>
        )}

        {!loading && testimonials.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--outline)' }}>No testimonials yet — add them from the admin panel.</p>
        )}

        {!loading && testimonials.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t._id}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* Quote mark */}
                  <div style={{ fontSize: '3rem', lineHeight: 0.8, color: 'var(--primary)', opacity: 0.12, fontFamily: 'Georgia, serif', marginBottom: 'var(--space-3)' }}>"</div>
                  <Stars rating={t.rating || 5} />
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--on-surface-variant)', fontStyle: 'italic', marginBottom: 'var(--space-6)' }}>
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Avatar name={t.name} avatarUrl={t.avatarUrl} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--on-surface)', fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>
                      {t.role}{t.company ? ` · ${t.company}` : ''}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
