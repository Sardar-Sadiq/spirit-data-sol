import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';


/* ─── Nav data ─────────────────────────────────────────────────────── */
const MENU_LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/#services', label: 'SERVICES' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/careers', label: 'CARRERS' },
];
const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/spiritdatasolutions', label: 'LINKEDIN' },
];
const COMPANY_LINKS = [
  { to: '/terms', label: 'Terms & Condition' },
  { to: '/privacy', label: 'Privacy & Policy' },
  { to: '/disclaimer', label: 'Diclamier' },
  { to: '/EmployeePortal', label: 'Employee Portal' },
];

/* ─── Wave Image ───────────────────────────────────────────────────── */
function WaveStack() {
  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden"
      style={{ height: '60%', pointerEvents: 'none', borderRadius: '0 0 16px 16px' }}
      aria-hidden="true"
    >
      <img
        src="/footerwave.svg"
        alt="Footer Waves"
        className="absolute bottom-0 left-0  w-120% h-120%"
        style={{ objectFit: 'fill', pointerEvents: 'none' }}
      />
    </div>
  );
}

/* ─── Spirit SVG brand — fills full box width via calibrated viewBox ─ */
function BrandSVG({ color }) {
  /*
   * Poppins 500 "Spirit" advance width at fontSize=400 is forced to exactly 1146px
   * (which matches the viewBox width) using textLength="1146" and lengthAdjust="spacing".
   * This ensures the text fills exactly 100% of the box width without distorting the
   * letters themselves (only character spacing is adjusted).
   * viewBox Y starts at 180 and goes to 410 (height 230) to crop the top of the letters.
   */
  return (
    <svg
      viewBox="0 180 1146 230"
      preserveAspectRatio="xMinYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 w-full select-none z-10"
      style={{ display: 'block', height: '51%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <text
        x="0"
        y="500"
        textLength="1146"
        lengthAdjust="spacing"
        fontFamily="Poppins, sans-serif"
        fontWeight="500"
        fontSize="400"
        fill={color}
        style={{ transition: 'fill 0.4s ease' }}
      >
        Spirit
      </text>
    </svg>
  );
}

/* ─── Main Footer ──────────────────────────────────────────────────── */
const Footer = () => {
  const { isDark } = useTheme();

  /* Theme tokens */
  const textPrimary = isDark ? '#F7FAFC' : '#161616';
  const bg = isDark ? '#0E0E0E' : '#F7FAFC';  // same as page bg
  const border = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
  const divider = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

  /* Font sizes — proportional to 1280px box */
  const headingSize = 'clamp(11px, 1.4vw, 20px)';
  const bodySize = 'clamp(10px, 1.1vw, 16px)';

  return (
    /*
     * Outer footer = same bg as the page (no contrasting colour).
     * Padding creates breathing room around the box on all sides.
     */
    <footer
      className="w-full"
      style={{
        background: bg,
        padding: 'clamp(24px, 3vw, 48px) clamp(16px, 4vw, 80px) clamp(24px, 3vw, 48px)',
        transition: 'background 0.4s ease',
      }}
    >
      {/*
       * The box — max-width 1280px, height ~500px, transparent bg (same as page),
       * thin border, rounded corners, overflow:hidden clips waves + Spirit text.
       */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{
          maxWidth: '1280px',
          width: '100%',
          height: 'clamp(300px, 40vw, 500px)',
          borderRadius: '16px',
          background: 'transparent',
          border: `1px solid ${border}`,
          transition: 'border-color 0.4s ease',
        }}
      >

        {/*
         * Nav grid — 3 columns matching the reference image proportions:
         *   MENU (~50%) | SOCIAL (~25%) | COMPANY (~25%)
         * Padding: small top/left/right inside the border.
         * No gap between columns so dividers extend to their column edge.
         */}
        <div
          className="relative z-10 grid"
          style={{
            gridTemplateColumns: '2fr 1.2fr 1.2fr',
            padding: 'clamp(16px, 2.5vw, 36px) clamp(16px, 2.5vw, 36px) 0',
          }}
        >
          {/* ── MENU ── */}
          <div className="pr-4">
            <h3
              className="poppins-medium pb-2 mb-3"
              style={{
                fontSize: headingSize,
                color: textPrimary,
                borderBottom: `1px solid ${divider}`,
              }}
            >
              MENU
            </h3>
            <ul className="flex flex-col gap-1 md:gap-1.5">
              {MENU_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="poppins-medium inline-block relative transition-all duration-300 hover:!text-[var(--toggle-active)] hover:-translate-y-[1px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#3787C2] after:to-[#1C579A] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                    style={{ fontSize: bodySize, color: textPrimary }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── SOCIAL ── */}
          <div className="pr-4">
            <h3
              className="poppins-medium pb-2 mb-3"
              style={{
                fontSize: headingSize,
                color: textPrimary,
                borderBottom: `1px solid ${divider}`,
              }}
            >
              SOCIAL
            </h3>
            <ul className="flex flex-col gap-1 md:gap-1.5">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="poppins-medium inline-block relative transition-all duration-300 hover:!text-[var(--toggle-active)] hover:-translate-y-[1px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#3787C2] after:to-[#1C579A] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                    style={{ fontSize: bodySize, color: textPrimary }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COMPANY ── */}
          <div>
            <h3
              className="poppins-medium pb-2 mb-3"
              style={{
                fontSize: headingSize,
                color: textPrimary,
                borderBottom: `1px solid ${divider}`,
              }}
            >
              COMPANY
            </h3>
            <ul className="flex flex-col gap-1 md:gap-1.5">
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="poppins-medium inline-block relative transition-all duration-300 hover:!text-[var(--toggle-active)] hover:-translate-y-[1px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#3787C2] after:to-[#1C579A] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                    style={{ fontSize: bodySize, color: textPrimary }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wave layers */}
        <WaveStack />

        {/* Spirit — full box width via SVG textLength */}
        <BrandSVG color={textPrimary} />
      </div>
    </footer>
  );
};

export default Footer;
