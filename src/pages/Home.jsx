import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Cpu,
  Terminal,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  Eye,
  Rocket,
  Compass,
  Users
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Gallery slideshow data
  const gallerySlides = [
    {
      src: "/team-1.jpeg",
      title: "Collaborator Synergy",
      desc: "Our engineering architects and developers collaborate in cross-functional squads to solve complex technical problems with elegant solutions.",
      label: "Engineering Squad: Spirit Data Solutions"
    },
    {
      src: "/team-2.jpeg",
      title: "Agile Alignment Workshops",
      desc: "Daily synchronizations and technical architecture reviews guarantee absolute code quality and robust microservices systems.",
      label: "Operations & Delivery: Spirit Data Solutions"
    },
    {
      src: "/Group-8.jpg",
      title: "Spirit Data Solutions Innovation Center",
      desc: "Located in Srinagar Colony, Anantapur, our workspace is engineered to inspire creative breakthroughs and facilitate seamless developer synergy.",
      label: "Spirit Data Solutions Innovation Center"
    }
  ];

  // Auto-rotate slideshow every 3.5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallerySlides.length);
    }, 3500);
    return () => clearInterval(slideTimer);
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
      if (!responseKey || responseKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        throw new Error("Web3Forms Access Key is missing or default. Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("access_key", responseKey);
      formDataToSend.append("from_name", "Spirit Data Solutions (Contact Form)");
      formDataToSend.append("subject", `New Inquiry: ${formData.subject} - from ${formData.name}`);
      formDataToSend.append("replyto", formData.email);

      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Email", formData.email);
      formDataToSend.append("Phone", formData.phone || "Not Provided");
      formDataToSend.append("Subject", formData.subject);
      formDataToSend.append("Message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || "Failed to submit form to Web3Forms. Please check your credentials.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Code className="h-6 w-6 text-primary-blue" />,
      title: "Full Stack Web Development",
      description: "Crafting high-performance, responsive web applications using modern frameworks like React, Next.js, and Node.js. Tailored for enterprise scalability.",
      tag: "WEB DEV"
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary-blue" />,
      title: "Full Stack Java Development",
      description: "Enterprise-grade Java solutions built with Spring Boot, Microservices architecture, and cloud integrations. Reliable, secure, and robust.",
      tag: "JAVA"
    },
    {
      icon: <Terminal className="h-6 w-6 text-primary-blue" />,
      title: "Full Stack Python Development",
      description: "Fast, clean, and data-driven solutions powered by Python, Django, FastAPI, and advanced machine learning models. Built for optimal performance.",
      tag: "PYTHON"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary-blue" />,
      title: "Selenium Testing",
      description: "Automated end-to-end quality assurance using Selenium WebDriver. Ensuring high test coverage, rapid deployments, and bug-free releases.",
      tag: "TESTING"
    }
  ];

  const identities = [
    { label: "Integrity", desc: "Honesty and alignment in all interactions." },
    { label: "Innovation", desc: "Pioneering technological breakthroughs." },
    { label: "Teamwork", desc: "Synchronized collaboration globally." },
    { label: "Customer First", desc: "Prioritizing client goals and trust." }
  ];

  return (
    <div className="flex-1 w-full bg-background overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative hero-gradient text-white py-24 md:py-32 lg:py-40 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop overflow-hidden">
        {/* Background Image overlay */}
        <img
          src="/Group-8.jpg"
          alt="Spirit Data Zurich Office Workspace"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 select-none pointer-events-none"
        />
        {/* Dark linear gradient overlay for readability and premium look */}
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
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-deep-blue text-base font-semibold py-3 px-8 rounded shadow-level-1 hover:bg-sky-50 transition-all duration-300 hover:shadow-level-2 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                Get Started
              </button>
              <button
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/30 text-white hover:bg-white/10 text-base font-semibold py-3 px-8 rounded transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT / WELCOME SECTION */}
      <section id="about" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">
                Who We Are
              </span>
              <h2 className="headline-xl mt-4 mb-6">
                We are pleased to welcome you to Spirit Software Solutions
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Glowing 3D Glass Sculpture Image */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2}>
                <div className="relative rounded-lg overflow-hidden shadow-level-2 border border-slate-100 group">
                  <img
                    src="/about-welcome.png"
                    alt="Spirit Data Welcoming Abstract Art"
                    className="w-full h-auto object-cover transform duration-700 hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/20 to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Narrative Paragraphs + Mission-Vision Grid */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <ScrollReveal delay={0.3}>
                <p className="text-on-surface-variant text-base md:text-lg mb-6 leading-relaxed">
                  Spirit Software Solutions is committed to delivering quality, integrity, and excellence in everything we do. We have been building robust software systems that empower modern enterprises. Our highly skilled team of developers, designers, and QA engineers work in unison to solve complex business challenges with elegant technological solutions.
                </p>
                <p className="text-on-surface-variant text-base mb-8 leading-relaxed">
                  Our goal is to build long-term relationships with our clients, serving as a trusted technology partner at every step. We thrive on challenges, and we are excited to work with you to bring your digital vision to life.
                </p>
              </ScrollReveal>

              {/* Mission & Vision Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <ScrollReveal delay={0.4}>
                  <div className="p-5 rounded border border-slate-100 bg-surface-container-lowest shadow-level-1 hover:shadow-level-2 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="h-5 w-5 text-primary-blue animate-pulse" />
                      <h3 className="text-base font-bold text-deep-blue">Mission</h3>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      To build software solutions that empower businesses to innovate and grow. We deliver secure, scalable, and high-performance digital products.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                  <div className="p-5 rounded border border-slate-100 bg-surface-container-lowest shadow-level-1 hover:shadow-level-2 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-primary-blue" />
                      <h3 className="text-base font-bold text-deep-blue">Vision</h3>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      To be the global benchmark for enterprise software development, recognized for our commitment to precision, engineering excellence, and customer trust.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Core Identity Pills */}
              <ScrollReveal delay={0.6}>
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5" /> Our Core Values
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {identities.map((item, idx) => (
                      <div key={idx} className="flex flex-col border border-slate-100 rounded-md pt-4 p-2">
                        <span className="text-sm font-semibold text-deep-blue">{item.label}</span>
                        <span className="text-xs text-slate-400 mt-0.5">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC ENGINEERING SERVICES GRID */}
      <section id="services" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">
                What We Offer
              </span>
              <h2 className="headline-xl mt-4 mb-4">
                Strategic Engineering Services
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                A comprehensive suite of custom development and testing services designed to accelerate your digital growth.
              </p>
            </div>
          </ScrollReveal>

          {/* 4-Column Grid of Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="h-full flex flex-col justify-between p-6 bg-white rounded border border-slate-200 hover:border-primary-blue/30 shadow-level-1 hover:shadow-level-2 transform hover:-translate-y-1 transition-all duration-300 group">
                  <div>
                    <div className="p-3 bg-primary-blue/5 rounded-full w-fit mb-5 group-hover:bg-primary-blue/10 transition-colors duration-300">
                      {svc.icon}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      {svc.tag}
                    </span>
                    <h3 className="text-lg font-bold text-deep-blue mt-2 mb-3 group-hover:text-primary-blue transition-colors duration-200">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                      {svc.description}
                    </p>
                  </div>
                  <button
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1 text-sm font-semibold text-primary-blue group-hover:text-deep-blue transition-colors duration-200 cursor-pointer"
                  >
                    Learn more <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIFE AT SPIRIT SECTION */}
      <section id="gallery" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">
                Our Environment
              </span>
              <h2 className="headline-xl mt-4 mb-4">
                Life at Spirit
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                A glimpse inside the dynamic, collaborative environment at our Spirit Data Solutions office.
              </p>
            </div>
          </ScrollReveal>

          {/* Large Floating workspace showcase card with auto slideshow */}
          <ScrollReveal delay={0.2}>
            <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-level-2 h-[380px] md:h-[480px] lg:h-[560px] group bg-slate-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={gallerySlides[currentSlide].src}
                  alt={gallerySlides[currentSlide].title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />
              </AnimatePresence>

              {/* Overlay shading for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/40 via-deep-blue/10 to-transparent pointer-events-none" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-left text-white z-10">
                <motion.div
                  key={`content-${currentSlide}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{gallerySlides[currentSlide].title}</h3>
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                    {gallerySlides[currentSlide].desc}
                  </p>
                </motion.div>
              </div>

              {/* Dots Navigation indicators */}
              <div className="absolute top-4 right-4 flex gap-1.5 z-10 bg-deep-blue/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                {gallerySlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'bg-sky-400 w-5' : 'bg-white/40 hover:bg-white/70'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. CONTACT FORM &  MAP SECTION */}
      <section id="contact" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-surface border-t border-slate-200">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">
                Get in Touch
              </span>
              <h2 className="headline-xl mt-4 mb-4">
                Let's Build the Future Together
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

            {/* Left Side: Contact Information Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-bold text-deep-blue mb-6">Contact Information</h3>
                <p className="text-on-surface-variant text-base mb-8 leading-relaxed">
                  Have an ambitious project in mind or need scaling expertise? Reach out to us. Our engineering architects are standing by to scope your vision.
                </p>

                {/* Contact List Details */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-blue/5 rounded border border-primary-blue/10 text-primary-blue mt-1">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-blue">Office Address</h4>
                      <p className="text-sm text-on-surface-variant mt-1">
                        2nd floor, BFC Plaza Mano Mini AC function hall, Srinagar Colony, Anantapur, Andhra Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-blue/5 rounded border border-primary-blue/10 text-primary-blue mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-blue">General Inquiries</h4>
                      <p className="text-sm text-on-surface-variant mt-1">
                        hr@spiritdatasolutions.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-blue/5 rounded border border-primary-blue/10 text-primary-blue mt-1">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-blue">General Hotline</h4>
                      <p className="text-sm text-on-surface-variant mt-1">
                        +91 6301581529
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="hidden lg:block border-t border-slate-200 pt-8 mt-8">
                <span className="flex items-center gap-2 text-xs font-semibold text-green-600">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                  Systems Operational: Responses within 3 hours
                </span>
              </div>
            </div>

            {/* Right Side: Contact Intake Portal Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 md:p-8 rounded border border-slate-200 shadow-level-1 text-left">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-deep-blue mb-2">Message Sent Successfully</h3>
                    <p className="text-sm text-on-surface-variant max-w-sm">
                      Thank you for contacting Spirit Data. An engineering architect will review your message and reach out shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="+91 63015 81529"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                        />
                      </div>

                      {/* Subject input */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Message / Cover Letter
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="4"
                        placeholder="Tell us about your project requirements or how we can help you scale..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="text-red-600 text-xs font-bold p-3.5 bg-red-50 border border-red-200 rounded leading-relaxed">
                        ⚠️ {errorMessage}
                      </div>
                    )}

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-gradient text-white text-base font-semibold py-3 px-6 rounded shadow-level-1 hover:shadow-level-2 hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center mt-2 w-full flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Inquiry...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Map Integration */}
          <ScrollReveal delay={0.3}>
            <div className="rounded-lg overflow-hidden border border-slate-200 shadow-level-1 relative">
              <div className="absolute top-4 left-4 z-10 glass-nav px-4 py-2 rounded shadow-level-1 border border-slate-200/80 hidden sm:flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-blue animate-bounce" />
                <span className="text-xs font-bold text-deep-blue">Spirit Data Solutions Office</span>
              </div>
              <iframe
                title="Spirit Data Solutions Office Map Location"
                src="https://maps.google.com/maps?q=14.663124,77.581231+(Spirit%20Data%20Solutions)&t=&z=18&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 contrast-110"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Home;
