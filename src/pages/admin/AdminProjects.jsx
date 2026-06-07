import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, X, Upload } from 'lucide-react';
import API_BASE from '../../config';
import AdminNav, { adminPath } from './AdminNav';

const emptyProject = { title: '', category: '', description: '', tags: '', imageUrl: '', liveUrl: '', githubUrl: '', featured: false, status: 'active' };

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate(adminPath('/')); return; }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects?limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.clear(); navigate(adminPath('/')); return; }
      const data = await res.json();
      setProjects(data.projects);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: typeof form.tags === 'string' ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : form.tags };
    const url = editing ? `${API_BASE}/projects/${editing}` : `${API_BASE}/projects`;
    const method = editing ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    setShowForm(false);
    setEditing(null);
    setForm(emptyProject);
    fetchProjects();
  };

  const startEdit = (p) => {
    setForm({ ...p, tags: p.tags?.join(', ') || '' });
    setEditing(p._id);
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
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
      if (res.ok) setForm((f) => ({ ...f, imageUrl: data.url }));
      else alert('Upload failed: ' + data.error);
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchProjects();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      <AdminNav active="Projects" />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)' }}>
            Projects ({total})
          </h1>
          <button
            onClick={() => { setForm(emptyProject); setEditing(null); setShowForm(true); }}
            className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <Plus size={16} aria-hidden="true" /> Add Project
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--on-surface)' }}>
                  {editing ? 'Edit Project' : 'New Project'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditing(null); }} aria-label="Close modal" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--outline)' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit}>
                {[
                  { key: 'title', label: 'Title', type: 'text', required: true },
                  { key: 'category', label: 'Category', type: 'text', required: true },
                  { key: 'description', label: 'Description', type: 'textarea', required: true },
                  { key: 'tags', label: 'Tags (comma-separated)', type: 'text' },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: 'var(--space-4)' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea className="input-terminal" value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} required={field.required} />
                    ) : (
                      <input type={field.type} className="input-terminal" value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} required={field.required} />
                    )}
                  </div>
                ))}
                {/* Image URL + Cloudinary Upload */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>Image</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input type="text" className="input-terminal" placeholder="Paste URL or upload below" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} style={{ flex: 1 }} />
                    <label style={{
                      cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-bright)',
                      padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(139, 92, 246, 0.25)', background: 'rgba(139, 92, 246, 0.06)',
                    }}>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                      <Upload size={13} aria-hidden="true" />{uploading ? 'Uploading…' : 'Upload'}
                    </label>
                  </div>
                </div>
                {/* Live & GitHub URLs */}
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>Live URL</label>
                  <input type="text" className="input-terminal" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
                </div>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>GitHub URL</label>
                  <input type="text" className="input-terminal" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
                </div>
                {/* Image Preview */}
                {form.imageUrl && (
                  <div style={{ marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '120px' }}>
                    <img src={form.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '0.85rem', color: 'var(--on-surface-variant)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
                  </label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-terminal" style={{ width: 'auto' }}>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                  {editing ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <p style={{ color: 'var(--outline)' }}>Loading...</p>
        ) : projects.length === 0 ? (
          <div className="glass-card" style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
            <p style={{ color: 'var(--outline)', fontSize: '1rem' }}>No projects yet. Click "Add Project" to create one.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
            {projects.map((p) => (
              <div key={p._id} className="glass-card" style={{ padding: 'var(--space-6)', position: 'relative', overflow: 'hidden' }}>
                {p.imageUrl && (
                  <div style={{ marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '120px' }}>
                    <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-bright)' }}>{p.category}</span>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button onClick={() => startEdit(p)} aria-label={`Edit ${p.title}`} style={{ background: 'none', border: 'none', color: 'var(--primary-bright)', cursor: 'pointer' }}><Edit size={14} /></button>
                    <button onClick={() => deleteProject(p._id)} aria-label={`Delete ${p.title}`} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}><Trash2 size={14} /></button>
                  </div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: 'var(--space-2)' }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: 'var(--space-3)' }}>
                  {p.tags?.map((t) => (
                    <span key={t} style={{
                      fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)',
                      background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.12)',
                      color: 'var(--on-surface-variant)',
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '0.7rem' }}>
                  <span style={{
                    padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)',
                    background: p.featured ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                    color: p.featured ? '#22D3EE' : 'var(--outline)',
                  }}>
                    {p.featured ? '★ Featured' : 'Not featured'}
                  </span>
                  <span style={{ color: 'var(--outline)' }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
