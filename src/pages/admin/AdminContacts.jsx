import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import API_BASE from '../../config';
import AdminNav, { adminPath } from './AdminNav';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate(adminPath('/')); return; }
    fetchContacts();
  }, [page]);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/contacts?page=${page}&limit=15`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.clear(); navigate(adminPath('/')); return; }
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

  const statusColor = (s) => {
    switch (s) {
      case 'new': return { bg: 'rgba(34, 211, 238, 0.1)', color: '#22D3EE' };
      case 'read': return { bg: 'rgba(167, 139, 250, 0.1)', color: '#A78BFA' };
      case 'responded': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' };
      default: return { bg: 'rgba(122, 117, 127, 0.1)', color: '#7a757f' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      <AdminNav active="Contacts" />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
          color: 'var(--on-surface)', marginBottom: 'var(--space-6)',
        }}>
          Contact Leads ({total})
        </h1>

        {loading ? (
          <p style={{ color: 'var(--outline)' }}>Loading...</p>
        ) : contacts.length === 0 ? (
          <div className="glass-card" style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
            <p style={{ color: 'var(--outline)', fontSize: '1rem' }}>No contacts yet. They'll appear here when visitors submit the contact form.</p>
          </div>
        ) : (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  {['Name', 'Email', 'Message', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => {
                  const sc = statusColor(c.status);
                  return (
                    <tr key={c._id}>
                      <td style={{ fontWeight: 500, color: 'var(--on-surface)' }}>{c.name}</td>
                      <td>{c.email}</td>
                      <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                      <td>
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c._id, e.target.value)}
                          style={{
                            fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.4rem',
                            borderRadius: 'var(--radius-sm)', background: sc.bg, color: sc.color,
                            border: 'none', cursor: 'pointer',
                          }}
                        >
                          {['new', 'read', 'responded', 'archived'].map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ color: 'var(--outline)', fontSize: '0.8rem' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => deleteContact(c._id)}
                          aria-label={`Delete contact from ${c.name}`}
                          style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', opacity: 0.7 }}
                          title="Delete"
                        >
                          <Trash2 size={15} aria-hidden="true" />
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
