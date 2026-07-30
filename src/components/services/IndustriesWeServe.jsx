import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark,
  HeartPulse,
  ShoppingBag,
  Building2,
  Bot,
  GraduationCap,
  Globe2,
  ArrowUpRight
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const industries = [
  {
    id: 'fintech',
    name: 'FinTech & Banking',
    icon: Landmark,
    description: 'Ultra-secure financial transaction platforms, payment gateway integrations, and bank-grade Spring Boot microservices.',
    solutions: ['PCI-DSS Compliance', 'Real-time Payment APIs', 'Fraud Detection Engines'],
    tag: 'FINANCE'
  },
  {
    id: 'healthtech',
    name: 'HealthTech & Healthcare',
    icon: HeartPulse,
    description: 'HIPAA-compliant medical software, patient portals, and automated healthcare data integration pipelines.',
    solutions: ['HIPAA Data Security', 'Telehealth Systems', 'EHR System Integrations'],
    tag: 'HEALTHCARE'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail Tech',
    icon: ShoppingBag,
    description: 'High-throughput online storefronts built with Next.js, real-time inventory synchronization, and automated checkout.',
    solutions: ['Sub-second Page Loads', 'Headless Commerce', 'Automated QA Testing'],
    tag: 'RETAIL'
  },
  {
    id: 'saas',
    name: 'Enterprise SaaS & B2B',
    icon: Building2,
    description: 'Multi-tenant cloud architectures, subscription billing engines, and enterprise management dashboards.',
    solutions: ['Multi-Tenant Architecture', 'RBAC Security', 'High-Concurrency Scaling'],
    tag: 'ENTERPRISE'
  },
  {
    id: 'ai-startups',
    name: 'AI & Data Tech Startups',
    icon: Bot,
    description: 'Custom Gen-AI assistants, Python LLM pipelines, vector database search, and intelligent automation tools.',
    solutions: ['OpenAI / LangChain Integrations', 'RAG Search Engines', 'Automated Workflows'],
    tag: 'GEN-AI'
  },
  {
    id: 'edtech',
    name: 'EdTech & Digital Learning',
    icon: GraduationCap,
    description: 'Interactive learning management platforms, student progress dashboards, and live video integration.',
    solutions: ['Scalable LMS Stacks', 'Interactive Dashboards', 'Gamified Learning Engines'],
    tag: 'EDUCATION'
  }
];

const IndustriesWeServe = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  return (
    <section id="industries" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative overflow-hidden" style={sectionBg}>
      {/* Background Subtle Light */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <span className="text-primary-blue text-xs font-extrabold uppercase tracking-widest bg-primary-blue/10 border border-primary-blue/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" /> DOMAIN EXPERTISE
            </span>
            <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>
              Industries We <span className="text-primary-blue">Empower</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={textSecondary}>
              We deliver specialized engineering solutions tailored to the strict compliance, performance, and scaling demands of key global industries.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isHovered = hoveredId === ind.id;

            return (
              <ScrollReveal key={ind.id} delay={0.08 * idx}>
                <motion.div
                  onMouseEnter={() => setHoveredId(ind.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="h-full flex flex-col justify-between p-7 rounded-2xl border shadow-level-1 hover:shadow-level-2 transition-all duration-300 relative group overflow-hidden"
                  style={{
                    ...cardStyle,
                    borderColor: isHovered ? '#1F6FD1' : 'var(--border)',
                    transform: isHovered ? 'translateY(-4px)' : 'none'
                  }}
                >
                  {/* Subtle Top Border Highlight Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 bg-primary-blue/10 rounded-xl text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-[var(--bg-surface)] border"
                        style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                        {ind.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-blue transition-colors duration-200" style={textPrimary}>
                      {ind.name}
                    </h3>

                    <p className="text-sm leading-relaxed mb-6" style={textSecondary}>
                      {ind.description}
                    </p>
                  </div>

                  {/* Solutions Pills */}
                  <div className="pt-4 border-t border-[var(--border-light)]">
                    <div className="flex flex-wrap gap-1.5">
                      {ind.solutions.map((sol, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                        >
                          {sol}
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

export default IndustriesWeServe;
