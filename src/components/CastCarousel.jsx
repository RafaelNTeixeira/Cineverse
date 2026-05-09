import { profileUrl } from '../config';

export default function CastCarousel({ cast = [] }) {
  const displayed = cast.slice(0, 20);

  if (!displayed.length) return null;

  return (
    <div>
      <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>
        Cast
      </h3>
      <div className="scroll-row" style={{ gap: '0.85rem' }}>
        {displayed.map((person, i) => (
          <div
            key={person.id}
            style={{
              flexShrink: 0,
              width: '90px',
              textAlign: 'center',
              animation: 'fadeInUp 0.4s ease both',
              animationDelay: `${i * 0.04}s`,
            }}
          >
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid var(--color-border)',
              marginBottom: '0.5rem',
              background: 'var(--color-bg-elevated)',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              {person.profile_path ? (
                <img
                  src={profileUrl(person.profile_path, 'md')}
                  alt={person.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'var(--color-text-muted)',
                }}>
                  👤
                </div>
              )}
            </div>
            <p style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 1.3,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {person.name}
            </p>
            <p style={{
              fontSize: '0.65rem',
              color: 'var(--color-text-muted)',
              margin: '0.2rem 0 0',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}>
              {person.character || person.roles?.[0]?.character || ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
