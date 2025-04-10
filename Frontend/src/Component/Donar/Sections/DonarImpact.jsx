import React from "react";
import { motion } from "framer-motion";

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

const DonarImpact = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            OUR IMPACT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            Making a Difference Together
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how your donations are transforming lives and creating opportunities for students across India.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
              <span>₹</span>
              <span>10M+</span>
            </div>
            <p className="text-gray-600 font-medium">Funds Raised</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
              <span>500+</span>
            </div>
            <p className="text-gray-600 font-medium">Students Supported</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
              <span>95%</span>
            </div>
            <p className="text-gray-600 font-medium">Graduation Rate</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonarImpact;