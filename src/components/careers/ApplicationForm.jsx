import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

const ApplicationForm = ({ selectedPosition, openRoles }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cardStyle = { background: 'var(--bg-card)', borderColor: 'var(--border)', transition: 'background 0.4s ease, border-color 0.4s ease' };
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const textMuted    = { color: 'var(--text-muted)' };
  const sectionBg   = { background: 'var(--bg)', transition: 'background 0.4s ease' };

  // Sync selectedPosition from parent open roles selection
  useEffect(() => {
    if (selectedPosition) {
      setFormData(prev => ({ ...prev, position: selectedPosition }));
    }
  }, [selectedPosition]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload your resume to complete your application.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const responseKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!responseKey || responseKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        throw new Error("Web3Forms Access Key is missing or default. Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file.");
      }

      // 1. Upload Resume file to tmpfiles.org to get a public URL (Bypasses Web3Forms paid attachment limit!)
      const resumeUploadData = new FormData();
      resumeUploadData.append("file", resumeFile);

      const fileResponse = await fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: resumeUploadData
      });

      if (!fileResponse.ok) {
        throw new Error(`Failed to upload resume to temporary server (${fileResponse.statusText}).`);
      }

      const fileJson = await fileResponse.json();
      
      if (fileJson.status !== "success" || !fileJson.data || !fileJson.data.url) {
        throw new Error("Resume upload succeeded but failed to retrieve access URL.");
      }

      const viewUrl = fileJson.data.url;
      // Change https://tmpfiles.org/wZwLgyEoJ9AA/resume.pdf to https://tmpfiles.org/dl/wZwLgyEoJ9AA/resume.pdf for direct download
      const downloadUrl = viewUrl.replace("https://tmpfiles.org/", "https://tmpfiles.org/dl/");

      // 2. Prepare Web3Forms submission (Text fields ONLY, which is 100% free!)
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
      web3FormData.append("Portfolio URL", formData.portfolio || "Not Provided");
      web3FormData.append("Cover Letter / Message", formData.coverLetter || "Not Provided");
      
      // Inject the resume URLs as free text fields
      web3FormData.append("Resume View Link", viewUrl);
      web3FormData.append("Resume Direct Download Link", downloadUrl);
      web3FormData.append("System Note", "To protect candidate privacy and bypass Web3Forms free tier limitations, their resume has been safely uploaded to temporary cloud storage. Click the Direct Download link above to view/save their CV.");

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
          coverLetter: ''
        });
        setResumeFile(null);
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
                      className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
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
                      className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
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
                      className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
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
                      className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
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
                      className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
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
                      className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
                      style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
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
                    placeholder="behance.net/username"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>

                {/* Drag and Drop File Upload Zone */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider" style={textMuted}>
                    Resume Upload
                  </span>
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 transition-all duration-200 text-center relative hover:border-slate-300 dark:hover:border-slate-700"
                    style={{
                      background: isDragActive ? 'rgba(31, 111, 209, 0.05)' : 'var(--input-bg)',
                      borderColor: isDragActive ? 'var(--toggle-active)' : 'var(--border)'
                    }}
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
                      <div className="flex items-center gap-3 p-3 border rounded shadow-level-1 relative z-20" style={cardStyle}>
                        <FileText className="h-8 w-8 text-primary-blue shrink-0" />
                        <div className="text-left">
                          <p className="text-sm font-semibold max-w-[200px] truncate" style={textPrimary}>{resumeFile.name}</p>
                          <p className="text-xs" style={textMuted}>{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</p>
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
                          <p className="text-sm font-semibold" style={textPrimary}>
                            Drag and drop your resume here, or <span className="text-primary-blue hover:underline">browse</span>
                          </p>
                          <p className="text-xs mt-1" style={textMuted}>
                            PDF, DOC, DOCX (Max 10MB)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
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
                    className="w-full px-4 py-2.5 border rounded text-sm input-focus-ring transition-all duration-200 resize-none"
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
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ApplicationForm;
