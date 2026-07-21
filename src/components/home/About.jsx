import { Rocket, Eye, Compass } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import Logo3D from '../Logo3D';

const About = () => {
  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted    = { color: 'var(--text-muted)' };
  const sectionBg   = { background: 'var(--bg)',        transition: 'background 0.4s ease' };

  const identities = [
    { label: "Integrity",      desc: "Honesty and alignment in all interactions." },
    { label: "Innovation",     desc: "Pioneering technological breakthroughs." },
    { label: "Teamwork",       desc: "Synchronized collaboration globally." },
    { label: "Customer First", desc: "Prioritizing client goals and trust." },
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={sectionBg}>
      <div className="max-w-container-max mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">Who We Are</span>
            <h2 className="headline-xl mt-4 mb-6" style={textPrimary}>
              We are pleased to welcome you to <br />
              <span className="text-primary-blue transition-all duration-300 hover:text-secondary-blue">Spirit Data Solutions</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ alignItems: 'stretch' }}>
          <div className="flex flex-col" style={{ minHeight: '100%' }}>
            <ScrollReveal delay={0.2} className="flex flex-col flex-1 h-full">
              <div className="relative rounded-2xl overflow-hidden group" style={{ flex: 1, minHeight: '480px' }}>
                <div className="absolute inset-0"><Logo3D /></div>
              </div>
            </ScrollReveal>
          </div>

          <div className="flex flex-col justify-center text-left">
            <ScrollReveal delay={0.3}>
              <p className="text-base md:text-lg mb-6 leading-relaxed" style={textSecondary}>
                Spirit Data Solutions is committed to delivering quality, integrity, and excellence in everything we do. We have been building robust software systems that empower modern enterprises. Our highly skilled team of developers, designers, and QA engineers work in unison to solve complex business challenges with elegant technological solutions.
              </p>
              <p className="text-base mb-8 leading-relaxed" style={textSecondary}>
                Our goal is to build long-term relationships with our clients, serving as a trusted technology partner at every step.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                { icon: <Rocket className="h-5 w-5 text-primary-blue animate-pulse" />, title: 'Mission', text: 'To build software solutions that empower businesses to innovate and grow. We deliver secure, scalable, and high-performance digital products.' },
                { icon: <Eye className="h-5 w-5 text-primary-blue" />, title: 'Vision', text: 'To be the global benchmark for enterprise software development, recognized for precision, engineering excellence, and customer trust.' },
              ].map(({ icon, title, text }, i) => (
                <ScrollReveal key={title} delay={0.4 + i * 0.1}>
                  <div className="p-5 rounded border shadow-level-1 hover:shadow-level-2 transition-all duration-300" style={cardStyle}>
                    <div className="flex items-center gap-2 mb-3">{icon}<h3 className="text-base font-bold" style={textPrimary}>{title}</h3></div>
                    <p className="text-sm leading-relaxed" style={textSecondary}>{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.6}>
              <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5" style={textMuted}>
                  <Compass className="h-3.5 w-3.5" /> Our Core Values
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {identities.map((item, idx) => (
                    <div key={idx} className="flex flex-col border rounded-md pt-4 p-2" style={{ borderColor: 'var(--border)' }}>
                      <span className="text-sm font-semibold" style={textPrimary}>{item.label}</span>
                      <span className="text-xs mt-0.5" style={textMuted}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
