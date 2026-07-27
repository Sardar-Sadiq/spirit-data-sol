import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Info, Link2 } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import MagneticButton from '../MagneticButton';

const ApplicationForm = ({ selectedPosition, openRoles }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: selectedPosition || '',
    experience: '',
    linkedin: '',
    portfolio: '',
    resumeLink: '',
    coverLetter: ''
  });

  const [prevSelectedPosition, setPrevSelectedPosition] = useState(selectedPosition);
  if (selectedPosition && selectedPosition !== prevSelectedPosition) {
    setPrevSelectedPosition(selectedPosition);
    setFormData(prev => ({ ...prev, position: selectedPosition }));
  }

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted = { color: 'var(--text-muted)' };
  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resumeLink.trim()) {
      setErrorMessage("Please provide a link to your resume (Google Drive, Dropbox, etc.).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const responseKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!responseKey || responseKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        throw new Error("Web3Forms Access Key is missing or default. Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file.");
      }

      // Prepare Web3Forms submission
      const web3FormData = new FormData();
      web3FormData.append("access_key", responseKey);
      web3FormData.append("from_name", "Spirit Data Solutions (Careers Portal)");
      web3FormData.append("subject", `New Job Application: ${formData.position} - from ${formData.fullName}`);
      web3FormData.append("replyto", formData.email);

      web3FormData.append("Full Name", formData.fullName);
      web3FormData.append("Email", formData.email);
      web3FormData.append("Phone", formData.phone);
      web3FormData.append("Position", formData.position);
      web3FormData.append("Experience", `${formData.experience} Years`);
      web3FormData.append("LinkedIn Profile", formData.linkedin);
      web3FormData.append("Resume Link", formData.resumeLink);
      web3FormData.append("Portfolio URL", formData.portfolio || "Not Provided");
      web3FormData.append("Cover Letter / Message", formData.coverLetter || "Not Provided");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          linkedin: '',
          portfolio: '',
          resumeLink: '',
          coverLetter: ''
        });
      } else {
        throw new Error(data.message || "Failed to submit application to Web3Forms. Please check your credentials.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply-form" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop border-t" style={{ ...sectionBg, borderTopColor: 'var(--border)' }}>
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="headline-xl mb-4" style={textPrimary}>Ready to join the spirit?</h2>
            <p className="text-base md:text-lg" style={textSecondary}>
              Complete the form below and start your journey with us.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="p-6 md:p-8 rounded border shadow-level-1 text-left" style={cardStyle}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2" style={textPrimary}>Application Submitted</h3>
                <p className="text-sm max-w-sm" style={textSecondary}>
                  Thank you for applying to Spirit Data Solutions! Our recruitment team will carefully analyze your resume and get back to you within 5 working days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">

                {/* Grid fields: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
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
                      className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
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
                      className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                {/* Grid fields: Phone & Position */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
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
                      className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="position" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
                      Position Applied For
                    </label>
                    <select
                      id="position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    >
                      <option value="" disabled style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>Select a position</option>
                      {openRoles.map((role, rIdx) => (
                        <option key={rIdx} value={role.title} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>{role.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Grid fields: Experience & LinkedIn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="experience" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
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
                      className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="linkedin" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
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
                      className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                {/* Resume Link Field with Instructions */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="resumeLink" className="text-xs font-bold uppercase tracking-wider flex items-center justify-between" style={textMuted}>
                    <span>Resume / CV Link (Google Drive / Cloud Link)</span>
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Link2 className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                      type="url"
                      id="resumeLink"
                      name="resumeLink"
                      required
                      placeholder="https://drive.google.com/file/d/your-resume-id/view?usp=sharing"
                      value={formData.resumeLink}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  {/* Google Drive Access Instructions Card */}
                  <div className="flex items-start gap-2.5 mt-1 p-3.5 rounded border text-xs leading-relaxed" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                    <Info className="h-4 w-4 text-primary-blue shrink-0 mt-0.5" />
                    <div style={textSecondary}>
                      <p className="font-semibold text-primary-blue mb-1">
                        Google Drive Access Instructions:
                      </p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Upload your resume to Google Drive (or Dropbox / OneDrive).</li>
                        <li>Click <strong>Share</strong> &rarr; under <em>General Access</em>, select <strong className="text-emerald-600 dark:text-emerald-400 font-bold">"Anyone with the link"</strong> (Viewer).</li>
                        <li>Copy the share link and paste it into the input field above.</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Portfolio field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="portfolio" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
                    Portfolio Link (Optional)
                  </label>
                  <input
                    type="text"
                    id="portfolio"
                    name="portfolio"
                    placeholder="behance.net/username or github.com/username"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>

                {/* Message/Cover Letter Cover Text */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="coverLetter" className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
                    Message / Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="4"
                    placeholder="Tell us why you are a great fit..."
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border rounded text-sm focus:outline-none focus:border-primary-blue focus:ring-3 focus:ring-primary-blue/15 transition-all duration-200 resize-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="text-red-600 text-xs font-bold p-3.5 bg-red-50 border border-red-200 rounded leading-relaxed">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2"
                  buttonClassName={`w-full bg-gradient-to-b from-blue-500 to-blue-700 text-white text-base font-semibold py-3 px-6 rounded-lg active:scale-98 transition duration-200 text-center flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </MagneticButton>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ApplicationForm;