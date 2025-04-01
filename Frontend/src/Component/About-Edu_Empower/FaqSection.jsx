import React from 'react';
import { motion } from 'framer-motion';

const FaqSection = ({ isFaqInView, faqItems }) => {
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
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <p className="text-lg text-gray-700">
            Find answers to the most common questions about Edu-Empower and how we support students.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto divide-y divide-gray-200"
          variants={staggerContainer}
          initial="hidden"
          animate={isFaqInView ? "visible" : "hidden"}
        >
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="py-5"
              variants={cardVariants}
            >
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-700 mt-3 group-open:animate-fadeIn">
                  {item.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;