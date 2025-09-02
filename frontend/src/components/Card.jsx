import  { motion } from 'framer-motion'

export default function Card({ children, className = '' }) {
  return (
    <motion.div 
      className={`glass rounded-xl p-6 ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
 