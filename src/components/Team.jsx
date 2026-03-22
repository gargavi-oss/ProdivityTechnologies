import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import API_BASE from '../config';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ACCENT_COLORS = ['#6200ee', '#006874', '#004eb5', '#9c27b0', '#0097a7', '#6200ee'];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

// Placeholder avatar with initials
const Avatar = ({ name, photoUrl, size = 120 }) => {
  const [imgError, setImgError] = useState(false);
  const initials = name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#6200ee', '#006874', '#004eb5', '#9c27b0'];
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length];

  if (photoUrl && !imgError) {
    return (
      <img
        src={photoUrl}
        alt={name}
        onError={() => setImgError(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(98,0,238,0.1)' }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: `${color}18`,
      border: `3px solid ${color}30`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontFamily: 'var(--font-display)',
      fontWeight: 700, fontSize: size * 0.3, color,
    }}>
      {initials}
    </div>
  );
};

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/team`)
      .then((r) => r.json())
      .then((data) => setMembers(data.members || []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && members.length === 0) return null; // Hide section if no team members

  return (
    <section id="team" className="section" style={{ background: 'var(--surface-lowest)' }}>
      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <p className="overline" style={{ marginBottom: 'var(--space-3)' }}>The People</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: 'var(--space-4)' }}>
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto' }}>
            The talented people behind every product we build.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card" style={{ height: '340px', opacity: 0.4 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
            {members.map((m, i) => {
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <motion.div
                  key={m._id}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card"
                  style={{ padding: 'var(--space-8)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Accent top bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${color}, transparent)` }} />

                  {/* Photo */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-5)' }}>
                    <Avatar name={m.name} photoUrl={m.photoUrl} size={100} />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.25rem' }}>
                    {m.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-4)' }}>
                    {m.role}
                  </p>

                  {m.bio && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>
                      {m.bio}
                    </p>
                  )}

                  {/* Skills */}
                  {m.skills?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center', marginBottom: 'var(--space-5)' }}>
                      {m.skills.map((skill) => (
                        <span key={skill} style={{ fontSize: '0.65rem', fontWeight: 500, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: `${color}10`, border: `1px solid ${color}20`, color: 'var(--on-surface-variant)' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Social Links */}
                  {(m.githubUrl || m.linkedinUrl) && (
                    <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
                      {m.githubUrl && (
                        <a href={m.githubUrl} target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'rgba(98,0,238,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface-variant)', textDecoration: 'none' }}>
                          <GithubIcon size={14} />
                        </a>
                      )}
                      {m.linkedinUrl && (
                        <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'rgba(0,104,116,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#006874', textDecoration: 'none' }}>
                          <LinkedInIcon size={14} />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
