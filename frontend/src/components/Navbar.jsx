import  { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/ai-predictions', label: 'AI Detection' },
  { path: '/live', label: 'Live Detection' },
  { path: '/crew', label: 'Crew' },
  { path: '/resources', label: 'Resources' },
  { path: '/alerts', label: 'Alerts' },
  { path: '/settings', label: 'Settings' },
]

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center space-x-2 text-2xl font-bold text-space-blue"
            whileHover={{ scale: 1.05 }}
          >
            <span>🚀</span>
            <span>FalconEye</span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-space-blue glow-blue'
                    : 'text-space-silver hover:text-space-blue hover:glow-blue'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-space-silver"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          className="md:hidden glass border-t border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md ${
                  location.pathname === item.path
                    ? 'text-space-blue'
                    : 'text-space-silver hover:text-space-blue'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
 