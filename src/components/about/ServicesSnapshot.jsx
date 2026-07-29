import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Cloud, 
  ArrowUpRight, 
  ChevronRight,
  Database
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const serviceCards = [
  {
    id: 'web-dev',
    icon: Code2,
    tag: 'WEB DEVELOPMENT',
    title: 'Full Stack Web Apps',
    description: 'High-performance web portals built with React, Next.js, and TypeScript with responsive, pixel-perfect UX.',
    techStack: ['React', 'Next.js', 'Node.js', 'Tailwind'],
    link: '/projects'
  },
  {
    id: 'java-dev',
    icon: Cpu,
    tag: 'ENTERPRISE JAVA',
    title: 'Java Microservices',
    description: 'Robust backend systems engineered with Spring Boot, cloud architecture, and high-concurrency microservices.',
    techStack: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL'],
    link: '/projects'
  },
  {
    id: 'python-ai',
    icon: Terminal,
    tag: 'PYTHON & DATA',
    title: 'Python & AI Engineering',
    description: 'Data analytics, FastAPI backends, and machine learning pipelines designed for automated decision making.',
    techStack: ['Python', 'FastAPI', 'Pandas', 'PyTorch'],
    link: '/projects'
  },
  {
    id: 'qa-selenium',
    icon: ShieldCheck,
    tag: 'QUALITY ASSURANCE',
    title: 'Selenium QA Automation',
    description: 'Comprehensive end-to-end automated test suites guaranteeing zero regressions and rapid deployment cycles.',
    techStack: ['Selenium', 'WebDriver', 'JUnit', 'CI/CD Pipelines'],
    link: '/projects'
  },
  {
    id: 'gen-ai',
    icon: Sparkles,
    tag: 'ARTIFICIAL INTELLIGENCE',
    title: 'Gen-AI & LLM Solutions',
    description: 'Custom AI agents, RAG pipeline integration, and Intelligent Document Processing for enterprise automation.',
    techStack: ['LangChain', 'OpenAI', 'Vector DBs', 'Custom RAG'],
    link: '/projects'
  },
  {
    id: 'cloud-devops',
    icon: Cloud,
    tag: 'CLOUD ARCHITECTURE',
    title: 'DevOps & Infrastructure',
    description: 'Automated CI/CD pipelines, Docker containerization, and AWS/Azure cloud infrastructure management.',
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    link: '/projects'
  }
];

const ServicesSnapshot = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted = { color: 'var(--text-muted)' };
  const sectionBg = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

  return (
    <section id="services-snapshot" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative" style={sectionBg}>
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> SERVICES SNAPSHOT
              </span>
              <h2 className="headline-xl mt-4" style={textPrimary}>
                Core Capabilities & <span className="text-primary-blue">Engineering Services</span>
              </h2>
            </div>

            <p className="text-sm md:text-base max-w-md" style={textSecondary}>
              Explore our modular software services engineered to deliver speed, resilience, and business growth.
            </p>
          </div>
        </ScrollReveal>

        {/* Small Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((service, idx) => {
            const Icon = service.icon;
            const isHovered = hoveredId === service.id;

            return (
              <ScrollReveal key={service.id} delay={idx * 0.07}>
                <Link
                  to={service.link}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="h-full flex flex-col justify-between p-6 rounded-xl border shadow-level-1 hover:shadow-level-2 transition-all duration-300 group block relative"
                  style={{
                    ...cardStyle,
                    borderColor: isHovered ? '#1F6FD1' : 'var(--border)',
                    transform: isHovered ? 'translateY(-4px)' : 'none'
                  }}
                >
                  <div>
                    {/* Top Row: Icon & Arrow Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 bg-primary-blue/10 rounded-lg text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-primary-blue opacity-80 group-hover:opacity-100 transition-opacity">
                        <span>Explore</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </div>
                    </div>

                    {/* Tag */}
                    <span className="text-[10px] font-mono font-bold tracking-widest block mb-1.5" style={textMuted}>
                      {service.tag}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-blue transition-colors duration-200" style={textPrimary}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed mb-5" style={textSecondary}>
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom: Tech Stack Chips */}
                  <div className="pt-3 border-t flex flex-wrap gap-1.5" style={{ borderColor: 'var(--border-light)' }}>
                    {service.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] text-primary-blue font-medium border"
                        style={{ borderColor: 'var(--border-light)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* View All Services Footer Banner */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-blue text-white font-semibold text-sm shadow-level-1 hover:bg-[#0A2E5C] transition-all duration-300 hover:shadow-level-2 group"
            >
              <span>View All Services & Case Studies</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSnapshot;
