import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import API_BASE from '../../config';
import AdminNav, { adminPath } from './AdminNav';

const AdminSettings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate(adminPath('/')); return; }
    fetch(`${API_BASE}/settings`)
      .then((r) => r.json())
      .then((d) => setSettings(d.settings || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => prev.map((s) => s.key === key ? { ...s, value } : s));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ settings }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Only show stat_ settings
  const statSettings = settings.filter((s) => s.key.startsWith('stat_'));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-dim)' }}>
      <AdminNav active="Settings" />
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: 'var(--space-2)' }}>
          Site Settings
        </h1>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginBottom: 'var(--space-8)' }}>
          Edit the stats shown on the homepage hero section. Changes reflect immediately after saving.
        </p>

        {loading ? <p style={{ color: 'var(--outline)' }}>Loading...</p> : (
          <>
            <div className="glass-card" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: 'var(--space-6)' }}>
                Hero Stats
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                {statSettings.map((s) => (
                  <div key={s.key}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-1)' }}>
                      {s.label || s.key}
                    </label>
                    <input
                      type="text"
                      className="input-terminal"
                      value={s.value}
                      onChange={(e) => handleChange(s.key, e.target.value)}
                      placeholder="e.g. 50+"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}
                    />
                    <div style={{ fontSize: '0.7rem', color: 'var(--outline)', marginTop: '0.25rem' }}>
                      Shows as a stat card on the homepage
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary"
              style={{ padding: '0.7rem 1.5rem', justifyContent: 'center', opacity: saving ? 0.7 : 1 }}
            >
              <Save size={16} />
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
