import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Cpu, Users, BookOpen,
  ChevronDown, ArrowRight, Upload, Mail,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

const perks = [
  {
    Icon: TrendingUp,
    title: 'Growth',
    desc: 'Accelerate your career with work that scales from small-scale pilots to enterprise industry solutions.',
  },
  {
    Icon: Cpu,
    title: 'Technology',
    desc: 'Work with the latest tools and contribute to bleeding-edge enterprise digital solutions.',
  },
  {
    Icon: Users,
    title: 'Culture',
    desc: 'A collaborative, inclusive environment where every voice is heard and every spirit matters.',
  },
  {
    Icon: BookOpen,
    title: 'Learning',
    desc: 'Generous learning stipend, premium workshops, and access to world-class education resources.',
  },
]

const roles = [
  {
    title: 'Frontend Developer',
    type: 'FULL-TIME',
    mode: 'REMOTE',
    desc: 'We are looking for a skilled Frontend Developer to join our growing team. You will be responsible for building high-performance, accessible web interfaces using React and modern tooling.',
    requirements: ['3+ years React experience', 'TypeScript proficiency', 'Tailwind CSS / CSS-in-JS', 'REST & GraphQL APIs'],
  },
  {
    title: 'Backend Developer',
    type: 'FULL-TIME',
    mode: 'HYBRID',
    desc: 'Join our backend engineering team to design and maintain scalable APIs and microservices powering enterprise products serving millions of users.',
    requirements: ['Node.js / Java / Python', 'PostgreSQL / MongoDB', 'Microservices experience', 'Docker & CI/CD'],
  },
  {
    title: 'UI/UX Designer',
    type: 'CONTRACT',
    mode: 'REMOTE',
    desc: 'Craft beautiful, intuitive interfaces for enterprise-grade products. Work closely with engineering and product leadership to shape the visual identity of our solutions.',
    requirements: ['Figma proficiency', 'Design systems experience', 'Enterprise B2B product background', 'Accessibility best practices'],
  },
  {
    title: 'QA Engineer',
    type: 'FULL-TIME',
    mode: 'REMOTE',
    desc: 'Own the quality assurance strategy for complex, multi-service platforms. Build automation suites and be the final quality gate before every release.',
    requirements: ['Selenium / Playwright', 'API testing (Postman, REST Assured)', 'CI/CD pipeline integration', 'Performance testing'],
  },
  {
    title: 'Data Analyst',
    type: 'FULL-TIME',
    mode: 'HYBRID',
    desc: 'Transform raw data into strategic intelligence. Work with product and leadership teams to build dashboards, models, and reports that drive data-driven decisions.',
    requirements: ['SQL mastery', 'Power BI / Tableau', 'Python / R for analysis', 'Statistical modelling'],
  },
]

function AccordionRole({ role }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen(!open)}>
        <div>
          <p className="font-semibold text-[#0a2e5c] text-base">{role.title}</p>
          <div className="flex gap-2 mt-1.5">
            <span className="chip chip-blue">{role.type}</span>
            <span className="chip" style={{ background: 'rgba(66,95,143,0.1)', color: '#294776' }}>{role.mode}</span>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-[#1f6fd1]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#e2e8f0] pt-5">
              <p className="text-sm text-[#414752] leading-relaxed mb-4">{role.desc}</p>
              <p className="text-xs font-semibold text-[#0a2e5c] uppercase tracking-wide mb-3">Key Requirements</p>
              <ul className="space-y-2">
                {role.requirements.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-[#414752]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1f6fd1] shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Careers() {
  const perksRef = useRef(null)
  const rolesRef = useRef(null)

  useScrollReveal(perksRef)
  useScrollReveal(rolesRef)

  const [fileName, setFileName] = useState(null)
  const [status, setStatus] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const data = new FormData(e.target)
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', 'New Job Application — Spirit Data Solutions')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        e.target.reset()
        setFileName(null)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="pt-16">
      {/* ── HERO ── */}
      <section className="hero-bg min-h-[480px] flex items-center">
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
            <div>
              <motion.p className="label-eyebrow mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                Join Our Vision
              </motion.p>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-[#0a2e5c] leading-tight mb-6 tracking-[-0.03em]"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                Build the Future{' '}
                <span className="gradient-text">With Us</span>
              </motion.h1>
              <motion.p className="text-[#414752] text-lg leading-relaxed mb-8 max-w-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                Join a passionate team building innovative digital solutions for modern businesses. We're looking for thinkers, builders, and dreamers.
              </motion.p>
              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
                <a href="#open-roles" className="btn-primary inline-flex items-center gap-2">
                  View Open Roles <ArrowRight size={16} />
                </a>
                <Link to="/about" className="btn-secondary">Our Culture</Link>
              </motion.div>
            </div>
            <motion.div className="relative hidden lg:block" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e2e8f0]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team working together"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e5c]/30 to-transparent flex items-end p-6">
                  <p className="text-white font-black text-3xl leading-tight drop-shadow-lg">
                    BUILD THE FUTURE WITH US
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY SPIRIT ── */}
      <section ref={perksRef} className="py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="reveal label-eyebrow mb-3">Why Join Us</p>
            <h2 className="reveal text-3xl md:text-4xl font-bold text-[#0a2e5c] mb-4 tracking-[-0.02em]">
              Why Spirit Data Solutions?
            </h2>
            <p className="reveal text-[#414752] max-w-xl mx-auto text-[15px] leading-relaxed">
              We believe in empowering our employees with a work environment that fosters creativity, continuous growth, and a true sense of belonging.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map(({ Icon, title, desc }) => (
              <div key={title} className="reveal card text-center group">
                <div className="w-14 h-14 rounded-2xl bg-[#1f6fd1]/8 border border-[#1f6fd1]/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1f6fd1]/15 transition-colors duration-300">
                  <Icon size={24} className="text-[#1f6fd1]" />
                </div>
                <h3 className="font-semibold text-[#0a2e5c] mb-2">{title}</h3>
                <p className="text-sm text-[#414752] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section id="open-roles" ref={rolesRef} className="py-24 bg-[#f7fafc]">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="reveal label-eyebrow mb-3">We're Hiring</p>
            <h2 className="reveal text-3xl md:text-4xl font-bold text-[#0a2e5c] mb-4 tracking-[-0.02em]">Open Roles</h2>
            <p className="reveal text-[#414752] max-w-xl mx-auto text-[15px]">
              Find the perfect role to start your next chapter. All positions are remote friendly.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {roles.map((role) => (
              <div key={role.title} className="reveal">
                <AccordionRole role={role} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="label-eyebrow mb-3">Apply Now</p>
              <h2 className="text-3xl font-bold text-[#0a2e5c] mb-3 tracking-[-0.02em]">Ready to join the spirit?</h2>
              <p className="text-[#414752] text-[15px]">Complete the form below and start your journey with us.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-md p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Full Name</label>
                  <input name="name" required placeholder="John Doe" className="form-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Email Address</label>
                  <input name="email" type="email" required placeholder="john@example.com" className="form-input" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Phone Number</label>
                  <input name="phone" placeholder="+1 (555) 000-0000" className="form-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Position Applied For</label>
                  <select name="position" className="form-input">
                    <option value="">Select a position</option>
                    {roles.map((r) => <option key={r.title}>{r.title}</option>)}
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Years of Experience</label>
                  <input name="experience" placeholder="e.g. 5" className="form-input" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">LinkedIn Profile</label>
                  <input name="linkedin" placeholder="linkedin.com/in/yourname" className="form-input" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Portfolio URL (Optional)</label>
                <input name="portfolio" placeholder="yourportfolio.com" className="form-input" />
              </div>

              {/* File Upload */}
              <div>
                <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Resume Upload</label>
                <label
                  className={`file-upload-area block cursor-pointer ${dragOver ? 'dragover' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault(); setDragOver(false)
                    const file = e.dataTransfer.files[0]
                    if (file) setFileName(file.name)
                  }}
                >
                  <input
                    type="file" name="resume" accept=".pdf,.doc,.docx" className="hidden"
                    onChange={(e) => setFileName(e.target.files[0]?.name || null)}
                  />
                  <div className="text-[#727784]">
                    <Upload size={28} className="mx-auto mb-2 text-[#c1c6d5]" />
                    {fileName ? (
                      <p className="text-sm font-medium text-[#1f6fd1]">{fileName}</p>
                    ) : (
                      <>
                        <p className="text-sm">Drag and drop your resume here, or{' '}
                          <span className="text-[#1f6fd1] font-semibold">browse</span>
                        </p>
                        <p className="text-xs mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Message / Cover Letter</label>
                <textarea name="message" rows={5} placeholder="Tell us why you are a great fit..." className="form-input resize-none" />
              </div>

              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center gap-2 disabled:opacity-60">
                {status === 'loading' ? 'Submitting…' : (
                  <><Mail size={16} /> Submit Application</>
                )}
              </button>

              {status === 'success' && (
                <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm p-4 text-center font-medium">
                  🎉 Application submitted! We'll review and reach out within 3–5 business days.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-4 text-center font-medium">
                  ❌ Submission failed. Please email careers@spiritdatasolutions.com
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
