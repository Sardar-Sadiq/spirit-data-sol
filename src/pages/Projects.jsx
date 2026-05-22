import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  {
    title: 'Global Payment Orchestration Platform',
    category: 'Full Stack / Java',
    desc: 'Designed and delivered a high-throughput payment processing platform handling 2M+ transactions/day for a fintech leader. Spring Boot microservices, Kafka, and Kubernetes.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80',
    tags: ['Java', 'Kafka', 'Kubernetes', 'Fintech'],
  },
  {
    title: 'Enterprise HR Intelligence Suite',
    category: 'Data & Analytics',
    desc: 'Built an AI-powered workforce analytics platform that reduced attrition prediction error by 67% for a Fortune 500 client. Python, FastAPI, Snowflake, Power BI.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
    tags: ['Python', 'AI/ML', 'Snowflake', 'HR Tech'],
  },
  {
    title: 'Real-Time Logistics Tracking Portal',
    category: 'Full Stack Web',
    desc: 'End-to-end web platform for real-time shipment visibility across 30 countries, serving 500+ enterprise logistics clients. React, Node.js, PostgreSQL.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Logistics'],
  },
  {
    title: 'Healthcare Records Modernisation',
    category: 'Cloud & DevOps',
    desc: 'Migrated a legacy monolith to cloud-native microservices for a hospital network, reducing infrastructure costs by 42% and improving uptime to 99.97%.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80',
    tags: ['AWS', 'Docker', 'Terraform', 'Healthcare'],
  },
  {
    title: 'E-Commerce Intelligence Platform',
    category: 'Full Stack Python',
    desc: 'A real-time demand forecasting and inventory optimisation engine integrated with Shopify and SAP, saving $2M annually in overstock costs.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
    tags: ['Python', 'Django', 'SAP', 'E-Commerce'],
  },
  {
    title: 'National EdTech Learning Platform',
    category: 'Full Stack Web',
    desc: 'Scalable online learning platform serving 1M+ students with adaptive assessments, live virtual classrooms, and parent dashboards.',
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&q=80',
    tags: ['React', 'WebRTC', 'Node.js', 'EdTech'],
  },
]

export default function Projects() {
  const gridRef = useRef(null)
  useScrollReveal(gridRef)

  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="hero-bg py-28">
        <div className="section-container">
          <motion.p className="label-eyebrow mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Our Work
          </motion.p>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-[#0a2e5c] leading-tight max-w-3xl mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            Projects That <span className="gradient-text">Define Industries</span>
          </motion.h1>
          <motion.p className="text-[#414752] text-lg max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            A curated selection of enterprise engagements where precision engineering drove measurable business transformation.
          </motion.p>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section ref={gridRef} className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(({ title, category, desc, img, tags }) => (
              <div key={title} className="reveal card p-0 overflow-hidden flex flex-col group">
                <div className="overflow-hidden h-48">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="label-eyebrow text-[10px] mb-2">{category}</p>
                  <h3 className="font-semibold text-[#0a2e5c] text-base mb-3 leading-snug">{title}</h3>
                  <p className="text-sm text-[#414752] leading-relaxed flex-1 mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t} className="chip chip-blue">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
