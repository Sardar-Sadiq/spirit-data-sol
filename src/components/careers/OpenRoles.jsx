import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const OpenRoles = ({ onApplyClick, openRoles }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted    = { color: 'var(--text-muted)' };
  const surfaceBg   = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="open-roles" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop border-t" style={{ ...surfaceBg, borderTopColor: 'var(--border)' }}>
      <div className="max-w-container-max mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="headline-xl mb-4" style={textPrimary}>Open Roles</h2>
            <p className="text-base md:text-lg" style={textSecondary}>
              Find the perfect place to start your next chapter. All positions are remote-friendly.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4 text-left">
          {openRoles.map((role, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div className="rounded border overflow-hidden shadow-level-1 hover:shadow-level-2 transition-all duration-300" style={cardStyle}>
                  
                  {/* Header bar */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 md:py-6 flex items-center justify-between hover:bg-slate-100/10 dark:hover:bg-white/5 transition-colors duration-200 focus:outline-none cursor-pointer"
                  >
                    <div className="flex flex-col gap-1 items-start text-left">
                      <h3 className="text-base md:text-lg font-bold" style={textPrimary}>{role.title}</h3>
                      <span className="text-[10px] md:text-xs font-bold text-primary-blue dark:text-accent-sky bg-primary-blue/5 px-2 py-0.5 rounded-full border border-primary-blue/15 tracking-wider">
                        {role.meta}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-slate-400"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="border-t"
                        style={{ borderTopColor: 'var(--border)' }}
                      >
                        <div className="p-6 flex flex-col gap-6 text-left" style={{ background: 'var(--bg-surface)' }}>
                          
                          {/* Role Narrative */}
                          <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest mb-2" style={textMuted}>Role Overview</h4>
                            <p className="text-sm md:text-base leading-relaxed" style={textSecondary}>{role.desc}</p>
                          </div>

                          {/* Requirements Bullet Points */}
                          <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest mb-3" style={textMuted}>Key Requirements</h4>
                            <ul className="flex flex-col gap-2.5">
                              {role.requirements.map((req, rIdx) => (
                                <li key={rIdx} className="text-sm flex items-start gap-2.5" style={textSecondary}>
                                  <span className="mt-1 w-1.5 h-1.5 bg-primary-blue dark:bg-accent-sky rounded-full shrink-0" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Badges & Apply Shortcut */}
                          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 border-t" style={{ borderTopColor: 'var(--border)' }}>
                            <div>
                              <h4 className="text-xs font-extrabold uppercase tracking-widest mb-3" style={textMuted}>Technologies Stack</h4>
                              <div className="flex flex-wrap gap-2">
                                {role.tech.map((techItem, tIdx) => (
                                  <span 
                                    key={tIdx} 
                                    className="text-xs font-medium border px-2.5 py-1 rounded"
                                    style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                                  >
                                    {techItem}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <button
                              onClick={() => onApplyClick(role.title)}
                              className="btn-gradient text-white text-sm font-semibold py-2.5 px-6 rounded shadow-level-1 hover:shadow-level-2 transition-all duration-300 shrink-0 cursor-pointer"
                            >
                              Apply for this Role
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OpenRoles;
