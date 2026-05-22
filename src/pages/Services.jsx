import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Monitor, Coffee, Code2, FlaskConical, Cloud, BarChart3, ArrowRight, ChevronRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const services = [
  {
    Icon: Monitor,
    title: 'Full Stack Web Development',
    desc: 'We architect and build complete web ecosystems — from React & Next.js frontends to robust Node.js, Spring Boot, and Python backends. Our solutions are engineered for performance, scalability, and maintainability.',
    features: ['React / Next.js / Vue.js', 'Node.js / Express', 'REST & GraphQL APIs', 'CI/CD & Cloud Deploy'],
  },
  {
    Icon: Coffee,
    title: 'Full Stack Java Development',
    desc: 'Enterprise-grade Java solutions built on Spring Boot, Microservices, and modern JVM ecosystems. We design systems that handle millions of transactions with reliability at their core.',
    features: ['Spring Boot / Spring Cloud', 'Microservices Architecture', 'Hibernate / JPA', 'Apache Kafka / RabbitMQ'],
  },
  {
    Icon: Code2,
    title: 'Full Stack Python Development',
    desc: 'From Django and FastAPI backends to AI/ML integrations and data pipelines, our Python teams accelerate your most ambitious technical projects with clean, idiomatic code.',
    features: ['Django / FastAPI / Flask', 'Machine Learning APIs', 'Data Engineering & ETL', 'Celery / Redis'],
  },
  {
    Icon: FlaskConical,
    title: 'Solution Testing & QA',
    desc: 'A comprehensive quality assurance practice covering automated testing, performance benchmarking, security audits, and UAT coordination. We ensure every release is release-ready.',
    features: ['Selenium / Playwright', 'Jest / Pytest / JUnit', 'Performance Testing (k6)', 'Security & Penetration Testing'],
  },
  {
    Icon: Cloud,
    title: 'Cloud & DevOps',
    desc: 'Modern infrastructure strategy and implementation across AWS, GCP, and Azure. We build platforms that are auto-scaling, cost-optimised, and resilient by design.',
    features: ['AWS / Azure / GCP', 'Kubernetes & Docker', 'Terraform & IaC', 'Monitoring & Observability'],
  },
  {
    Icon: BarChart3,
    title: 'Data & Analytics',
    desc: 'Transform raw data into strategic intelligence. We build real-time dashboards, data warehouses, and AI-driven insight platforms that give leadership the clarity to act decisively.',
    features: ['Power BI / Tableau', 'PostgreSQL / Snowflake', 'Apache Spark', 'Predictive Analytics'],
  },
]

export default function Services() {
  const gridRef = useRef(null)
  useScrollReveal(gridRef)

  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="hero-bg py-28">
        <div className="section-container">
          <motion.p className="label-eyebrow mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            What We Do
          </motion.p>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-[#0a2e5c] leading-tight max-w-3xl mb-6 tracking-[-0.03em]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            Strategic Engineering{' '}
            <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p className="text-[#414752] text-lg max-w-2xl leading-relaxed mb-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            A disciplined portfolio of technology services, each one designed to compound business value over time.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Start a Project <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section ref={gridRef} className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ Icon, title, desc, features }) => (
              <div key={title} className="reveal card flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-[#1f6fd1]/8 border border-[#1f6fd1]/15 flex items-center justify-center mb-5 group-hover:bg-[#1f6fd1]/15 transition-colors duration-300">
                  <Icon size={22} className="text-[#1f6fd1]" />
                </div>
                <h3 className="font-semibold text-[#0a2e5c] text-lg mb-3">{title}</h3>
                <p className="text-[#414752] text-sm leading-relaxed mb-5 flex-1">{desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#414752]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1f6fd1] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-[#1f6fd1] text-sm font-semibold group/link w-fit">
                  <span className="group-hover/link:underline">Learn more</span>
                  <ChevronRight size={14} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20 bg-gradient-to-r from-[#0a2e5c] to-[#1f6fd1]">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to engineer something remarkable?</h2>
          <p className="text-[#aac7ff] mb-8 max-w-xl mx-auto">Tell us about your challenge. Our solutions architects will respond within 24 hours.</p>
          <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
            Get In Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
