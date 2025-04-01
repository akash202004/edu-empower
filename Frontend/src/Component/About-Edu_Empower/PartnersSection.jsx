import React from 'react';
import { motion } from 'framer-motion';

const PartnersSection = ({ isPartnersInView, partners }) => {
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
    <section id="partners" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isPartnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            OUR PARTNERS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Organizations We Work With</h2>
          <p className="text-lg text-gray-700">
            We collaborate with leading foundations, educational institutions, and corporations to expand opportunities for students worldwide.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isPartnersInView ? "visible" : "hidden"}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-24"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-12 max-w-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;