import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

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

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate(adminPath('/'));
  };

  const links = [
    { label: 'Dashboard', path: adminPath('/dashboard') },
    { label: 'Contacts', path: adminPath('/contacts') },
    { label: 'Projects', path: adminPath('/projects') },
  ];

  return (
    <nav style={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(203,196,209,0.3)',
      padding: '0 var(--space-6)',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--on-surface)' }}>
          ⚡ Admin Panel
        </span>
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              textDecoration: 'none',
              color: active === link.label ? 'var(--primary)' : 'var(--on-surface-variant)',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--outline)' }}>{adminUser.email}</span>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            background: 'none', border: 'none', color: 'var(--error)',
            cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
          }}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
