import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import API_BASE from '../config';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        background: 'var(--surface-dim)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(98, 0, 238, 0.04) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}
        >
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Get In Touch</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Amazing</span> Together
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--on-surface-variant)',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            Ready to start your next project? Drop us a line and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-8)',
            maxWidth: '900px',
            margin: '0 auto',
          }}
          className="contact-grid"
        >
          {/* Form */}
          <motion.form
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-card"
            style={{ padding: 'var(--space-8)' }}
          >
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--on-surface-variant)',
                marginBottom: 'var(--space-2)',
              }}>
                Full Name
              </label>
              <input
                type="text"
                className="input-terminal"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--on-surface-variant)',
                marginBottom: 'var(--space-2)',
              }}>
                Email Address
              </label>
              <input
                type="email"
                className="input-terminal"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--on-surface-variant)',
                marginBottom: 'var(--space-2)',
              }}>
                Your Message
              </label>
              <textarea
                className="input-terminal"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Sending...' : submitted ? '✓ Message Sent!' : error ? '✗ ' + error : <><Send size={16} /> Send Message</>}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', justifyContent: 'center' }}
          >
            {[
              { icon: Mail, label: 'Email Us', value: 'hello@prodivity.tech', href: 'mailto:hello@prodivity.tech' },
              { icon: Phone, label: 'Call Us', value: '+1 (555) 234-5678', href: 'tel:+15552345678' },
              { icon: MapPin, label: 'Visit Us', value: 'San Francisco, CA 94107', href: '#' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="glass-card"
                style={{
                  padding: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  minWidth: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(98, 0, 238, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <item.icon size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--outline)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.25rem',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--on-surface)',
                  }}>
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
