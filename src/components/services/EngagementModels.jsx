import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Clock, CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const models = [
  {
    id: 'dedicated-team',
    title: 'Dedicated Engineering Team',
    tag: 'LONG-TERM AUGMENTATION',
    icon: Users,
    popular: true,
    description: 'Extend your in-house engineering team with dedicated senior full-stack developers, tech leads, and QA engineers working exclusively on your product.',
    idealFor: 'Growing tech startups & enterprises needing continuous engineering bandwidth and deep domain context.',
    features: [
      '100% Dedicated Engineers & Tech Lead',
      'Direct integration with your Slack/Jira',
      'Daily standups & bi-weekly sprint demos',
      'Flexible scaling up or down with 30-day notice',
      'Complete IP ownership & code access'
    ],
    ctaText: 'Assemble Team'
  },
  {
    id: 'project-based',
    title: 'Project-Based Delivery',
    tag: 'FIXED SCOPE & MILESTONES',
    icon: Target,
    popular: false,
    description: 'End-to-end product execution with predefined milestones, fixed deliverables, and transparent timeline guarantees from discovery to deployment.',
    idealFor: 'Startups launching an MVP, greenfield projects, or distinct feature modules with clear specifications.',
    features: [
      'Fixed-price or milestone-based contracts',
      'Guaranteed delivery timeline & scope',
      'Full SDLC coverage (Design, Dev, Testing)',
      'Dedicated Project Manager point of contact',
      'Post-launch warranty & bug-fix period'
    ],
    ctaText: 'Start Project'
  },
  {
    id: 'agile-sprints',
    title: 'Time & Materials / Agile Sprints',
    tag: 'FLEXIBLE ADAPTIVE SCOPE',
    icon: Clock,
    popular: false,
    description: 'Pay as you grow with flexible sprint-based capacity. Pivot priorities, refine backlogs, and introduce new capabilities dynamically without heavy contract friction.',
    idealFor: 'Early-stage startups validating product-market fit or products requiring rapid, iterative prototyping.',
    features: [
      'Bi-weekly sprint capacity booking',
      'Pay only for actual engineering hours/sprints',
      'Ability to reprioritize feature backlogs weekly',
      'Transparent time & velocity tracking',
      'Zero long-term lock-in commitment'
    ],
    ctaText: 'Book Sprints'
  }
];

const EngagementModels = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted = { color: 'var(--text-muted)' };
  const sectionBg = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="engagement-models" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative overflow-hidden" style={sectionBg}>
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-primary-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <span className="text-primary-blue text-xs font-extrabold uppercase tracking-widest bg-primary-blue/10 border border-primary-blue/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> FLEXIBLE COLLABORATION
            </span>
            <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>
              Tailored <span className="text-primary-blue">Engagement Models</span> for Every Stage
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={textSecondary}>
              Choose the partnership model that best fits your project scope, budget predictability, and execution speed.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model, idx) => {
            const Icon = model.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <ScrollReveal key={model.id} delay={0.1 + idx * 0.1}>
                <motion.div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`h-full flex flex-col justify-between p-7 sm:p-9 rounded-2xl border shadow-level-1 hover:shadow-level-2 transition-all duration-300 relative overflow-hidden group ${
                    model.popular ? 'border-primary-blue/80' : ''
                  }`}
                  style={{
                    ...cardStyle,
                    borderColor: isHovered || model.popular ? '#1F6FD1' : 'var(--border)',
                    transform: isHovered ? 'translateY(-6px)' : 'none'
                  }}
                >
                  {/* Subtle Card Top Highlight Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-blue to-sky-400 transition-opacity duration-300 ${
                      model.popular || isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Popular Badge */}
                  {model.popular && (
                    <div className="absolute top-4 right-4 bg-primary-blue text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-3 bg-primary-blue/10 rounded-xl text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-primary-blue uppercase bg-primary-blue/10 px-2.5 py-1 rounded border border-primary-blue/20">
                        {model.tag}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary-blue transition-colors duration-200" style={textPrimary}>
                      {model.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-5" style={textSecondary}>
                      {model.description}
                    </p>

                    {/* Ideal For Box */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] mb-6 text-xs leading-relaxed" style={textSecondary}>
                      <strong className="text-primary-blue font-bold">Ideal for: </strong>
                      {model.idealFor}
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-mono font-bold uppercase tracking-widest" style={textMuted}>
                        Model Highlights
                      </div>
                      {model.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium" style={textSecondary}>
                          <CheckCircle2 className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <button
                      onClick={scrollToContact}
                      className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer shadow-level-1 hover:shadow-level-2 ${
                        model.popular
                          ? 'bg-gradient-to-b from-primary-blue to-deep-blue text-white hover:opacity-95'
                          : 'bg-[var(--bg-surface)] border border-[var(--border)] text-primary-blue hover:bg-primary-blue hover:text-white hover:border-primary-blue'
                      }`}
                    >
                      {model.ctaText} <ArrowRight className="w-4 h-4" />
                    </button>
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

export default EngagementModels;
