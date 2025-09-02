import  { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Activity, Zap, Coffee, Database } from 'lucide-react'
import Card from '../components/Card'

export default function Resources() {
  const resources = [
    { name: 'Oxygen', level: 92, icon: Activity, color: 'text-blue-400', bgColor: 'bg-blue-400' },
    { name: 'Energy', level: 76, icon: Zap, color: 'text-yellow-400', bgColor: 'bg-yellow-400' },
    { name: 'Water', level: 84, icon: Database, color: 'text-cyan-400', bgColor: 'bg-cyan-400' },
    { name: 'Food', level: 68, icon: Coffee, color: 'text-green-400', bgColor: 'bg-green-400' }
  ]

  const consumptionData = [
    { time: '00:00', oxygen: 92, energy: 78, water: 86, food: 70 },
    { time: '04:00', oxygen: 91, energy: 76, water: 85, food: 69 },
    { time: '08:00', oxygen: 90, energy: 74, water: 84, food: 68 },
    { time: '12:00', oxygen: 92, energy: 72, water: 83, food: 67 },
    { time: '16:00', oxygen: 91, energy: 74, water: 82, food: 66 },
    { time: '20:00', oxygen: 92, energy: 76, water: 84, food: 68 }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Resource Management
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon
            return (
              <motion.div
                key={resource.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:glow-blue transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{resource.name}</h3>
                    <IconComponent size={24} className={resource.color} />
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-space-silver">Level</span>
                      <span className="text-white font-semibold">{resource.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${resource.bgColor}`}
                        style={{ width: `${resource.level}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-space-silver">
                    Status: {resource.level > 80 ? 'Optimal' : resource.level > 60 ? 'Adequate' : 'Low'}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-semibold text-white mb-4">24-Hour Consumption Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consumptionData}>
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Line type="monotone" dataKey="oxygen" stroke="#60a5fa" strokeWidth={2} />
                <Line type="monotone" dataKey="energy" stroke="#facc15" strokeWidth={2} />
                <Line type="monotone" dataKey="water" stroke="#22d3ee" strokeWidth={2} />
                <Line type="monotone" dataKey="food" stroke="#4ade80" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="flex justify-center space-x-4 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span className="text-space-silver">Oxygen</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span className="text-space-silver">Energy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                <span className="text-space-silver">Water</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-space-silver">Food</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-white mb-4">Current Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resources}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Bar dataKey="level" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}
 