import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../ScrollReveal';

const faqsList = [
  {
    id: 'faq-1',
    question: "Are Spirit Data Solutions' software systems tailored for our specific business needs?",
    answer: "Every software solution we build is 100% custom-engineered from the ground up to align with your specific enterprise workflows, existing infrastructure, security compliance, and performance goals."
  },
  {
    id: 'faq-2',
    question: "What software development methodology does your team follow?",
    answer: "We follow a disciplined Agile Scrum framework with 2-week sprint cycles. You get bi-weekly live staging demos, real-time Slack/Teams communication, and full visibility at every development milestone."
  },
  {
    id: 'faq-3',
    question: "How do you ensure code quality, security, and automated testing?",
    answer: "Every pull request undergoes peer code reviews, static security analysis, and zero-trust vulnerability checks. We enforce automated end-to-end testing with Selenium and Vitest to guarantee zero regressions."
  },
  {
    id: 'faq-4',
    question: "What post-launch support and SLA guarantees do you provide?",
    answer: "We offer SLA-backed post-launch support, 24/7 uptime monitoring, automated cloud backups, security patching, and dedicated maintenance engineers to ensure continuous enterprise reliability."
  },
  {
    id: 'faq-5',
    question: "How long does a typical software project take from kickoff to launch?",
    answer: "MVP (Minimum Viable Product) builds typically ship within 4 to 8 weeks. Enterprise-grade software platforms or complex microservices architectures average 3 to 6 months."
  },
  {
    id: 'faq-6',
    question: "Can your engineering team integrate into our existing in-house team?",
    answer: "Yes, we offer dedicated team augmentation where our senior developers, enterprise architects, and QA leads integrate directly into your Jira workflows, repos, and daily standups."
  }
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(faqsList[0].id);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };

  return (
    <section id="faqs" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative" style={{ background: 'var(--bg)', transition: 'background 0.4s ease' }}>
      <div className="max-w-container-max mx-auto">
        <ScrollReveal>
          {/* Main Bordered Split Card Container */}
          <div
            className="rounded-2xl border overflow-hidden shadow-level-1 grid grid-cols-1 lg:grid-cols-12 transition-all duration-300"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
          >
            {/* LEFT COLUMN: Clean Title & Large Spirit SVG Watermark */}
            <div
              className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r transition-colors duration-300"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]" style={textPrimary}>
                  Have questions?<br />
                  We got answers
                </h2>
              </div>

              {/* Spirit SVG Watermark Logo anchored at bottom left */}
              <div className="mt-12 lg:mt-20 w-full flex items-end justify-start">
                <img
                  src="/spirit-svg.svg"
                  alt="Spirit Data Solutions"
                  className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px] h-auto object-contain opacity-25 dark:opacity-20 filter grayscale dark:invert pointer-events-none select-none transition-opacity duration-300"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Stacked Accordion Cells with distinct Surface BG */}
            <div
              className="lg:col-span-7 flex flex-col divide-y transition-colors duration-300"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}
            >
              {faqsList.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`p-6 sm:p-8 transition-colors duration-200 ${
                      isOpen
                        ? 'bg-[var(--bg-card)]'
                        : 'hover:bg-[var(--bg-surface-elevated)]'
                    }`}
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left flex items-start justify-between gap-6 group cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <h3
                        className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors duration-200 ${
                          isOpen ? 'text-primary-blue' : 'group-hover:text-primary-blue'
                        }`}
                        style={isOpen ? undefined : textPrimary}
                      >
                        {faq.question}
                      </h3>

                      {/* Minimalist Plus / Minus Symbol */}
                      <span
                        className="text-xl sm:text-2xl font-light leading-none shrink-0 transition-transform duration-200 select-none ml-2"
                        style={{ color: isOpen ? 'var(--toggle-active)' : 'var(--text-muted)' }}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="pt-3.5 pr-6 text-xs sm:text-sm md:text-base leading-relaxed" style={textSecondary}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
