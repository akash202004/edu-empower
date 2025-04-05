import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faqItemVariants, transitions } from '../Utils/AnimationUtils';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md overflow-hidden"
      whileHover={faqItemVariants.container.hover}
    >
      <button 
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-gray-900">{question}</h3>
        <svg 
          className={`w-5 h-5 text-indigo-600 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <motion.div 
        initial={faqItemVariants.content.hidden}
        animate={isOpen ? faqItemVariants.content.visible : faqItemVariants.content.hidden}
        transition={transitions.default}
        className="overflow-hidden"
      >
        <p className="mt-4 text-gray-600">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FaqItem;