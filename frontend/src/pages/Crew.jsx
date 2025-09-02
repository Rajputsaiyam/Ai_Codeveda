import  { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Card from '../components/Card'

export default function Crew() {
  const crewMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Mission Commander',
      status: 'Active',
      health: 'Excellent',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c5db?w=150&h=150&fit=crop&crop=face',
      heartRate: '72 BPM',
      oxygenSat: '98%'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Flight Engineer',
      status: 'Active',
      health: 'Good',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      heartRate: '78 BPM',
      oxygenSat: '97%'
    },
    {
      id: 3,
      name: 'Elena Volkov',
      role: 'Science Officer',
      status: 'Rest Period',
      health: 'Monitoring',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      heartRate: '65 BPM',
      oxygenSat: '96%'
    },
    {
      id: 4,
      name: 'James Wright',
      role: 'Systems Specialist',
      status: 'Active',
      health: 'Excellent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      heartRate: '70 BPM',
      oxygenSat: '99%'
    }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Crew Members
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crewMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:glow-blue transition-all duration-300 cursor-pointer">
                <div className="text-center">
                  <div className="relative mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto border-2 border-space-blue"
                    />
                    <div className={`absolute bottom-0 right-1/2 transform translate-x-6 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'Active' ? 'bg-green-400' : 
                      member.status === 'Rest Period' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-space-blue mb-3">{member.role}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-space-silver">Status:</span>
                      <span className={`font-medium ${
                        member.status === 'Active' ? 'text-green-400' :
                        member.status === 'Rest Period' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-space-silver">Health:</span>
                      <span className={`font-medium ${
                        member.health === 'Excellent' ? 'text-green-400' :
                        member.health === 'Good' ? 'text-blue-400' : 'text-yellow-400'
                      }`}>
                        {member.health}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-space-silver">Heart Rate:</span>
                      <span className="text-white font-medium">{member.heartRate}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-space-silver">O2 Sat:</span>
                      <span className="text-white font-medium">{member.oxygenSat}</span>
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
 