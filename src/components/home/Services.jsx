import { Code, Cpu, Terminal, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const Services = () => {
  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted = { color: 'var(--text-muted)' };
  const surfaceBg = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

  const services = [
    { icon: <Code className="h-6 w-6 text-primary-blue" />, title: "Full Stack Web Development", description: "Crafting high-performance, responsive web applications using modern frameworks like React, Next.js, and Node.js. Tailored for enterprise scalability.", tag: "WEB DEV" },
    { icon: <Cpu className="h-6 w-6 text-primary-blue" />, title: "Full Stack Java Development", description: "Enterprise-grade Java solutions built with Spring Boot, Microservices architecture, and cloud integrations. Reliable, secure, and robust.", tag: "JAVA" },
    { icon: <Terminal className="h-6 w-6 text-primary-blue" />, title: "Full Stack Python Development", description: "Fast, clean, and data-driven solutions powered by Python, Django, FastAPI, and advanced machine learning models.", tag: "PYTHON" },
    { icon: <ShieldCheck className="h-6 w-6 text-primary-blue" />, title: "Selenium Testing", description: "Automated end-to-end quality assurance using Selenium WebDriver. Ensuring high test coverage, rapid deployments, and bug-free releases.", tag: "TESTING" },
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={surfaceBg}>
      <div className="max-w-container-max mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">What We Offer</span>
            <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>Strategic Engineering Services</h2>
            <p className="text-base md:text-lg" style={textSecondary}>A comprehensive suite of custom development and testing services designed to accelerate your digital growth.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="h-full flex flex-col justify-between p-6 rounded border shadow-level-1 hover:shadow-level-2 transform hover:-translate-y-1 transition-all duration-300 group"
                style={cardStyle}>
                <div>
                  <div className="p-3 bg-primary-blue/5 rounded-full w-fit mb-5 group-hover:bg-primary-blue/10 transition-colors duration-300">{svc.icon}</div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest" style={textMuted}>{svc.tag}</span>
                  <h3 className="text-lg font-bold mt-2 mb-3 group-hover:text-primary-blue transition-colors duration-200" style={textPrimary}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={textSecondary}>{svc.description}</p>
                </div>
                <button onClick={scrollToContact}
                  className="flex items-center gap-1 text-sm font-semibold text-primary-blue group-hover:text-deep-blue transition-colors duration-200 cursor-pointer">
                  Learn more <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
