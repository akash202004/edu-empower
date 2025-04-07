import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

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
  hover: { y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" },
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
      whileHover="hover"
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold mb-0 text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-indigo-600 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3"
        >
          <p className="text-gray-700">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const CrowdFundingFAQ = () => {
  const faqRef = useRef(null);

  const faqs = [
    {
      question: "How does educational crowdfunding work?",
      answer: "Educational crowdfunding allows individuals to contribute funds to support students' education. Donors can browse projects, select ones that resonate with them, and make contributions of any size. Once a project reaches its funding goal, the funds are disbursed to the student or institution."
    },
    {
      question: "How are students vetted for crowdfunding campaigns?",
      answer: "All students must complete a thorough application process that verifies their identity, academic records, and financial need. We review each application carefully and only approve campaigns for students who demonstrate genuine need and academic potential."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, all donations made through our platform are tax-deductible as we are a registered 501(c)(3) non-profit organization. You will receive a tax receipt for your donation."
    },
    {
      question: "Can I donate to a specific student or project?",
      answer: "Absolutely! You can browse all active campaigns and choose specific students or educational projects to support based on your interests or preferences."
    },
    {
      question: "What happens if a project doesn't reach its funding goal?",
      answer: "We operate on a flexible funding model. If a project doesn't reach its full goal, the student still receives the funds that were raised, and we work with them to adjust their educational plans accordingly."
    },
    {
      question: "How can I start my own crowdfunding campaign?",
      answer: "If you're a student in need of financial support for your education, you can register on our platform, verify your student status, and submit a campaign application. Our team will review it and help you set up your campaign if approved."
    }
  ];

  return (
    <section className="py-16">
      <motion.div 
        ref={faqRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
          Frequently Asked Questions
          <motion.div 
            className="absolute -bottom-2 left-0 w-full h-1 bg-black"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Find answers to common questions about our crowdfunding platform
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-6"
      >
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </motion.div>
    </section>
  );
};

export default CrowdFundingFAQ;