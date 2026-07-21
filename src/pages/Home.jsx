import React from 'react';
import Hero from '../components/home/Hero';
import AboutScroll from '../components/home/AboutScroll';
import Contact from '../components/home/Contact';
import Services from '../components/home/Services';
// ─── Home page ────────────────────────────────────────────────────────────────
const Home = () => {

  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };
  return (
    <div className="flex-1 w-full" style={sectionBg}>
      <Hero />
      <AboutScroll />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
