import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Theme system
import { ThemeProvider } from './context/ThemeContext';
import ThemeRipple from './components/ThemeRipple';

// Layout & Navigation Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScreenLoader from './components/ScreenLoader';

// Page Components
import Home from './pages/Home';
import Careers from './pages/Careers';
import ProjectsComingSoon from './pages/ProjectsComingSoon';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeVerification from './pages/EmployeeVerification';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';

// LOADER DURATION in ms — must be >= ScreenLoader animation total length
const LOADER_DURATION = 2800;

/** Watches route changes and re-triggers the page loader on every navigation */
function RouteLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Routes that should NOT show the page loader
  const isExcluded = /^\/employees\/.+/.test(location.pathname);

  useEffect(() => {
    if (isExcluded) {
      setLoading(false);
      return;
    }
    // Show loader on every location change (including initial mount)
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), LOADER_DURATION);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && !isExcluded && <ScreenLoader key={location.pathname} />}
    </AnimatePresence>
  );
}

function AppInner() {
  const location = useLocation();

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

  const isEmployeeLogin = location.pathname === '/employees' || location.pathname === '/EmployeePortal';

  return (
    <>
      {/* Water-ripple theme transition overlay */}
      <ThemeRipple />

      <div
        className="min-h-screen flex flex-col select-none"
        style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
      >
        {/* DrawSVG Page Loader — fires on every route change */}
        <RouteLoader />

        <ScrollToTop />
        <Header />

        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/projects" element={<ProjectsComingSoon />} />
            <Route path="/employees" element={<EmployeeLogin />} />
            <Route path="/EmployeePortal" element={<EmployeeLogin />} />
            <Route path="/employees/:id" element={<EmployeeVerification />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {!isEmployeeLogin && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppInner />
      </Router>
    </ThemeProvider>
  );
}

export default App;
