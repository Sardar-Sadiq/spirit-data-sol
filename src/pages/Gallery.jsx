import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const images = [
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', caption: 'HQ Office — Open Collaboration Floor' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', caption: 'Engineering Sprint Review' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', caption: 'Client Strategy Workshop' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', caption: 'Remote-First Culture' },
  { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', caption: 'Tech Innovation Lab' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80', caption: 'Leadership Team Offsite' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', caption: 'Company All-Hands 2025' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', caption: 'Design Thinking Session' },
  { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', caption: 'Team Building Day' },
]

export default function Gallery() {
  const gridRef = useRef(null)
  useScrollReveal(gridRef)

  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="hero-bg py-28">
        <div className="section-container">
          <motion.p className="label-eyebrow mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Life at Spirit
          </motion.p>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-[#0a2e5c] leading-tight max-w-3xl mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            Our <span className="gradient-text">Culture in Pictures</span>
          </motion.h1>
          <motion.p className="text-[#414752] text-lg max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            A glimpse into the people, spaces, and moments that make Spirit Data Solutions an exceptional place to work and grow.
          </motion.p>
        </div>
      </section>

      {/* GALLERY MASONRY-STYLE GRID */}
      <section ref={gridRef} className="py-24 bg-white">
        <div className="section-container">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {images.map(({ src, caption }, i) => (
              <div key={i} className="reveal break-inside-avoid group relative rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm">
                <img src={src} alt={caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e5c]/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
