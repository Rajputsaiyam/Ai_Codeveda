import  { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, CheckCircle, Filter } from 'lucide-react'
import Card from '../components/Card'

export default function Alerts() {
  const [filter, setFilter] = useState('all')

  const alerts = [
    {
      id: 1,
      message: 'Solar panel efficiency decreased to 85%',
      severity: 'warning',
      timestamp: '2024-01-15 14:30:25',
      system: 'Power Management'
    },
    {
      id: 2,
      message: 'Critical: Oxygen levels dropping in Sector C',
      severity: 'danger',
      timestamp: '2024-01-15 14:28:10',
      system: 'Life Support'
    },
    {
      id: 3,
      message: 'Routine maintenance scheduled for tomorrow',
      severity: 'info',
      timestamp: '2024-01-15 14:25:45',
      system: 'Maintenance'
    },
    {
      id: 4,
      message: 'Communication array operating at full capacity',
      severity: 'success',
      timestamp: '2024-01-15 14:20:15',
      system: 'Communications'
    },
    {
      id: 5,
      message: 'Temperature fluctuation detected in Lab Module',
      severity: 'warning',
      timestamp: '2024-01-15 14:15:30',
      system: 'Environmental'
    },
    {
      id: 6,
      message: 'Fire suppression system test completed successfully',
      severity: 'success',
      timestamp: '2024-01-15 14:10:20',
      system: 'Safety'
    }
  ]

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => alert.severity === filter)

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'danger': return <AlertTriangle size={20} className="text-red-400" />
      case 'warning': return <AlertCircle size={20} className="text-yellow-400" />
      case 'info': return <Info size={20} className="text-blue-400" />
      case 'success': return <CheckCircle size={20} className="text-green-400" />
      default: return <Info size={20} className="text-blue-400" />
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'danger': return 'border-red-400 bg-red-400/10'
      case 'warning': return 'border-yellow-400 bg-yellow-400/10'
      case 'info': return 'border-blue-400 bg-blue-400/10'
      case 'success': return 'border-green-400 bg-green-400/10'
      default: return 'border-blue-400 bg-blue-400/10'
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          System Alerts
        </motion.h1>

        <Card className="mb-6">
          <div className="flex items-center space-x-4">
            <Filter size={20} className="text-space-blue" />
            <span className="text-white font-medium">Filter by severity:</span>
            <div className="flex space-x-2">
              {['all', 'danger', 'warning', 'info', 'success'].map((severity) => (
                <button
                  key={severity}
                  onClick={() => setFilter(severity)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === severity 
                      ? 'bg-space-blue text-white' 
                      : 'bg-white/10 text-space-silver hover:bg-white/20'
                  }`}
                >
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-l-4 ${getSeverityColor(alert.severity)} hover:glow-blue transition-all duration-300`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-white font-medium">{alert.message}</p>
                      <span className="text-xs text-space-silver whitespace-nowrap ml-4">
                        {alert.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-space-silver">System: {alert.system}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === 'danger' ? 'bg-red-400/20 text-red-400' :
                        alert.severity === 'warning' ? 'bg-yellow-400/20 text-yellow-400' :
                        alert.severity === 'info' ? 'bg-blue-400/20 text-blue-400' :
                        'bg-green-400/20 text-green-400'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
 