import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, duration = 0.8, yOffset = 30, blur = 8 }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: yOffset,
        filter: `blur(${blur}px)` 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)' 
      }}
      viewport={{ once: true, margin: '-100px 0px' }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // premium custom cubic-bezier (easeOutExpo)
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
