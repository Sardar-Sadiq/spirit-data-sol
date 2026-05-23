import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (hashId) => {
    const element = document.getElementById(hashId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop flex flex-col items-center justify-center gap-6">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-2.5">
          <img 
            src="/logo.png" 
            alt="Spirit Data Logo" 
            className="h-7 w-auto object-contain"
          />
          <span className="text-base font-bold text-deep-blue tracking-tight">
            Spirit <span className="text-primary-blue font-semibold">Data</span>
          </span>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-on-surface-variant font-medium">
          <button 
            onClick={() => handleLinkClick('services')} 
            className="hover:text-primary-blue transition-colors duration-200 cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={() => handleLinkClick('projects')} 
            className="hover:text-primary-blue transition-colors duration-200 cursor-pointer"
          >
            Portfolio
          </button>
          <Link 
            to="/privacy" 
            className="hover:text-primary-blue transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms" 
            className="hover:text-primary-blue transition-colors duration-200"
          >
            Terms
          </Link>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary-blue transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary-blue transition-colors duration-200"
          >
            Twitter
          </a>
        </div>

        {/* Copyright Text */}
        <div className="text-xs text-slate-400 text-center tracking-wide mt-2">
          &copy; {currentYear} Spirit Data Solutions. Precision Minimalist Luxury. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
