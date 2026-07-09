import { useRef, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const MODES = [
  { value: 'light', Icon: Sun, label: 'Light' },
  { value: 'system', Icon: Monitor, label: 'System' },
  { value: 'dark', Icon: Moon, label: 'Dark' },
];

export default function ThemeToggle() {
  const { mode, switchTheme } = useTheme();
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const hideTimer = useRef(null);

  const current = MODES.find((m) => m.value === mode) || MODES[1];
  const CurrentIcon = current.Icon;

  const handleSwitch = (value) => {
    const rect = containerRef.current?.getBoundingClientRect();
    switchTheme(value, rect);
    setOpen(false);
  };

  const onMouseEnter = () => {
    clearTimeout(hideTimer.current);
    setOpen(true);
  };

  const onMouseLeave = () => {
    hideTimer.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      ref={containerRef}
      className="relative z-50 inline-block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Trigger button — shows current theme icon */}
      <button
        type="button"
        aria-label={`Current theme: ${current.label}. Hover to change.`}
        className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          color: 'var(--text-primary)',
        }}
      >
        <CurrentIcon size={16} strokeWidth={2.2} className="transition-transform duration-300" />
      </button>

      {/* Floating popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 p-1 rounded-xl flex flex-col gap-1 shadow-lg border backdrop-blur-md"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderColor: 'var(--glass-border)',
              minWidth: '110px',
            }}
            role="group"
            aria-label="Theme selector"
          >
            {MODES.map(({ value, Icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleSwitch(value)}
                aria-label={`Switch to ${label} mode`}
                aria-pressed={mode === value}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  mode === value
                    ? 'bg-primary-blue text-white shadow-sm'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                style={{
                  color: mode === value ? '#ffffff' : 'var(--text-secondary)',
                }}
                title={label}
              >
                <Icon size={14} strokeWidth={2.2} />
                <span>{label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
