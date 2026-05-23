import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';

// Layout & Navigation Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import Careers from './pages/Careers';

function App() {
  // Global Lenis Smooth Scrolling Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 2.0,
      infinite: false,
    });

    // Request Animation Frame RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    const animationFrameId = requestAnimationFrame(raf);

    // Clean up animation frame and lenis instance on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-on-surface select-none">
        {/* Scroll resets on route change */}
        <ScrollToTop />
        
        {/* Persistent Premium Glassmorphic Header */}
        <Header />
        
        {/* Interactive Page Body */}
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            {/* Fallback route back to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        {/* Standard Design-System Bound Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
