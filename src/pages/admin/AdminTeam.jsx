import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, X, Upload } from 'lucide-react';
import API_BASE from '../../config';
import AdminNav, { adminPath } from './AdminNav';

const emptyMember = { name: '', role: '', bio: '', skills: '', photoUrl: '', githubUrl: '', linkedinUrl: '', order: 0 };

const AdminTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyMember);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate(adminPath('/')); return; }
    fetch(`${API_BASE}/team`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setMembers(d.members || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const refresh = () =>
    fetch(`${API_BASE}/team`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then((d) => setMembers(d.members || []));

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) setForm((f) => ({ ...f, photoUrl: data.url }));
      else alert('Upload failed: ' + data.error);
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, skills: typeof form.skills === 'string' ? form.skills.split(',').map((s) => s.trim()).filter(Boolean) : form.skills };
    const url = editing ? `${API_BASE}/team/${editing}` : `${API_BASE}/team`;
    await fetch(url, {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setShowForm(false); setEditing(null); setForm(emptyMember); refresh();
  };

  const startEdit = (m) => { setForm({ ...m, skills: m.skills?.join(', ') || '' }); setEditing(m._id); setShowForm(true); };
  const deleteMember = async (id) => {
    if (!confirm('Delete this team member?')) return;
    await fetch(`${API_BASE}/team/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    refresh();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      <AdminNav active="Team" />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>Team Members ({members.length})</h1>
          <button onClick={() => { setForm(emptyMember); setEditing(null); setShowForm(true); }} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            <Plus size={16} /> Add Member
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-4)' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '540px', padding: 'var(--space-8)', background: 'rgba(255,255,255,0.97)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--on-surface)' }}>{editing ? 'Edit Member' : 'New Member'}</h2>
                <button onClick={() => { setShowForm(false); setEditing(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--outline)' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit}>
                {/* Photo Upload */}
                <div style={{ marginBottom: 'var(--space-5)', textAlign: 'center' }}>
                  {form.photoUrl ? (
                    <img src={form.photoUrl} alt="Preview" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(98,0,238,0.15)', marginBottom: 'var(--space-3)' }} />
                  ) : (
                    <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(98,0,238,0.06)', border: '2px dashed rgba(98,0,238,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-3)', color: 'var(--primary)' }}>
                      <Upload size={24} />
                    </div>
                  )}
                  <label style={{ cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                    {uploading ? 'Uploading...' : form.photoUrl ? 'Change Photo' : 'Upload Photo (Cloudinary)'}
                  </label>
                  <div style={{ marginTop: 'var(--space-2)', fontSize: '0.75rem', color: 'var(--outline)' }}>or paste URL below</div>
                  <input type="text" className="input-terminal" placeholder="https://..." value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} style={{ marginTop: 'var(--space-2)' }} />
                </div>

                {[
                  { key: 'name', label: 'Full Name', required: true },
                  { key: 'role', label: 'Role / Title', required: true },
                  { key: 'bio', label: 'Short Bio', textarea: true },
                  { key: 'skills', label: 'Skills (comma-separated)' },
                  { key: 'githubUrl', label: 'GitHub URL' },
                  { key: 'linkedinUrl', label: 'LinkedIn URL' },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: 'var(--space-4)' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>{f.label}</label>
                    {f.textarea ? (
                      <textarea className="input-terminal" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                    ) : (
                      <input type="text" className="input-terminal" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} required={f.required} />
                    )}
                  </div>
                ))}
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>Display Order</label>
                  <input type="number" className="input-terminal" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} style={{ width: '100px' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                  {editing ? 'Update Member' : 'Add Member'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Members Grid */}
        {loading ? <p style={{ color: 'var(--outline)' }}>Loading...</p> : members.length === 0 ? (
          <div className="glass-card" style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
            <p style={{ color: 'var(--outline)' }}>No team members yet. Add some to show the Team section on the website!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-5)' }}>
            {members.map((m) => (
              <div key={m._id} className="glass-card" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
                {m.photoUrl ? (
                  <img src={m.photoUrl} alt={m.name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto var(--space-4)', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(98,0,238,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--primary)' }}>
                    {m.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: 'var(--on-surface)', marginBottom: '0.25rem' }}>{m.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>{m.role}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                  {m.skills?.map((s) => <span key={s} style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', background: 'rgba(98,0,238,0.06)', color: 'var(--outline)' }}>{s}</span>)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
                  <button onClick={() => startEdit(m)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}><Edit size={15} /></button>
                  <button onClick={() => deleteMember(m._id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeam;
