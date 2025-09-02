import  { motion } from 'framer-motion'
import { ArrowRight, Activity, AlertTriangle, Users, Database } from 'lucide-react'
import Card from '../components/Card'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const statusData = [
    { label: 'Oxygen', value: '98%', status: 'optimal' },
    { label: 'Temperature', value: '22°C', status: 'optimal' },
    { label: 'Pressure', value: '1.2 ATM', status: 'warning' }
  ]

  const predictions = [
    { object: 'Asteroid', confidence: '94%', distance: '2.3M km' },
    { object: 'Satellite', confidence: '87%', distance: '450 km' },
    { object: 'Debris', confidence: '76%', distance: '125 km' }
  ]

  const crewHealth = [
    { name: 'Sarah Chen', status: 'Excellent', heartRate: '72 BPM' },
    { name: 'Marcus Rodriguez', status: 'Good', heartRate: '78 BPM' },
    { name: 'Elena Volkov', status: 'Monitoring', heartRate: '85 BPM' }
  ]

  const alerts = [
    { message: 'Solar panel efficiency at 85%', severity: 'warning' },
    { message: 'Routine maintenance due in 3 days', severity: 'info' },
    { message: 'Communication array optimal', severity: 'success' }
  ]

  return (
    <div className="min-h-screen p-6">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-6xl font-bold text-white mb-4"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            Welcome to <span className="text-space-blue">Space Station AI</span>
          </motion.h1>
          <motion.p 
            className="text-2xl text-space-silver mb-8"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Monitor. Predict. Sustain.
          </motion.p>
          <motion.button 
            onClick={() => navigate("/ai-predictions")}
            className="bg-gradient-to-r from-space-blue to-space-purple px-8 py-4 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button navigate="/ai-predictions"><span>Start Monitoring</span></button>
            <ArrowRight size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="xl:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="text-space-blue" size={24} />
              <h3 className="text-xl font-semibold text-white">Live Status</h3>
            </div>
            <div className="space-y-3">
              {statusData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-space-silver">{item.label}</span>
                  <span className={`font-semibold ${
                    item.status === 'optimal' ? 'text-green-400' : 
                    item.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="xl:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="text-space-purple" size={24} />
              <h3 className="text-xl font-semibold text-white">AI Predictions</h3>
            </div>
            <div className="space-y-3">
              {predictions.map((item, index) => (
                <div key={index} className="border-l-2 border-space-purple pl-3">
                  <div className="text-white font-medium">{item.object}</div>
                  <div className="text-sm text-space-silver">{item.confidence} • {item.distance}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="xl:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="text-green-400" size={24} />
              <h3 className="text-xl font-semibold text-white">Crew Health</h3>
            </div>
            <div className="space-y-3">
              {crewHealth.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-sm text-space-silver">{item.heartRate}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === 'Excellent' ? 'bg-green-400/20 text-green-400' :
                    item.status === 'Good' ? 'bg-blue-400/20 text-blue-400' :
                    'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="xl:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-yellow-400" size={24} />
              <h3 className="text-xl font-semibold text-white">Alerts</h3>
            </div>
            <div className="space-y-3">
              {alerts.map((item, index) => (
                <div key={index} className={`p-2 rounded border-l-2 ${
                  item.severity === 'warning' ? 'border-yellow-400 bg-yellow-400/10' :
                  item.severity === 'info' ? 'border-blue-400 bg-blue-400/10' :
                  'border-green-400 bg-green-400/10'
                }`}>
                  <div className="text-sm text-white">{item.message}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
 