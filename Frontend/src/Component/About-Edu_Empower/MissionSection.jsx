import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const MissionSection = ({ isMissionInView }) => {
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
    <section id="mission" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isMissionInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
              OUR MISSION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Democratizing Access to Education</h2>
            <p className="text-lg text-gray-700 mb-6">
              At Edu-Empower, we believe that financial constraints should never prevent talented students from accessing quality education. Our mission is to create a world where every student has the opportunity to pursue their educational dreams regardless of their economic background.
            </p>
            <ul className="space-y-3 mb-8">
              {["Connect students with scholarships", "Facilitate educational crowdfunding", "Build supportive communities", "Provide mentorship opportunities"].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <FiCheck className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-xl"
            variants={fadeIn}
          >
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Students celebrating graduation" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent flex items-end">
              <div className="p-6">
                <p className="text-white text-lg font-medium">Empowering the next generation of leaders</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;