import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

// const contactInfo = [
//   {
//     Icon: MapPin,
//     label: 'Our Office',
//     value: '123 Innovation Drive, New York, NY 10001',
//     sub: 'Global operations — remote friendly',
//   },
//   {
//     Icon: Phone,
//     label: 'Call Us',
//     value: '+1 (555) 000-0000',
//     sub: 'Mon – Fri, 9am – 6pm EST',
//   },
//   {
//     Icon: Mail,
//     label: 'Email Us',
//     value: 'hello@spiritdatasolutions.com',
//     sub: 'We reply within 24 hours',
//   },
//   {
//     Icon: Linkedin,
//     label: 'LinkedIn',
//     value: 'Spirit Data Solutions',
//     sub: 'Follow our updates',
//   },
// ]

export default function Contact() {
  const infoRef = useRef(null)
  useScrollReveal(infoRef)

  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const data = new FormData(e.target)
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', 'New Contact Form Submission — Spirit Data Solutions')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        e.target.reset()
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
      <section className="hero-bg py-28">
        <div className="section-container">
          <motion.p className="label-eyebrow mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Contact Us
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-[#0a2e5c] leading-tight max-w-3xl mb-6 tracking-[-0.03em]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Let's Build the{' '}
            <span className="gradient-text">Future Together</span>
          </motion.h1>
          <motion.p
            className="text-[#414752] text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Whether you have a concrete project brief or simply want to explore what's possible — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Info column */}
            <div ref={infoRef} className="lg:col-span-2 space-y-8">
              {contactInfo.map(({ Icon, label, value, sub }) => (
                <div key={label} className="reveal flex items-start gap-4">
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

            {/* Form column */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-8 space-y-5">
                <h2 className="text-xl font-bold text-[#0a2e5c] mb-2">Send us a message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Full Name *</label>
                    <input name="name" required placeholder="John Doe" className="form-input" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Email Address *</label>
                    <input name="email" type="email" required placeholder="john@company.com" className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Phone Number</label>
                    <input name="phone" placeholder="+1 (555) 000-0000" className="form-input" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Company</label>
                    <input name="company" placeholder="Your Company" className="form-input" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Service of Interest</label>
                  <select name="service" className="form-input">
                    <option value="">Select a service</option>
                    <option>Full Stack Web Development</option>
                    <option>Full Stack Java Development</option>
                    <option>Full Stack Python Development</option>
                    <option>Solution Testing & QA</option>
                    <option>Cloud & DevOps</option>
                    <option>Data & Analytics</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#414752] mb-1.5 block">Message *</label>
                  <textarea name="message" required rows={5} placeholder="Tell us about your project or challenge..." className="form-input resize-none" />
                </div>

                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center gap-2 disabled:opacity-60">
                  {status === 'loading' ? 'Sending…' : <><ArrowRight size={16} /> Send Message</>}
                </button>

                {status === 'success' && (
                  <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm p-4 text-center font-medium">
                    ✅ Message sent! We'll be in touch within 24 hours.
                  </div>
                )}
                {status === 'error' && (
                  <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-4 text-center font-medium">
                    ❌ Something went wrong. Please email us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-[#f7fafc] pb-0">
        <div style={{ height: 420, borderTop: '1px solid #e2e8f0' }}>
          <iframe
            title="Spirit Data Solutions HQ"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397308601!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1620000000000"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  )
}
