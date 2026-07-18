import React, { useRef } from 'react';
import About from '../components/home/About';
import Gallery from '../components/home/Gallery';
import Contact from '../components/home/Contact';
import ScrollReveal from '../components/ScrollReveal';

const AboutPage = () => {
  const aboutSectionRef = useRef(null);

  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };

  const handleScrollDown = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 w-full overflow-hidden" style={{ background: 'var(--bg)', transition: 'background 0.4s ease' }}>
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-between px-4 py-12 md:py-20">
        {/* Empty spacer to balance layout */}
        <div />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full select-none">
          <ScrollReveal>
            <h1 className="bebas-neue text-[clamp(4.8rem,24vw,300px)] leading-[0.85] tracking-[-0.01em] uppercase" style={textPrimary}>
              ABOUT <span className='text-primary-blue'>US</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-lg sm:text-xl md:text-2xl font-normal mt-6 leading-relaxed" style={textSecondary}>
              We pleased to welcome you to <br className="sm:hidden" />
              <span className="text-primary-blue font-semibold transition-all duration-300 hover:text-secondary-blue">
                Spirit Data Solutions.
              </span>
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll Down Indicator */}
        <ScrollReveal delay={0.5}>
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1 group cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Scroll down to content"
          >
            <span className="text-sm tracking-widest uppercase font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              Scroll Down
            </span>
            <span className="hero-scroll-dot" />
            <span className="text-base animate-bounce">↓</span>
          </button>
        </ScrollReveal>
      </section >

      {/* About Section wrapper */}
      < div ref={aboutSectionRef} >
        <About />
      </div >

      {/* Gallery Section */}
      < Gallery />

      {/* Get in Touch (Contact) Section */}
      < Contact />
    </div >
  );
};

export default AboutPage;
