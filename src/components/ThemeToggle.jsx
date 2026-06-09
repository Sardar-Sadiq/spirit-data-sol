import { useRef } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MODES = [
  { value: 'light', Icon: Sun,     label: 'Light' },
  { value: 'system', Icon: Monitor, label: 'System' },
  { value: 'dark',  Icon: Moon,    label: 'Dark'  },
];

export default function ThemeToggle() {
  const { mode, switchTheme } = useTheme();
  const containerRef = useRef(null);

  const activeIdx = MODES.findIndex((m) => m.value === mode);

  const handleClick = (value) => {
    if (value === mode) return;
    const rect = containerRef.current?.getBoundingClientRect();
    switchTheme(value, rect);
  };

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Theme selector"
      className="theme-toggle-track"
    >
      {/* Sliding pill indicator */}
      <span
        className="theme-toggle-pill"
        style={{ transform: `translateX(${activeIdx * 100}%)` }}
      />

      {MODES.map(({ value, Icon, label }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          aria-label={`Switch to ${label} mode`}
          aria-pressed={mode === value}
          className={`theme-toggle-btn ${mode === value ? 'active' : ''}`}
        >
          <Icon size={14} strokeWidth={2.2} />
        </button>
      ))}
    </div>
  );
}
