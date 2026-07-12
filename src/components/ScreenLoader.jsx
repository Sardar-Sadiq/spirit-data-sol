import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

// Register plugins once at module level (skill rule: register before first use, not inside component)
gsap.registerPlugin(DrawSVGPlugin, useGSAP);

const ScreenLoader = () => {
  const svgRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Slow, feather-point ease-out timeline — starts from tip (0%), gentle deceleration
      const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

      // 1. Position both paths at their feather tip start points (invisible, zero-length stroke)
      //    logo-path-1: feather tip is ~20% along the path from M426.5,100
      //    logo-path-2: inner wing tip is ~15% along its path from M161.5,147.5
      gsap.set('#logo-path-1', { drawSVG: '20% 20%' });
      gsap.set('#logo-path-2', { drawSVG: '15% 15%' });
      gsap.set(
        '#dot-1,#dot-2,#dot-3,#dot-4,#dot-5,#dot-6,#dot-7,#dot-8,#dot-9,#dot-10,#dot-11,#dot-12,#dot-13,#dot-14,#dot-15,#dot-16',
        { drawSVG: '0% 0%', opacity: 0 }
      );

      // 2. Draw primary outer wing from feather tip — '20% 120%' draws the full path
      //    starting at the tip (20%) and wrapping around to complete the stroke (120% = 0%–20%)
      tl.to('#logo-path-1', {
        drawSVG: '20% 120%',
        duration: 2.2,
        ease: 'power1.out',
      });

      // 3. Draw inner wing from its tip — same wrap-around approach
      tl.to(
        '#logo-path-2',
        {
          drawSVG: '15% 115%',
          duration: 1.8,
          ease: 'power1.out',
        },
        '-=1.0'
      );

      // 4. Stagger-reveal dots — unhurried, consistent ease-out
      tl.to(
        '#dot-1,#dot-2,#dot-3,#dot-4,#dot-5,#dot-6,#dot-7,#dot-8,#dot-9,#dot-10,#dot-11,#dot-12,#dot-13,#dot-14,#dot-15,#dot-16',
        {
          drawSVG: '0% 100%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power1.out',
        },
        '-=0.6'
      );

      // 5. Subtle final breathe — same calm pace
      tl.to(
        '#logo-path-1, #logo-path-2',
        {
          opacity: 0.75,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.out',
        },
        '+=0.15'
      );
    }, svgRef);

    return () => ctx.revert();
  }, { scope: svgRef });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex flex-col items-center gap-5" ref={svgRef}>

        {/* DrawSVG animated logo — inline SVG for GSAP to target DOM elements directly */}
        <svg
          id="spirit-draw-logo"
          width="220"
          height="154"
          viewBox="0 0 490 342"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Spirit Data Solutions Logo"
        >
          {/* Main outer wing */}
          <path
            id="logo-path-1"
            d="M426.5 100C386 108 360.5 109.5 339.5 104.5C349.5 119.3 381 121 395.5 120C365.1 149.6 345.5 153.333 339.5 151.5C304.5 130 266 113.833 244 106.5C159 77 119.5 59.5 99.5 0C63.1 95.2 145 137 190.5 146C205.833 148.333 247 157.3 289 174.5C344.2 204.1 338 238.5 328.5 260.5C365.5 232 359 184.5 347.5 170.5C353.9 171.3 359.833 167.167 362 165C369 187 373 220 344.5 255C321.7 283 260.667 285 233 282.5C139.5 273.5 83.5 298 67 342C126 293 179.5 311.5 246.5 307.5C342.5 303 371.5 271 391.5 252.5C415 230.762 430 187.167 437.5 163C444 146.5 456.5 120.5 490 117C487.6 109 475.667 107 470 107C470 103 459.7 96.4 426.5 100Z"
            stroke="url(#loader-gradient-1)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner wing */}
          <path
            id="logo-path-2"
            d="M161.5 147.5C128.173 137.357 119 131 115.5 126.5C115 164.5 143 174.5 180 180.5C155.5 190 130.667 180.333 123 174.5C130.2 203.7 155.667 206 167.5 203.5C178.167 201 209.831 196.562 251 200.5C308.5 206 313 242 291.5 230.5C273.5 218 273.5 212.5 214 214.5C128 219.3 86.5 254.5 78 272C123.5 242.5 235.5 248 236 253C236.4 257 215 261 205 264.5C279.5 280 350.5 262.5 316 211C281.381 159.323 207.5 161.5 161.5 147.5Z"
            stroke="url(#loader-gradient-2)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dot cluster */}
          <circle id="dot-1" cx="75" cy="123" r="15" stroke="#3787C2" strokeWidth="3" fill="none" />
          <circle id="dot-2" cx="93" cy="176" r="15" stroke="#3787C2" strokeWidth="3" fill="none" />
          <circle id="dot-3" cx="31" cy="152" r="9" stroke="#2A71A6" strokeWidth="2.5" fill="none" />
          <circle id="dot-4" cx="7.5" cy="183.5" r="7.5" stroke="#2A71A6" strokeWidth="2.5" fill="none" />
          <circle id="dot-5" cx="39.5" cy="217.5" r="6.5" stroke="#2A71A6" strokeWidth="2" fill="none" />
          <circle id="dot-6" cx="59.5" cy="185.5" r="6.5" stroke="#2A71A6" strokeWidth="2" fill="none" />
          <circle id="dot-7" cx="73" cy="198" r="6" stroke="#2A71A6" strokeWidth="2" fill="none" />
          <circle id="dot-8" cx="98" cy="140" r="4" stroke="#2A71A6" strokeWidth="2" fill="none" />
          <circle id="dot-9" cx="32" cy="99" r="5" stroke="#2A71A6" strokeWidth="2" fill="none" />
          <circle id="dot-10" cx="38" cy="124" r="3" stroke="#2A71A6" strokeWidth="1.5" fill="none" />
          <circle id="dot-11" cx="15.5" cy="232.5" r="3.5" stroke="#2A71A6" strokeWidth="1.5" fill="none" />
          <circle id="dot-12" cx="56.5" cy="249.5" r="3.5" stroke="#2A71A6" strokeWidth="1.5" fill="none" />
          <circle id="dot-13" cx="59.5" cy="156.5" r="3.5" stroke="#2A71A6" strokeWidth="1.5" fill="none" />
          <circle id="dot-14" cx="75.5" cy="231.5" r="2.5" stroke="#2A71A6" strokeWidth="1.5" fill="none" />
          <circle id="dot-15" cx="93.5" cy="230.5" r="4.5" stroke="#2A71A6" strokeWidth="1.5" fill="none" />
          <circle id="dot-16" cx="112" cy="198" r="6" stroke="#2A71A6" strokeWidth="1.5" fill="none" />

          {/* Gradient defs */}
          <defs>
            <linearGradient id="loader-gradient-1" x1="490" y1="117" x2="67" y2="342" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3787C2" />
              <stop offset="1" stopColor="#1C579A" />
            </linearGradient>
            <linearGradient id="loader-gradient-2" x1="316" y1="211" x2="78" y2="272" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3787C2" />
              <stop offset="1" stopColor="#1C579A" />
            </linearGradient>
          </defs>
        </svg>


        {/* Thin progress bar below */}
        <div
          className="w-40 h-px rounded-full overflow-hidden relative mt-2"
          style={{ background: 'var(--border)' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'easeOut' }}
            className="h-full"
            style={{ background: 'linear-gradient(90deg, #3787C2, #1C579A)' }}
          />
        </div>

      </div>
    </motion.div>
  );
};

export default ScreenLoader;
