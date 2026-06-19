import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Cpu, Terminal, ShieldCheck,
  MapPin, Mail, Phone, ArrowRight,
  CheckCircle, Eye, Rocket, Compass, Users
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Logo3D from '../components/Logo3D';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const gallerySlides = [
    { src: "/team-1.png", title: "Agile Alignment Workshops", desc: "Daily synchronizations and technical architecture reviews guarantee absolute code quality and robust microservices systems.", label: "Operations & Delivery: Spirit Data Solutions" },
    { src: "/team-2.png", title: "Collaborator Synergy", desc: "Our engineering architects and developers collaborate in cross-functional squads to solve complex technical problems with elegant solutions.", label: "Engineering Squad: Spirit Data Solutions" },
    { src: "/office.jpeg", title: "Spirit Data Solutions Innovation Center", desc: "Located in BFC Plaza, Srinagar Colony, Anantapur, our workspace is engineered to inspire creative breakthroughs and facilitate seamless developer synergy.", label: "Spirit Data Solutions Innovation Center" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % gallerySlides.length), 3500);
    return () => clearInterval(t);
  }, [gallerySlides.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const responseKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!responseKey || responseKey === "YOUR_WEB3FORMS_ACCESS_KEY") throw new Error("Web3Forms Access Key is missing or default.");
      const fd = new FormData();
      fd.append("access_key", responseKey);
      fd.append("from_name", "Spirit Data Solutions (Contact Form)");
      fd.append("subject", `New Inquiry: ${formData.subject} - from ${formData.name}`);
      fd.append("replyto", formData.email);
      fd.append("Name", formData.name);
      fd.append("Email", formData.email);
      fd.append("Phone", formData.phone || "Not Provided");
      fd.append("Subject", formData.subject);
      fd.append("Message", formData.message);
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || "Failed to submit form.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { icon: <Code className="h-6 w-6 text-primary-blue" />, title: "Full Stack Web Development", description: "Crafting high-performance, responsive web applications using modern frameworks like React, Next.js, and Node.js. Tailored for enterprise scalability.", tag: "WEB DEV" },
    { icon: <Cpu className="h-6 w-6 text-primary-blue" />, title: "Full Stack Java Development", description: "Enterprise-grade Java solutions built with Spring Boot, Microservices architecture, and cloud integrations. Reliable, secure, and robust.", tag: "JAVA" },
    { icon: <Terminal className="h-6 w-6 text-primary-blue" />, title: "Full Stack Python Development", description: "Fast, clean, and data-driven solutions powered by Python, Django, FastAPI, and advanced machine learning models.", tag: "PYTHON" },
    { icon: <ShieldCheck className="h-6 w-6 text-primary-blue" />, title: "Selenium Testing", description: "Automated end-to-end quality assurance using Selenium WebDriver. Ensuring high test coverage, rapid deployments, and bug-free releases.", tag: "TESTING" },
  ];

  const identities = [
    { label: "Integrity",      desc: "Honesty and alignment in all interactions." },
    { label: "Innovation",     desc: "Pioneering technological breakthroughs." },
    { label: "Teamwork",       desc: "Synchronized collaboration globally." },
    { label: "Customer First", desc: "Prioritizing client goals and trust." },
  ];

  /* ── shared inline styles ── */
  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted    = { color: 'var(--text-muted)' };
  const sectionBg   = { background: 'var(--bg)',        transition: 'background 0.4s ease' };
  const surfaceBg   = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

  return (
    <div className="flex-1 w-full overflow-hidden" style={sectionBg}>

      {/* 1. HERO — always dark, no changes needed */}
      <section className="relative hero-gradient text-white py-24 md:py-32 lg:py-40 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop overflow-hidden">
        <img src="/Group-8.jpg" alt="Spirit Data Zurich Office Workspace"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 select-none pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 via-deep-blue/70 to-deep-blue/20 z-0 pointer-events-none" />
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-sky-200 border border-white/20 mb-6 backdrop-blur-md">
              <Rocket className="h-3 w-3" /> Beyond Boundaries
            </span>
            <h1 className="text-white display-lg mb-6 leading-tight">
              Pioneering Digital <br />
              <span className="text-sky-300">Excellence</span> for <br />
              Global Enterprises
            </h1>
            <p className="text-sky-100 text-lg md:text-xl font-normal max-w-2xl mb-8 leading-relaxed">
              Ready to accelerate operations, drive growth, and unlock new markets? We specialize in high-impact software management and cutting-edge custom engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-deep-blue text-base font-semibold py-3 px-8 rounded shadow-level-1 hover:bg-sky-50 transition-all duration-300 hover:shadow-level-2 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer">
                Get Started
              </button>
              <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/30 text-white hover:bg-white/10 text-base font-semibold py-3 px-8 rounded transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer">
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={sectionBg}>
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">Who We Are</span>
              <h2 className="headline-xl mt-4 mb-6" style={textPrimary}>
                We are pleased to welcome you to <br />
                <span className="text-primary-blue transition-all duration-300 hover:text-secondary-blue">Spirit Data Solutions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ alignItems: 'stretch' }}>
            <div className="flex flex-col" style={{ minHeight: '100%' }}>
              <ScrollReveal delay={0.2} className="flex flex-col flex-1 h-full">
                <div className="relative rounded-2xl overflow-hidden group" style={{ flex: 1, minHeight: '480px' }}>
                  <div className="absolute inset-0"><Logo3D /></div>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex flex-col justify-center text-left">
              <ScrollReveal delay={0.3}>
                <p className="text-base md:text-lg mb-6 leading-relaxed" style={textSecondary}>
                  Spirit Data Solutions is committed to delivering quality, integrity, and excellence in everything we do. We have been building robust software systems that empower modern enterprises. Our highly skilled team of developers, designers, and QA engineers work in unison to solve complex business challenges with elegant technological solutions.
                </p>
                <p className="text-base mb-8 leading-relaxed" style={textSecondary}>
                  Our goal is to build long-term relationships with our clients, serving as a trusted technology partner at every step.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Rocket className="h-5 w-5 text-primary-blue animate-pulse" />, title: 'Mission', text: 'To build software solutions that empower businesses to innovate and grow. We deliver secure, scalable, and high-performance digital products.' },
                  { icon: <Eye className="h-5 w-5 text-primary-blue" />, title: 'Vision', text: 'To be the global benchmark for enterprise software development, recognized for precision, engineering excellence, and customer trust.' },
                ].map(({ icon, title, text }, i) => (
                  <ScrollReveal key={title} delay={0.4 + i * 0.1}>
                    <div className="p-5 rounded border shadow-level-1 hover:shadow-level-2 transition-all duration-300" style={cardStyle}>
                      <div className="flex items-center gap-2 mb-3">{icon}<h3 className="text-base font-bold" style={textPrimary}>{title}</h3></div>
                      <p className="text-sm leading-relaxed" style={textSecondary}>{text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.6}>
                <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5" style={textMuted}>
                    <Compass className="h-3.5 w-3.5" /> Our Core Values
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {identities.map((item, idx) => (
                      <div key={idx} className="flex flex-col border rounded-md pt-4 p-2" style={{ borderColor: 'var(--border)' }}>
                        <span className="text-sm font-semibold" style={textPrimary}>{item.label}</span>
                        <span className="text-xs mt-0.5" style={textMuted}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section id="services" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={surfaceBg}>
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">What We Offer</span>
              <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>Strategic Engineering Services</h2>
              <p className="text-base md:text-lg" style={textSecondary}>A comprehensive suite of custom development and testing services designed to accelerate your digital growth.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="h-full flex flex-col justify-between p-6 rounded border shadow-level-1 hover:shadow-level-2 transform hover:-translate-y-1 transition-all duration-300 group"
                  style={cardStyle}>
                  <div>
                    <div className="p-3 bg-primary-blue/5 rounded-full w-fit mb-5 group-hover:bg-primary-blue/10 transition-colors duration-300">{svc.icon}</div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest" style={textMuted}>{svc.tag}</span>
                    <h3 className="text-lg font-bold mt-2 mb-3 group-hover:text-primary-blue transition-colors duration-200" style={textPrimary}>{svc.title}</h3>
                    <p className="text-sm leading-relaxed mb-6" style={textSecondary}>{svc.description}</p>
                  </div>
                  <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1 text-sm font-semibold text-primary-blue group-hover:text-deep-blue transition-colors duration-200 cursor-pointer">
                    Learn more <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section id="gallery" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={sectionBg}>
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">Our Environment</span>
              <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>Life at Spirit</h2>
              <p className="text-base md:text-lg" style={textSecondary}>A glimpse inside the dynamic, collaborative environment at our Spirit Data Solutions office.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative rounded-lg overflow-hidden border shadow-level-2 h-[320px] md:h-[480px] lg:h-[560px] group bg-slate-950"
              style={{ borderColor: 'var(--border)' }}>
              <AnimatePresence mode="wait">
                <motion.img key={currentSlide} src={gallerySlides[currentSlide].src} alt={gallerySlides[currentSlide].title}
                  initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain md:object-cover select-none pointer-events-none" />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/60 via-deep-blue/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-left text-white z-10">
                <motion.div key={`c-${currentSlide}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-3xl">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{gallerySlides[currentSlide].title}</h3>
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed">{gallerySlides[currentSlide].desc}</p>
                </motion.div>
              </div>
              <div className="absolute top-4 right-4 flex gap-1.5 z-10 bg-deep-blue/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                {gallerySlides.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'bg-sky-400 w-5' : 'bg-white/40 hover:bg-white/70'}`}
                    aria-label={`Go to slide ${idx + 1}`} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. CONTACT */}
      <section id="contact" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop border-t" style={{ ...surfaceBg, borderColor: 'var(--border)' }}>
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">Get in Touch</span>
              <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>Let's Build the Future Together</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-bold mb-6" style={textPrimary}>Contact Information</h3>
                <p className="text-base mb-8 leading-relaxed" style={textSecondary}>Have an ambitious project in mind? Reach out. Our engineering architects are standing by to scope your vision.</p>
                <div className="flex flex-col gap-6">
                  {[
                    { icon: <MapPin className="h-5 w-5" />, label: 'Office Address', text: '2nd floor, BFC Plaza Mano Mini AC function hall, Srinagar Colony, Anantapur, Andhra Pradesh, India' },
                    { icon: <Mail className="h-5 w-5" />,   label: 'General Inquiries', text: 'hr@spiritdatasolutions.com' },
                    { icon: <Phone className="h-5 w-5" />,  label: 'General Hotline', text: '+91 6301581529' },
                  ].map(({ icon, label, text }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="p-3 bg-primary-blue/5 rounded border border-primary-blue/10 text-primary-blue mt-1">{icon}</div>
                      <div>
                        <h4 className="text-sm font-bold" style={textPrimary}>{label}</h4>
                        <p className="text-sm mt-1" style={textSecondary}>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block border-t pt-8 mt-8" style={{ borderColor: 'var(--border)' }}>
                <span className="flex items-center gap-2 text-xs font-semibold text-green-500">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                  Systems Operational: Responses within 3 hours
                </span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <div className="p-6 md:p-8 rounded border shadow-level-1 text-left" style={cardStyle}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2" style={textPrimary}>Message Sent Successfully</h3>
                    <p className="text-sm max-w-sm" style={textSecondary}>Thank you for contacting Spirit Data. An engineering architect will review your message shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { id: 'name',  label: 'Full Name',      type: 'text',  placeholder: 'Your Name'  },
                        { id: 'email', label: 'Email Address',  type: 'email', placeholder: 'Your Email' },
                      ].map(({ id, label, type, placeholder }) => (
                        <div key={id} className="flex flex-col gap-1.5">
                          <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider" style={textMuted}>{label}</label>
                          <input type={type} id={id} name={id} required placeholder={placeholder}
                            value={formData[id]} onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
                            style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { id: 'phone',   label: 'Phone Number', type: 'tel',  placeholder: '+91 63015 81529',    required: false },
                        { id: 'subject', label: 'Subject',       type: 'text', placeholder: 'How can we help?',  required: true },
                      ].map(({ id, label, type, placeholder, required }) => (
                        <div key={id} className="flex flex-col gap-1.5">
                          <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider" style={textMuted}>{label}</label>
                          <input type={type} id={id} name={id} required={required} placeholder={placeholder}
                            value={formData[id]} onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
                            style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>Message / Cover Letter</label>
                      <textarea id="message" name="message" required rows="4"
                        placeholder="Tell us about your project requirements..."
                        value={formData.message} onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200 resize-none"
                        style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                    </div>
                    {errorMessage && (
                      <div className="text-red-500 text-xs font-bold p-3.5 rounded leading-relaxed"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                        ⚠️ {errorMessage}
                      </div>
                    )}
                    <button type="submit" disabled={isSubmitting}
                      className={`btn-gradient text-white text-base font-semibold py-3 px-6 rounded shadow-level-1 hover:shadow-level-2 hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center mt-2 w-full flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
                      {isSubmitting ? (
                        <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>Sending Inquiry...</>
                      ) : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <ScrollReveal delay={0.3}>
            <div className="rounded-lg overflow-hidden border shadow-level-1" style={{ borderColor: 'var(--border)' }}>
              <iframe
                title="Spirit Data Solutions Office Map Location"
                src="https://maps.google.com/maps?q=14.6631453,77.5812019+(BFC%20PLAZA)&t=&z=18&ie=UTF8&iwloc=&output=embed"
                width="100%" height="380" style={{ border: 0 }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="map-frame grayscale opacity-90 contrast-110"
              />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-blue animate-bounce flex-shrink-0" />
              <span className="text-xs font-bold" style={textPrimary}>Spirit Data Solutions Office</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
