import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiHeart, FiBriefcase } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from 'react-countup';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);
  const heroRef = useRef(null);
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const handleRoleSelect = (role) => {
    if (role === "STUDENT") {
      navigate("/student", { state: { role: "STUDENT" } });
    } else if (role === "DONOR") {
      navigate("/donor", { state: { role: "DONOR" } });
    } else if (role === "ORGANIZATION") {
      navigate("/organization", { state: { role: "ORGANIZATION" } });
    } else {
      navigate("/auth/login", { state: { role } });
    }
  };

  const roleCards = [
    {
      id: "STUDENT",
      title: "Student",
      description: "Access scholarships, apply for funding, and track your educational journey",
      icon: <FiUser className="h-8 w-8" />,
      color: "from-indigo-500 to-blue-600",
      hoverColor: "from-indigo-600 to-blue-700",
      shadowColor: "rgba(79, 70, 229, 0.4)",
      benefits: ["Find scholarships", "Apply for funding", "Track applications", "Connect with mentors"]
    },
    {
      id: "DONOR",
      title: "Donor",
      description: "Support students, create scholarships, and make a difference in education",
      icon: <FiHeart className="h-8 w-8" />,
      color: "from-green-500 to-emerald-600",
      hoverColor: "from-green-600 to-emerald-700",
      shadowColor: "rgba(16, 185, 129, 0.4)",
      benefits: ["Support students", "Create scholarships", "Track impact", "Tax benefits"]
    },
    {
      id: "ORGANIZATION",
      title: "Organization",
      description: "Manage scholarships, review applications, and empower future leaders",
      icon: <FiBriefcase className="h-8 w-8" />,
      color: "from-purple-500 to-violet-600",
      hoverColor: "from-purple-600 to-violet-700",
      shadowColor: "rgba(124, 58, 237, 0.4)",
      benefits: ["Create scholarships", "Review applications", "Manage funds", "Connect with talent"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Stats for the enhanced stats section
  const stats = [
    { value: 33, suffix: "M+", label: "Awarded" },
    { value: 12, suffix: "K+", label: "Students" },
    { value: 5, suffix: "K+", label: "Scholarships" }
  ];

  return (
    <div ref={heroRef} className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-100 opacity-30 mix-blend-multiply filter blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
        <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto w-full space-y-8 z-10 px-4 sm:px-6 lg:px-8 py-12"
        style={{ y, opacity }}
      >
        <div className="text-center">
          <motion.h1 
            className="mt-6 text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join Edu-Empower
          </motion.h1>
          <motion.p 
            className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select your role to get started on your educational journey
          </motion.p>
          
          {/* Enhanced Stats Section with Animated Counters */}
          <motion.div 
            className="mt-8 grid grid-cols-3 gap-6 max-w-lg mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={cardVariants} 
                whileHover={{ y: -5 }}
                className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 transform scale-0 group-hover:scale-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <p className="text-3xl font-bold text-indigo-600">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {roleCards.map((role) => (
            <motion.div
              key={role.id}
              className="relative"
              variants={cardVariants}
              onMouseEnter={() => setHoveredRole(role.id)}
              onMouseLeave={() => setHoveredRole(null)}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
            >
              <div 
                className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                  hoveredRole === role.id ? 'transform scale-105' : ''
                }`}
                style={{
                  boxShadow: hoveredRole === role.id 
                    ? `0 20px 25px -5px ${role.shadowColor}, 0 10px 10px -5px ${role.shadowColor}` 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className={`h-full flex flex-col bg-white rounded-2xl border border-gray-100`}>
                  <div className={`p-6 bg-gradient-to-r ${role.color} text-white rounded-t-2xl`}>
                    <div className="flex items-center justify-between">
                      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                        {role.icon}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {role.id}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold">I am a {role.title}</h3>
                    <p className="mt-2 text-white/80 text-sm">{role.description}</p>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h4 className="font-medium text-gray-700 mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {role.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-6 pt-0">
                    <motion.button
                      onClick={() => handleRoleSelect(role.id)}
                      className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 bg-gradient-to-r ${
                        hoveredRole === role.id ? role.hoverColor : role.color
                      } hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${role.id === "STUDENT" ? "indigo" : role.id === "DONOR" ? "green" : "purple"}-500`}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Continue as {role.title}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-500">
            Already have an account? <a href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a>
          </p>
        </motion.div>
        
        {/* Universities Section */}
        <motion.div 
          className="mt-16 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-gray-500 font-semibold uppercase mb-4 text-center">Trusted By Leading Universities:</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBwuddBfDYzFHfvCjSk2dHhn1KL_weVdxIA&s", alt: "Harvard", height: "h-10" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/800px-The_University_of_California_UCLA.svg.png", alt: "UCLA", height: "h-8" },
              { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTHxjibjLvPaPJSKRAFk2Oxyr_yxfcXeDYg6BF4jWJ5AERnOPn8NgeeMy&s=10", alt: "Michigan", height: "h-8" },
              { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dtvPjZYkcgpbq18XmHvPnTEuyCOGIiGl3ERrtNtzlVeXYvTtp_j-_Odx&s=10", alt: "Berkeley", height: "h-10" },
              { src: "https://collegeaim.org/wp-content/uploads/2021/09/syracuse.png", alt: "Syracuse", height: "h-8" }
            ].map((uni, index) => (
              <motion.img 
                key={index}
                src={uni.src} 
                alt={uni.alt} 
                className={`${uni.height} grayscale hover:grayscale-0 transition-all duration-300`}
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;