import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Monitor scroll for subtle elevation adjustment
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Home', path: '/', isSection: false },
    { label: 'About', path: 'about', isSection: true },
    { label: 'Services', path: 'services', isSection: true },
    { label: 'Projects', path: 'projects', isSection: true },
    { label: 'Gallery', path: 'gallery', isSection: true },
    { label: 'Careers', path: '/careers', isSection: false },
  ];

  const isActive = (path, isSection) => {
    if (isSection) return false;
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? 'glass-nav shadow-level-1' 
          : 'glass-nav'
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop h-16 md:h-20 flex items-center justify-between">
        {/* Logo and Brand Title */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <img 
            src="/logo.png" 
            alt="Spirit Data Logo" 
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="text-lg md:text-xl font-bold tracking-tight text-deep-blue">
            Spirit <span className="text-primary-blue font-semibold">Data</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isSection ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className="text-on-surface-variant hover:text-primary-blue font-medium transition-colors duration-200 label-md cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`font-medium transition-colors duration-200 label-md border-b-2 py-1 px-0.5 ${
                  isActive(link.path, false)
                    ? 'text-primary-blue border-primary-blue'
                    : 'text-on-surface-variant hover:text-primary-blue border-transparent hover:border-primary-blue/30'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => {
              if (location.pathname !== '/careers') {
                navigate('/careers#apply');
              } else {
                const formElement = document.getElementById('apply-form');
                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-gradient text-white text-sm font-semibold py-2.5 px-6 rounded hover:opacity-95 transition-all duration-300 shadow-level-1 hover:shadow-level-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-deep-blue p-1 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden w-full border-t border-slate-200 bg-white"
          >
            <div className="flex flex-col gap-4 py-6 px-margin-mobile">
              {navLinks.map((link) => (
                link.isSection ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.path)}
                    className="text-left py-2 font-medium text-on-surface-variant hover:text-primary-blue border-b border-slate-100 cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 font-semibold border-b border-slate-100 ${
                      isActive(link.path, false)
                        ? 'text-primary-blue'
                        : 'text-on-surface-variant hover:text-primary-blue'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (location.pathname !== '/careers') {
                    navigate('/careers#apply');
                  } else {
                    const formElement = document.getElementById('apply-form');
                    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                  }
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
