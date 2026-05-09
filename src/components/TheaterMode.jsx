import { useEffect, useRef, useState, useCallback } from 'react';

let ytApiReady = false;

const loadYouTubeAPI = () => {
  if (ytApiReady || (window.YT && window.YT.Player)) {
    ytApiReady = true;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      ytApiReady = true;
      if (prev) prev();
      resolve();
    };
    if (!document.getElementById('yt-iframe-api')) {
      const s = document.createElement('script');
      s.id = 'yt-iframe-api';
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
  });
};

export default function TheaterMode({ videoId, title, onClose }) {
  const playerDivRef = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);

  const init = useCallback(async () => {
    if (!videoId || !playerDivRef.current) return;
    try {
      await loadYouTubeAPI();
      playerRef.current = new window.YT.Player(playerDivRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          fs: 1,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(70);
            e.target.playVideo();
            setReady(true);
          },
        },
      });
    } catch (err) {
      console.error('Theater mode error:', err);
    }
  }, [videoId]);

  useEffect(() => {
    init();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, [init]);

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
        backdropFilter: 'blur(6px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Header */}
      <div style={{
        width: '90%',
        maxWidth: '960px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
          }}>
            ▶ NOW PLAYING
          </span>
          {title && (
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              marginTop: '0.25rem',
            }}>
              {title}
            </h2>
          )}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.1rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          ✕
        </button>
      </div>

      {/* Player wrapper */}
      <div style={{
        width: '90%',
        maxWidth: '960px',
        aspectRatio: '16/9',
        background: '#000',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
        animation: 'scaleIn 0.35s ease',
      }}>
        {!ready && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid var(--color-border)',
              borderTopColor: 'var(--color-accent)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}/>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>Loading Trailer...</span>
          </div>
        )}
        <div
          ref={playerDivRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <p style={{
        marginTop: '1rem',
        fontSize: '0.72rem',
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Press ESC or click outside to close
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
