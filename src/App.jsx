import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Theme system
import { ThemeProvider } from './context/ThemeContext';
import ThemeRipple from './components/ThemeRipple';

// Layout & Navigation Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import Careers from './pages/Careers';
import ProjectsComingSoon from './pages/ProjectsComingSoon';

function AppInner() {
  const [loading, setLoading] = useState(true);

  // Preloader State Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Global Lenis Smooth Scrolling Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 2.0,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      {/* Water-ripple theme transition overlay */}
      <ThemeRipple />

      <div
        className="min-h-screen flex flex-col select-none"
        style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
      >
        {/* Preloader Animation */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
              style={{ background: 'var(--bg)' }}
            >
              <div className="flex flex-col items-center relative">
                <div className="relative flex items-center justify-center w-28 h-28">
                  <div className="absolute inset-0" />
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    src="/logo.png"
                    alt="Spirit Data Logo"
                    className="h-40 w-40 object-contain"
                  />
                </div>

                <h2 className="font-bold tracking-tight text-2xl -mt-2" style={{ color: 'var(--text-primary)' }}>
                  Spirit <span className="text-primary-blue font-semibold">Data Solutions</span>
                </h2>

                {/* Progress Bar */}
                <div className="w-48 h-1 rounded-full overflow-hidden mt-6 relative" style={{ background: 'var(--border)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.3, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-primary-blue to-deep-blue"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollToTop />
        <Header />

        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/projects" element={<ProjectsComingSoon />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
