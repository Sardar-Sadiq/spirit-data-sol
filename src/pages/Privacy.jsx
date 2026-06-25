import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Eye, Lock, RefreshCw, FileText, HelpCircle,
  Briefcase, Mail, Phone, MapPin, ArrowLeft, CheckCircle2,
  Calendar, Info, AlertTriangle, KeyRound
} from 'lucide-react';

const Privacy = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Introduction', icon: <Shield className="w-4 h-4" /> },
    { id: 'collection', label: '1. Information We Collect', icon: <Eye className="w-4 h-4" /> },
    { id: 'usage', label: '2. How We Use Information', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'sharing', label: '3. Information Sharing', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'retention', label: '4. Data Retention', icon: <Calendar className="w-4 h-4" /> },
    { id: 'security', label: '5. Data Security', icon: <Lock className="w-4 h-4 " /> },
    { id: 'rights', label: '6. Your Privacy Rights', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'changes', label: '7. Changes to Policy', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: '8. Contact Us', icon: <HelpCircle className="w-4 h-4" /> },
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
            Data Protection Policy
          </span>
          <h1 className="headline-xl mt-4 mb-3" style={{ color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-blue" /> Effective Date: May 23, 2026
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-primary-blue animate-spin-slow" /> Last Updated: June 19, 2026
            </span>
          </div>
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
                        layoutId="activePillPrivacy"
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
                <Shield className="text-primary-blue w-6 h-6" /> Introduction
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Welcome to Spirit Data Solutions. We are committed to protecting your personal information and your right to privacy.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (
                  <a href="https://www.spiritdatasolutions.com/" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
                    https://www.spiritdatasolutions.com/
                  </a>
                  ) and use our services.
                </p>
                <p>
                  By accessing or using our website and services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
                </p>
              </div>
            </motion.section>

            {/* 1. Information We Collect */}
            <motion.section
              id="collection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-5"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Eye className="text-primary-blue w-6 h-6" /> 1. Information We Collect
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the website, or otherwise when you contact us.
                </p>

                <div className="flex flex-col gap-4 mt-2">
                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Personal Information Provided by You:
                    </h3>
                    <p className="text-sm">
                      We may collect names, phone numbers, email addresses, job titles, company names, and similar contact data.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Automatically Collected Information:
                    </h3>
                    <p className="text-sm">
                      When you visit, use, or navigate the website, we automatically collect certain information. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our website.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Cookies and Similar Technologies:
                    </h3>
                    <p className="text-sm">
                      We may use cookies and similar tracking technologies to access or store information to improve user experience and analyze website traffic.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 2. How We Use Your Information */}
            <motion.section
              id="usage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Briefcase className="text-primary-blue w-6 h-6" /> 2. How We Use Your Information
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We use personal information collected via our website for a variety of business purposes described below:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-3">
                  <li>
                    <strong>To Provide and Manage Services:</strong> To facilitate the delivery of our data solutions and IT services to you or your organization.
                  </li>
                  <li>
                    <strong>To Communicate With You:</strong> To respond to your inquiries, send administrative information, and provide customer support.
                  </li>
                  <li>
                    <strong>To Send Marketing and Promotional Communications:</strong> We and/or our third-party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt-out of our marketing emails at any time.
                  </li>
                  <li>
                    <strong>To Protect Our Services:</strong> To keep our website safe and secure (for example, for fraud monitoring and prevention).
                  </li>
                  <li>
                    <strong>To Enforce Our Terms, Conditions, and Policies:</strong> For business purposes, to comply with legal and regulatory requirements, or in connection with our contract.
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* 3. Will Your Information Be Shared with Anyone? */}
            <motion.section
              id="sharing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-5"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <RefreshCw className="text-primary-blue w-6 h-6" /> 3. Will Your Information Be Shared with Anyone?
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal bases:
                </p>
                <div className="flex flex-col gap-4 mt-2">
                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Vendors, Consultants, and Other Third-Party Service Providers:
                    </h3>
                    <p className="text-sm">
                      We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., hosting services, data analytics, customer service).
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Business Transfers:
                    </h3>
                    <p className="text-sm">
                      We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                      Legal Obligations:
                    </h3>
                    <p className="text-sm">
                      We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 4. Data Retention */}
            <motion.section
              id="retention"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Calendar className="text-primary-blue w-6 h-6" /> 4. Data Retention
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
                </p>
              </div>
            </motion.section>

            {/* 5. Data Security */}
            <motion.section
              id="security"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Lock className="text-green-500 w-6 h-6 animate-pulse" /> 5. Data Security
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
                </p>
                <p>
                  However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </p>
              </div>
            </motion.section>

            {/* 6. Your Privacy Rights */}
            <motion.section
              id="rights"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <CheckCircle2 className="text-primary-blue w-6 h-6" /> 6. Your Privacy Rights
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Depending on your geographical location and applicable data protection laws, you may have certain rights regarding your personal information, which may include:
                </p>
                <ul className="list-disc pl-6 flex flex-col gap-2.5">
                  <li>The right to request access and obtain a copy of your personal information.</li>
                  <li>The right to request rectification or erasure of your personal data.</li>
                  <li>The right to restrict the processing of your personal information.</li>
                  <li>The right to data portability.</li>
                </ul>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  To exercise these rights, please contact us using the details provided below.
                </p>
              </div>
            </motion.section>

            {/* 7. Changes to This Privacy Policy */}
            <motion.section
              id="changes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText className="text-primary-blue w-6 h-6" /> 7. Changes to This Privacy Policy
              </h2>
              <div className="body-md flex flex-col gap-4" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Effective Date&quot; or &quot;Last Updated&quot; date and will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
                </p>
              </div>
            </motion.section>

            {/* 8. Contact Us */}
            <motion.section
              id="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-6"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <HelpCircle className="text-primary-blue w-6 h-6" /> 8. Contact Us
              </h2>
              <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                If you have questions or comments about this policy, or if you would like to exercise your data privacy rights, you may contact us at:
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
                    <p className="text-sm font-semibold mt-1 text-primary-blue">
                      <a href="mailto:hr@spiritdatasolutions.com" className="hover:underline">
                        hr@spiritdatasolutions.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <Phone className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Phone Number</h4>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                      6301581529
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex-grow col-span-1 md:col-span-2">
                  <MapPin className="w-5 h-5 text-primary-blue mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Address</h4>
                    <p className="text-sm font-semibold mt-1 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      Spirit Data Solutions, BFC PLAZA, 2nd FLOOR, SRINAGAR COLONY, RUDRAMPETA BYPASS, ANANTAPUR, ANDHRA PRADESH, 515001.
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

export default Privacy;
