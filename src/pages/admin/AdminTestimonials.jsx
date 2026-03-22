import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, X, Star } from 'lucide-react';
import API_BASE from '../../config';
import AdminNav, { adminPath } from './AdminNav';

const emptyT = { name: '', role: '', company: '', avatarUrl: '', content: '', rating: 5, featured: false };

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyT);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate(adminPath('/')); return; }
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE}/testimonials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.clear(); navigate(adminPath('/')); return; }
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing ? `${API_BASE}/testimonials/${editing}` : `${API_BASE}/testimonials`;
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, rating: Number(form.rating) }),
    });
    setShowForm(false);
    setEditing(null);
    setForm(emptyT);
    fetchTestimonials();
  };

  const startEdit = (t) => { setForm(t); setEditing(t._id); setShowForm(true); };

  const deleteT = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`${API_BASE}/testimonials/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchTestimonials();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      <AdminNav active="Testimonials" />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>
            Testimonials ({testimonials.length})
          </h1>
          <button onClick={() => { setForm(emptyT); setEditing(null); setShowForm(true); }} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            <Plus size={16} /> Add Testimonial
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-4)' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '520px', padding: 'var(--space-8)', background: 'rgba(255,255,255,0.97)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                  {editing ? 'Edit Testimonial' : 'New Testimonial'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--outline)' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit}>
                {[
                  { key: 'name', label: 'Client Name', required: true },
                  { key: 'role', label: 'Job Role / Title', required: true },
                  { key: 'company', label: 'Company (optional)' },
                  { key: 'avatarUrl', label: 'Avatar URL (optional)' },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: 'var(--space-4)' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>{f.label}</label>
                    <input type="text" className="input-terminal" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required={f.required} />
                  </div>
                ))}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>Testimonial Content *</label>
                  <textarea className="input-terminal" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required style={{ minHeight: '100px' }} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', alignItems: 'center' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>Rating</label>
                    <select className="input-terminal" style={{ width: 'auto' }} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                      {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{'★'.repeat(n)} ({n}/5)</option>)}
                    </select>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '0.85rem', color: 'var(--on-surface-variant)', cursor: 'pointer', marginTop: 'var(--space-4)' }}>
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
                  </label>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                  {editing ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? <p style={{ color: 'var(--outline)' }}>Loading...</p> : testimonials.length === 0 ? (
          <div className="glass-card" style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
            <p style={{ color: 'var(--outline)' }}>No testimonials yet. Add some to show them on the website!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
            {testimonials.map((t) => (
              <div key={t._id} className="glass-card" style={{ padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map((n) => <Star key={n} size={12} fill={n <= t.rating ? '#f59e0b' : 'none'} stroke={n <= t.rating ? '#f59e0b' : '#ccc'} />)}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button onClick={() => startEdit(t)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit size={14} /></button>
                    <button onClick={() => deleteT(t._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}><Trash2 size={14} /></button>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                  &ldquo;{t.content.length > 120 ? t.content.slice(0, 120) + '...' : t.content}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(98,0,238,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.7rem', color: 'var(--primary)' }}>
                      {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--outline)' }}>{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                  </div>
                  {t.featured && <span style={{ marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 600, color: '#16a34a', background: 'rgba(22,163,74,0.1)', padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>Featured</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
