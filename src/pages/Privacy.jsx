import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Eye, Lock, RefreshCw, FileText, HelpCircle,
  Briefcase, Mail, MapPin, ArrowLeft, CheckCircle2,
  Calendar, Info, AlertTriangle, KeyRound
} from 'lucide-react';

const Privacy = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Introduction', icon: <Shield className="w-4 h-4" /> },
    { id: 'definitions', label: 'Definitions', icon: <KeyRound className="w-4 h-4" /> },
    { id: 'collection', label: '1. Collecting Personal Data', icon: <Eye className="w-4 h-4" /> },
    { id: 'use-of-data', label: '2. Use & Sharing of Data', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'retention', label: '3. Data Retention Policy', icon: <Calendar className="w-4 h-4" /> },
    { id: 'transfer', label: '4. Transfer of Personal Data', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'delete-data', label: '5. Delete Your Personal Data', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'disclosure', label: '6. Disclosure of Data', icon: <Lock className="w-4 h-4" /> },
    { id: 'security', label: '7. Data Security', icon: <Lock className="w-4 h-4 text-green-500" /> },
    { id: 'processing', label: '8. Third-Party Processing', icon: <Info className="w-4 h-4" /> },
    { id: 'children', label: '9. Children\'s Privacy', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'changes-links', label: '10. External Links & Changes', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: '11. Contact Us', icon: <HelpCircle className="w-4 h-4" /> },
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
              <Calendar className="w-3.5 h-3.5 text-primary-blue" /> Effective Date: July 07, 2026
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-primary-blue animate-spin-slow" /> Last Updated: July 07, 2026
            </span>
          </div>
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
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>
                <p>
                  We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.
                </p>
                <div className="p-4 rounded-lg bg-primary-blue/5 border border-primary-blue/20 flex items-start gap-3 mt-2">
                  <AlertTriangle className="w-5 h-5 text-primary-blue shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-[var(--text-secondary)]">
                    Looking for our liability limitations, fair use, or general disclaimers? Please review our full{' '}
                    <Link to="/disclaimer" className="text-primary-blue font-semibold hover:underline">
                      Disclaimer
                    </Link>.
                  </p>
                </div>
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
                <p className="mb-2">For the purposes of this Privacy Policy:</p>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { term: 'Account', desc: 'A unique account created for You to access our Service or parts of our Service.' },
                    { term: 'Affiliate', desc: 'An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.' },
                    { term: 'Company', desc: 'Refers to SPIRIT DATA SOLUTIONS, 2nd Floor, BFS Plaza, Srinagar Colony Rudrampeta bypass, Anantapur, Andhra Pradesh (referred to as either "the Company", "We", "Us" or "Our" in this Privacy Policy).' },
                    { term: 'Cookies', desc: 'Small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.' },
                    { term: 'Country', desc: 'Refers to: Andhra Pradesh, India.' },
                    { term: 'Device', desc: 'Any device that can access the Service such as a computer, a cell phone or a digital tablet.' },
                    { term: 'Personal Data', desc: '(or "Personal Information") is any information that relates to an identified or identifiable individual. We use "Personal Data" and "Personal Information" interchangeably unless a law uses a specific term.' },
                    { term: 'Service', desc: 'Refers to the Website.' },
                    { term: 'Service Provider', desc: 'Any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.' },
                    { term: 'Usage Data', desc: 'Refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).' },
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

            {/* 1. Collecting and Using Your Personal Data */}
            <motion.section
              id="collection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-5"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Eye className="text-primary-blue w-6 h-6" /> 1. Collecting & Using Personal Data
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Types of Data Collected</h3>
                
                <div className="p-5 rounded-lg bg-[var(--bg)] border border-[var(--border)] mt-2">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-blue"></span> Personal Data
                  </h4>
                  <p className="text-xs md:text-sm mb-4">
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm pl-4 list-disc text-[var(--text-secondary)]">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                  </ul>
                </div>

                <div className="p-5 rounded-lg bg-[var(--bg)] border border-[var(--border)] mt-2 flex flex-col gap-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-blue"></span> Usage Data
                  </h4>
                  <p className="text-xs md:text-sm">
                    Usage Data is collected automatically when using the Service.
                  </p>
                  <p className="text-xs md:text-sm">
                    Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                  </p>
                  <p className="text-xs md:text-sm">
                    When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device's unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                  </p>
                  <p className="text-xs md:text-sm">
                    We may also collect information that Your browser sends whenever You visit Our Service or when You access the Service by or through a mobile device.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[var(--bg)] border border-[var(--border)] mt-2 flex flex-col gap-4">
                  <h4 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-blue"></span> Tracking Technologies and Cookies
                  </h4>
                  <p className="text-xs md:text-sm">
                    We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies We use include beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
                  </p>
                  <ul className="list-disc pl-5 text-xs md:text-sm flex flex-col gap-2">
                    <li>
                      <strong>Cookies or Browser Cookies:</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.
                    </li>
                    <li>
                      <strong>Web Beacons:</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                    </li>
                  </ul>
                  
                  <p className="text-xs md:text-sm border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                  </p>

                  <p className="text-xs md:text-sm italic">
                    Where required by law, we use non-essential cookies (such as analytics, advertising, and remarketing cookies) only with Your consent. You can withdraw or change Your consent at any time using Our cookie preferences tool (if available) or through Your browser/device settings. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.
                  </p>

                  <h5 className="font-bold text-xs mt-2 uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Cookies We Use:</h5>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 rounded bg-[var(--bg-card)] border border-[var(--border)]">
                      <strong className="text-xs text-primary-blue block">Necessary / Essential Cookies</strong>
                      <span className="text-xs block text-[var(--text-muted)] mb-1">Type: Session Cookies | Administered by: Us</span>
                      <p className="text-xs">These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                    </div>
                    <div className="p-3 rounded bg-[var(--bg-card)] border border-[var(--border)]">
                      <strong className="text-xs text-primary-blue block">Cookies Policy / Notice Acceptance Cookies</strong>
                      <span className="text-xs block text-[var(--text-muted)] mb-1">Type: Persistent Cookies | Administered by: Us</span>
                      <p className="text-xs">These Cookies identify if users have accepted the use of cookies on the Website.</p>
                    </div>
                    <div className="p-3 rounded bg-[var(--bg-card)] border border-[var(--border)]">
                      <strong className="text-xs text-primary-blue block">Functionality Cookies</strong>
                      <span className="text-xs block text-[var(--text-muted)] mb-1">Type: Persistent Cookies | Administered by: Us</span>
                      <p className="text-xs">These Cookies allow Us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.section>

            {/* 2. Use of Your Personal Data */}
            <motion.section
              id="use-of-data"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Briefcase className="text-primary-blue w-6 h-6" /> 2. Use & Sharing of Data
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul className="list-disc pl-6 flex flex-col gap-3">
                  <li><strong>To provide and maintain our Service:</strong> including to monitor the usage of our Service.</li>
                  <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                  <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                  <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
                  <li><strong>To provide You with news and special offers:</strong> and general information about other goods, services and events which We offer that are similar to those that you have already purchased or inquired about unless You have opted not to receive such information.</li>
                  <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
                  <li><strong>For business transfers:</strong> We may use Your Personal Data to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                  <li><strong>For other purposes:</strong> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</li>
                </ul>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Sharing of Your Personal Data</h3>
                <p>We may share Your Personal Data in the following situations:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {[
                    { title: 'With Service Providers', desc: 'We may share Your Personal Data with Service Providers to monitor and analyze the use of our Service, to contact You.' },
                    { title: 'For Business Transfers', desc: 'We may share or transfer Your Personal Data in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.' },
                    { title: 'With Affiliates', desc: 'We may share Your Personal Data with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.' },
                    { title: 'With Business Partners', desc: 'We may share Your Personal Data with Our business partners to offer You certain products, services or promotions.' },
                    { title: 'With Other Users', desc: 'If Our Service offers public areas, when You share Personal Data or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.' },
                    { title: 'With Your Consent', desc: 'We may disclose Your Personal Data for any other purpose with Your consent.' }
                  ].map((share, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                      <strong className="text-primary-blue block text-xs font-bold uppercase tracking-wider mb-1">{share.title}</strong>
                      <p className="text-xs text-[var(--text-secondary)]">{share.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* 3. Retention of Your Personal Data */}
            <motion.section
              id="retention"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Calendar className="text-primary-blue w-6 h-6" /> 3. Data Retention Policy
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if We are required to retain Your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                </p>
                <p>
                  Where possible, We apply shorter retention periods and/or reduce identifiability by deleting, aggregating, or anonymizing data. Unless otherwise stated, the retention periods below are maximum periods (&quot;up to&quot;) and We may delete or anonymize data sooner when it is no longer needed for the relevant purpose. We apply different retention periods to different categories of Personal Data based on the purpose of processing and legal obligations:
                </p>

                <div className="grid grid-cols-1 gap-4 my-2">
                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <strong className="text-primary-blue block text-sm mb-1">Account Information</strong>
                    <ul className="list-disc pl-5 text-xs md:text-sm text-[var(--text-secondary)]">
                      <li><strong>User Accounts:</strong> Retained for the duration of your account relationship plus up to 24 months after account closure to handle any post-termination issues or resolve disputes.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <strong className="text-primary-blue block text-sm mb-1">Customer Support Data</strong>
                    <ul className="list-disc pl-5 text-xs md:text-sm text-[var(--text-secondary)] flex flex-col gap-1.5">
                      <li><strong>Support tickets and correspondence:</strong> Up to 24 months from the date of ticket closure to resolve follow-up inquiries, track service quality, and defend against potential legal claims.</li>
                      <li><strong>Chat transcripts:</strong> Up to 24 months for quality assurance and staff training purposes.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <strong className="text-primary-blue block text-sm mb-1">Usage Data Retention</strong>
                    <ul className="list-disc pl-5 text-xs md:text-sm text-[var(--text-secondary)] flex flex-col gap-1.5">
                      <li><strong>Website analytics data (cookies, IP addresses, device identifiers):</strong> Up to 24 months from the date of collection, which allows us to analyze trends while respecting privacy principles.</li>
                      <li><strong>Server logs (IP addresses, access times):</strong> Up to 24 months for security monitoring and troubleshooting purposes.</li>
                      <li>Usage Data is retained in accordance with the retention periods described above, and may be retained longer only where necessary for security, fraud prevention, or legal compliance.</li>
                    </ul>
                  </div>
                </div>

                <p>We may retain Personal Data beyond the periods stated above for different reasons:</p>
                <ul className="list-disc pl-6 flex flex-col gap-1.5">
                  <li><strong>Legal obligation:</strong> We are required by law to retain specific data (e.g., financial records for tax authorities).</li>
                  <li><strong>Legal claims:</strong> Data is necessary to establish, exercise, or defend legal claims.</li>
                  <li><strong>Your explicit request:</strong> You ask Us to retain specific information.</li>
                  <li><strong>Technical limitations:</strong> Data exists in backup systems that are scheduled for routine deletion.</li>
                </ul>
                
                <p>You may request information about how long We will retain Your Personal Data by contacting Us.</p>

                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Deletion and Anonymization Procedures</h3>
                <p>When retention periods expire, We securely delete or anonymize Personal Data according to the following procedures:</p>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  <li><strong>Deletion:</strong> Personal Data is removed from Our systems and no longer actively processed.</li>
                  <li><strong>Backup retention:</strong> Residual copies may remain in encrypted backups for a limited period consistent with our backup retention schedule and are not restored except where necessary for security, disaster recovery, or legal compliance.</li>
                  <li><strong>Anonymization:</strong> In some cases, We convert Personal Data into anonymous statistical data that cannot be linked back to You. This anonymized data may be retained indefinitely for research and analytics.</li>
                </ul>
              </div>
            </motion.section>

            {/* 4. Transfer of Your Personal Data */}
            <motion.section
              id="transfer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <RefreshCw className="text-primary-blue w-6 h-6" /> 4. Transfer of Personal Data
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from Your jurisdiction.
                </p>
                <p>
                  Where required by applicable law, We will ensure that international transfers of Your Personal Data are subject to appropriate safeguards and supplementary measures where appropriate. The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                </p>
              </div>
            </motion.section>

            {/* 5. Delete Your Personal Data */}
            <motion.section
              id="delete-data"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <CheckCircle2 className="text-primary-blue w-6 h-6" /> 5. Delete Your Personal Data
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
                </p>
                <p>
                  Our Service may give You the ability to delete certain information about You from within the Service.
                </p>
                <p>
                  You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any Personal Data that You have provided to Us.
                </p>
                <p className="p-3 bg-primary-blue/5 rounded border-l-4 border-primary-blue text-xs md:text-sm">
                  Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
                </p>
              </div>
            </motion.section>

            {/* 6. Disclosure of Your Personal Data */}
            <motion.section
              id="disclosure"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Lock className="text-primary-blue w-6 h-6" /> 6. Disclosure of Data
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <strong className="text-primary-blue block text-sm mb-1">Business Transactions</strong>
                    <p className="text-xs md:text-sm">
                      If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <strong className="text-primary-blue block text-sm mb-1">Law Enforcement</strong>
                    <p className="text-xs md:text-sm">
                      Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                    <strong className="text-primary-blue block text-sm mb-1">Other Legal Requirements</strong>
                    <p className="text-xs md:text-sm mb-2">
                      The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
                    </p>
                    <ul className="list-disc pl-5 text-xs flex flex-col gap-1.5">
                      <li>Comply with a legal obligation</li>
                      <li>Protect and defend the rights or property of the Company</li>
                      <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                      <li>Protect the personal safety of Users of the Service or the public</li>
                      <li>Protect against legal liability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 7. Security of Your Personal Data */}
            <motion.section
              id="security"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Lock className="text-green-500 w-6 h-6 animate-pulse" /> 7. Data Security
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
              </div>
            </motion.section>

            {/* 8. Detailed Information on the Processing of Your Personal Data */}
            <motion.section
              id="processing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Info className="text-primary-blue w-6 h-6" /> 8. Third-Party Processing
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  The Service Providers We use may have access to Your Personal Data. These third-party vendors collect, store, use, process and transfer information about Your activity on Our Service in accordance with their Privacy Policies.
                </p>

                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Usage, Performance and Miscellaneous</h3>
                <p>We may use third-party Service Providers to maintain and improve our Service.</p>

                <div className="flex flex-col gap-4 mt-2">
                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-primary-blue text-sm">Mouseflow</strong>
                      <a href="https://mouseflow.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-blue hover:underline">Privacy Policy</a>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Mouseflow is a session replay and heatmap tool that shows how visitors click, move, scroll, browse, and pay attention on websites. The service is operated by ApS. Mouseflow service may collect information from Your device.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-primary-blue text-sm">FreshDesk</strong>
                      <a href="https://www.freshworks.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-blue hover:underline">Privacy Policy</a>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      FreshDesk is a customer support software. The service is operated by Freshworks, Inc. FreshDesk service may collect information from Your Device.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)] flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-primary-blue text-sm">Google Places</strong>
                      <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary-blue hover:underline">Privacy Policy</a>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Google Places is a service that returns information about places using HTTP requests. It is operated by Google. Google Places service may collect information from You and from Your Device for security purposes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 9. Children's Privacy */}
            <motion.section
              id="children"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <AlertTriangle className="text-primary-blue w-6 h-6" /> 9. Children's Privacy
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  Our Service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from anyone under the age of 16. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 16 without verification of parental consent, We take steps to remove that information from Our servers.
                </p>
                <p>
                  If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
                </p>
              </div>
            </motion.section>

            {/* 10. Links & Changes */}
            <motion.section
              id="changes-links"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-4"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText className="text-primary-blue w-6 h-6" /> 10. External Links & Changes
              </h2>
              <div className="body-md flex flex-col gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <h3 className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>Links to Other Websites</h3>
                <p>
                  Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                </p>
                <p>
                  We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                </p>

                <h3 className="font-semibold text-base mt-4" style={{ color: 'var(--text-primary)' }}>Changes to this Privacy Policy</h3>
                <p>
                  We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                </p>
                <p>
                  We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </div>
            </motion.section>

            {/* 11. Contact Us */}
            <motion.section
              id="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 md:p-8 rounded-xl border shadow-sm flex flex-col gap-6"
              style={cardStyle}
            >
              <h2 className="headline-md flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <HelpCircle className="text-primary-blue w-6 h-6" /> 11. Contact Us
              </h2>
              <p className="body-md" style={{ color: 'var(--text-secondary)' }}>
                If you have any questions about this Privacy Policy, You can contact us:
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

export default Privacy;
