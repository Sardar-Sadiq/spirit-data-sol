import { useRef, Fragment } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// ─── Pre-process COPY into word groups with per-char global indices ──────────
const COPY = 'Spirit Data Solutions is committed to delivering quality, integrity, and excellence in everything we do. We have been building robust software systems that empower modern enterprises. Our highly skilled team of developers, designers, and QA engineers work in unison to solve complex business challenges with elegant technological solutions.';
const TOTAL_CHARS = COPY.length;
const WAVE_FACTOR = 0.02;

const WORDS_DATA = (() => {
  const words = COPY.split(' ');
  let idx = 0;
  return words.map((word) => {
    const chars = [...word].map((char, i) => ({ char, globalIndex: idx + i }));
    idx += word.length + 1;
    return chars;
  });
})();

// ─── ScrollChar at module scope ──────────────────────────────────────────────
const ScrollChar = ({ char, globalIndex, scrollYProgress }) => {
  const start = globalIndex / Math.max(TOTAL_CHARS, 1);
  const end   = Math.min(start + WAVE_FACTOR, 1);

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y       = useTransform(scrollYProgress, [start, end], [20, 0]);

  return (
    <motion.span style={{ opacity, y, display: 'inline-block', willChange: 'opacity, transform' }}>
      {char}
    </motion.span>
  );
};

// ─── AboutScroll section ─────────────────────────────────────────────────────
// Uses native Framer Motion scroll tracking relative to container ref,
// eliminating scroll listeners and getBoundingClientRect reflows.
const AboutScroll = () => {
  const sectionRef = useRef(null);
  
  // Track scroll progress of the container from pin-start to pin-end
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={sectionRef} id="about" className="w-full relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-24">
        <h1
          className="text-center tracking-tight poppins-medium max-w-5xl mx-auto"
          style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 2.75rem)',
            lineHeight: '1.6',
            color: 'var(--text-primary)',
          }}
        >
          {WORDS_DATA.map((wordChars, wi) => (
            <Fragment key={wi}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {wordChars.map(({ char, globalIndex }) => (
                  <ScrollChar
                    key={globalIndex}
                    char={char}
                    globalIndex={globalIndex}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </span>
              {wi < WORDS_DATA.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>
      </div>
    </section>
  );
};

export default AboutScroll;
