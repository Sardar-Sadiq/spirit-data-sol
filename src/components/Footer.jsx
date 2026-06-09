import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (hashId) => {
    document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="py-12 border-t"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop flex flex-col items-center justify-center gap-6">

        {/* Logo and Brand */}
        <div className="flex flex-col items-center gap-2.5">
          <img src="/spirit-svg.png" alt="Spirit Data Logo" className="h-16 w-auto object-contain" />
          <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Spirit <span className="text-primary-blue font-semibold">Data Solutions</span>
          </span>
        </div>

        {/* Footer Nav */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {[
            { type: 'btn', id: 'services', label: 'Services' },
            { type: 'btn', id: 'projects', label: 'Portfolio' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleLinkClick(id)}
              className="hover:text-primary-blue transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
          {[
            { to: '/privacy', label: 'Privacy Policy' },
            { to: '/terms', label: 'Terms' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="hover:text-primary-blue transition-colors duration-200">
              {label}
            </Link>
          ))}
          {[
            { href: 'https://linkedin.com', label: 'LinkedIn' },
            { href: 'https://twitter.com', label: 'Twitter' },
          ].map(({ href, label }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className="hover:text-primary-blue transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs text-center tracking-wide mt-1" style={{ color: 'var(--text-muted)' }}>
          &copy; {currentYear} Spirit Data Solutions.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
