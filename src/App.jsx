import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// Theme system
import { ThemeProvider } from './context/ThemeContext';
import ThemeRipple from './components/ThemeRipple';

// Layout & Navigation Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScreenLoader from './components/ScreenLoader';
import BottomBlurOverlay from './components/BottomBlurOverlay';

// Core Home Page (Eager load for instantaneous initial page render)
import Home from './pages/Home';

// Lazy Loaded Pages (Code-split for maximum performance)
const AboutPage = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/Services'));
const Careers = lazy(() => import('./pages/Careers'));
const ProjectsComingSoon = lazy(() => import('./pages/ProjectsComingSoon'));
const EmployeeLogin = lazy(() => import('./pages/EmployeeLogin'));
const EmployeeVerification = lazy(() => import('./pages/EmployeeVerification'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));

// LOADER DURATION in ms — must be >= ScreenLoader animation total length
const LOADER_DURATION = 2800;

/** Watches route changes and re-triggers the page loader on every navigation */
function RouteLoader() {
  const location = useLocation();
  const isExcluded = /^\/employees\/.+/.test(location.pathname);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [loading, setLoading] = useState(!isExcluded);

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setLoading(!isExcluded);
  }

  useEffect(() => {
    if (isExcluded || !loading) return;
    const timer = setTimeout(() => setLoading(false), LOADER_DURATION);
    return () => clearTimeout(timer);
  }, [location.pathname, isExcluded, loading]);

  return (
    <AnimatePresence mode="wait">
      {loading && !isExcluded && <ScreenLoader key={location.pathname} />}
    </AnimatePresence>
  );
}

function AppInner() {
  const location = useLocation();

  const isEmployeeLogin = location.pathname === '/employees' || location.pathname === '/EmployeePortal';

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {/* Water-ripple theme transition overlay */}
      <ThemeRipple />

      <div
        className="min-h-screen flex flex-col select-none relative"
        style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
      >
        {/* DrawSVG Page Loader — fires on every route change */}
        <RouteLoader />

        <ScrollToTop />
        <Header />

        <main className="flex-grow flex flex-col">
          <Suspense fallback={
            <div className="flex-grow flex items-center justify-center min-h-[60vh]">
              <div className="w-10 h-10 border-3 border-[var(--border)] border-t-[#1F6FD1] rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
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
          </Suspense>
        </main>

        {!isEmployeeLogin && <Footer />}
        <BottomBlurOverlay />
      </div>
    </ReactLenis>
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
