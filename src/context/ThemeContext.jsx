import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ThemeContext = createContext(null);

const DEFAULT_PALETTE = {
  primary: [212, 175, 55],    // Gold
  secondary: [139, 90, 43],   // Dark amber
  light: [245, 235, 200],     // Cream
};

const toRgb = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
const toRgbVars = (arr) => `${arr[0]}, ${arr[1]}, ${arr[2]}`;

const isColorTooBlack = (arr) => arr[0] + arr[1] + arr[2] < 60;
const isColorTooWhite = (arr) => arr[0] + arr[1] + arr[2] > 700;

const filterPalette = (colors) =>
  colors.filter((c) => !isColorTooBlack(c) && !isColorTooWhite(c));

export const ThemeProvider = ({ children }) => {
  const [palette, setPalette] = useState(DEFAULT_PALETTE);
  const [isExtracting, setIsExtracting] = useState(false);
  const extractorRef = useRef(null);

  const applyPalette = useCallback((primary, secondary, light) => {
    const root = document.documentElement;
    root.style.setProperty('--color-accent', toRgb(primary));
    root.style.setProperty('--color-accent-rgb', toRgbVars(primary));
    root.style.setProperty('--color-accent-secondary', toRgb(secondary));
    root.style.setProperty('--color-accent-light', toRgb(light));
    root.style.setProperty(
      '--color-accent-dim',
      `rgba(${toRgbVars(primary)}, 0.15)`
    );
    root.style.setProperty(
      '--color-accent-glow',
      `rgba(${toRgbVars(primary)}, 0.4)`
    );
    setPalette({ primary, secondary, light });
  }, []);

  const extractFromImage = useCallback(
    async (imageUrl) => {
      if (!imageUrl || isExtracting) return;
      setIsExtracting(true);
      try {
        const ColorThief = (await import('colorthief')).default;
        const ct = extractorRef.current || new ColorThief();
        extractorRef.current = ct;

        const img = new Image();
        img.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          // Use a cache-busting-free CORS-friendly URL
          img.src = imageUrl;
        });

        const dominant = ct.getColor(img);
        const colorPalette = ct.getPalette(img, 6);
        const filtered = filterPalette(colorPalette || []);

        const primary = isColorTooBlack(dominant) || isColorTooWhite(dominant)
          ? (filtered[0] || DEFAULT_PALETTE.primary)
          : dominant;

        const secondary = filtered.find(
          (c) => c !== primary && Math.abs(c[0] - primary[0]) > 30
        ) || filtered[1] || DEFAULT_PALETTE.secondary;

        const light = filtered.find(
          (c) => c[0] + c[1] + c[2] > 500
        ) || DEFAULT_PALETTE.light;

        applyPalette(primary, secondary, light);
      } catch {
        applyPalette(
          DEFAULT_PALETTE.primary,
          DEFAULT_PALETTE.secondary,
          DEFAULT_PALETTE.light
        );
      } finally {
        setIsExtracting(false);
      }
    },
    [isExtracting, applyPalette]
  );

  const resetPalette = useCallback(() => {
    applyPalette(
      DEFAULT_PALETTE.primary,
      DEFAULT_PALETTE.secondary,
      DEFAULT_PALETTE.light
    );
  }, [applyPalette]);

  return (
    <ThemeContext.Provider value={{ palette, extractFromImage, resetPalette, isExtracting }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
