import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/* ─── Wave colour stops ────────────────────────────────────────────── */
const LAYER1_STOPS = [
  { offset: '0%', color: '#009DFF' },
  { offset: '64%', color: '#4AB7FF' },
  { offset: '98%', color: '#9EE7FF' },
];
const LAYER2_STOPS = [
  { offset: '0%', color: '#009DFF' },
  { offset: '47%', color: '#4AB7FF' },
  { offset: '63%', color: '#86D9FF' },
  { offset: '100%', color: '#9EE7FF' },
];
const LAYER3_STOPS = [
  { offset: '0%', color: '#009DFF' },
  { offset: '58%', color: '#4AB7FF' },
  { offset: '98%', color: '#9EE7FF' },
];

/* ─── Nav data ─────────────────────────────────────────────────────── */
const MENU_LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/#about', label: 'ABOUT' },
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
];

/* ─── Wave SVG (3 layers) ──────────────────────────────────────────── */
function WaveStack() {
  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden"
      style={{ height: '60%', pointerEvents: 'none', borderRadius: '0 0 16px 16px' }}
      aria-hidden="true"
    >
      {/* Layer 1 */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{
          filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.55)) blur(1.5px)',
          animation: 'waveFloat1 8s ease-in-out infinite',
        }}
      >
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
            {LAYER1_STOPS.map((s) => <stop key={s.offset} offset={s.offset} stopColor={s.color} />)}
          </linearGradient>
        </defs>
        <path d="M0,160 C180,240 360,80 540,140 C720,200 900,60 1080,130 C1260,200 1380,120 1440,160 L1440,320 L0,320 Z" fill="url(#wg1)" />
      </svg>

      {/* Layer 2 */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{ filter: 'blur(3px)', animation: 'waveFloat2 10s ease-in-out infinite' }}
      >
        <defs>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
            {LAYER2_STOPS.map((s) => <stop key={s.offset} offset={s.offset} stopColor={s.color} />)}
          </linearGradient>
        </defs>
        <path d="M0,200 C200,120 400,270 600,190 C800,110 1000,240 1200,175 C1350,125 1420,195 1440,200 L1440,320 L0,320 Z" fill="url(#wg2)" stroke="#98C3F5" strokeWidth="0.78" />
      </svg>

      {/* Layer 3 */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{ filter: 'blur(4.5px)', animation: 'waveFloat3 12s ease-in-out infinite' }}
      >
        <defs>
          <linearGradient id="wg3" x1="0%" y1="0%" x2="100%" y2="0%">
            {LAYER3_STOPS.map((s) => <stop key={s.offset} offset={s.offset} stopColor={s.color} />)}
          </linearGradient>
        </defs>
        <path d="M0,220 C160,150 320,290 520,210 C720,130 920,270 1120,200 C1300,140 1400,220 1440,230 L1440,320 L0,320 Z" fill="url(#wg3)" />
      </svg>
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
      style={{ display: 'block', height: '51%' }}
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

  /* Inject wave keyframes once */
  useEffect(() => {
    const id = 'footer-wave-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes waveFloat1 {
        0%,100% { transform: translateX(0) scaleY(1); }
        25%      { transform: translateX(-18px) scaleY(1.04); }
        50%      { transform: translateX(14px) scaleY(0.97); }
        75%      { transform: translateX(-8px) scaleY(1.02); }
      }
      @keyframes waveFloat2 {
        0%,100% { transform: translateX(0) scaleY(1); }
        30%      { transform: translateX(22px) scaleY(1.05); }
        60%      { transform: translateX(-16px) scaleY(0.96); }
        80%      { transform: translateX(10px) scaleY(1.03); }
      }
      @keyframes waveFloat3 {
        0%,100% { transform: translateX(0) scaleY(1); }
        20%      { transform: translateX(-26px) scaleY(1.06); }
        50%      { transform: translateX(18px) scaleY(0.95); }
        80%      { transform: translateX(-12px) scaleY(1.04); }
      }
    `;
    document.head.appendChild(style);
  }, []);

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
                    className="poppins-medium block transition-opacity duration-200 hover:opacity-50"
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
                    className="poppins-medium block transition-opacity duration-200 hover:opacity-50"
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
                    className="poppins-medium block transition-opacity duration-200 hover:opacity-50"
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
