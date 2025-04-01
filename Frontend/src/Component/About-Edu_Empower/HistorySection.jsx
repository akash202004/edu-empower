import React from 'react';
import { motion } from 'framer-motion';

const HistorySection = ({ isHistoryInView, timelineEvents }) => {
  return (
    <section id="history" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHistoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-block px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={isHistoryInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            OUR STORY
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHistoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            The Evolution of Edu-Empower
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isHistoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            From a small initiative to a platform that has impacted thousands of lives, our journey has been driven by a singular vision: making education accessible to all.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Story-focused timeline events */}
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={index}
              className="mb-16 last:mb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={isHistoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Year marker */}
                <div className="md:w-1/6">
                  <div className="sticky top-24 flex flex-row md:flex-col items-center md:items-start">
                    <div className="text-teal-600 font-bold text-2xl md:text-3xl">{event.year}</div>
                    <div className="hidden md:block w-12 h-1 bg-teal-600 mt-4"></div>
                  </div>
                </div>
                
                {/* Content card */}
                <motion.div 
                  className="md:w-5/6 bg-white p-8 rounded-lg shadow-md border border-gray-100"
                  whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
                  
                  {/* Additional descriptive content */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-wrap gap-3">
                      {event.achievements && event.achievements.map((achievement, i) => (
                        <span key={i} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {achievement}
                        </span>
                      ))}
                      {!event.achievements && 
                        <span className="text-gray-500 italic">A significant milestone in our journey to make education accessible.</span>
                      }
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;