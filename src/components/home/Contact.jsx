import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, CheckCircle } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted    = { color: 'var(--text-muted)' };
  const surfaceBg   = { background: 'var(--bg-surface)', transition: 'background 0.4s ease' };

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
        throw new Error("Web3Forms Access Key is missing or default.");
      }
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

  return (
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
  );
};

export default Contact;
