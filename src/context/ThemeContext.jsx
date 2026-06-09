import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme-mode') || 'system';
  });

  // Derived: is dark actually active right now?
  const [isDark, setIsDark] = useState(false);

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
   * Switch theme with a smooth fade transition.
   * Temporarily adds `.theme-transitioning` to <html> so all CSS custom
   * property consumers cross-fade, then removes it once the transition ends.
   *
   * @param {string} newMode - 'light' | 'dark' | 'system'
   */
  const switchTheme = useCallback(
    (newMode) => {
      if (newMode === mode) return;

      // Add transitioning class — CSS rule in index.css handles the fade
      document.documentElement.classList.add('theme-transitioning');

      // Apply the new theme immediately so colours start transitioning
      setMode(newMode);

      // Remove the class after the transition duration (350ms)
      const timeout = setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 400);

      return () => clearTimeout(timeout);
    },
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, isDark, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
