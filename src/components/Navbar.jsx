import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  {label: 'Team',href: '#team'},
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 1.5rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(203, 196, 209, 0.3)' : '1px solid transparent',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#home" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--on-surface)',
          textDecoration: 'none',
        }}>
          <img src="logo.png" style={{
            width: '30%'
          }} className=' h-12' alt="" />
        
        </a>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--on-surface-variant)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--on-surface-variant)'}
            >
              {link.label}
            </a>
          ))}
        <button
  onClick={() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="btn-primary"
  style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
>
  Get Started
</button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-mobile-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--on-surface)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="nav-mobile-menu"
            style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderBottom: '1px solid rgba(203, 196, 209, 0.3)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--on-surface-variant)',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem' }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS for mobile toggle */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
