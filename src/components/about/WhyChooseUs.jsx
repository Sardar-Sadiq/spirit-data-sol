import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Layers, 
  Users, 
  Lock, 
  CheckCircle2, 
  TrendingUp, 
  Building2 
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const stats = [
  { label: 'Client Satisfaction', value: '99.8%', desc: 'Proven enterprise satisfaction rate' },
  { label: 'Projects Delivered', value: '150+', desc: 'Robust full-stack applications' },
  { label: 'Uptime SLA Guarantee', value: '99.99%', desc: 'Reliable cloud & microservices' },
  { label: 'Tech Experts', value: '45+', desc: 'Engineers, architects & QA leads' },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Enterprise Engineering Precision',
    description: 'We construct maintainable, high-performance software with zero-trust security architecture, modular components, and comprehensive automated test coverage.',
    highlights: ['Zero-Trust Architecture', 'Sub-second Latency', 'Clean Code Standards'],
    tag: 'RELIABILITY'
  },
  {
    icon: Zap,
    title: 'Agile Velocity & Transparency',
    description: 'Bi-weekly sprint demos, live staging builds, and real-time Slack/Teams communication ensure complete visibility at every development milestone.',
    highlights: ['Weekly Sprint Demos', 'Live Staging Envs', 'Direct Slack Access'],
    tag: 'PROCESS'
  },
  {
    icon: Layers,
    title: 'End-to-End Delivery Ownership',
    description: 'From initial technical architecture and UI/UX design to DevOps cloud infrastructure and post-production monitoring, we own the full lifecycle.',
    highlights: ['Full SDLC Ownership', 'DevOps & CI/CD', 'Automated QA Pipelines'],
    tag: 'FULL STACK'
  },
  {
    icon: Award,
    title: 'Deep Domain Mastery',
    description: 'Specialized expertise across modern web stacks (React/Next.js), enterprise backend engines (Java Spring Boot), Python AI/ML, and Selenium QA suites.',
    highlights: ['React & Next.js Stacks', 'Spring Boot & Java', 'Python & Gen-AI Automation'],
    tag: 'EXPERTISE'
  },
  {
    icon: Users,
    title: 'Dedicated Client Partnership',
    description: 'You gain a proactive technical partner, not just vendor contractors. We align with your business KPIs and scale engineering resources as you grow.',
    highlights: ['Dedicated Tech Lead', 'SLA-backed SLA Support', 'Flexible Scaling'],
    tag: 'PARTNERSHIP'
  },
  {
    icon: Lock,
    title: 'IP Security & Regulatory Compliance',
    description: 'Strict non-disclosure agreements, ISO/GDPR compliance protocols, and complete IP ownership assignment standard across all client contracts.',
    highlights: ['100% IP Ownership', 'GDPR & ISO Aligned', 'Air-gapped Code Repos'],
    tag: 'COMPLIANCE'
  }
];

const WhyChooseUs = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted = { color: 'var(--text-muted)' };
  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  return (
    <section id="why-choose-us" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative overflow-hidden" style={sectionBg}>
      {/* Background Decorative Ambient Light Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-blue text-xs font-extrabold uppercase tracking-widest bg-primary-blue/10 border border-primary-blue/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> WHY CHOOSE SPIRIT DATA SOLUTIONS
            </span>
            <h2 className="headline-xl mt-5 mb-5" style={textPrimary}>
              Engineering Standards Built for <span className="text-primary-blue">Enterprise Scale</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={textSecondary}>
              We blend technical precision, transparent engineering practices, and rapid execution to transform ambitious ideas into resilient digital platforms.
            </p>
          </div>
        </ScrollReveal>

        {/* Key Metrics Counter Bar */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 p-6 md:p-8 rounded-2xl border shadow-level-1 backdrop-blur-md"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-2 relative group">
                {index !== stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] bg-[var(--border)]" />
                )}
                <div className="text-3xl md:text-4xl font-extrabold text-primary-blue tracking-tight mb-1 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold mb-0.5" style={textPrimary}>
                  {stat.label}
                </div>
                <div className="text-xs hidden sm:block" style={textMuted}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            const isHovered = activeCard === idx;

            return (
              <ScrollReveal key={idx} delay={0.15 + idx * 0.08}>
                <motion.div
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="h-full flex flex-col justify-between p-7 rounded-xl border shadow-level-1 hover:shadow-level-2 transition-all duration-300 relative group overflow-hidden"
                  style={{
                    ...cardStyle,
                    borderColor: isHovered ? '#1F6FD1' : 'var(--border)',
                    transform: isHovered ? 'translateY(-4px)' : 'none'
                  }}
                >
                  {/* Subtle Card Accent Gradient Header */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 bg-primary-blue/10 rounded-xl text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-[var(--bg-surface)] border"
                        style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                        {reason.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-blue transition-colors duration-200" style={textPrimary}>
                      {reason.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-6" style={textSecondary}>
                      {reason.description}
                    </p>
                  </div>

                  {/* Highlights Bullet Chips */}
                  <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="flex flex-wrap gap-2">
                      {reason.highlights.map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-surface)]" style={textSecondary}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-blue shrink-0" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
