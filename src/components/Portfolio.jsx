import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import API_BASE from '../config';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ACCENT_COLORS = ['var(--primary-bright)', 'var(--secondary)', 'var(--tertiary)', 'var(--primary)', 'var(--secondary)', 'var(--tertiary)'];

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
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>Our Work</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Projects That <span className="gradient-text">Speak</span> for Themselves
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
            A showcase of our recent work across industries — from fintech to healthcare, cloud to AI.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card animate-pulse-glow" style={{ height: '260px', opacity: 0.3 }} aria-hidden="true" />
            ))}
          </div>
        )}

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
                  style={{
                    padding: 'var(--space-8)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    minHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }} />

                  {/* Ambient glow */}
                  <div aria-hidden="true" style={{
                    position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px',
                    borderRadius: '50%', background: color, opacity: 0.03, filter: 'blur(50px)', pointerEvents: 'none',
                  }} />

                  {/* Image */}
                  {proj.imageUrl && (
                    <div style={{
                      marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)',
                      overflow: 'hidden', height: '140px',
                    }}>
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>
                        {proj.category}
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                            aria-label={`View ${proj.title} on GitHub`}
                            style={{ color: 'var(--outline)', lineHeight: 1, transition: 'color 0.2s', cursor: 'pointer' }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--outline)'}
                          >
                            <GithubIcon size={16} />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                            aria-label={`View live demo of ${proj.title}`}
                            style={{ color: 'var(--outline)', lineHeight: 1, transition: 'color 0.2s', cursor: 'pointer' }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--outline)'}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700,
                      color: 'var(--on-surface)', marginBottom: 'var(--space-2)',
                    }}>
                      {proj.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--on-surface-variant)',
                      marginBottom: 'var(--space-4)',
                    }}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {(proj.tags || []).map((tag) => (
                      <span key={tag} style={{
                        fontSize: '0.7rem', fontWeight: 500, padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(139, 92, 246, 0.06)',
                        border: '1px solid rgba(139, 92, 246, 0.1)',
                        color: 'var(--on-surface-variant)',
                      }}>
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
