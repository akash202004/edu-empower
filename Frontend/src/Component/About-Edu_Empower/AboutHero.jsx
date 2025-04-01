import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = ({ scrollY, opacity }) => {
  return (
    <motion.div 
      className="relative py-20 md:py-28 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden"
      style={{ y: scrollY, opacity }}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          {/* Animated background shapes - more subtle and professional */}
          <motion.div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-400 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.15, 1],
              x: [0, -10, 0],
              y: [0, 30, 0],
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-40 w-64 h-64 bg-purple-400 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 22,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Subtle decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="grid grid-cols-12 grid-rows-12 w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full"
                  style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 font-extrabold">Edu-Empower</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connecting students with opportunities and breaking down financial barriers to education since 2018.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a 
              href="#mission" 
              className="px-8 py-3 bg-white text-indigo-800 rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Our Mission
            </motion.a>
            <motion.a 
              href="#team" 
              className="px-8 py-3 bg-indigo-600 text-white rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Meet Our Team
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutHero;