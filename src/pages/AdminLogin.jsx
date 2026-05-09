import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function AdminLogin() {
  const { isAdmin, login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) navigate('/');
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attempts >= 5) return;
    const ok = login(password);
    if (ok) {
      navigate('/');
    } else {
      setAttempts((a) => a + 1);
      setError('Incorrect password. The projection booth remains locked.');
      setPassword('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: `
        radial-gradient(ellipse at 30% 50%, rgba(var(--color-accent-rgb), 0.04) 0%, transparent 60%),
        var(--color-bg)
      `,
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        animation: 'scaleIn 0.4s ease',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 20px var(--color-accent-glow))',
          }}>
            🎬
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: 'var(--color-text-primary)',
            marginBottom: '0.5rem',
          }}>
            Projection Booth
          </h1>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.05em',
          }}>
            Authorized personnel only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
          }}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter your password…"
                disabled={attempts >= 5}
                autoFocus
              />
            </div>

            {error && (
              <p style={{
                color: '#e05555',
                fontSize: '0.82rem',
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}>
                {error}
              </p>
            )}

            {attempts >= 5 && (
              <p style={{
                color: '#e05555',
                fontSize: '0.82rem',
                marginBottom: '1rem',
              }}>
                Too many failed attempts. Please refresh the page to try again.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!password || attempts >= 5}
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: !password || attempts >= 5 ? 0.5 : 1,
              }}
            >
              Enter the Booth
            </button>
          </div>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.78rem',
          color: 'var(--color-text-muted)',
        }}>
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/')}
          >
            ← Back to the lobby
          </span>
        </p>

        {/* Decorative film strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          marginTop: '2.5rem',
          opacity: 0.15,
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              width: '24px',
              height: '16px',
              background: 'var(--color-text-primary)',
              borderRadius: '2px',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
