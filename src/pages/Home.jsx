import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Monitor,
  Coffee,
  Code2,
  FlaskConical,
  Target,
  Eye,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Users,
  MessageSquare,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ── fade-up motion preset ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

/* ── services data ── */
const services = [
  {
    Icon: Monitor,
    title: 'Full Stack Web Development',
    desc: 'End-to-end web solutions that are performant, scalable, and beautifully crafted. We bring vision to life from database to pixel-perfect UI.',
  },
  {
    Icon: Coffee,
    title: 'Full Stack Java Development',
    desc: 'Enterprise-grade Java applications built on Spring Boot and modern microservices, designed for rock-solid reliability at scale.',
  },
  {
    Icon: Code2,
    title: 'Full Stack Python Development',
    desc: 'From AI-powered APIs to data pipelines, our Python expertise accelerates your most ambitious digital initiatives.',
  },
  {
    Icon: FlaskConical,
    title: 'Solution Testing',
    desc: 'Automated and manual QA practices that safeguard every release, giving you full confidence before every deployment.',
  },
]

/* ── gallery images ── */
const galleryImgs = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80',
]

/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const lifeRef = useRef(null)
  const contactRef = useRef(null)

  useScrollReveal(aboutRef)
  useScrollReveal(servicesRef)
  useScrollReveal(lifeRef)
  useScrollReveal(contactRef)

  return (
    <main>

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section className="bg-[#f7fafc] pt-16 overflow-hidden">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-64px)] items-center">

            {/* ── Left copy ── */}
            <div className="py-20 lg:py-0 pr-0 lg:pr-16">
              <motion.p
                className="label-eyebrow mb-5"
                {...fadeUp(0.1)}
              >
                Digital Innovation Partner
              </motion.p>

              <motion.h1
                className="text-[40px] md:text-5xl lg:text-[58px] font-bold text-[#181c1e] leading-[1.1] tracking-[-0.03em] mb-6"
                {...fadeUp(0.2)}
              >
                Pioneering{' '}
                <span className="gradient-text">Digital Excellence</span>{' '}
                for Global Enterprises
              </motion.h1>

              <motion.p
                className="text-[#414752] text-[17px] leading-[1.75] mb-10 max-w-[520px]"
                {...fadeUp(0.35)}
              >
                We design and engineer precision software solutions that drive measurable growth, operational clarity, and lasting competitive advantage for leading organisations globally.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4" {...fadeUp(0.48)}>
                <Link to="/contact" className="btn-primary text-[15px]">
                  Get In Touch
                </Link>
                <Link to="/services" className="btn-secondary text-[15px]">
                  Our Services
                </Link>
              </motion.div>
            </div>

            {/* ── Right image ── */}
            <motion.div
              className="hidden lg:block h-full min-h-[520px] relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 ml-8">
                <img
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85"
                  alt="Modern enterprise architecture"
                  className="w-full h-full object-cover rounded-bl-3xl rounded-tl-3xl"
                  style={{ boxShadow: '0 24px 64px rgba(10,46,92,0.15)' }}
                />
                {/* Subtle blue overlay */}
                <div className="absolute inset-0 rounded-bl-3xl rounded-tl-3xl bg-gradient-to-br from-[#0a2e5c]/20 via-transparent to-[#1f6fd1]/10" />
                {/* Floating stat card */}
                <motion.div
                  className="absolute bottom-10 -left-6 bg-white rounded-2xl shadow-xl border border-[#e2e8f0] px-5 py-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1f6fd1]/10 flex items-center justify-center">
                    <Users size={18} className="text-[#1f6fd1]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#727784] font-medium">Active Clients</p>
                    <p className="text-lg font-bold text-[#0a2e5c] leading-none">40+ Enterprises</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          ABOUT
      ═══════════════════════════════ */}
      <section ref={aboutRef} className="py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ── Left image ── */}
            <div className="reveal relative">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80"
                alt="Spirit Data Solutions office"
                className="w-full h-[440px] object-cover rounded-2xl"
                style={{ boxShadow: '0 12px 40px rgba(10,46,92,0.12)' }}
              />
              {/* Badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-lg border border-[#e2e8f0] px-5 py-4">
                <p className="text-3xl font-black text-[#1f6fd1] leading-none">98%</p>
                <p className="text-xs font-semibold text-[#727784] mt-0.5">Client Satisfaction</p>
              </div>
            </div>

            {/* ── Right copy ── */}
            <div className="pt-2">
              <p className="reveal label-eyebrow mb-2">Who We Are</p>
              <p className="reveal text-sm text-[#1f6fd1] font-semibold mb-3">First Solutions</p>
              <h2 className="reveal text-3xl md:text-[38px] font-bold text-[#0a2e5c] leading-[1.2] tracking-[-0.02em] mb-6">
                We are pleased to welcome you to{' '}
                <span className="gradient-text">Spirit Solutions</span>
              </h2>
              <p className="reveal text-[#414752] leading-[1.8] mb-4 text-[15px]">
                Spirit Data Solutions is a precision-led software engineering firm that partners with global enterprises to design, build, and scale world-class digital products. Our multidisciplinary teams combine deep technical expertise with an unwavering commitment to quality.
              </p>
              <p className="reveal text-[#414752] leading-[1.8] mb-8 text-[15px]">
                From full-stack development to cloud infrastructure and QA automation, we operate as a trusted extension of your team — delivering outcomes that matter and building relationships built on radical transparency.
              </p>

              {/* Mission / Vision mini cards */}
              <div className="reveal grid grid-cols-2 gap-4 mb-0">
                <div className="bg-[#f7fafc] rounded-xl border border-[#e2e8f0] p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={15} className="text-[#1f6fd1]" />
                    <p className="text-xs font-bold text-[#0a2e5c] uppercase tracking-wide">Mission</p>
                  </div>
                  <p className="text-xs text-[#414752] leading-relaxed">
                    To pioneer digital solutions that unlock enterprise potential at every scale.
                  </p>
                </div>
                <div className="bg-[#f7fafc] rounded-xl border border-[#e2e8f0] p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye size={15} className="text-[#1f6fd1]" />
                    <p className="text-xs font-bold text-[#0a2e5c] uppercase tracking-wide">Vision</p>
                  </div>
                  <p className="text-xs text-[#414752] leading-relaxed">
                    To be the world's most trusted digital transformation engineering partner.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Social / Stats bar ── */}
          <div className="reveal mt-16 pt-10 border-t border-[#e2e8f0]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { Icon: Linkedin, label: 'LinkedIn', value: '8,200+', color: '#0077B5' },
                { Icon: Twitter, label: 'Twitter', value: '4,500+', color: '#1DA1F2' },
                { Icon: Youtube, label: 'YouTube', value: '2,100+', color: '#FF0000' },
                { Icon: MessageSquare, label: 'Contact Us', value: 'Available', color: '#1f6fd1' },
              ].map(({ Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-4 group cursor-pointer">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0a2e5c] text-base leading-none">{value}</p>
                    <p className="text-xs text-[#727784] mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          SERVICES
      ═══════════════════════════════ */}
      <section ref={servicesRef} className="py-28 bg-[#f7fafc]">
        <div className="section-container">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="reveal label-eyebrow mb-3">Welcome To</p>
            <h2 className="reveal text-3xl md:text-[38px] font-bold text-[#0a2e5c] leading-tight tracking-[-0.02em] mb-4">
              Strategic Engineering Services
            </h2>
            <p className="reveal text-[#414752] text-[15px] leading-relaxed">
              A disciplined portfolio of technology services, each engineered to compound business value over time.
            </p>
          </div>

          {/* 2×2 Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map(({ Icon, title, desc }) => (
              <div key={title} className="reveal card group flex flex-col">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#1f6fd1]/8 border border-[#1f6fd1]/15 flex items-center justify-center mb-5 group-hover:bg-[#1f6fd1]/15 transition-colors duration-300">
                  <Icon size={20} className="text-[#1f6fd1]" />
                </div>
                <h3 className="font-semibold text-[#0a2e5c] text-[17px] leading-snug mb-3">{title}</h3>
                <p className="text-[#414752] text-sm leading-relaxed flex-1 mb-5">{desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-[#1f6fd1] text-sm font-semibold group/link w-fit"
                >
                  <span className="group-hover/link:underline">Learn more</span>
                  <ChevronRight size={15} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          LIFE AT SPIRIT
      ═══════════════════════════════ */}
      <section ref={lifeRef} className="py-28 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="reveal label-eyebrow mb-3">Culture & People</p>
            <h2 className="reveal text-3xl md:text-[38px] font-bold text-[#0a2e5c] mb-4 tracking-[-0.02em]">
              Life at Spirit
            </h2>
            <p className="reveal text-[#414752] text-[15px] max-w-xl mx-auto leading-relaxed">
              Diverse, driven, and deeply collaborative — our culture is what makes great work possible every single day.
            </p>
          </div>

          {/* Large panoramic photo */}
          <div className="reveal relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 16px 48px rgba(10,46,92,0.12)' }}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85"
              alt="Life at Spirit Data Solutions"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e5c]/50 via-transparent to-transparent" />
            {/* Bottom label */}
            <div className="absolute bottom-8 left-8">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Spirit HQ</p>
              <p className="text-white font-bold text-xl">Open Collaboration Floor — NYC</p>
            </div>
          </div>

          {/* Dot pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-6 h-2 rounded-full bg-[#1f6fd1]" />
            <span className="w-2 h-2 rounded-full bg-[#c1c6d5]" />
            <span className="w-2 h-2 rounded-full bg-[#c1c6d5]" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          CONTACT CTA
      ═══════════════════════════════ */}
      <section ref={contactRef} className="py-28 bg-[#f7fafc]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ── Left info ── */}
            <div>
              <p className="reveal label-eyebrow mb-3">Get In Touch</p>
              <h2 className="reveal text-3xl md:text-[38px] font-bold text-[#0a2e5c] leading-tight tracking-[-0.02em] mb-8">
                Let's Build the Future Together
              </h2>
              <div className="reveal space-y-6">
                {[
                  {
                    Icon: MapPin,
                    label: 'Our Office',
                    value: '123 Innovation Drive, New York, NY 10001',
                    sub: 'Global operations — remote friendly',
                  },
                  {
                    Icon: Phone,
                    label: 'Call Us',
                    value: '+1 (555) 000-0000',
                    sub: 'Mon – Fri, 9am – 6pm EST',
                  },
                  {
                    Icon: Mail,
                    label: 'Email Us',
                    value: 'hello@spiritdatasolutions.com',
                    sub: 'We reply within 24 hours',
                  },
                ].map(({ Icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#1f6fd1]/8 border border-[#1f6fd1]/15 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#1f6fd1]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#727784] uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="font-semibold text-[#0a2e5c] text-sm">{value}</p>
                      <p className="text-xs text-[#727784] mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right form ── */}
            <HomeContactForm />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          MAP
      ═══════════════════════════════ */}
      <section className="bg-white pb-0">
        <div className="map-container rounded-none" style={{ height: 420, borderRadius: 0, border: 'none', borderTop: '1px solid #e2e8f0' }}>
          <iframe
            title="Spirit Data Solutions Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397308601!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1620000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </main>
  )
}

/* ── Inline mini contact form for Home page ── */
function HomeContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    data.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY')
    data.append('subject', 'New Contact Inquiry — Spirit Data Solutions')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        alert('Message sent! We\'ll be in touch within 24 hours.')
        e.target.reset()
      }
    } catch {
      alert('Something went wrong. Please email us directly.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-8 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-[#414752] mb-1.5 block">First Name</label>
          <input name="firstName" required placeholder="John" className="form-input" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Last Name</label>
          <input name="lastName" required placeholder="Doe" className="form-input" />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Email Address</label>
        <input name="email" type="email" required placeholder="john@company.com" className="form-input" />
      </div>
      <div>
        <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Subject</label>
        <input name="subject" placeholder="Project Inquiry" className="form-input" />
      </div>
      <div>
        <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Message</label>
        <textarea name="message" required rows={4} placeholder="Tell us about your project..." className="form-input resize-none" />
      </div>
      <button type="submit" className="btn-primary w-full justify-center gap-2">
        Send Message
        <ArrowRight size={16} />
      </button>
    </form>
  )
}
