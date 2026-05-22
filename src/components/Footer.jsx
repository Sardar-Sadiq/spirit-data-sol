import { Link } from 'react-router-dom'


const footerSections = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/projects' },
    { label: 'Gallery', to: '/gallery' },
  ],
  Connect: [
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '/careers' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
  ],
}

const socials = [
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { Icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-dark">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Spirit Data Solutions" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-[#aac7ff] text-sm leading-relaxed max-w-sm mb-6">
              Pioneering digital excellence for global enterprises through precision engineering, deep collaboration, and an unwavering commitment to quality outcomes.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-[#aac7ff] hover:text-white hover:bg-primary-hover hover:border-primary-hover transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-accent mb-4">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-[#aac7ff] hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#aac7ff]/70 text-xs">
            © 2025 Spirit Data Solutions. Precision Engineered. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-5 w-auto brightness-0 invert opacity-40" />
            <span className="text-[#aac7ff]/50 text-xs font-semibold">Spirit Data</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
