import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  Headphones,
  ArrowRight,
  Sparkles,
  GitCommit
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const processSteps = [
  {
    step: 1,
    id: 'discovery',
    title: 'Discovery',
    shortDesc: 'Requirements & Feasibility',
    icon: Search,
    description: 'We align on business objectives, technical constraints, user needs, and architectural requirements through deep-dive stakeholder workshops.',
    activities: [
      'Stakeholder Alignment & Goal Definition',
      'Technical Feasibility & Scope Analysis',
      'System Architecture Blueprinting',
      'Resource & Timeline Estimation'
    ],
    deliverable: 'Technical Requirements Spec (TRS) & Project Scope'
  },
  {
    step: 2,
    id: 'planning',
    title: 'Planning',
    shortDesc: 'Sprint Roadmap & Stack',
    icon: MapPin,
    description: 'We construct an agile project execution plan, selecting optimal tech stacks, database schemas, and bi-weekly sprint deliverables.',
    activities: [
      'Agile Sprint Roadmapping',
      'Tech Stack Selection (React, Java, Python)',
      'Database & Microservices Schema Design',
      'Risk Assessment & Mitigation Strategy'
    ],
    deliverable: 'Agile Sprint Backlog & Architecture Diagram'
  },
  {
    step: 3,
    id: 'design',
    title: 'Design',
    shortDesc: 'UI/UX & System Models',
    icon: Palette,
    description: 'Our design engineering crafts responsive, glassmorphic UI designs and interactive prototypes matching enterprise aesthetics.',
    activities: [
      'Wireframing & Information Architecture',
      'High-Fidelity Interactive UI Prototypes',
      'Design System & Component Token Setup',
      'Accessibility (WCAG) & Mobile Optimization'
    ],
    deliverable: 'Figma UI Prototype & Design System Tokens'
  },
  {
    step: 4,
    id: 'development',
    title: 'Development',
    shortDesc: 'Agile Clean Code',
    icon: Code,
    description: 'Our senior full-stack engineers write modular, maintainable code following clean architecture patterns and zero-trust security.',
    activities: [
      'Frontend (React/Next.js) & Backend (Java/Python) Sprints',
      'RESTful & GraphQL API Engineering',
      'Peer Code Reviews & Static Analysis',
      'Bi-Weekly Staging Environment Demos'
    ],
    deliverable: 'Production-Ready Code Repositories & APIs'
  },
  {
    step: 5,
    id: 'testing',
    title: 'Testing',
    shortDesc: 'Automated QA & Security',
    icon: CheckCircle,
    description: 'We enforce automated end-to-end testing with Selenium and Vitest to ensure zero regressions, high performance, and security compliance.',
    activities: [
      'Automated Selenium & Vitest Test Execution',
      'API Security & Vulnerability Auditing',
      'Cross-Browser & Device Compatibility Tests',
      'Load Testing & Sub-Second Latency Tuning'
    ],
    deliverable: 'Automated Test Suite & Quality Audit Report'
  },
  {
    step: 6,
    id: 'deployment',
    title: 'Deployment',
    shortDesc: 'CI/CD & Cloud Launch',
    icon: Rocket,
    description: 'We automate cloud deployment pipelines to launch your solution with zero downtime, robust logging, and automated backups.',
    activities: [
      'CI/CD Pipeline Setup (GitHub Actions / Jenkins)',
      'Cloud Infrastructure Provisioning (AWS / Vercel)',
      'SSL Security & Domain DNS Configuration',
      'Zero-Downtime Production Cutover'
    ],
    deliverable: 'Live Production Platform & CI/CD Pipeline'
  },
  {
    step: 7,
    id: 'support',
    title: 'Support',
    shortDesc: 'SLA & Scaling Support',
    icon: Headphones,
    description: 'Post-launch, we provide continuous monitoring, SLA-backed maintenance, security patching, and proactive feature enhancements.',
    activities: [
      '24/7 Uptime & Error Performance Monitoring',
      'SLA-Backed Bug Fixes & Patching',
      'Performance Optimization & Database Tuning',
      'Iterative Feature Enhancements'
    ],
    deliverable: 'Monthly Health Report & Continuous Maintenance'
  }
];

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState(1);

  const currentStepObj = processSteps.find((s) => s.step === activeStep) || processSteps[0];

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'background 0.4s ease, border-color 0.4s ease'
  };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted = { color: 'var(--text-muted)' };
  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  return (
    <section id="our-process" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative overflow-hidden" style={sectionBg}>
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-blue/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <span className="text-primary-blue text-xs font-extrabold uppercase tracking-widest bg-primary-blue/10 border border-primary-blue/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5" /> HOW WE WORK
            </span>
            <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>
              Our Proven <span className="text-primary-blue">7-Phase Engineering Lifecycle</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={textSecondary}>
              From initial discovery to continuous post-launch support, our structured workflow ensures transparency, speed, and software excellence.
            </p>
          </div>
        </ScrollReveal>

        {/* 7-Step Interactive Progress Stepper Bar */}
        <ScrollReveal delay={0.1}>
          <div className="relative mb-12 md:mb-16">
            {/* Connecting Track Line */}
            <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-0.5 bg-[var(--border)] -translate-y-1/2 z-0" />
            <div
              className="hidden lg:block absolute top-1/2 left-6 h-0.5 bg-primary-blue -translate-y-1/2 z-0 transition-all duration-500 ease-out"
              style={{ width: `${((activeStep - 1) / (processSteps.length - 1)) * 96}%` }}
            />

            {/* Stepper Buttons Container */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 relative z-10">
              {processSteps.map((s) => {
                const Icon = s.icon;
                const isActive = activeStep === s.step;
                const isPassed = s.step < activeStep;

                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                      isActive
                        ? 'bg-primary-blue text-white border-primary-blue shadow-level-2 scale-[1.03]'
                        : isPassed
                        ? 'bg-[var(--bg-card)] border-primary-blue/40 text-primary-blue'
                        : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-secondary)] hover:border-primary-blue/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs mb-2 transition-all ${
                      isActive
                        ? 'bg-white text-primary-blue shadow-xs'
                        : isPassed
                        ? 'bg-primary-blue/10 text-primary-blue'
                        : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                    }`}>
                      0{s.step}
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary-blue'}`} />
                      <span className="font-bold text-xs sm:text-sm tracking-tight">{s.title}</span>
                    </div>

                    <span className={`text-[10px] hidden sm:block leading-tight ${isActive ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                      {s.shortDesc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Selected Step Detailed View Card */}
        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepObj.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border p-6 sm:p-8 md:p-12 shadow-level-2 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative overflow-hidden"
              style={cardStyle}
            >
              {/* Left Column: Title, Icon, Description */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-bold bg-primary-blue text-white px-3 py-1 rounded-full">
                      PHASE 0{currentStepObj.step}
                    </span>
                    <span className="text-xs font-mono font-bold text-primary-blue uppercase tracking-widest">
                      {currentStepObj.shortDesc}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary-blue/10 rounded-xl text-primary-blue">
                      <currentStepObj.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={textPrimary}>
                      {currentStepObj.title} Phase
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed mb-6" style={textSecondary}>
                    {currentStepObj.description}
                  </p>
                </div>

                {/* Deliverable Badge Box */}
                <div className="p-4 rounded-xl bg-primary-blue/5 border border-primary-blue/20 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary-blue mb-0.5">
                      Key Phase Milestone
                    </div>
                    <div className="text-xs sm:text-sm font-semibold" style={textPrimary}>
                      {currentStepObj.deliverable}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Activities List */}
              <div className="lg:col-span-6 bg-[var(--bg-surface)] p-6 sm:p-8 rounded-xl border border-[var(--border)] flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={textMuted}>
                    Core Sprint Activities
                  </h4>
                  <ul className="space-y-3.5 mb-6">
                    {currentStepObj.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-medium" style={textSecondary}>
                        <div className="w-5 h-5 rounded-full bg-primary-blue/10 text-primary-blue flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step Controls (Next / Prev) */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                    className="text-xs font-semibold px-3 py-1.5 rounded border border-[var(--border)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
                    style={textSecondary}
                  >
                    ← Previous Phase
                  </button>

                  <div className="text-xs font-mono" style={textMuted}>
                    Step {activeStep} of {processSteps.length}
                  </div>

                  <button
                    disabled={activeStep === processSteps.length}
                    onClick={() => setActiveStep((prev) => Math.min(processSteps.length, prev + 1))}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded bg-primary-blue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-blue/90 transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    Next Phase <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default OurProcess;
