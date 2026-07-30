import { useRef } from 'react';
import ScrollReveal from '../components/ScrollReveal';

// Imported Sections
import ServiceCategories from '../components/services/ServiceCategories';
import OurProcess from '../components/services/OurProcess';
import EngagementModels from '../components/services/EngagementModels';
import IndustriesWeServe from '../components/services/IndustriesWeServe';
import WhyChooseUs from '../components/about/WhyChooseUs';
import FAQSection from '../components/about/FAQSection';
import Contact from '../components/home/Contact';

const ServicesPage = () => {
  const deliverablesSectionRef = useRef(null);

  const textPrimary = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };

  const handleScrollDown = () => {
    deliverablesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1 w-full overflow-hidden" style={{ background: 'var(--bg)', transition: 'background 0.4s ease' }}>
      {/* 1. Hero Section (Matching About Hero Section Style) */}
      <section className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-between px-4 py-12 md:py-20">
        {/* Spacer to balance vertical flex layout */}
        <div />

        {/* Main Hero Content */}
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full select-none">
          <ScrollReveal>
            <h1 className="bebas-neue text-[clamp(4.8rem,24vw,300px)] leading-[0.85] tracking-[-0.01em] uppercase text-center" style={textPrimary}>
              OUR <span className="text-primary-blue">SERVICES</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-lg sm:text-xl md:text-2xl font-normal mt-6 leading-relaxed text-center max-w-3xl" style={textSecondary}>
              Empowering fast-growing startups and enterprises with <br className="hidden sm:block" />
              <span className="text-primary-blue font-semibold transition-all duration-300 hover:text-secondary-blue">
                Strategic Full-Stack Engineering, Automated QA & Gen-AI Solutions.
              </span>
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll Down Indicator */}
        <ScrollReveal delay={0.5}>
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1 group cursor-pointer transition-all duration-300 hover:-translate-y-1 mt-14"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Scroll down to services content"
          >
            <span className="text-sm tracking-widest uppercase font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              Explore Services
            </span>
            <span className="hero-scroll-dot" />
            <span className="text-base animate-bounce">↓</span>
          </button>
        </ScrollReveal>
      </section>


      {/* 3. Service Categories Section */}
      <ServiceCategories />

      {/* 4. Our Process Section (Discovery -> Planning -> Design -> Development -> Testing -> Deployment -> Support) */}
      <OurProcess />

      {/* 5. Engagement Models Section */}
      <EngagementModels />

      {/* 6. Industries We Serve Section */}
      <IndustriesWeServe />

      {/* 7. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 8. FAQ Section */}
      <FAQSection />

      {/* 9. Call To Action / Contact Section */}
      <Contact />
    </div>
  );
};

export default ServicesPage;
