import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

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
const WAVE_PATH = "M1978.03 20.467C1835.61 74.9059 1836.46 217.6 1765.74 226.841C1674.53 238.76 1609.43 114.186 1350.2 363.034C1169.95 510.966 972.346 446.701 675.054 399.556C437.221 361.841 195.36 485.44 104.16 551.954L20.3513 634.564 L20.3513 800 L1978.03 800 Z";
const OPEN_WAVE_PATH = "M1978.03 20.467C1835.61 74.9059 1836.46 217.6 1765.74 226.841C1674.53 238.76 1609.43 114.186 1350.2 363.034C1169.95 510.966 972.346 446.701 675.054 399.556C437.221 361.841 195.36 485.44 104.16 551.954L20.3513 634.564";

function WaveStack() {
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  useGSAP(() => {
    // Continuous right-to-left seamless flow animation
    // The pattern spans from 20 to 3935.3 (width 3915.3).
    // Translating x by -3915.3 SVG units loops it seamlessly.
    gsap.to(layer1Ref.current, {
      x: -3915.3,
      duration: 18,
      ease: 'none',
      repeat: -1,
    });
    gsap.to(layer2Ref.current, {
      x: -3915.3,
      duration: 25,
      ease: 'none',
      repeat: -1,
    });
    gsap.to(layer3Ref.current, {
      x: -3915.3,
      duration: 32,
      ease: 'none',
      repeat: -1,
    });
  });

  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden"
      style={{ height: '60%', pointerEvents: 'none', borderRadius: '0 0 16px 16px' }}
      aria-hidden="true"
    >
      {/* Layer 1 */}
      <svg
        viewBox="20 0 1958 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{
          filter: 'drop-shadow(0px 10px 2px rgba(0,0,0,0.55)) blur(2px)',
        }}
      >
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
            {LAYER1_STOPS.map((s) => <stop key={s.offset} offset={s.offset} stopColor={s.color} />)}
          </linearGradient>
        </defs>
        <g ref={layer1Ref}>
          <g>
            <path d={WAVE_PATH} fill="url(#wg1)" />
            <path d={WAVE_PATH} fill="url(#wg1)" transform="translate(3956, 0) scale(-1, 1)" />
          </g>
          <g transform="translate(3915.3, 0)">
            <path d={WAVE_PATH} fill="url(#wg1)" />
            <path d={WAVE_PATH} fill="url(#wg1)" transform="translate(3956, 0) scale(-1, 1)" />
          </g>
        </g>
      </svg>

      {/* Layer 2 */}
      <svg
        viewBox="20 0 1958 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{ filter: 'blur(4px)' }}
      >
        <defs>
          <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
            {LAYER2_STOPS.map((s) => <stop key={s.offset} offset={s.offset} stopColor={s.color} />)}
          </linearGradient>
        </defs>
        <g ref={layer2Ref}>
          <g>
            <path d={WAVE_PATH} fill="url(#wg2)" />
            <path d={OPEN_WAVE_PATH} fill="none" stroke="#98C3F5" strokeWidth="10" strokeLinecap="round" />
            <path d={WAVE_PATH} fill="url(#wg2)" transform="translate(3956, 0) scale(-1, 1)" />
            <path d={OPEN_WAVE_PATH} fill="none" stroke="#98C3F5" strokeWidth="10" strokeLinecap="round" transform="translate(3956, 0) scale(-1, 1)" />
          </g>
          <g transform="translate(3915.3, 0)">
            <path d={WAVE_PATH} fill="url(#wg2)" />
            <path d={OPEN_WAVE_PATH} fill="none" stroke="#98C3F5" strokeWidth="10" strokeLinecap="round" />
            <path d={WAVE_PATH} fill="url(#wg2)" transform="translate(3956, 0) scale(-1, 1)" />
            <path d={OPEN_WAVE_PATH} fill="none" stroke="#98C3F5" strokeWidth="10" strokeLinecap="round" transform="translate(3956, 0) scale(-1, 1)" />
          </g>
        </g>
      </svg>

      {/* Layer 3 */}
      <svg
        viewBox="20 0 1958 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-full"
        style={{ filter: 'blur(6px)' }}
      >
        <defs>
          <linearGradient id="wg3" x1="0%" y1="0%" x2="100%" y2="0%">
            {LAYER3_STOPS.map((s) => <stop key={s.offset} offset={s.offset} stopColor={s.color} />)}
          </linearGradient>
        </defs>
        <g ref={layer3Ref}>
          <g>
            <path d={WAVE_PATH} fill="url(#wg3)" />
            <path d={WAVE_PATH} fill="url(#wg3)" transform="translate(3956, 0) scale(-1, 1)" />
          </g>
          <g transform="translate(3915.3, 0)">
            <path d={WAVE_PATH} fill="url(#wg3)" />
            <path d={WAVE_PATH} fill="url(#wg3)" transform="translate(3956, 0) scale(-1, 1)" />
          </g>
        </g>
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
