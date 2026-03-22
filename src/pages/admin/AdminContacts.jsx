import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Eye } from 'lucide-react';
import API_BASE from '../../config';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchContacts();
  }, [page]);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/contacts?page=${page}&limit=15`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.clear(); navigate('/admin'); return; }
      const data = await res.json();
      setContacts(data.contacts);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchContacts();
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact?')) return;
    await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContacts();
  };

  const handleLogout = () => { localStorage.clear(); navigate('/admin'); };

  const statusColor = (s) => {
    switch (s) {
      case 'new': return { bg: 'rgba(22,163,74,0.1)', color: '#16a34a' };
      case 'read': return { bg: 'rgba(0,78,181,0.08)', color: '#004eb5' };
      case 'responded': return { bg: 'rgba(98,0,238,0.06)', color: '#6200ee' };
      default: return { bg: 'rgba(122,117,127,0.1)', color: '#7a757f' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      <nav style={{
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(203,196,209,0.3)', padding: '0 var(--space-6)', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--on-surface)' }}>⚡ Admin Panel</span>
          <Link to="/admin/dashboard" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/admin/contacts" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--primary)', textDecoration: 'none' }}>Contacts</Link>
          <Link to="/admin/projects" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--on-surface-variant)', textDecoration: 'none' }}>Projects</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--outline)' }}>{adminUser.email}</span>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>
            Contact Leads ({total})
          </h1>
        </div>

        {loading ? (
          <p style={{ color: 'var(--outline)' }}>Loading...</p>
        ) : contacts.length === 0 ? (
          <div className="glass-card" style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
            <p style={{ color: 'var(--outline)', fontSize: '1rem' }}>No contacts yet. They'll appear here when visitors submit the contact form.</p>
          </div>
        ) : (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(203,196,209,0.3)' }}>
                  {['Name', 'Email', 'Message', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: 'var(--space-4)', textAlign: 'left', fontWeight: 600, color: 'var(--on-surface-variant)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => {
                  const sc = statusColor(c.status);
                  return (
                    <tr key={c._id} style={{ borderBottom: '1px solid rgba(203,196,209,0.15)' }}>
                      <td style={{ padding: 'var(--space-4)', fontWeight: 500, color: 'var(--on-surface)' }}>{c.name}</td>
                      <td style={{ padding: 'var(--space-4)', color: 'var(--on-surface-variant)' }}>{c.email}</td>
                      <td style={{ padding: 'var(--space-4)', color: 'var(--on-surface-variant)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                      <td style={{ padding: 'var(--space-4)' }}>
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c._id, e.target.value)}
                          style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.4rem', borderRadius: 'var(--radius-sm)', background: sc.bg, color: sc.color, border: 'none', cursor: 'pointer' }}
                        >
                          {['new', 'read', 'responded', 'archived'].map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: 'var(--space-4)', color: 'var(--outline)', fontSize: '0.8rem' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: 'var(--space-4)' }}>
                        <button onClick={() => deleteContact(c._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', opacity: 0.7 }} title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {total > 15 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>← Prev</button>
            <span style={{ fontSize: '0.85rem', color: 'var(--outline)', display: 'flex', alignItems: 'center' }}>Page {page}</span>
            <button onClick={() => setPage(page + 1)} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
