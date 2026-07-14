import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, Shield, KeyRound, AlertCircle, Globe, Info,
  Briefcase, Scale, AlertTriangle, HelpCircle, Mail, MapPin, ArrowLeft
} from 'lucide-react';

const Disclaimer = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'definitions', label: 'Definitions', icon: <KeyRound className="w-4 h-4" /> },
    { id: 'general', label: 'General Disclaimer', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'links', label: 'External Links', icon: <Globe className="w-4 h-4" /> },
    { id: 'errors', label: 'Errors & Omissions', icon: <Info className="w-4 h-4" /> },
    { id: 'fair-use', label: 'Fair Use', icon: <Shield className="w-4 h-4" /> },
    { id: 'views', label: 'Views Expressed', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'no-responsibility', label: 'No Responsibility', icon: <Scale className="w-4 h-4" /> },
    { id: 'own-risk', label: 'Use at Your Own Risk', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Us', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleSectionClick = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cardStyle = {
    background: 'var(--bg-card)',
    borderColor: 'var(--border)',
    transition: 'background 0.4s ease, border-color 0.4s ease',
  };

  return (
    <div className="flex-1 w-full min-h-screen py-16 md:py-24 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={{ background: 'var(--bg)' }}>
      <div className="max-w-container-max mx-auto">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-blue hover:text-deep-blue transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="text-center md:text-left mb-12 border-b pb-8" style={{ borderColor: 'var(--border)' }}>
          <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">
            Legal Disclaimer
          </span>
          <h1 className="headline-xl mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>
            Disclaimer
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Last Updated: July 07, 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sticky Outline Nav */}
          <div className="lg:col-span-4 sticky top-24 hidden lg:block">
            <div className="p-6 rounded-xl border max-h-[calc(100vh-8rem)] overflow-y-auto" style={cardStyle}>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`relative flex items-center gap-3 px-4 py-2 rounded-lg text-xs text-left transition-colors duration-200 cursor-pointer ${
                      activeSection === section.id
                        ? 'text-primary-blue font-semibold font-medium'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activePillDisclaimer"
                        className="absolute inset-0 bg-primary-blue/10 rounded-lg border-l-4 border-primary-blue"
                        style={{ zIndex: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      {section.icon}
                      <span>{section.label}</span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Scrollable Content */}
          <div className="lg:col-span-8 flex flex-col gap-10 text-left">
            
            {/* Overview */}
            <motion.section
              id="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText className="text-primary-blue w-6 h-6" /> Overview
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Please read this disclaimer carefully before using Our Service.
                </p>
                <p>
                  This Disclaimer contains important disclosures regarding errors and omissions, external linking practices, fair use of copyrighted materials, user-expressed opinions, and professional liability.
                </p>
              </div>
            </motion.section>

            {/* Definitions */}
            <motion.section
              id="definitions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-5"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <KeyRound className="text-primary-blue w-6 h-6" /> Interpretation &amp; Definitions
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Interpretation</h3>
                <p>
                  The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Definitions</h3>
                <p className="mb-2">For the purposes of this Disclaimer:</p>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { term: 'Company', desc: 'Refers to SPIRIT DATA SOLUTIONS, 2nd Floor, BFS Plaza, Srinagar Colony Rudrampeta bypass, Anantapur, Andhra Pradesh (referred to as either "the Company", "We", "Us" or "Our" in this Disclaimer).' },
                    { term: 'Service', desc: 'Refers to the Website.' },
                    { term: 'You', desc: 'The individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.' },
                    { term: 'Website', desc: 'SPIRIT DATA SOLUTIONS, accessible from https://www.spiritdatasolutions.com/.' }
                  ].map((def, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] transition-all duration-300 hover:border-primary-blue/50">
                      <strong className="text-primary-blue block text-sm mb-1">{def.term}</strong>
                      <span className="text-xs md:text-sm text-[var(--text-secondary)]">{def.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* General Disclaimer */}
            <motion.section
              id="general"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <AlertCircle className="text-primary-blue w-6 h-6" /> General Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The information contained on the Service is for general information purposes only.
                </p>
                <p>
                  The Company assumes no responsibility for errors or omissions in the contents of the Service.
                </p>
                <p>
                  In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice. This Disclaimer has been created with the help of the Disclaimer Generator.
                </p>
                <p>
                  The Company does not warrant that the Service is free of viruses or other harmful components.
                </p>
              </div>
            </motion.section>

            {/* External Links Disclaimer */}
            <motion.section
              id="links"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Globe className="text-primary-blue w-6 h-6" /> External Links Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.
                </p>
                <p className="p-3 bg-primary-blue/5 rounded border-l-4 border-primary-blue text-xs md:text-sm">
                  Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                </p>
              </div>
            </motion.section>

            {/* Errors and Omissions Disclaimer */}
            <motion.section
              id="errors"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Info className="text-primary-blue w-6 h-6" /> Errors and Omissions Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.
                </p>
                <p>
                  The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.
                </p>
              </div>
            </motion.section>

            {/* Fair Use Disclaimer */}
            <motion.section
              id="fair-use"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Shield className="text-primary-blue w-6 h-6" /> Fair Use Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.
                </p>
                <p>
                  The Company believes this constitutes a &quot;fair use&quot; of any such copyrighted material as provided for in section 107 of the United States Copyright law (or equivalent provisions under applicable law).
                </p>
                <p>
                  If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.
                </p>
              </div>
            </motion.section>

            {/* Views Expressed Disclaimer */}
            <motion.section
              id="views"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Briefcase className="text-primary-blue w-6 h-6" /> Views Expressed Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.
                </p>
                <p>
                  If the Service allows users to post content (including comments), such content is the sole responsibility of the user who posted it. The Company is not liable for user-generated content and reserves the right to remove it for any reason.
                </p>
              </div>
            </motion.section>

            {/* No Responsibility Disclaimer */}
            <motion.section
              id="no-responsibility"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Scale className="text-primary-blue w-6 h-6" /> No Responsibility Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.
                </p>
                <p>
                  In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.
                </p>
              </div>
            </motion.section>

            {/* Use at Your Own Risk Disclaimer */}
            <motion.section
              id="own-risk"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <AlertTriangle className="text-primary-blue w-6 h-6" /> &quot;Use at Your Own Risk&quot; Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  All information in the Service is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.
                </p>
                <p>
                  The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.
                </p>
              </div>
            </motion.section>

            {/* Contact Us */}
            <motion.section
              id="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-6"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <HelpCircle className="text-primary-blue w-6 h-6" /> Contact Information
              </h2>
              <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                If you have any questions about this Disclaimer, You can contact us:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <Briefcase className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Company Name</h4>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>SPIRIT DATA SOLUTIONS</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <Mail className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Email Address</h4>
                    <p className="text-sm font-semibold mt-1 text-primary-blue">
                      <a href="mailto:hr@spiritdatasolutions.com" className="hover:underline">
                        hr@spiritdatasolutions.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex-grow col-span-1 md:col-span-2">
                  <MapPin className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Address</h4>
                    <p className="text-sm font-semibold mt-1 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      SPIRIT DATA SOLUTIONS, 2nd Floor, BFS Plaza, Srinagar Colony Rudrampeta bypass, Anantapur, Andhra Pradesh.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Disclaimer;
