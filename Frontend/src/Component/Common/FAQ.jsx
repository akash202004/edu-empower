import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { y: -5, transition: { duration: 0.2 } },
};

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div 
      variants={cardVariants}
      className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
      whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
    >
      <button 
        className="w-full flex justify-between items-center text-left"
        onClick={toggleOpen}
      >
        <h3 className="text-xl font-bold">{question}</h3>
        {isOpen ? (
          <FiChevronUp className="h-6 w-6 flex-shrink-0 text-indigo-600" />
        ) : (
          <FiChevronDown className="h-6 w-6 flex-shrink-0 text-indigo-600" />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-gray-700">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// FAQ data
const faqData = [
  {
    question: "What is Edu-Empower?",
    answer: "Edu-Empower is an educational platform designed to connect students with resources, scholarships, and crowdfunding opportunities to help them achieve their educational goals regardless of financial constraints."
  },
  {
    question: "How can I apply for scholarships?",
    answer: "You can browse available scholarships in our Scholarships section, filter by your eligibility criteria, and follow the application instructions for each scholarship. Most applications can be completed directly on our platform."
  },
  {
    question: "Can I start my own crowdfunding campaign?",
    answer: "Yes! If you're a student or educational institution with a specific need, you can create a crowdfunding campaign through our platform. Click on 'Start a Campaign' in the Crowdfunding section to begin."
  },
  {
    question: "How does the mentorship program work?",
    answer: "Our mentorship program connects students with experienced professionals and educators. You can browse mentor profiles, request mentorship based on your needs, and schedule virtual meetings through our platform."
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "In most cases, yes. Edu-Empower is a registered non-profit organization, and donations are typically tax-deductible. You will receive a receipt for your donation that you can use for tax purposes."
  },
  {
    question: "How can I volunteer with Edu-Empower?",
    answer: "We welcome volunteers! You can contribute as a mentor, help review scholarship applications, or assist with various administrative tasks. Visit our 'Get Involved' section to learn about current volunteer opportunities."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
            Frequently Asked Questions
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-700">
            Find answers to common questions about Edu-Empower
          </p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-12 text-center"
        >
          <p className="text-gray-700 mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="/contact" 
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;