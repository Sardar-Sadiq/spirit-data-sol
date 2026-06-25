import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, ShieldCheck, Landmark, AlertCircle, Ban, HelpCircle,
  Briefcase, Mail, Phone, MapPin, ChevronRight, Scale, ArrowLeft
} from 'lucide-react';

const Terms = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'services', label: '1. Services Provided', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'intellectual', label: '2. Intellectual Property', icon: <Scale className="w-4 h-4" /> },
    { id: 'use', label: '3. Acceptable Use', icon: <Ban className="w-4 h-4" /> },
    { id: 'privacy', label: '4. Data Privacy', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'liability', label: '5. Limitation of Liability', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'warranties', label: '6. Disclaimer of Warranties', icon: <Landmark className="w-4 h-4" /> },
    { id: 'termination', label: '7. Termination', icon: <Ban className="w-4 h-4" /> },
    { id: 'law', label: '8. Governing Law', icon: <Landmark className="w-4 h-4" /> },
    { id: 'modifications', label: '9. Modifications', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: '10. Contact Info', icon: <HelpCircle className="w-4 h-4" /> },
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
            Legal Agreement
          </span>
          <h1 className="headline-xl mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>
            Terms &amp; Conditions
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Last Updated: June 25, 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sticky Outline Nav */}
          <div className="lg:col-span-4 sticky top-24 hidden lg:block">
            <div className="p-6 rounded-xl border" style={cardStyle}>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left transition-colors duration-200 cursor-pointer ${
                      activeSection === section.id
                        ? 'text-primary-blue font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activePillTerms"
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

          {/* Right Column: Scrollable Terms Content */}
          <div className="lg:col-span-8 flex flex-col gap-10 text-left">
            
            {/* Overview / Introduction */}
            <motion.section
              id="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText className="text-primary-blue w-6 h-6" /> Welcome to Spirit Data Solutions
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  These Terms and Conditions (&quot;Terms&quot;, &quot;Agreement&quot;) govern your access to and use of the Spirit Data Solutions website, software, data management services, and associated platforms (collectively, the &quot;Services&quot;).
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with any part of these terms, you must strictly refrain from using the Services.
                </p>
              </div>
            </motion.section>

            {/* 1. Services Provided */}
            <motion.section
              id="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Briefcase className="text-primary-blue w-6 h-6" /> 1. Services Provided
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Spirit Data Solutions provides data management, IT consulting, software solutions, and associated enterprise operations.
                </p>
                <p>
                  We reserve the right to withdraw or amend our Services, and any service or material we provide, in our sole discretion without notice. We will not be liable if, for any reason, all or any part of the Services are unavailable at any time or for any period.
                </p>
              </div>
            </motion.section>

            {/* 2. Intellectual Property Rights */}
            <motion.section
              id="intellectual"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Scale className="text-primary-blue w-6 h-6" /> 2. Intellectual Property Rights
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Spirit Data Solutions, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
              </div>
            </motion.section>

            {/* 3. Acceptable Use and User Responsibilities */}
            <motion.section
              id="use"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Ban className="text-primary-blue w-6 h-6" /> 3. Acceptable Use and User Responsibilities
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  You agree to use our Services only for lawful purposes and in accordance with these Terms. You explicitly agree not to use the Services:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2.5">
                  <li>In any way that violates any applicable national, regional, or international law or regulation.</li>
                  <li>To exploit, harm, or attempt to exploit or harm minors in any way.</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material, including any &quot;junk mail&quot;, &quot;chain letter,&quot; &quot;spam,&quot; or any other similar solicitation.</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which, as determined by us, may harm Spirit Data Solutions or users of the Services.</li>
                </ul>
              </div>
            </motion.section>

            {/* 4. Data Privacy and Security */}
            <motion.section
              id="privacy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <ShieldCheck className="text-primary-blue w-6 h-6" /> 4. Data Privacy and Security
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  As a data-focused enterprise, we prioritize the confidentiality and integrity of information. Your use of our Services is strictly governed by our{' '}
                  <Link to="/privacy" className="text-primary-blue hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                  , which details how we collect, process, and protect your data. By using the Services, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy.
                </p>
              </div>
            </motion.section>

            {/* 5. Limitation of Liability */}
            <motion.section
              id="liability"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <AlertCircle className="text-primary-blue w-6 h-6" /> 5. Limitation of Liability
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  In no event shall Spirit Data Solutions, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2.5">
                  <li>Your access to, use of, or inability to access or use the Services.</li>
                  <li>Any conduct or content of any third party on the Services.</li>
                  <li>Any content obtained from the Services.</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>
              </div>
            </motion.section>

            {/* 6. Disclaimer of Warranties */}
            <motion.section
              id="warranties"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Landmark className="text-primary-blue w-6 h-6" /> 6. Disclaimer of Warranties
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Your use of the Services is at your sole risk. The Services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Spirit Data Solutions expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                </p>
              </div>
            </motion.section>

            {/* 7. Termination */}
            <motion.section
              id="termination"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Ban className="text-primary-blue w-6 h-6" /> 7. Termination
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We may terminate or suspend your access to all or part of the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Services will immediately cease.
                </p>
              </div>
            </motion.section>

            {/* 8. Governing Law and Jurisdiction */}
            <motion.section
              id="law"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Landmark className="text-primary-blue w-6 h-6" /> 8. Governing Law and Jurisdiction
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Services shall be instituted exclusively in the competent courts located within India.
                </p>
              </div>
            </motion.section>

            {/* 9. Modifications to the Terms */}
            <motion.section
              id="modifications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText className="text-primary-blue w-6 h-6" /> 9. Modifications to the Terms
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. All changes are effective immediately when we post them. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </motion.section>

            {/* 10. Contact Information */}
            <motion.section
              id="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-6"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <HelpCircle className="text-primary-blue w-6 h-6" /> 10. Contact Information
              </h2>
              <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                If you have any inquiries or require clarification regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <Briefcase className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Company Name</h4>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>Spirit Data Solutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <Mail className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Email Address</h4>
                    <p className="text-sm font-semibold mt-1 text-primary-blue">hr@spiritdatasolutions.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <Phone className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Phone Number</h4>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>+91 6301581529</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex-grow col-span-1 md:col-span-2">
                  <MapPin className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Mailing Address</h4>
                    <p className="text-sm font-semibold mt-1 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      2nd floor, BFC Plaza Mano Mini AC function hall, Srinagar Colony, Anantapur, Andhra Pradesh, India
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

export default Terms;
