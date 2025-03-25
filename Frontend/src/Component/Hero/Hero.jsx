import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiAward, FiDollarSign, FiUsers } from 'react-icons/fi';

const Hero = () => {
  const navigate = useNavigate();

  // Background images
  const backgroundImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Students" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/80"></div>
      </div>

      {/* Animated Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/2 -left-32 w-96 h-96 bg-indigo-500 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 right-1/3 w-80 h-80 bg-blue-500 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-indigo-300 mb-2">
                Innovative Solution for Students
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Connecting Students & Support
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0">
                Empowering education through scholarships, crowdfunding, and community support. Join us in making education accessible for all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/scholarship')}
                  className="px-8 py-4 bg-white text-indigo-700 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
                >
                  Find Scholarships
                  <FiArrowRight className="ml-2" />
                </button>
                <button 
                  onClick={() => navigate('/crowdfunding')}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center"
                >
                  Start Fundraising
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-xl">
                  <FiAward className="text-4xl text-yellow-300 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Scholarships</h3>
                  <p className="text-gray-200">Find financial support for your educational journey</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <FiDollarSign className="text-4xl text-green-300 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Crowdfunding</h3>
                  <p className="text-gray-200">Raise funds for your education with community support</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <FiUsers className="text-4xl text-blue-300 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
                  <p className="text-gray-200">Connect with mentors and like-minded students</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-200">Students Helped</span>
                    <span className="text-lg font-bold text-white">5,000+</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-300 to-purple-400 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-white font-medium">Join us today!</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
