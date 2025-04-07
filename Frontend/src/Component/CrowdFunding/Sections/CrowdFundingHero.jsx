import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CrowdFundingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-10"></div>
      
      {/* Animated circles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500 opacity-10 mix-blend-multiply filter blur-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 30 + 10}px`,
            height: `${Math.random() * 30 + 10}px`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, Math.random() * 2 + 0.5],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Fund Your <span className="text-indigo-600">Educational</span> Journey
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Connect with donors who believe in the power of education and want to help you achieve your academic goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate("/crowdfunding/start-campaign")}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Campaign <FiArrowRight />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('campaigns').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Campaigns
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Students celebrating graduation" 
                className="rounded-2xl shadow-2xl border-4 border-white"
              />
              
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border-2 border-black">
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">$2.5M+</p>
                  <p className="text-sm text-gray-600">Raised for Education</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-xl border-2 border-black">
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">500+</p>
                  <p className="text-sm text-gray-600">Students Supported</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 w-full h-full top-8 left-8 bg-indigo-200 rounded-2xl"></div>
            <div className="absolute -z-20 w-full h-full top-16 left-16 bg-indigo-100 rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CrowdFundingHero;