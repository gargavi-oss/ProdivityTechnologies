import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Users, FolderOpen, MessageSquare, LogOut, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API_BASE from '../../config';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.clear(); navigate('/admin'); return; }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-dim)' }}>
        <p style={{ color: 'var(--on-surface-variant)' }}>Loading dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || {};

  const statCards = [
    { label: 'Total Leads', value: stats.totalContacts || 0, icon: MessageSquare, color: '#6200ee' },
    { label: 'New Leads', value: stats.newContacts || 0, icon: TrendingUp, color: '#16a34a' },
    { label: 'Total Projects', value: stats.totalProjects || 0, icon: FolderOpen, color: '#006874' },
    { label: 'Active Projects', value: stats.activeProjects || 0, icon: BarChart3, color: '#004eb5' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      {/* Admin Nav */}
      <nav style={{
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(203,196,209,0.3)', padding: '0 var(--space-6)', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--on-surface)' }}>
            ⚡ Admin Panel
          </span>
          <Link to="/admin/dashboard" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--primary)', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/admin/contacts" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Contacts</Link>
          <Link to="/admin/projects" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Projects</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--outline)' }}>{adminUser.email}</span>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none',
            color: 'var(--error)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
          }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: 'var(--space-8)' }}>
          Welcome back, {adminUser.name || 'Admin'}
        </h1>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
          {statCards.map((s) => (
            <div key={s.label} className="glass-card" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', background: `${s.color}0d`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={20} style={{ color: s.color }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-5)' }} className="dashboard-grid">
          {/* Leads Chart */}
          <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: 'var(--space-5)' }}>
              Leads Over Time
            </h3>
            {data?.leadsChart?.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.leadsChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,196,209,0.3)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#7a757f' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#6200ee" radius={[4, 4, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--outline)', textAlign: 'center', padding: 'var(--space-10) 0' }}>No data yet</p>
            )}
          </div>

          {/* Recent Contacts */}
          <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)' }}>Recent Leads</h3>
              <Link to="/admin/contacts" style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'none' }}>View all →</Link>
            </div>
            {data?.recentContacts?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {data.recentContacts.slice(0, 6).map((c) => (
                  <div key={c._id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.4)',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--on-surface)' }}>{c.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>{c.email}</div>
                    </div>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                      padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)',
                      background: c.status === 'new' ? 'rgba(22,163,74,0.1)' : 'rgba(98,0,238,0.06)',
                      color: c.status === 'new' ? '#16a34a' : 'var(--primary)',
                    }}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--outline)', textAlign: 'center', padding: 'var(--space-8) 0' }}>No contacts yet</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
