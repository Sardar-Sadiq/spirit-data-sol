import React from 'react';
import Hero from '../components/home/Hero';
import AboutScroll from '../components/home/AboutScroll';
import Contact from '../components/home/Contact';
import Services from '../components/home/Services';

// // ─── Services section ────────────────────────────────────────────────────────
// const Services = () => (
//   <section id="services" className="w-full" style={{ minHeight: '100vh' }}>
//     <h1>services</h1>
//   </section>
// );

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
