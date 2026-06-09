import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme-mode') || 'system';
  });

  // Derived: is dark actually active right now?
  const [isDark, setIsDark] = useState(false);

  // Ripple state
  const [ripple, setRipple] = useState(null); // { x, y, toTheme }
  const rippleRef = useRef(null);

  const getSystemDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = useCallback((currentMode) => {
    const dark =
      currentMode === 'dark' ||
      (currentMode === 'system' && getSystemDark());
    document.documentElement.classList.toggle('dark', dark);
    setIsDark(dark);
  }, []);

  // Initial apply & when mode changes
  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem('theme-mode', mode);
  }, [mode, applyTheme]);

  // Listen for system preference changes (only relevant in 'system' mode)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'system') applyTheme('system');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mode, applyTheme]);

  /**
   * Switch theme with a water-ripple effect originating from the toggle element.
   * @param {string} newMode - 'light' | 'dark' | 'system'
   * @param {DOMRect} rect   - bounding rect of the clicked button
   */
  const switchTheme = useCallback(
    (newMode, rect) => {
      if (newMode === mode) return;

      const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

      // Compute the new effective dark state BEFORE applying
      const willBeDark =
        newMode === 'dark' ||
        (newMode === 'system' && getSystemDark());

      // Trigger ripple
      setRipple({ x: centerX, y: centerY, dark: willBeDark });

      // After ripple animation (~600ms) apply the actual theme change
      const timeout = setTimeout(() => {
        setMode(newMode);
        setRipple(null);
      }, 650);

      return () => clearTimeout(timeout);
    },
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, isDark, switchTheme, ripple }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
