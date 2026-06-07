import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, MessageSquare, FolderOpen, Star, Users, Settings, Menu, X } from 'lucide-react';

// Detect admin mode — env var (Vercel) or admin.* subdomain (custom domain)
export const isAdminDomain = () => {
  if (import.meta.env.VITE_ADMIN_MODE === 'true') return true;
  const host = window.location.hostname;
  return host.startsWith('admin.') || host.startsWith('admin-');
};

// Returns the correct path prefix — '' on admin subdomain, '/admin' on main domain
export const adminPath = (path) => {
  const prefix = isAdminDomain() ? '' : '/admin';
  return `${prefix}${path}`;
};

const AdminNav = ({ active }) => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate(adminPath('/'));
  };

  const links = [
    { label: 'Dashboard', path: adminPath('/dashboard'), icon: LayoutDashboard },
    { label: 'Contacts', path: adminPath('/contacts'), icon: MessageSquare },
    { label: 'Projects', path: adminPath('/projects'), icon: FolderOpen },
    { label: 'Testimonials', path: adminPath('/testimonials'), icon: Star },
    { label: 'Team', path: adminPath('/team'), icon: Users },
    { label: 'Settings', path: adminPath('/settings'), icon: Settings },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Admin navigation"
      style={{
        background: 'rgba(12, 12, 20, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.08)',
        padding: '0 var(--space-6)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
          color: 'var(--on-surface)', display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{
            width: '28px', height: '28px', borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontWeight: 800, color: 'white',
          }}>P</span>
          Admin
        </span>

        {/* Desktop Nav Links */}
        <div className="admin-nav-links" style={{ display: 'flex', gap: 'var(--space-1)' }}>
          {links.map((link) => {
            const isActive = active === link.label;
            return (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  padding: '0.4rem 0.7rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: isActive ? 'var(--primary-bright)' : 'var(--on-surface-variant)',
                  background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                }}
              >
                <link.icon size={14} aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--outline)' }}>{adminUser.email}</span>
        <button
          onClick={handleLogout}
          aria-label="Logout"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            background: 'rgba(248, 113, 113, 0.08)',
            border: '1px solid rgba(248, 113, 113, 0.15)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--error)',
            cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500,
            padding: '0.35rem 0.7rem',
            transition: 'all 0.2s ease',
          }}
        >
          <LogOut size={14} aria-hidden="true" /> Logout
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="admin-menu-toggle"
          aria-label="Toggle navigation menu"
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--on-surface)', cursor: 'pointer',
          }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="admin-mobile-menu" style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: 'rgba(12, 12, 20, 0.95)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
          padding: 'var(--space-4)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
        }}>
          {links.map((link) => (
            <Link
              key={link.label} to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none',
                padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: active === link.label ? 'var(--primary-bright)' : 'var(--on-surface-variant)',
                background: active === link.label ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
              }}
            >
              <link.icon size={16} aria-hidden="true" />{link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-nav-links { display: none !important; }
          .admin-menu-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default AdminNav;
