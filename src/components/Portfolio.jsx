import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import API_BASE from '../config';

const ACCENT_COLORS = ['#6200ee', '#006874', '#004eb5', '#6200ee', '#006874', '#004eb5'];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects?limit=6`)
      .then((r) => r.json())
      .then((data) => setProjects(data.projects || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="portfolio" className="section" style={{ background: 'var(--surface-dim)' }}>
      <div className="container">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Our Work</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Projects That <span className="gradient-text">Speak</span> for Themselves
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', maxWidth: '560px', margin: '0 auto' }}>
            A showcase of our recent work across industries — from fintech to healthcare, cloud to AI.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card" style={{ height: '260px', opacity: 0.5, animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--outline)', fontSize: '1rem' }}>
            No projects yet — add some from the admin panel.
          </p>
        )}

        {!loading && projects.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }} className="portfolio-grid">
            {projects.map((proj, i) => {
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <motion.div
                  key={proj._id}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card"
                  style={{ padding: 'var(--space-8)', position: 'relative', overflow: 'hidden', cursor: 'pointer', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  {/* Color accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${color}, transparent)` }} />

                  {/* Ambient glow */}
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: color, opacity: 0.03, filter: 'blur(50px)', pointerEvents: 'none' }} />

                  {/* Image (if available) */}
                  {proj.imageUrl && (
                    <div style={{ marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '140px' }}>
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color }}>
                        {proj.category}
                      </span>
                      {proj.liveUrl && proj.liveUrl !== '' && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink size={16} style={{ color: 'var(--outline)', opacity: 0.5 }} />
                        </a>
                      )}
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--on-surface)', marginBottom: 'var(--space-2)' }}>
                      {proj.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--on-surface-variant)', marginBottom: 'var(--space-4)' }}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {(proj.tags || []).map((tag) => (
                      <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 500, padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', background: 'rgba(98,0,238,0.05)', border: '1px solid rgba(98,0,238,0.1)', color: 'var(--on-surface-variant)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
