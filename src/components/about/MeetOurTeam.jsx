import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Sparkles, 
  Briefcase, 
  Award,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
  </svg>
);

const teamMembers = [
  // Leadership
  {
    id: 'sardar-sadiq',
    name: 'Sardar Sadiq',
    role: 'Managing Director & Founder',
    category: 'Leadership',
    deptTag: 'EXECUTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Pioneering enterprise growth, technology investments, and client-first strategy across global digital transformations.',
    skills: ['Enterprise Strategy', 'Product Vision', 'Global Operations'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'sardar@spiritdatasolutions.com'
    }
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Chief Technology Officer (CTO)',
    category: 'Leadership',
    deptTag: 'EXECUTIVE',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Ex-Google Cloud lead architecting high-scale distributed systems, zero-trust cloud infrastructure, and AI systems.',
    skills: ['System Architecture', 'Cloud Infrastructure', 'Distributed Systems'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'elena@spiritdatasolutions.com'
    }
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Chief Operating Officer (COO)',
    category: 'Leadership',
    deptTag: 'EXECUTIVE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Overseeing global operations, client success management, and agile delivery engineering across international accounts.',
    skills: ['Agile Leadership', 'Client Relations', 'Operations'],
    social: {
      linkedin: 'https://linkedin.com',
      email: 'marcus@spiritdatasolutions.com'
    }
  },

  // Department Heads
  {
    id: 'aris-thorne',
    name: 'Dr. Aris Thorne',
    role: 'Head of AI & Data Engineering',
    category: 'Department Heads',
    deptTag: 'AI & DATA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'PhD in Computer Science leading LLM fine-tuning, retrieval-augmented generation (RAG), and data pipeline architectures.',
    skills: ['PyTorch', 'FastAPI', 'LangChain', 'Vector DBs'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'aris@spiritdatasolutions.com'
    }
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    role: 'Head of Frontend & UI/UX Design',
    category: 'Department Heads',
    deptTag: 'DESIGN & UI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Design systems fanatic driving modern web aesthetics, accessibility compliance, and micro-interaction engineering.',
    skills: ['React', 'Next.js', 'Design Systems', 'TailwindCSS'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'sophia@spiritdatasolutions.com'
    }
  },
  {
    id: 'vikram-patel',
    name: 'Vikram Patel',
    role: 'Head of Enterprise Java Solutions',
    category: 'Department Heads',
    deptTag: 'JAVA & BACKEND',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: '12+ years in Java Spring Boot, microservices decomposition, and cloud database optimization for enterprise clients.',
    skills: ['Java 21', 'Spring Boot', 'Kafka', 'Kubernetes'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'vikram@spiritdatasolutions.com'
    }
  },
  {
    id: 'david-sterling',
    name: 'David Sterling',
    role: 'Head of QA & Automation Engineering',
    category: 'Department Heads',
    deptTag: 'QA AUTOMATION',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Spearheading automated testing suites, performance benchmarking, and continuous integration QA safeguards.',
    skills: ['Selenium', 'Cypress', 'Performance Testing', 'CI/CD QA'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'david@spiritdatasolutions.com'
    }
  }
];

const categories = ['All Team', 'Leadership', 'Department Heads'];

const MeetOurTeam = () => {
  const [activeTab, setActiveTab] = useState('All Team');

  const filteredMembers = activeTab === 'All Team' 
    ? teamMembers 
    : teamMembers.filter(m => m.category === activeTab);

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  return (
    <section id="meet-our-team" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative" style={sectionBg}>
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> OUR PEOPLE & LEADERSHIP
            </span>
            <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>
              Meet the Visionaries Behind <span className="text-primary-blue">Spirit Data Solutions</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={textSecondary}>
              A synchronized global team of enterprise architects, developers, AI researchers, and QA leaders dedicated to your success.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === cat
                    ? 'bg-primary-blue text-white shadow-level-1'
                    : 'bg-[var(--bg-surface)] border hover:border-primary-blue/50'
                }`}
                style={{
                  color: activeTab === cat ? '#ffffff' : 'var(--text-secondary)',
                  borderColor: activeTab === cat ? 'transparent' : 'var(--border)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Team Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <div
                  className="h-full flex flex-col justify-between p-6 rounded-xl border shadow-level-1 hover:shadow-level-2 transition-all duration-300 group relative overflow-hidden"
                  style={cardStyle}
                >
                  <div>
                    {/* Member Image & Dept Tag */}
                    <div className="relative mb-5 overflow-hidden rounded-lg aspect-square bg-[var(--bg-surface)]">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase">
                          {member.deptTag}
                        </span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <h3 className="text-lg font-bold group-hover:text-primary-blue transition-colors duration-200" style={textPrimary}>
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary-blue mb-3">
                      {member.role}
                    </p>

                    <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={textSecondary}>
                      {member.bio}
                    </p>
                  </div>

                  <div>
                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] border"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="pt-3 border-t flex items-center gap-3" style={{ borderColor: 'var(--border-light)' }}>
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} LinkedIn`}
                          className="p-1.5 rounded-full hover:bg-primary-blue/10 text-primary-blue transition-colors"
                        >
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} GitHub`}
                          className="p-1.5 rounded-full hover:bg-primary-blue/10 text-[var(--text-secondary)] hover:text-primary-blue transition-colors"
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          aria-label={`Email ${member.name}`}
                          className="p-1.5 rounded-full hover:bg-primary-blue/10 text-[var(--text-secondary)] hover:text-primary-blue transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global Excellence Banner */}
        <ScrollReveal delay={0.3}>
          <div
            className="mt-16 p-8 rounded-2xl border shadow-level-1 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-blue/10 rounded-xl text-primary-blue shrink-0">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={textPrimary}>
                  Interested in Joining Our Engineering Team?
                </h3>
                <p className="text-sm" style={textSecondary}>
                  We are always looking for exceptional software engineers, QA leads, and AI researchers.
                </p>
              </div>
            </div>

            <a
              href="/careers"
              className="px-6 py-2.5 rounded-lg border border-primary-blue text-primary-blue font-semibold text-xs uppercase tracking-wider hover:bg-primary-blue hover:text-white transition-all duration-300 shrink-0"
            >
              Explore Open Careers
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MeetOurTeam;
