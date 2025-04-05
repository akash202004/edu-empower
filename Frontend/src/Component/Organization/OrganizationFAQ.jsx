import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';
import { staggerContainer, cardVariants, fadeIn } from '../Utils/AnimationUtils';
import FaqItem from './FaqItem';

const OrganizationFAQ = ({ faqData }) => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about creating and managing scholarships on our platform.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto grid grid-cols-1 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqData.map((faq, index) => (
            <motion.div key={index} variants={cardVariants}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
          >
            <FiMessageCircle className="mr-2" />
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganizationFAQ;