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
    }}>
      <div className="glass-card" style={{
        padding: 'var(--space-10)',
        width: '100%',
        maxWidth: '420px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--on-surface)',
            marginBottom: 'var(--space-3)',
          }}>
            <Zap size={22} style={{ color: 'var(--primary)' }} />
            Prodivity Admin
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
            Sign in to manage your dashboard
          </p>
        </div>

        {error && (
          <div style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'rgba(186,26,26,0.08)',
            border: '1px solid rgba(186,26,26,0.2)',
            borderRadius: 'var(--radius-md)',
            color: '#ba1a1a',
            fontSize: '0.85rem',
            marginBottom: 'var(--space-5)',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-2)' }}>
              Email
            </label>
            <input
              type="email"
              className="input-terminal"
              placeholder="admin@prodivity.tech"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-2)' }}>
              Password
            </label>
            <input
              type="password"
              className="input-terminal"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : <><LogIn size={16} /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
