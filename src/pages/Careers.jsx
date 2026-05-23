import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Terminal, 
  Users, 
  GraduationCap, 
  ChevronDown, 
  UploadCloud, 
  FileText, 
  CheckCircle,
  Briefcase,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Careers = () => {
  const location = useLocation();
  const formRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    coverLetter: ''
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Scroll to apply form if url contains hash #apply
  useEffect(() => {
    if (location.hash === '#apply' || window.location.href.includes('#apply')) {
      setTimeout(() => {
        const formElement = document.getElementById('apply-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  // Accordion active state
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleApplyClick = (roleTitle) => {
    setFormData(prev => ({ ...prev, position: roleTitle }));
    const formElement = document.getElementById('apply-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Drag and Drop File Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (validTypes.includes(file.type)) {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF or Word document (DOC/DOCX) only.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload your resume to complete your application.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        linkedin: '',
        portfolio: '',
        coverLetter: ''
      });
      setResumeFile(null);
    }, 4000);
  };

  const openRoles = [
    {
      title: "Frontend Developer",
      meta: "FULL-TIME • REMOTE",
      desc: "We are seeking a highly skilled Frontend Engineer to build beautiful, fluid, and scalable user interfaces. You will translate designer mockups into interactive React components with meticulous attention to detail.",
      requirements: [
        "3+ years of professional production experience with React, Vite, and modern state management.",
        "Deep understanding of Tailwind CSS, CSS variables, and layout systems (flexbox, grid).",
        "Experience creating smooth micro-animations using Framer Motion and GSAP.",
        "Meticulous eye for design tokens, typography scale, and premium UX aesthetics."
      ],
      tech: ["React.js", "Tailwind CSS", "Framer Motion", "GSAP", "Vite"]
    },
    {
      title: "Backend Developer",
      meta: "FULL-TIME • HYBRID",
      desc: "Join our core systems team engineering reliable, high-performance distributed microservices. You will architect robust data models, design clean API contracts, and optimize server-side workloads.",
      requirements: [
        "4+ years of backend engineering in Java (Spring Boot) or Python (FastAPI/Django).",
        "Strong understanding of relational databases (PostgreSQL) and caching layers (Redis).",
        "Experience architecting RESTful and GraphQL APIs for secure cloud systems.",
        "Familiarity with Docker, Kubernetes, and AWS cloud infrastructures."
      ],
      tech: ["Java / Spring Boot", "Python / FastAPI", "PostgreSQL", "Docker", "AWS"]
    },
    {
      title: "UI/UX Designer",
      meta: "CONTRACT • REMOTE",
      desc: "We are looking for a digital artist with a systems-design approach. You will build comprehensive design systems, high-fidelity mockups, and interactive prototypes for premium enterprise SaaS products.",
      requirements: [
        "Portfolio demonstrating sleek, Swiss-style minimalism and precision layout grids.",
        "Expertise in Figma including variables, responsive auto-layout, and complex prototyping.",
        "Strong understanding of layout reflows across desktop, tablet, and mobile views.",
        "Ability to collaborate closely with frontend developers to ensure token compliance."
      ],
      tech: ["Figma", "Design Systems", "Prototyping", "User Research"]
    },
    {
      title: "QA Engineer",
      meta: "FULL-TIME • REMOTE",
      desc: "Own the quality verification pipeline of our enterprise platforms. You will design, implement, and run end-to-end automated testing suites to guarantee bug-free deployments.",
      requirements: [
        "3+ years in automated software testing using Selenium WebDriver or Playwright.",
        "Proficiency writing test scripts in JavaScript, Python, or Java.",
        "Experience integrating automated test suites into CI/CD build pipelines.",
        "Expertise in regression testing, API contract testing, and performance profiling."
      ],
      tech: ["Selenium WebDriver", "Playwright", "CI/CD", "Postman", "Jest"]
    },
    {
      title: "Data Analyst",
      meta: "FULL-TIME • HYBRID",
      desc: "Transform complex enterprise data metrics into actionable product intelligence. You will build highly analytical dashboards, run advanced queries, and formulate statistical insights.",
      requirements: [
        "Strong proficiency in SQL database querying and Python pandas/numpy data tools.",
        "Experience building modern dashboards using Tableau, PowerBI, or custom dashboards.",
        "Solid mathematical understanding of statistical modeling and data regression.",
        "Excellent communication skills to translate complex data into business decisions."
      ],
      tech: ["SQL", "Python Data Science", "Tableau", "Excel", "Data Modeling"]
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary-blue" />,
      title: "Growth",
      desc: "Accelerate your career with clear paths for advancement and mentorship from industry veterans."
    },
    {
      icon: <Terminal className="h-6 w-6 text-primary-blue" />,
      title: "Technology",
      desc: "Work with the latest tech stacks and contribute to bleeding-edge enterprise digital solutions."
    },
    {
      icon: <Users className="h-6 w-6 text-primary-blue" />,
      title: "Culture",
      desc: "A collaborative, inclusive environment where every voice is heard and every spirit matters."
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary-blue" />,
      title: "Learning",
      desc: "Generous learning stipends, weekly workshops, and access to premium education resources."
    }
  ];

  return (
    <div className="flex-1 w-full bg-background overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-blue/10 text-primary-blue mb-5">
              <Sparkles className="h-3 w-3" /> Join Our Vision
            </span>
            <h1 className="headline-xl lg:text-5xl font-bold text-deep-blue leading-tight mb-5">
              Build the Future <br />
              <span className="text-primary-blue">With Us</span>
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed">
              Join a passionate team building innovative digital solutions for modern businesses. We're looking for thinkers, builders, and dreamers to push the boundaries of enterprise engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('open-roles').scrollIntoView({ behavior: 'smooth' })}
                className="btn-gradient text-white text-base font-semibold py-3 px-8 rounded shadow-level-1 hover:shadow-level-2 hover:opacity-98 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                View Open Roles
              </button>
              <button 
                onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-deep-blue border border-slate-200 text-base font-semibold py-3 px-8 rounded hover:bg-slate-50 transition-all duration-300 hover:shadow-level-1 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                Our Culture
              </button>
            </div>
          </div>

          {/* Right Image Frame Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-slate-100 shadow-level-2 group">
              <img 
                src="/careers-hero.png" 
                alt="Spirit Data Team Meeting" 
                className="w-full h-auto object-cover transform duration-700 hover:scale-102"
              />
              {/* Abstract Floating Tag Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 glass-nav px-4 py-2 rounded text-xs font-semibold text-deep-blue tracking-wide border border-white/20">
                BUILD THE FUTURE WITH US
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY SPIRIT DATA SOLUTIONS? BENEFIT GRID */}
      <section id="benefits" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-surface border-t border-slate-200">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-xl text-deep-blue mb-4">
                Why Spirit Data Solutions?
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                We believe in empowering our employees with a work environment that fosters creativity, continuous growth, and a true sense of belonging.
              </p>
            </div>
          </ScrollReveal>

          {/* 4-column feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="p-6 bg-white rounded border border-slate-200 hover:border-primary-blue/20 shadow-level-1 hover:shadow-level-2 transform hover:-translate-y-1 transition-all duration-300 text-left h-full flex flex-col items-start">
                  <div className="p-3 bg-primary-blue/5 rounded-full w-fit mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-deep-blue mb-3">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OPEN ROLES ACCORDION SYSTEM */}
      <section id="open-roles" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-white border-t border-slate-200">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="headline-xl text-deep-blue mb-4">Open Roles</h2>
              <p className="text-on-surface-variant text-base md:text-lg">
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
                  <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-level-1 hover:shadow-level-2 transition-all duration-300">
                    
                    {/* Header bar */}
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full px-6 py-5 md:py-6 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 focus:outline-none cursor-pointer"
                    >
                      <div className="flex flex-col gap-1 items-start text-left">
                        <h3 className="text-base md:text-lg font-bold text-deep-blue">{role.title}</h3>
                        <span className="text-[10px] md:text-xs font-bold text-primary-blue bg-primary-blue/5 px-2 py-0.5 rounded-full border border-primary-blue/15 tracking-wider">
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
                          className="border-t border-slate-100"
                        >
                          <div className="p-6 bg-slate-50/50 flex flex-col gap-6 text-left">
                            
                            {/* Role Narrative */}
                            <div>
                              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Role Overview</h4>
                              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">{role.desc}</p>
                            </div>

                            {/* Requirements Bullet Points */}
                            <div>
                              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Key Requirements</h4>
                              <ul className="flex flex-col gap-2.5">
                                {role.requirements.map((req, rIdx) => (
                                  <li key={rIdx} className="text-sm text-on-surface-variant flex items-start gap-2.5">
                                    <span className="mt-1 w-1.5 h-1.5 bg-primary-blue rounded-full shrink-0" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Tech Badges & Apply Shortcut */}
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 border-t border-slate-100">
                              <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Technologies Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                  {role.tech.map((techItem, tIdx) => (
                                    <span 
                                      key={tIdx} 
                                      className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded"
                                    >
                                      {techItem}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <button
                                onClick={() => handleApplyClick(role.title)}
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

      {/* 4. APPLICATION INTAKE PORTAL */}
      <section id="apply-form" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop bg-surface border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="headline-xl text-deep-blue mb-4">Ready to join the spirit?</h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Complete the form below and start your journey with us.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white p-6 md:p-8 rounded border border-slate-200 shadow-level-1 text-left">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-deep-blue mb-2">Application Submitted</h3>
                  <p className="text-sm text-on-surface-variant max-w-sm">
                    Thank you for applying to Spirit Data Solutions! Our recruitment team will carefully analyze your resume and get back to you within 5 working days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                  
                  {/* Grid fields: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Grid fields: Phone & Position */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="position" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Position Applied For
                      </label>
                      <select
                        id="position"
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                      >
                        <option value="" disabled>Select a position</option>
                        {openRoles.map((role, rIdx) => (
                          <option key={rIdx} value={role.title}>{role.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Grid fields: Experience & LinkedIn */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="experience" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        required
                        min="0"
                        placeholder="e.g. 5"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="linkedin" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        LinkedIn Profile
                      </label>
                      <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        required
                        placeholder="linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Portfolio field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="portfolio" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Portfolio Link (Optional)
                    </label>
                    <input
                      type="text"
                      id="portfolio"
                      name="portfolio"
                      placeholder="behance.net/username"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                    />
                  </div>

                  {/* Drag and Drop File Upload Zone */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Resume Upload
                    </span>
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 transition-all duration-200 text-center relative ${
                        isDragActive 
                          ? 'border-primary-blue bg-primary-blue/5' 
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="file"
                        id="resume-file-input"
                        required={!resumeFile}
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {resumeFile ? (
                        <div className="flex items-center gap-3 bg-white p-3 border border-slate-200 rounded shadow-level-1 relative z-20">
                          <FileText className="h-8 w-8 text-primary-blue shrink-0" />
                          <div className="text-left">
                            <p className="text-sm font-semibold text-deep-blue max-w-[200px] truncate">{resumeFile.name}</p>
                            <p className="text-xs text-slate-400">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setResumeFile(null);
                            }}
                            className="text-xs font-bold text-red-500 hover:text-red-700 ml-4 relative z-30"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="p-3 bg-primary-blue/5 rounded-full text-primary-blue">
                            <UploadCloud className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-deep-blue">
                              Drag and drop your resume here, or <span className="text-primary-blue hover:underline">browse</span>
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              PDF, DOC, DOCX (Max 10MB)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Message/Cover Letter Cover Text */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="coverLetter" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Message / Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows="4"
                      placeholder="Tell us why you are a great fit..."
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-gradient text-white text-base font-semibold py-3 px-6 rounded shadow-level-1 hover:shadow-level-2 hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center mt-2 cursor-pointer w-full"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Careers;
