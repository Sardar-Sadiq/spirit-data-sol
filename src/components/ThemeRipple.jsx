import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Renders the water-ripple overlay that expands from the toggle position
 * whenever a theme transition is triggered.
 */
export default function ThemeRipple() {
  const { ripple } = useTheme();
  const circleRef = useRef(null);

  useEffect(() => {
    if (!ripple || !circleRef.current) return;

    const el = circleRef.current;
    // Max radius needed to cover the entire viewport
    const maxR = Math.sqrt(
      Math.pow(Math.max(ripple.x, window.innerWidth - ripple.x), 2) +
        Math.pow(Math.max(ripple.y, window.innerHeight - ripple.y), 2)
    );

    // Position the circle at origin click point
    el.style.left = `${ripple.x}px`;
    el.style.top = `${ripple.y}px`;
    el.style.width = '0px';
    el.style.height = '0px';
    el.style.opacity = '1';

    // Force reflow
    void el.offsetWidth;

    // Animate expand
    el.style.transition = 'width 0.65s cubic-bezier(0.4, 0, 0.2, 1), height 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s';
    el.style.width = `${maxR * 2}px`;
    el.style.height = `${maxR * 2}px`;
  }, [ripple]);

  if (!ripple) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        ref={circleRef}
        style={{
          position: 'absolute',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: ripple.dark ? '#0E0E0E' : '#f7fafc',
          opacity: 0,
        }}
      />
    </div>
  );
}
