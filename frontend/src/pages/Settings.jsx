// import  { motion } from 'framer-motion'
// import { Moon, Sun, Settings as SettingsIcon, User, Database } from 'lucide-react'
// import Card from '../components/Card'

// export default function Settings({ darkMode, setDarkMode }) {
//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-4xl mx-auto">
//         <motion.h1 
//           className="text-4xl font-bold text-white mb-8"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//         >
//           Settings
//         </motion.h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Card>
//             <div className="flex items-center space-x-3 mb-6">
//               <SettingsIcon className="text-space-blue" size={24} />
//               <h3 className="text-xl font-semibold text-white">Appearance</h3>
//             </div>
            
//             <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
//               <div className="flex items-center space-x-3">
//                 {darkMode ? <Moon size={20} className="text-space-blue" /> : <Sun size={20} className="text-yellow-400" />}
//                 <span className="text-white">Dark Mode</span>
//               </div>
//               <button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                   darkMode ? 'bg-space-blue' : 'bg-gray-600'
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                     darkMode ? 'translate-x-6' : 'translate-x-1'
//                   }`}
//                 />
//               </button>
//             </div>
//           </Card>

//           <Card>
//             <div className="flex items-center space-x-3 mb-6">
//               <Database className="text-space-purple" size={24} />
//               <h3 className="text-xl font-semibold text-white">API Configuration</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-space-silver mb-2">
//                   AI Detection API Endpoint
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-space-silver focus:border-space-blue focus:outline-none"
//                   placeholder="https://api.example.com/detect"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-space-silver mb-2">
//                   API Key
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-space-silver focus:border-space-blue focus:outline-none"
//                   placeholder="••••••••••••••••"
//                 />
//               </div>
              
//               <button className="w-full bg-gradient-to-r from-space-blue to-space-purple px-4 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
//                 Save Configuration
//               </button>
//             </div>
//           </Card>

//           <Card className="md:col-span-2">
//             <div className="flex items-center space-x-3 mb-6">
//               <User className="text-green-400" size={24} />
//               <h3 className="text-xl font-semibold text-white">User Profile</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-space-silver mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none"
//                   defaultValue="Commander Sarah Chen"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-space-silver mb-2">
//                   Role
//                 </label>
//                 <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none">
//                   <option value="commander">Mission Commander</option>
//                   <option value="engineer">Flight Engineer</option>
//                   <option value="science">Science Officer</option>
//                   <option value="systems">Systems Specialist</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-space-silver mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none"
//                   defaultValue="s.chen@spacestation.ai"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-space-silver mb-2">
//                   Security Clearance
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-space-blue focus:outline-none"
//                   defaultValue="Level 5 - Commander"
//                   disabled
//                 />
//               </div>
//             </div>
            
//             <div className="mt-6 flex space-x-4">
//               <button className="bg-gradient-to-r from-space-blue to-space-purple px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
//                 Update Profile
//               </button>
//               <button className="bg-white/10 border border-white/20 px-6 py-2 rounded-lg font-semibold text-white hover:bg-white/20 transition-colors">
//                 Cancel
//               </button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
 




import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Settings as SettingsIcon, User, Database } from 'lucide-react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use system preference if no saved preference
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Settings
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <SettingsIcon className="text-blue-500 dark:text-space-blue" size={24} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h3>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Moon size={20} className="text-blue-500 dark:text-space-blue" />
                ) : (
                  <Sun size={20} className="text-yellow-500 dark:text-yellow-400" />
                )}
                <span className="text-gray-900 dark:text-white">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-blue-500 dark:bg-space-blue' : 'bg-gray-300 dark:bg-gray-600'
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
              <Database className="text-purple-500 dark:text-space-purple" size={24} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">API Configuration</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-space-silver mb-2">
                  AI Detection API Endpoint
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-space-silver focus:border-blue-500 dark:focus:border-space-blue focus:outline-none"
                  placeholder="https://api.example.com/detect"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-space-silver mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-space-silver focus:border-blue-500 dark:focus:border-space-blue focus:outline-none"
                  placeholder="••••••••••••••••"
                />
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-space-blue dark:to-space-purple px-4 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
                Save Configuration
              </button>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <User className="text-green-500 dark:text-green-400" size={24} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Profile</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-space-silver mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-space-blue focus:outline-none"
                  defaultValue="Commander Sarah Chen"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-space-silver mb-2">
                  Role
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-space-blue focus:outline-none">
                  <option value="commander">Mission Commander</option>
                  <option value="engineer">Flight Engineer</option>
                  <option value="science">Science Officer</option>
                  <option value="systems">Systems Specialist</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-space-silver mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-space-blue focus:outline-none"
                  defaultValue="s.chen@spacestation.ai"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-space-silver mb-2">
                  Security Clearance
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-space-blue focus:outline-none"
                  defaultValue="Level 5 - Commander"
                  disabled
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-space-blue dark:to-space-purple px-6 py-2 rounded-lg font-semibold text-white hover:scale-105 transition-transform">
                Update Profile
              </button>
              <button className="bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 px-6 py-2 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                Cancel
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}