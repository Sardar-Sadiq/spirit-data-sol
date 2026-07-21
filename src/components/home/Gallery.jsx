import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../ScrollReveal';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const textPrimary  = { color: 'var(--text-primary)' };
  const textSecondary = { color: 'var(--text-secondary)' };
  const sectionBg   = { background: 'var(--bg)',        transition: 'background 0.4s ease' };

  const gallerySlides = [
    { src: "/team-1.png", title: "Agile Alignment Workshops", desc: "Daily synchronizations and technical architecture reviews guarantee absolute code quality and robust microservices systems.", label: "Operations & Delivery: Spirit Data Solutions" },
    { src: "/team-2.png", title: "Collaborator Synergy", desc: "Our engineering architects and developers collaborate in cross-functional squads to solve complex technical problems with elegant solutions.", label: "Engineering Squad: Spirit Data Solutions" },
    { src: "/office.jpeg", title: "Spirit Data Solutions Innovation Center", desc: "Located in BFC Plaza, Srinagar Colony, Anantapur, our workspace is engineered to inspire creative breakthroughs and facilitate seamless developer synergy.", label: "Spirit Data Solutions Innovation Center" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % gallerySlides.length), 3500);
    return () => clearInterval(t);
  }, [gallerySlides.length]);

  return (
    <section id="gallery" className="py-20 md:py-28 px-margin-mobile md:px-margin-tablet lg:px-margin-desktop" style={sectionBg}>
      <div className="max-w-container-max mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-blue text-xs font-bold uppercase tracking-wider bg-primary-blue/10 px-3 py-1 rounded-full">Our Environment</span>
            <h2 className="headline-xl mt-4 mb-4" style={textPrimary}>Life at Spirit</h2>
            <p className="text-base md:text-lg" style={textSecondary}>A glimpse inside the dynamic, collaborative environment at our Spirit Data Solutions office.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative rounded-lg overflow-hidden border shadow-level-2 h-[260px] sm:h-[340px] md:h-[480px] lg:h-[560px] group bg-slate-900"
            style={{ borderColor: 'var(--border)' }}>
            <AnimatePresence mode="wait">
              <motion.img key={currentSlide} src={gallerySlides[currentSlide].src} alt={gallerySlides[currentSlide].title}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/40 via-deep-blue/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 text-left text-white z-10">
              <motion.div key={`c-${currentSlide}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-3xl">
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{gallerySlides[currentSlide].title}</h3>
                <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed hidden sm:block">{gallerySlides[currentSlide].desc}</p>
              </motion.div>
            </div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1.5 z-10 bg-deep-blue/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
              {gallerySlides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'bg-sky-400 w-5' : 'bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Go to slide ${idx + 1}`} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Gallery;
