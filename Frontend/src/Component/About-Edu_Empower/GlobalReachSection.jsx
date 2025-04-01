import React from 'react';
import { motion } from 'framer-motion';

const GlobalReachSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
              GLOBAL REACH
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Making an Impact Worldwide</h2>
            <p className="text-lg text-gray-700 mb-6">
              What started as a local initiative has grown into a global movement. Today, Edu-Empower connects students with opportunities across continents, breaking down geographical barriers to education.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-indigo-600 mb-1">25+</h3>
                <p className="text-gray-700">Countries Reached</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-indigo-600 mb-1">15+</h3>
                <p className="text-gray-700">Languages Supported</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-indigo-600 mb-1">500+</h3>
                <p className="text-gray-700">Global Partners</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-indigo-600 mb-1">24/7</h3>
                <p className="text-gray-700">Support Available</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            variants={fadeIn}
          >
            <img 
              src="https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Global students" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent flex items-end">
              <div className="p-6">
                <p className="text-white text-lg font-medium">Students from across the globe connected through Edu-Empower</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalReachSection;