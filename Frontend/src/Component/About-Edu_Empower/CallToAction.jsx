import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Edu-Empower Community?</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Whether you're a student seeking support, a donor looking to make an impact, or an organization wanting to partner with us, we'd love to have you join our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              onClick={() => navigate('/auth/register')}
              className="px-8 py-3 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-300 shadow-lg"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold border border-indigo-400 hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;