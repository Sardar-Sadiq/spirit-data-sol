import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, ShieldCheck, Landmark, AlertCircle, Ban, HelpCircle,
  Briefcase, Mail, MapPin, ArrowLeft, Scale, Globe, KeyRound
} from 'lucide-react';

const Terms = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'definitions', label: 'Definitions', icon: <KeyRound className="w-4 h-4" /> },
    { id: 'acknowledgment', label: 'Acknowledgment', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'links', label: 'External Links', icon: <Globe className="w-4 h-4" /> },
    { id: 'termination', label: 'Termination', icon: <Ban className="w-4 h-4" /> },
    { id: 'liability', label: 'Limitation of Liability', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'disclaimer', label: '"AS IS" Disclaimer', icon: <Scale className="w-4 h-4" /> },
    { id: 'law-disputes', label: 'Governing Law & Disputes', icon: <Landmark className="w-4 h-4" /> },
    { id: 'compliance', label: 'EU & US Compliance', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'severability-changes', label: 'Severability & Changes', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Info', icon: <HelpCircle className="w-4 h-4" /> },
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
                <FileText className="text-primary-blue w-6 h-6" /> Overview
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Please read these terms and conditions carefully before using Our Service.
                </p>
                <p>
                  These Terms and Conditions form the agreement between You and the Company. They govern Your access to and use of the Service and establish the rights and obligations of all users regarding the use of the Service.
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
                <KeyRound className="text-primary-blue w-6 h-6" /> Interpretation & Definitions
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Interpretation</h3>
                <p>
                  The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Definitions</h3>
                <p className="mb-2">For the purposes of these Terms and Conditions:</p>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { term: 'Affiliate', desc: 'An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.' },
                    { term: 'Country', desc: 'Refers to: Andhra Pradesh, India.' },
                    { term: 'Company', desc: 'Refers to SPIRIT DATA SOLUTIONS, 2nd Floor, BFS Plaza, Srinagar Colony Rudrampeta bypass, Anantapur, Andhra Pradesh (referred to as either "the Company", "We", "Us" or "Our" in these Terms and Conditions).' },
                    { term: 'Device', desc: 'Any device that can access the Service such as a computer, a cell phone or a digital tablet.' },
                    { term: 'Service', desc: 'Refers to the Website.' },
                    { term: 'Terms and Conditions', desc: '(also referred to as "Terms") means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service.' },
                    { term: 'Third-Party Social Media Service', desc: 'Any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.' },
                    { term: 'Website', desc: 'SPIRIT DATA SOLUTIONS, accessible from https://www.spiritdatasolutions.com/.' },
                    { term: 'You', desc: 'The individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.' }
                  ].map((def, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] transition-all duration-300 hover:border-primary-blue/50">
                      <strong className="text-primary-blue block text-sm mb-1">{def.term}</strong>
                      <span className="text-xs md:text-sm text-[var(--text-secondary)]">{def.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Acknowledgment */}
            <motion.section
              id="acknowledgment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <ShieldCheck className="text-primary-blue w-6 h-6" /> Acknowledgment
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                </p>
                <p>
                  Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                </p>
                <p>
                  By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                </p>
                <p>
                  You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                </p>
                <p className="p-3 bg-primary-blue/5 rounded border-l-4 border-primary-blue text-xs md:text-sm">
                  Your access to and use of the Service is also subject to Our{' '}
                  <Link to="/privacy" className="text-primary-blue hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                  , which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.
                </p>
              </div>
            </motion.section>

            {/* External Links */}
            <motion.section
              id="links"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-5"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Globe className="text-primary-blue w-6 h-6" /> External Links & Third Parties
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Links to Other Websites</h3>
                <p>
                  Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
                </p>
                <p>
                  The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
                </p>
                <p className="italic text-xs md:text-sm">
                  We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Links from a Third-Party Social Media Service</h3>
                <p>
                  The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.
                </p>
                <p>
                  You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.
                </p>
              </div>
            </motion.section>

            {/* Termination */}
            <motion.section
              id="termination"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Ban className="text-primary-blue w-6 h-6" /> Termination
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                </p>
                <p>
                  Upon termination, Your right to use the Service will cease immediately.
                </p>
              </div>
            </motion.section>

            {/* Limitation of Liability */}
            <motion.section
              id="liability"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <AlertCircle className="text-primary-blue w-6 h-6" /> Limitation of Liability
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                </p>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
                </p>
                <p className="text-xs text-[var(--text-muted)] border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                  Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.
                </p>
              </div>
            </motion.section>

            {/* "AS IS" Disclaimer */}
            <motion.section
              id="disclaimer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Scale className="text-primary-blue w-6 h-6" /> &quot;AS IS&quot; &amp; &quot;AS AVAILABLE&quot; Disclaimer
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.
                </p>
                <p>
                  Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
                </p>
                <p>
                  Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
                </p>
                <p className="text-xs text-[var(--text-muted)] border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                  Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
                </p>
              </div>
            </motion.section>

            {/* Governing Law & Disputes */}
            <motion.section
              id="law-disputes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Landmark className="text-primary-blue w-6 h-6" /> Governing Law &amp; Disputes
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Governing Law</h3>
                <p>
                  The laws of the Country (Andhra Pradesh, India), excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Disputes Resolution</h3>
                <p>
                  If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
                </p>
              </div>
            </motion.section>

            {/* EU & US Compliance */}
            <motion.section
              id="compliance"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <ShieldCheck className="text-primary-blue w-6 h-6" /> Global Regulatory Compliance
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>For European Union (EU) Users</h3>
                <p>
                  If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>United States Legal Compliance</h3>
                <p>
                  You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
                </p>
              </div>
            </motion.section>

            {/* Severability & Changes */}
            <motion.section
              id="severability-changes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText className="text-primary-blue w-6 h-6" /> Severability &amp; Amendments
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Severability</h3>
                <p>
                  If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Waiver</h3>
                <p>
                  Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Translation Interpretation</h3>
                <p>
                  These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Changes to These Terms and Conditions</h3>
                <p>
                  We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
                </p>
                <p>
                  By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.
                </p>
              </div>
            </motion.section>

            {/* Contact Info */}
            <motion.section
              id="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-6"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <HelpCircle className="text-primary-blue w-6 h-6" /> Contact Information
              </h2>
              <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                If you have any questions about these Terms and Conditions, You can contact us:
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

export default Terms;
