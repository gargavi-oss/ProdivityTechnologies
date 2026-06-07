import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Cloud Solutions',
  'AI & Machine Learning',
  'Cybersecurity',
];

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/prodivitytechnologies/?viewAsMember=true', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--surface-lowest)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
      }}
    >
      {/* Purple Gradient Divider */}
      <div className="gradient-divider" style={{ marginBottom: 'var(--space-16)' }} />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'var(--space-8)',
          }}
          className="footer-grid"
        >
          {/* Company Info */}
          <div>
            <a href="#home" aria-label="Prodivity Technologies — Home" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--on-surface)',
              textDecoration: 'none',
              marginBottom: 'var(--space-4)',
            }}>
              <img
                src="logo.png"
                alt="Prodivity Technologies"
                style={{ height: '65px', width: 'auto', display: 'block' }}
              />
            </a>
            <p style={{
              fontSize: '0.875rem',
              lineHeight: 1.75,
              color: 'var(--on-surface-variant)',
              maxWidth: '300px',
              marginBottom: 'var(--space-5)',
            }}>
              Building exceptional digital products that drive growth for forward-thinking
              companies worldwide.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`Follow us on ${s.label}`}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-high)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--on-surface-variant)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--on-primary)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--surface-high)';
                    e.currentTarget.style.color = 'var(--on-surface-variant)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <s.icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--on-surface)',
              marginBottom: 'var(--space-4)',
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--on-surface-variant)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-bright)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--on-surface-variant)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--on-surface)',
              marginBottom: 'var(--space-4)',
            }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {serviceLinks.map((svc) => (
                <a
                  key={svc}
                  href="#services"
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--on-surface-variant)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-bright)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--on-surface-variant)'}
                >
                  {svc}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--on-surface)',
              marginBottom: 'var(--space-4)',
            }}>
              Contact
            </h4>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <a href="mailto:info.prodivity@gmail.com" style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-bright)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--on-surface-variant)'}
              >
                info.prodivity@gmail.com
              </a>
              <a href="tel:+917404648978" style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-bright)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--on-surface-variant)'}
              >
                +91 74046 48978
              </a>
              <span style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                Jagadhri, Yamunaagar, Haryana, India
              </span>
            </address>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div className="gradient-divider" style={{ margin: 'var(--space-10) 0 var(--space-6)' }} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--outline)' }}>
            © {year} Prodivity Technologies. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--outline)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-bright)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--outline)'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
