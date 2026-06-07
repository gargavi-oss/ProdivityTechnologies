import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, FolderOpen, MessageSquare, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API_BASE from '../../config';
import AdminNav, { adminPath } from './AdminNav';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  useEffect(() => {
    if (!token) { navigate(adminPath('/')); return; }
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.clear(); navigate(adminPath('/')); return; }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-dim)' }}>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>Loading dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || {};

  const statCards = [
    { label: 'Total Leads', value: stats.totalContacts || 0, icon: MessageSquare, color: '#8B5CF6' },
    { label: 'New Leads', value: stats.newContacts || 0, icon: TrendingUp, color: '#22D3EE' },
    { label: 'Total Projects', value: stats.totalProjects || 0, icon: FolderOpen, color: '#F472B6' },
    { label: 'Active Projects', value: stats.activeProjects || 0, icon: BarChart3, color: '#A78BFA' },
  ];

  const chartTooltipStyle = {
    backgroundColor: 'rgba(24, 24, 38, 0.95)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    borderRadius: '8px',
    color: '#e8e6f0',
    fontSize: '0.8rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      <AdminNav active="Dashboard" />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
          color: 'var(--on-surface)', marginBottom: 'var(--space-2)',
        }}>
          Welcome back, {adminUser.name || 'Admin'}
        </h1>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.88rem', marginBottom: 'var(--space-8)' }}>
          Here&apos;s what&apos;s happening with your business today.
        </p>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
          {statCards.map((s) => (
            <div key={s.label} className="glass-card" style={{ padding: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: 'var(--radius-lg)',
                background: `${s.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={20} style={{ color: s.color }} aria-hidden="true" />
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
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600,
              color: 'var(--on-surface)', marginBottom: 'var(--space-5)',
            }}>Leads Over Time</h3>
            {data?.leadsChart?.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.leadsChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.08)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a7590' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#7a7590' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="leads" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={28} />
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
              <a href={adminPath('/contacts')} style={{ fontSize: '0.75rem', color: 'var(--primary-bright)', textDecoration: 'none', cursor: 'pointer' }}>View all →</a>
            </div>
            {data?.recentContacts?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {data.recentContacts.slice(0, 6).map((c) => (
                  <div key={c._id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                    background: 'rgba(139, 92, 246, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.03)',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--on-surface)' }}>{c.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>{c.email}</div>
                    </div>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                      padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)',
                      background: c.status === 'new' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(139, 92, 246, 0.08)',
                      color: c.status === 'new' ? '#22D3EE' : 'var(--primary-bright)',
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
