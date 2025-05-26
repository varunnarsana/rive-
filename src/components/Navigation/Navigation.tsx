import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/trends', label: 'Trends', icon: '📈' },
    { path: '/aesthetics', label: 'Aesthetics', icon: '🎨' },
    { path: '/quiz', label: 'Style Quiz', icon: '❓' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/social', label: 'Social', icon: '🌐' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-purple-600 dark:text-purple-400"
          >
            TrendScope
          </motion.div>

          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 