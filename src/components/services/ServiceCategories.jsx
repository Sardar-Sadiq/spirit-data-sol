import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Cpu,
  Terminal,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Layers,
  Zap,
  Server
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const serviceCategoriesData = [
  {
    id: 'web-dev',
    title: 'Full Stack Web Development',

    icon: Code,
    tag: 'WEB DEVELOPMENT',
    description: 'We architect and build modern, ultra-fast web platforms using React, Next.js, TypeScript, and Node.js. Designed for high traffic, SEO dominance, and flawless user experiences across all viewports.',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL / REST API'],
    deliverables: [
      'Custom React & Next.js Web Applications',
      'High-Performance Progressive Web Apps (PWAs)',
      'Enterprise API Integration & Middleware',
      'Responsive Glassmorphic UI/UX Systems'
    ],
    highlight: 'Sub-second page loading speed & enterprise-grade UI precision.'
  },
  {
    id: 'java-dev',
    title: 'Full Stack Java Development',

    icon: Cpu,
    tag: 'ENTERPRISE JAVA',
    description: 'Empower your enterprise with mission-critical Java backends. We specialize in Spring Boot microservices, high-concurrency transaction processing, secure REST APIs, and seamless database ORMs.',
    technologies: ['Java 21', 'Spring Boot', 'Spring Cloud', 'Microservices', 'PostgreSQL', 'Docker / Kubernetes'],
    deliverables: [
      'Spring Boot Cloud Microservices Architecture',
      'Zero-Trust Enterprise Security & OAuth2/JWT',
      'High-Throughput Relational Database Design',
      'Automated CI/CD Deployment Pipelines'
    ],
    highlight: 'Engineered for 99.99% uptime SLAs and enterprise-scale architecture with rigorous, multi-layered data security.'
  },
  {
    id: 'python-dev',
    title: 'Full Stack Python & AI Services',

    icon: Terminal,
    tag: 'PYTHON & DATA',
    description: 'Leverage the versatility of Python for high-velocity backend engines, data manipulation, and modern API gateways. Ideal for startups looking for rapid product execution and ML capabilities.',
    technologies: ['Python 3.12', 'Django', 'FastAPI', 'Pandas / NumPy', 'AsyncIO', 'Redis Cache'],
    deliverables: [
      'Scalable FastAPI & Django Backend Engines',
      'Automated Data Processing & Extraction Pipelines',
      'Asynchronous Event-Driven Architectures',
      'Custom Analytics & Admin Dashboards'
    ],
    highlight: 'Clean, maintainable Python code built for rapid iteration.'
  },
  {
    id: 'qa-testing',
    title: 'Automation & Selenium QA Testing',
    icon: ShieldCheck,
    tag: 'QUALITY ASSURANCE',
    description: 'Ensure flawless releases with automated end-to-end testing pipelines. We build custom test automation frameworks using Selenium WebDriver, PyTest, and Vitest to detect bugs before deployment.',
    technologies: ['Selenium WebDriver', 'Vitest / Jest', 'PyTest', 'Postman / Newman', 'CI/CD Pipelines', 'Cross-Browser Grid'],
    deliverables: [
      'Automated E2E Regression Test Suites',
      'API & Integration Testing Automation',
      'Continuous Integration Test Triggers',
      'Comprehensive QA Metrics & Failure Reports'
    ],
    highlight: '100% test coverage strategy for zero-defect software releases.'
  },
  {
    id: 'gen-ai',
    title: 'Gen-AI & Intelligent Solutions',
    icon: Sparkles,
    tag: 'GEN-AI INNOVATION',
    description: 'Transform your business capabilities with cuting-edge AI integration. From fine-tuned LLM agents and RAG vector search to intelligent document parsing, we bring AI into your workflow.',
    technologies: ['OpenAI API', 'LangChain', 'Llama 3', 'Vector DBs (Chroma/Pinecone)', 'Python AI', 'Prompt Engineering'],
    deliverables: [
      'Custom LLM Agents & Intelligent Assistants',
      'RAG (Retrieval-Augmented Generation) Systems',
      'Automated AI-Powered Content Processing',
      'Secure On-Premise / Private AI Model Deployment'
    ],
    highlight: 'Future-proof AI capabilities tailored for immediate business ROI.'
  }
];

const ServiceCategories = () => {
  const [selectedId, setSelectedId] = useState(serviceCategoriesData[0].id);

  const activeService = serviceCategoriesData.find((s) => s.id === selectedId) || serviceCategoriesData[0];

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'background 0.4s ease, border-color 0.4s ease'
  };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted = { color: 'var(--text-muted)' };
  const sectionBg = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="service-categories" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative overflow-hidden" style={sectionBg}>
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <span className="text-primary-blue text-xs font-extrabold uppercase tracking-widest bg-primary-blue/10 border border-primary-blue/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> CORE ENGINEERING DISCIPLINES
            </span>
            <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>
              Tailored Engineering Solutions for <span className="text-primary-blue">Startup Growth</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={textSecondary}>
              Explore our core specializations designed to take your technical product from concept to production-ready market leader.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Selection Tabs Bar */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-12">
            {serviceCategoriesData.map((service) => {
              const Icon = service.icon;
              const isActive = selectedId === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedId(service.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${isActive
                    ? 'bg-primary-blue text-white shadow-level-2 scale-[1.02]'
                    : 'bg-[var(--bg-card)] border border-[var(--border)] hover:border-primary-blue/50 text-[var(--text-secondary)] hover:text-primary-blue'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary-blue'}`} />
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Service Detailed Showcase Card */}
        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border p-6 sm:p-8 md:p-12 shadow-level-2 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative overflow-hidden"
              style={cardStyle}
            >
              {/* Subtle Top Border Highlight Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-sky-400 to-primary-blue" />

              {/* Left Details Column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary-blue/10 rounded-xl text-primary-blue">
                      <activeService.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-primary-blue uppercase bg-primary-blue/10 px-3 py-1 rounded-full border border-primary-blue/20">
                      {activeService.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3" style={textPrimary}>
                    {activeService.title}
                  </h3>

                  <p className="text-base sm:text-lg font-medium text-primary-blue mb-4">
                    {activeService.subtitle}
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed mb-6" style={textSecondary}>
                    {activeService.description}
                  </p>

                  {/* Key Highlight Banner */}
                  <div className="p-4 rounded-xl bg-primary-blue/5 border border-primary-blue/20 mb-6 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary-blue shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold" style={textPrimary}>
                      {activeService.highlight}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 bg-gradient-to-b from-primary-blue to-deep-blue text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-level-1 hover:shadow-level-2 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    Discuss Your {activeService.tag} Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Deliverables & Tech Stack Column */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[var(--bg-surface)] p-6 sm:p-8 rounded-xl border border-[var(--border)]">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={textMuted}>
                    Key Deliverables
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {activeService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium" style={textSecondary}>
                        <CheckCircle2 className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-3" style={textMuted}>
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeService.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[var(--bg-card)] border border-[var(--border)] text-primary-blue"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>


      </div>
    </section>
  );
};

export default ServiceCategories;
