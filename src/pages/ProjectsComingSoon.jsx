import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Code, Cpu, Terminal, CheckCircle2, Shield } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const ProjectsComingSoon = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const responseKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!responseKey || responseKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        throw new Error("Web3Forms Access Key is missing or default. Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("access_key", responseKey);
      formDataToSend.append("from_name", "Spirit Data Solutions (Coming Soon)");
      formDataToSend.append("subject", `New Portfolio subscriber: ${email}`);
      formDataToSend.append("replyto", email);
      formDataToSend.append("Info", "A new user has expressed interest in the company projects. Please ensure they receive email updates whenever new projects are published on the website.");
      formDataToSend.append("Subscriber Email", email);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setEmail('');
      } else {
        throw new Error(data.message || "Failed to submit subscription. Please check your credentials.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-background overflow-hidden min-h-[85vh] flex flex-col justify-center py-20 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop relative">

      {/* Absolute Decorative Geometric Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 z-0 pointer-events-none" />

      {/* Decorative blurred background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full text-center relative z-10">

        {/* Coming Soon Technical Indicator */}
        <ScrollReveal>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-blue/10 text-primary-blue border border-primary-blue/20 mb-6">
            <Clock className="h-3.5 w-3.5 animate-pulse" /> Launching Q3 2026
          </span>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h1 className="text-deep-blue display-lg mb-6 leading-tight">
            Our Enterprise <br />
            <span className="text-primary-blue">Project Portfolio</span> <br />
            is Under Construction
          </h1>
        </ScrollReveal>

        {/* Subtext */}
        <ScrollReveal delay={0.2}>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            We are curating an exclusive catalog of our enterprise software deployments, high-performance Java architectures, automated Selenium suites, and data-driven solutions.
          </p>
        </ScrollReveal>

        {/* High-Tech Capability Indicators */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { icon: <Cpu className="h-5 w-5" />, text: "Java Microservices" },
              { icon: <Code className="h-5 w-5" />, text: "React Applications" },
              { icon: <Terminal className="h-5 w-5" />, text: "Python Scaling" },
              { icon: <Shield className="h-5 w-5" />, text: "Selenium Suites" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded shadow-level-1 hover:border-primary-blue/20 transition-all duration-300">
                <span className="text-primary-blue">{item.icon}</span>
                <span className="text-xs font-semibold text-deep-blue">{item.text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Interactive Subscription / Coming Soon Notification Portal */}
        <ScrollReveal delay={0.4}>
          <div className="bg-white p-6 md:p-8 rounded border border-slate-200 shadow-level-2 max-w-xl mx-auto text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-deep-blue" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-6"
              >
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
                <h3 className="text-lg font-bold text-deep-blue mb-1">Subscription Confirmed</h3>
                <p className="text-xs text-on-surface-variant">
                  We'll notify you as soon as the project portfolio is released.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="text-left">
                  <h3 className="text-base font-bold text-deep-blue">Get Notified</h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Subscribe to receive early-access invites to our architectural breakdowns and tech papers.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="text-red-600 text-xs font-bold p-3 bg-red-50 border border-red-200 rounded leading-relaxed">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your corporate email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-4 py-2.5 border border-slate-200 rounded text-sm text-on-surface placeholder-slate-400 bg-slate-50/50 hover:bg-slate-50 focus:bg-white input-focus-ring transition-all duration-200"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-gradient text-white text-sm font-semibold py-2.5 px-6 rounded cursor-pointer transition-all duration-300 hover:opacity-95 text-center flex-shrink-0 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </>
                    ) : (
                      "Keep Me Updated"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Back Link */}
        <ScrollReveal delay={0.5}>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-blue hover:text-deep-blue transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Homepage
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default ProjectsComingSoon;
