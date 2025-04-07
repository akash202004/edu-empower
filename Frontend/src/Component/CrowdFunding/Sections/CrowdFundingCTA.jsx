import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CrowdFundingCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                Ready to Fund Your Education?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Start your campaign today and connect with donors who want to help you achieve your academic goals.
              </p>
              <motion.button
                onClick={() => navigate("/crowdfunding/start-campaign")}
                className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Campaign <FiArrowRight />
              </motion.button>
            </div>
            
            <div className="relative h-full min-h-[300px] md:min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Students collaborating" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-indigo-900 opacity-20"></div>
              
              {/* Success stats */}
              <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-xl border-2 border-black">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">92%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CrowdFundingCTA;