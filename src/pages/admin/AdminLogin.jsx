import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, LogIn } from 'lucide-react';
import API_BASE from '../../config';
import { adminPath } from './AdminNav';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.admin));
      navigate(adminPath('/dashboard'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-dim)',
      padding: 'var(--space-4)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="glass-card" style={{
        padding: 'var(--space-10)',
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700,
            color: 'var(--on-surface)', marginBottom: 'var(--space-3)',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={18} style={{ color: '#fff' }} aria-hidden="true" />
            </div>
            Prodivity Admin
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
            Sign in to manage your dashboard
          </p>
        </div>

        {error && (
          <div role="alert" style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'rgba(248, 113, 113, 0.08)',
            border: '1px solid rgba(248, 113, 113, 0.2)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--error)',
            fontSize: '0.85rem',
            marginBottom: 'var(--space-5)',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <label htmlFor="admin-email" style={{
              display: 'block', fontSize: '0.8rem', fontWeight: 500,
              color: 'var(--on-surface-variant)', marginBottom: 'var(--space-2)',
            }}>Email</label>
            <input
              id="admin-email"
              type="email"
              className="input-terminal"
              placeholder="admin@prodivity.tech"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label htmlFor="admin-password" style={{
              display: 'block', fontSize: '0.8rem', fontWeight: 500,
              color: 'var(--on-surface-variant)', marginBottom: 'var(--space-2)',
            }}>Password</label>
            <input
              id="admin-password"
              type="password"
              className="input-terminal"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%', justifyContent: 'center', padding: '0.875rem',
              opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Signing in...' : <><LogIn size={16} aria-hidden="true" /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
