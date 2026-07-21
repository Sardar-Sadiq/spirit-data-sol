import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Logo3D from '../Logo3D';

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  // Only mount the 3D model when the hero section is in view
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCanvas(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GSAP animation for fluid mouse cursor tracking and automatic drifting
  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track cursor over the entire full-width hero section
    const trackingArea = container.closest('.hero-section') || container;

    let rect = container.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    const handleResize = () => {
      if (!container) return;
      rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    };
    window.addEventListener('resize', handleResize);

    // Starting positions in the center of the block
    let currentX = width / 2;
    let currentY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;
    let isHovering = false;
    let time = 0;

    // Set initial custom variables
    gsap.set(container, {
      '--x': `${currentX}px`,
      '--y': `${currentY}px`,
      '--radius': '140px',
    });

    // Tick handler for smooth lerped following and gentle auto-drifting
    const tick = () => {
      if (!isHovering) {
        // Slow Lissajous figure-8 pattern drift to make the page feel alive when idle
        time += 0.012;
        const centerX = width / 2;
        const centerY = height / 2;
        const ampX = Math.min(width * 0.25, 220);
        const ampY = Math.min(height * 0.18, 90);

        targetX = centerX + Math.sin(time) * ampX;
        targetY = centerY + Math.cos(time * 0.7) * ampY;
      }

      // Smooth interpolation (lerp) for heavy, fluid weight
      const ease = isHovering ? 0.08 : 0.035;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      container.style.setProperty('--x', `${currentX}px`);
      container.style.setProperty('--y', `${currentY}px`);
    };

    gsap.ticker.add(tick);

    const handleMouseMove = (e) => {
      isHovering = true;
      const r = container.getBoundingClientRect();
      targetX = e.clientX - r.left;
      targetY = e.clientY - r.top;
    };

    const handleMouseEnter = () => {
      isHovering = true;
      gsap.to(container, { '--radius': '270px', duration: 0.8, ease: 'power3.out' });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      gsap.to(container, { '--radius': '140px', duration: 0.9, ease: 'power3.out' });
    };

    // Support touch interactions for mobile screens
    const handleTouchMove = (e) => {
      isHovering = true;
      if (e.touches && e.touches[0]) {
        const r = container.getBoundingClientRect();
        targetX = e.touches[0].clientX - r.left;
        targetY = e.touches[0].clientY - r.top;
      }
    };

    const handleTouchStart = () => {
      isHovering = true;
      gsap.to(container, { '--radius': '220px', duration: 0.6, ease: 'power3.out' });
    };

    const handleTouchEnd = () => {
      isHovering = false;
      gsap.to(container, { '--radius': '140px', duration: 0.9, ease: 'power3.out' });
    };

    trackingArea.addEventListener('mousemove', handleMouseMove);
    trackingArea.addEventListener('mouseenter', handleMouseEnter);
    trackingArea.addEventListener('mouseleave', handleMouseLeave);
    trackingArea.addEventListener('touchmove', handleTouchMove, { passive: true });
    trackingArea.addEventListener('touchstart', handleTouchStart, { passive: true });
    trackingArea.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(tick);
      if (trackingArea) {
        trackingArea.removeEventListener('mousemove', handleMouseMove);
        trackingArea.removeEventListener('mouseenter', handleMouseEnter);
        trackingArea.removeEventListener('mouseleave', handleMouseLeave);
        trackingArea.removeEventListener('touchmove', handleTouchMove);
        trackingArea.removeEventListener('touchstart', handleTouchStart);
        trackingArea.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, { scope: containerRef });

  return (
    <section className="min-h-screen relative w-full flex flex-col items-center justify-between" style={{ background: 'var(--bg)' }}>
      {/* ── Main hero block: double layers for fluid reveal ── */}
      <div
        ref={containerRef}
        className="w-full min-h-[70vh] max-w-[960px] mx-auto relative flex items-center justify-center overflow-hidden flex-1"
      >
        {/* Layer 1: Base Layer (Outside the Spotlight)
            - Has a solid background (var(--bg)) to hide the 3D canvas completely.
            - Displays the text in a muted/secondary style.
        */}
        <div className="absolute inset-0 z-0 w-full h-full flex flex-col items-center justify-center bg-[var(--bg)]">
          <div className="flex flex-col items-center justify-center text-center pointer-events-none select-none py-16 md:py-20 lg:py-24 px-4">
            <h1 className="italiana text-[clamp(3rem,8vw,7rem)] leading-[1.05] tracking-[0.04em] uppercase mb-5 text-black dark:text-[var(--text-muted)] transition-colors duration-300">
              SPIRIT<br />DATA SOLUTIONS
            </h1>
            <p className="poppins-italic text-[clamp(0.875rem,1.5vw,1.125rem)] tracking-[0.02em] text-black dark:text-[var(--text-muted)] transition-colors duration-300">
              Pioneering Digital Excellence For Global Enterprises
            </p>
          </div>
        </div>

        {/* Layer 2: Reveal Layer (Inside the Spotlight)
            - Rendered on top of Layer 1.
            - Transparent background so it sits neatly over Layer 1.
            - Masked by CSS radial-gradient using GSAP-animated coordinates.
            - Contains the 3D Canvas (revealed inside the circle) and duplicate high-contrast text overlay.
        */}
        <div
          ref={canvasRef}
          className="absolute inset-0 z-10 w-full h-full pointer-events-none"
          style={{
            background: 'transparent',
            maskImage: 'radial-gradient(circle var(--radius) at var(--x) var(--y), black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle var(--radius) at var(--x) var(--y), black 30%, transparent 100%)',
          }}
        >
          {/* 3D Model — Sit behind text but inside this reveal layer */}
          <div className="absolute inset-0 z-0">
            {showCanvas && <Logo3D />}
          </div>

          {/* Duplicate Text overlay — Centers perfectly and aligns with Layer 1, but colored with premium contrast */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none select-none w-full h-full py-16 md:py-20 lg:py-24 px-4">
            <h1 className="italiana text-[clamp(3rem,8vw,7rem)] leading-[1.05] tracking-[0.04em] uppercase mb-5 text-black dark:text-white dark:[text-shadow:0_0_35px_rgba(88,181,255,0.35)] transition-all duration-300">
              SPIRIT<br />DATA SOLUTIONS
            </h1>
            <p className="poppins-italic text-[clamp(0.875rem,1.5vw,1.125rem)] tracking-[0.02em] text-primary-blue dark:text-accent-sky transition-colors duration-300">
              Pioneering Digital Excellence For Global Enterprises
            </p>
          </div>
        </div>
      </div>

      {/* ── Scroll Down indicator ── */}
      <div className="flex flex-col items-center gap-1 pb-32" style={{ color: 'var(--text-muted)' }}>
        <span className="text-sm tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Scroll Down</span>
        <span className="hero-scroll-dot" />
        <span className="text-base animate-bounce">↓</span>
      </div>
    </section>
  );
};

export default Hero;
