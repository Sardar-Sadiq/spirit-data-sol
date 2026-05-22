import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <motion.img
        src="/logo.png"
        alt="Spirit Data Solutions"
        className="loader-logo"
        initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <motion.p
        className="loader-text"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Spirit Data Solutions
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
        style={{
          height: 2,
          background: 'linear-gradient(90deg, #1f6fd1, #58b5ff)',
          borderRadius: '9999px',
          marginTop: '0.5rem',
        }}
      />
    </motion.div>
  )
}
