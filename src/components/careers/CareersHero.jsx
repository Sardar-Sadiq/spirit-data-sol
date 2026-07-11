import React from 'react';
import { Sparkles } from 'lucide-react';

const CareersHero = () => {
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const surfaceBg   = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={surfaceBg}>
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Text Column */}
        <div className="lg:col-span-6 text-left flex flex-col items-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-blue/10 text-primary-blue dark:text-accent-sky mb-5">
            <Sparkles className="h-3 w-3" /> Join Our Vision
          </span>
          <h1 className="headline-xl lg:text-5xl font-bold leading-tight mb-5" style={textPrimary}>
            Build the Future <br />
            <span className="text-primary-blue dark:text-accent-sky">With Us</span>
          </h1>
          <p className="text-base md:text-lg mb-8 leading-relaxed" style={textSecondary}>
            Join a passionate team building innovative digital solutions for modern businesses. We're looking for thinkers, builders, and dreamers to push the boundaries of enterprise engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => scrollToSection('open-roles')}
              className="btn-gradient text-white text-base font-semibold py-3 px-8 rounded shadow-level-1 hover:shadow-level-2 hover:opacity-98 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              View Open Roles
            </button>
            <button 
              onClick={() => scrollToSection('benefits')}
              className="border text-base font-semibold py-3 px-8 rounded transition-all duration-300 hover:shadow-level-1 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer hover:opacity-90"
              style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
            >
              Our Culture
            </button>
          </div>
        </div>

        {/* Right Image Frame Column */}
        <div className="lg:col-span-6">
          <div className="relative rounded-lg overflow-hidden border shadow-level-2 group" style={{ borderColor: 'var(--border)' }}>
            <img 
              src="/careers-hero.png" 
              alt="Spirit Data Team Meeting" 
              className="w-full h-auto object-cover transform duration-700 hover:scale-102"
            />
            {/* Abstract Floating Tag Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 glass-nav px-4 py-2 rounded text-xs font-semibold tracking-wide border border-white/20" style={textPrimary}>
              BUILD THE FUTURE WITH US
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
