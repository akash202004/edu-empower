import React from "react";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { SignInButton, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const DonarHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-100 rounded-full opacity-50"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-100 rounded-full opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Change Someone's Life Today
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Your generosity can transform the future of underprivileged students. 
            Create scholarships and funds for the people and causes you care most about.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/donation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Donate Now <FiHeart className="inline ml-2" />
                </motion.button>
              </SignInButton>
            </SignedOut>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => navigate("/scholarship")}
            >
              Explore Scholarships
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonarHero;