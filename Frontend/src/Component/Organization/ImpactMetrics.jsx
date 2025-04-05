import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { staggerContainer, cardVariants, fadeIn } from '../Utils/AnimationUtils';

const ImpactMetrics = ({ impactMetrics, statsInView }) => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together with our partner organizations, we're making education accessible to deserving students across India.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex justify-center mb-4">
                <metric.icon className={`w-10 h-10 ${metric.color}`} />
              </div>
              <div className="text-4xl font-bold mb-2">
                {statsInView && (
                  <CountUp end={metric.value} suffix={metric.suffix} duration={2.5} />
                )}
              </div>
              <div className="text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactMetrics;