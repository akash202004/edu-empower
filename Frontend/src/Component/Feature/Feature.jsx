import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiDollarSign, FiUsers, FiSearch, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi';

const Feature = () => {
  const features = [
    {
      icon: <FiAward className="h-8 w-8" />,
      title: "Scholarship Matching",
      description: "Our intelligent system matches students with scholarships that fit their profile and needs.",
      color: "from-indigo-500 to-indigo-700"
    },
    {
      icon: <FiDollarSign className="h-8 w-8" />,
      title: "Crowdfunding Platform",
      description: "Raise funds for your education with our dedicated crowdfunding tools and supportive community.",
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: <FiUsers className="h-8 w-8" />,
      title: "Donor Connections",
      description: "Connect directly with donors who are passionate about supporting educational journeys.",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <FiSearch className="h-8 w-8" />,
      title: "Resource Discovery",
      description: "Find educational resources, mentorship opportunities, and support networks.",
      color: "from-cyan-500 to-cyan-700"
    },
    {
      icon: <FiCheckCircle className="h-8 w-8" />,
      title: "Verified Organizations",
      description: "All educational institutions and organizations on our platform are thoroughly verified.",
      color: "from-teal-500 to-teal-700"
    },
    {
      icon: <FiClock className="h-8 w-8" />,
      title: "Deadline Reminders",
      description: "Never miss an application deadline with our automated reminder system.",
      color: "from-indigo-500 to-indigo-700"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <motion.div 
            className="absolute -top-24 -right-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-indigo-600 rounded-full"
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
            className="absolute top-1/2 -left-32 w-56 sm:w-64 md:w-80 h-56 sm:h-64 md:h-80 bg-purple-600 rounded-full"
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
            className="absolute -bottom-20 right-1/3 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-blue-600 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
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
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-2">PLATFORM FEATURES</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Empowering Your Educational Journey
          </h2>
          <div className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto relative">
            <p className="relative z-10 px-2">
              Discover the tools and resources designed to help you achieve your academic goals.
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <div className="relative bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm bg-white/90 overflow-hidden z-10 h-full">
                {/* Icon with gradient background - fixed color issue */}
                <div className={`mb-5 inline-flex items-center justify-center p-3 rounded-lg text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${feature.color}`}>
                  {React.cloneElement(feature.icon, { className: "h-8 w-8 text-white" })}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                {/* Learn more link */}
                <div className="mt-auto">
                  <a href="#" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300">
                    Learn more
                    <FiArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
                
                {/* Decorative corner element */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full opacity-70"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-block p-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg">
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-50 transition-colors duration-300">
              Explore All Features
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feature;