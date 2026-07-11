import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CareersHero from '../components/careers/CareersHero';
import Benefits from '../components/careers/Benefits';
import OpenRoles from '../components/careers/OpenRoles';
import ApplicationForm from '../components/careers/ApplicationForm';

const Careers = () => {
  const location = useLocation();
  const [selectedPosition, setSelectedPosition] = useState('');

  const sectionBg = { background: 'var(--bg)', transition: 'background 0.4s ease' };

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

  const handleApplyClick = (roleTitle) => {
    setSelectedPosition(roleTitle);
    const formElement = document.getElementById('apply-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <div className="flex-1 w-full overflow-hidden" style={sectionBg}>
      <CareersHero />
      <Benefits />
      <OpenRoles onApplyClick={handleApplyClick} openRoles={openRoles} />
      <ApplicationForm selectedPosition={selectedPosition} openRoles={openRoles} />
    </div>
  );
};

export default Careers;
