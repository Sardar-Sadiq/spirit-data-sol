import React from 'react';
import { Rocket } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative hero-gradient text-white py-24 md:py-32 lg:py-40 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop overflow-hidden">
      <img
        src="/Group-8.jpg"
        alt="Spirit Data Zurich Office Workspace"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 select-none pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 via-deep-blue/70 to-deep-blue/20 z-0 pointer-events-none" />
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-sky-200 border border-white/20 mb-6 backdrop-blur-md">
            <Rocket className="h-3 w-3" /> Beyond Boundaries
          </span>
          <h1 className="text-white display-lg mb-6 leading-tight">
            Pioneering Digital <br />
            <span className="text-sky-300">Excellence</span> for <br />
            Global Enterprises
          </h1>
          <p className="text-sky-100 text-lg md:text-xl font-normal max-w-2xl mb-8 leading-relaxed">
            Ready to accelerate operations, drive growth, and unlock new markets? We specialize in high-impact software management and cutting-edge custom engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-deep-blue text-base font-semibold py-3 px-8 rounded shadow-level-1 hover:bg-sky-50 transition-all duration-300 hover:shadow-level-2 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="border border-white/30 text-white hover:bg-white/10 text-base font-semibold py-3 px-8 rounded transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
