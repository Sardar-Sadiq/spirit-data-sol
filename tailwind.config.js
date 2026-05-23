/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette from DESIGN.md Brand & Style section
        'primary-blue': '#1F6FD1',
        'deep-blue': '#0A2E5C',
        'accent-sky': '#58B5FF',
        
        // Exact tokens from colors section in DESIGN.md
        surface: '#f7fafc',
        'surface-dim': '#d7dadc',
        'surface-bright': '#f7fafc',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f1f4f6',
        'surface-container': '#ebeef0',
        'surface-container-high': '#e5e9eb',
        'surface-container-highest': '#e0e3e5',
        'on-surface': '#181c1e',
        'on-surface-variant': '#414752',
        'inverse-surface': '#2d3133',
        'inverse-on-surface': '#eef1f3',
        outline: '#727784',
        'outline-variant': '#c1c6d5',
        'surface-tint': '#005db8',
        primary: '#0056ac',
        'on-primary': '#ffffff',
        'primary-container': '#1f6fd1',
        'on-primary-container': '#f3f5ff',
        'inverse-primary': '#aac7ff',
        secondary: '#425f8f',
        'on-secondary': '#ffffff',
        'secondary-container': '#abc7fe',
        'on-secondary-container': '#355382',
        tertiary: '#005c90',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#0076b6',
        'on-tertiary-container': '#f1f6ff',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        'primary-fixed': '#d6e3ff',
        'primary-fixed-dim': '#aac7ff',
        'on-primary-fixed': '#001b3e',
        'on-primary-fixed-variant': '#00458d',
        'secondary-fixed': '#d6e3ff',
        'secondary-fixed-dim': '#abc7fe',
        'on-secondary-fixed': '#001b3e',
        'on-secondary-fixed-variant': '#294776',
        'tertiary-fixed': '#cee5ff',
        'tertiary-fixed-dim': '#96ccff',
        'on-tertiary-fixed': '#001d32',
        'on-tertiary-fixed-variant': '#004a75',
        background: '#f7fafc',
        'on-background': '#181c1e',
        'surface-variant': '#e0e3e5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem', // 4px
        DEFAULT: '0.5rem', // 8px (Level 2 rounded standard)
        md: '0.75rem', // 12px
        lg: '1rem', // 16px (Large containers)
        xl: '1.5rem', // 24px
      },
      spacing: {
        'spacing-unit': '8px',
        'margin-desktop': '64px',
        'margin-tablet': '32px',
        'margin-mobile': '20px',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      boxShadow: {
        // Level 1 Shadow: 0px 1px 3px rgba(0,0,0,0.05), 0px 1px 2px rgba(0,0,0,0.02)
        'level-1': '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.02)',
        // Level 2 Shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08)
        'level-2': '0px 10px 15px -3px rgba(15, 23, 42, 0.08)',
        // 3px soft outer glow (Primary Blue at 10% opacity) for input focus
        'glow-primary': '0 0 0 3px rgba(31, 111, 209, 0.10)',
      },
    },
  },
  plugins: [],
}
