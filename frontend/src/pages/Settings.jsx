import  { motion } from 'framer-motion'
import { Moon, Sun, Settings as SettingsIcon, User, Database } from 'lucide-react'
import Card from '../components/Card'

export default function Settings({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Settings
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <SettingsIcon className="text-space-blue" size={24} />
              <h3 className="text-xl font-semibold text-white">Appearance</h3>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon size={20} className="text-space-blue" /> : <Sun size={20} className="text-yellow-400" />}
                <span className="text-white">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-space-blue' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Database className="text-space-purple" size={24} />
              <h3 className="text-xl font-semibold text-white">API Configuration</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-space-silver mb-2">
                  AI Detection API Endpoint
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-space-silver focus:border-space-blue focus:outline-none"
                  placeholder="https://api.example.com/detect"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-space-silver mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-space-silver focus:border-space-blue focus:outline-none"
                  placeholder="••••••••••••••••"
                />
              </div>
              
              <button className="w-full bg-gradient-to-r from-space-blue to-space-purple px-4 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
                Save Configuration
              </button>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <User className="text-green-400" size={24} />
              <h3 className="text-xl font-semibold text-white">User Profile</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-space-silver mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none"
                  defaultValue="Commander Sarah Chen"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-space-silver mb-2">
                  Role
                </label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none">
                  <option value="commander">Mission Commander</option>
                  <option value="engineer">Flight Engineer</option>
                  <option value="science">Science Officer</option>
                  <option value="systems">Systems Specialist</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-space-silver mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none"
                  defaultValue="s.chen@spacestation.ai"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-space-silver mb-2">
                  Security Clearance
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none"
                  defaultValue="Level 5 - Commander"
                  disabled
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button className="bg-gradient-to-r from-space-blue to-space-purple px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
                Update Profile
              </button>
              <button className="bg-white/10 border border-white/20 px-6 py-2 rounded-lg font-semibold text-white hover:bg-white/20 transition-colors">
                Cancel
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
 