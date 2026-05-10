import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function AdminLogin() {
  const { isAdmin, login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => { if (isAdmin) navigate('/'); }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attempts >= 5) return;
    const ok = login(password);
    if (ok) {
      navigate('/');
    } else {
      setAttempts((a) => a + 1);
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      background: `
        radial-gradient(ellipse at 25% 50%, rgba(226,168,75,0.04) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 50%, rgba(129,140,248,0.04) 0%, transparent 55%),
        var(--color-bg)
      `,
    }}>
      <div style={{ width: '100%', maxWidth: '400px', animation: 'scaleIn 0.4s ease' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          {/* Dual icon */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '2.2rem', marginBottom: '1rem' }}>
            <span style={{ filter: 'drop-shadow(0 0 12px rgba(226,168,75,0.5))' }}>🎬</span>
            <span style={{ filter: 'drop-shadow(0 0 12px rgba(129,140,248,0.5))' }}>🎮</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-label)', fontSize: '2rem', letterSpacing: '0.28em', color: 'var(--color-text-primary)', marginBottom: '0.3rem' }}>
            REELPLAY
          </h1>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Film · Series · Games
          </p>
          <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, var(--color-cinema), var(--color-game))', margin: '0.75rem auto 0' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', letterSpacing: '0.04em' }}>
            Reviewer access only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
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
              <p style={{ color: '#e05555', fontSize: '0.82rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                {error}
              </p>
            )}
            {attempts >= 5 && (
              <p style={{ color: '#e05555', fontSize: '0.82rem', marginBottom: '1rem' }}>
                Too many failed attempts. Refresh to try again.
              </p>
            )}

            <button type="submit" className="btn btn-primary"
              disabled={!password || attempts >= 5}
              style={{ width: '100%', justifyContent: 'center', opacity: (!password || attempts >= 5) ? 0.5 : 1 }}
            >
              Sign In
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/')}>
            ← Back to reviews
          </span>
        </p>

        {/* Decorative dual strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginTop: '2.5rem', opacity: 0.12 }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} style={{
              width: '20px', height: '14px', borderRadius: '2px',
              background: i % 2 === 0 ? 'var(--color-cinema)' : 'var(--color-game)',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
