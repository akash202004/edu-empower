import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const ImpactSection = ({ isImpactInView, impactStats }) => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      } 
    }
  };

  return (
    <section id="impact" className="py-16 md:py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isImpactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
            OUR IMPACT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Making a Difference</h2>
          <p className="text-lg text-indigo-100">
            Since our founding, we've helped thousands of students achieve their educational dreams. Here's the impact we've made so far.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isImpactInView ? "visible" : "hidden"}
        >
          {impactStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-colors duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                <CountUp end={stat.value} duration={2.5} separator="," enableScrollSpy />
                {stat.label.includes("%") ? "%" : ""}
              </h3>
              <p className="text-indigo-100">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;