import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Layout & Navigation Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import Careers from './pages/Careers';
import ProjectsComingSoon from './pages/ProjectsComingSoon';

function App() {
  const [loading, setLoading] = useState(true);

  // Preloader State Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); //snappy yet elegant 1.5s visual preloader
    return () => clearTimeout(timer);
  }, []);

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
        
        {/* Preloader Animation */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
            >
              <div className="flex flex-col items-center relative">
                {/* Animated spinning background ring */}
                <div className="relative flex items-center justify-center w-28 h-28">
                  <div className="absolute inset-0 border-[3px] border-primary-blue/10 border-t-primary-blue rounded-full animate-spin duration-1000" />
                  <motion.img 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src="/logo.png" 
                    alt="Spirit Data Logo" 
                    className="h-12 w-12 object-contain"
                  />
                </div>
                
                {/* Brand Header */}
                <h2 className="text-deep-blue font-bold tracking-tight text-2xl mt-6">
                  Spirit <span className="text-primary-blue font-semibold">Data</span>
                </h2>
                
                {/* Dynamic Tech Subtitle */}
                <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-2 animate-pulse">
                  Precision Minimalist Luxury
                </span>
                
                {/* Progress Bar indicator */}
                <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden mt-6 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.3, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-primary-blue to-deep-blue"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll resets on route change */}
        <ScrollToTop />
        
        {/* Persistent Premium Glassmorphic Header */}
        <Header />
        
        {/* Interactive Page Body */}
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/projects" element={<ProjectsComingSoon />} />
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
