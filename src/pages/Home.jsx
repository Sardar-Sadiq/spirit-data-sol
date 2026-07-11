import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Gallery from '../components/home/Gallery';
import Contact from '../components/home/Contact';

const Home = () => {
  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  return (
    <div className="flex-1 w-full overflow-hidden" style={sectionBg}>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Home;
