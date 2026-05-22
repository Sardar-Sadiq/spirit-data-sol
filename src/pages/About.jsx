import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Globe, Zap, Handshake, Lock, Rocket, Lightbulb } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const values = [
  { Icon: Globe,      title: 'Global Reach',         desc: 'We serve enterprise clients across 4 continents, delivering localised solutions at global scale.' },
  { Icon: Zap,        title: 'Engineering First',     desc: 'Every decision is rooted in technical rigour. We architect for resilience, not just delivery speed.' },
  { Icon: Handshake,  title: 'Partnership Model',     desc: 'We embed with your team, aligning deeply with business goals rather than just spec documents.' },
  { Icon: Lock,       title: 'Data Integrity',        desc: 'Enterprise-grade security and compliance built into every layer of every system we create.' },
  { Icon: Rocket,     title: 'Velocity & Quality',    desc: 'Agile cycles with zero compromise on quality — we ship fast without accumulating technical debt.' },
  { Icon: Lightbulb,  title: 'Continuous Innovation', desc: 'We invest continuously in emerging tech to keep our clients ahead of the disruption curve.' },
]

const team = [
  { name: 'Arjun Mehta',    role: 'Founder & CEO',       img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Priya Sharma',   role: 'CTO',                  img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80' },
  { name: 'David Chen',     role: 'Head of Engineering',  img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' },
  { name: 'Sarah Williams', role: 'Head of Design',       img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
]

const stats = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '40+',  label: 'Enterprise Clients' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '6+',   label: 'Years Experience' },
]

export default function About() {
  const valuesRef = useRef(null)
  const teamRef   = useRef(null)
  const statsRef  = useRef(null)

  useScrollReveal(valuesRef)
  useScrollReveal(teamRef)
  useScrollReveal(statsRef)

  return (
    <main className="pt-16">
      {/* ── HERO ── */}
      <section className="hero-bg py-28">
        <div className="section-container">
          <motion.p className="label-eyebrow mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            About Us
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-[#0a2e5c] leading-tight max-w-3xl mb-6 tracking-[-0.03em]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Precision Engineering for a{' '}
            <span className="gradient-text">Digital-First World</span>
          </motion.h1>
          <motion.p
            className="text-[#414752] text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Founded on the belief that software should be a strategic asset, Spirit Data Solutions has grown into a trusted partner for enterprises seeking lasting digital advantage.
          </motion.p>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section ref={statsRef} className="bg-white border-b border-[#e2e8f0] py-14">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="reveal text-center">
                <p className="text-4xl font-bold text-[#1f6fd1] mb-1">{value}</p>
                <p className="text-sm text-[#414752] font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                alt="Spirit Data Solutions team"
                className="rounded-2xl w-full h-[420px] object-cover"
                style={{ boxShadow: '0 12px 40px rgba(10,46,92,0.10)', border: '1px solid #e2e8f0' }}
              />
            </div>
            <div>
              <p className="label-eyebrow mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-[#0a2e5c] mb-6 leading-tight tracking-[-0.02em]">
                Built on Trust, Delivered Through Excellence
              </h2>
              <div className="space-y-4 text-[#414752] leading-[1.8] text-[15px]">
                <p>
                  Spirit Data Solutions was founded with a clear mandate: to close the gap between enterprise ambition and technical execution. Too many organisations suffered from the same gap — powerful strategies undermined by fragile software.
                </p>
                <p>
                  We set out to build a different kind of engineering partner. One that understands the business context behind every technical decision, communicates with radical transparency, and measures success purely by client outcomes.
                </p>
                <p>
                  Today, we are proud to partner with some of the most forward-thinking enterprises globally — delivering solutions that are not just functional, but genuinely transformative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="py-24 bg-[#f7fafc]">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="reveal label-eyebrow mb-3">What Drives Us</p>
            <h2 className="reveal text-3xl md:text-4xl font-bold text-[#0a2e5c] mb-4 tracking-[-0.02em]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="reveal card group">
                <div className="w-11 h-11 rounded-xl bg-[#1f6fd1]/8 border border-[#1f6fd1]/15 flex items-center justify-center mb-4 group-hover:bg-[#1f6fd1]/15 transition-colors duration-300">
                  <Icon size={20} className="text-[#1f6fd1]" />
                </div>
                <h3 className="font-semibold text-[#0a2e5c] text-base mb-2">{title}</h3>
                <p className="text-sm text-[#414752] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section ref={teamRef} className="py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="reveal label-eyebrow mb-3">Leadership</p>
            <h2 className="reveal text-3xl md:text-4xl font-bold text-[#0a2e5c] mb-4 tracking-[-0.02em]">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, img }) => (
              <div key={name} className="reveal text-center group">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#e2e8f0] shadow-md group-hover:border-[#1f6fd1] transition-colors duration-300">
                  <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                </div>
                <p className="font-semibold text-[#0a2e5c] text-sm">{name}</p>
                <p className="text-xs text-[#727784] mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
