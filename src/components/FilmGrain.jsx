import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function FilmGrain() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const location  = useLocation();
  const isGame    = location.pathname.startsWith('/game');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const render = () => {
      frame++;
      if (frame % 2 === 0) {
        const { width, height } = canvas;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        if (isGame) {
          /* Scanline noise - horizontal banding */
          for (let y = 0; y < height; y++) {
            const lineNoise = Math.random() > 0.997 ? (Math.random() * 60) | 0 : (Math.random() * 12) | 0;
            for (let x = 0; x < width; x++) {
              const i = (y * width + x) * 4;
              data[i] = lineNoise;
              data[i+1] = lineNoise;
              data[i+2] = lineNoise + (Math.random() > 0.5 ? 8 : 0); // slight blue tint
              data[i+3] = y % 4 === 0 ? 14 : (Math.random() > 0.7 ? 10 : 0);
            }
          }
        } else {
          /* Film grain - random per-pixel */
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() * 26) | 0;
            data[i] = noise; data[i+1] = noise; data[i+2] = noise;
            data[i+3] = Math.random() > 0.52 ? 16 : 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [isGame]);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 9999,
      opacity: isGame ? 0.28 : 0.32,
      mixBlendMode: 'screen',
    }} />
  );
}
