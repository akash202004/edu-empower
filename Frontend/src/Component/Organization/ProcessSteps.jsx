import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, cardVariants, pulseAnimation, fadeIn } from './OrganizationData';

const ProcessSteps = ({ processSteps }) => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Process, Powerful Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform streamlines the entire scholarship lifecycle from creation to impact measurement.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {processSteps.slice(0, 4).map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden p-6 relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div 
                className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center z-0 opacity-70"
                variants={pulseAnimation}
                initial="initial"
                animate="animate"
              />
              <div className="relative z-10">
                <div className="text-4xl font-bold text-indigo-200 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessSteps;