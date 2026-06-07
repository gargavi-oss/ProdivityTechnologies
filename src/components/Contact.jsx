import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import API_BASE from '../config';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const PROJECT_CATEGORIES = [
  'Web Application',
  'Mobile App',
  'E-Commerce',
  'AI / Machine Learning',
  'Cloud & DevOps',
  'UI/UX Design',
  'API Development',
  'Other',
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    projectBase: '',
    message: '',
  });
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
      setFormData({ name: '', email: '', category: '', projectBase: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    background: 'rgba(12, 12, 20, 0.5)',
    border: '1px solid var(--outline-variant)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem',
    color: 'var(--on-surface)',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 500,
    color: 'var(--on-surface-variant)',
    marginBottom: 'var(--space-2)',
    letterSpacing: '0.02em',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--primary)';
    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.12)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--outline-variant)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ background: 'var(--surface-dim)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Get In Touch</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Let&apos;s Build Something <span className="gradient-text">Amazing</span> Together
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-8)', maxWidth: '960px', margin: '0 auto' }} className="contact-grid">
          {/* Form */}
          <motion.form
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-card"
            style={{ padding: 'var(--space-8)' }}
            noValidate
          >
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }} className="form-row">
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Full Name *</label>
                <input id="contact-name" type="text" style={inputStyle} placeholder="John Doe"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                  onFocus={handleFocus} onBlur={handleBlur}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
                <input id="contact-email" type="email" style={inputStyle} placeholder="john@company.com"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                  onFocus={handleFocus} onBlur={handleBlur}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label htmlFor="contact-category" style={labelStyle}>Project Category</label>
              <select id="contact-category" style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                onFocus={handleFocus} onBlur={handleBlur}
              >
                <option value="">Select what you want to build...</option>
                {PROJECT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Row 3 */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label htmlFor="contact-scope" style={labelStyle}>Project Scope & Budget</label>
              <input id="contact-scope" type="text" style={inputStyle}
                placeholder="e.g. MVP in 2 months, budget ~$5k, need auth + dashboard"
                value={formData.projectBase}
                onChange={(e) => setFormData({ ...formData, projectBase: e.target.value })}
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </div>

            {/* Row 4 */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label htmlFor="contact-message" style={labelStyle}>Describe Your Project *</label>
              <textarea id="contact-message" style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                placeholder="Tell us more about your idea, goals, or any specific requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })} required
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </div>

            {/* Error message near the form — per UX guidelines */}
            {error && (
              <div role="alert" style={{
                marginBottom: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)',
                background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.2)',
                borderRadius: 'var(--radius-md)', color: 'var(--error)', fontSize: '0.85rem',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: '100%', justifyContent: 'center', padding: '0.9rem',
                opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? (
                <>Sending...</>
              ) : submitted ? (
                <>✓ Message Sent! We'll be in touch.</>
              ) : (
                <><Send size={16} aria-hidden="true" /> Send Message</>
              )}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', justifyContent: 'center' }}
          >
            {[
              { icon: Mail, label: 'Email Us', value: 'info.prodivity@gmail.com', href: 'mailto:info.prodivity@gmail.com' },
              { icon: Phone, label: 'Call Us', value: '+91 7404648978', href: 'tel:+917404648978' },
              { icon: MapPin, label: 'Based In', value: 'Jagadhri, Yamunaagar, Haryana, India', href: '#' },
            ].map((item, i) => (
              <a key={i} href={item.href} className="glass-card" style={{
                padding: 'var(--space-6)', display: 'flex', alignItems: 'center',
                gap: 'var(--space-4)', textDecoration: 'none', cursor: 'pointer',
              }}>
                <div style={{
                  width: '48px', height: '48px', minWidth: '48px', borderRadius: 'var(--radius-lg)',
                  background: 'rgba(139, 92, 246, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.icon size={20} style={{ color: 'var(--primary-bright)' }} aria-hidden="true" />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 600, color: 'var(--outline)',
                    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem',
                  }}>{item.label}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--on-surface)' }}>{item.value}</div>
                </div>
              </a>
            ))}

            {/* What happens next */}
            <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
              <div style={{
                fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-bright)',
                textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 'var(--space-4)',
              }}>What Happens Next?</div>
              {['We review your request within 24 hrs', 'Discovery call to understand your needs', 'Proposal with timeline & pricing', 'Kickoff — let\'s build!'].map((step, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
                  marginBottom: i < 3 ? 'var(--space-3)' : 0,
                }}>
                  <div style={{
                    width: '20px', height: '20px', minWidth: '20px', borderRadius: '50%',
                    background: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary-bright)',
                  }}>{i + 1}</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
