import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home',     path: '/',        isSection: false },
    { label: 'About',    path: 'about',    isSection: true  },
    { label: 'Services', path: 'services', isSection: true  },
    { label: 'Gallery',  path: 'gallery',  isSection: true  },
    { label: 'Projects', path: '/projects', isSection: false },
    { label: 'Careers',  path: '/careers',  isSection: false },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 glass-nav ${scrolled ? 'shadow-level-1' : ''}`}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <img
            src="/spirit-svg.png"
            alt="Spirit Data Logo"
            className="h-10 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isSection ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className="font-medium transition-colors duration-200 label-md cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#1F6FD1'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`font-medium transition-colors duration-200 label-md border-b-2 py-1 px-0.5 ${
                  isActive(link.path)
                    ? 'text-primary-blue border-primary-blue'
                    : 'border-transparent'
                }`}
                style={!isActive(link.path) ? { color: 'var(--text-secondary)' } : {}}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right: Theme Toggle + Apply button */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => {
              if (location.pathname !== '/careers') {
                navigate('/careers#apply');
              } else {
                document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-gradient text-white text-sm font-semibold py-2.5 px-6 rounded hover:opacity-95 transition-all duration-300 shadow-level-1 hover:shadow-level-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 focus:outline-none"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden w-full"
            style={{
              borderTop: '1px solid var(--border)',
              background: 'var(--bg-card)',
            }}
          >
            <div className="flex flex-col gap-4 py-6 px-margin-mobile">
              {navLinks.map((link) =>
                link.isSection ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.path)}
                    className="text-left py-2 font-medium border-b cursor-pointer"
                    style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-light)' }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 font-semibold border-b ${isActive(link.path) ? 'text-primary-blue' : ''}`}
                    style={{
                      color: isActive(link.path) ? undefined : 'var(--text-secondary)',
                      borderColor: 'var(--border-light)',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (location.pathname !== '/careers') navigate('/careers#apply');
                  else document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-gradient text-white text-center font-semibold py-3 px-6 rounded mt-2 cursor-pointer shadow-level-1"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
