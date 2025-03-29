import React, { useState, useEffect, useRef } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FiSearch,
  FiUser,
  FiInfo,
  FiDollarSign,
  FiCalendar,
  FiAward,
  FiCheckCircle,
  FiBookOpen,
  FiFilter,
  FiX,
  FiArrowRight,
  FiHeart,
  FiGlobe,
} from "react-icons/fi";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CountUp from 'react-countup';

// Keep only one ScholarshipPage component
const ScholarshipPage = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const heroRef = useRef(null);

  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);

  const [searchQuery, setSearchQuery] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    educationLevel: "",
    amount: "",
    sponsored: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fetch scholarships from the JSON file
  // Inside the useEffect or data fetching function
  // Fix the useEffect to properly handle local storage data
  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        // First check if we have scholarships in local storage
        const storedScholarships = localStorage.getItem('allScholarships');
        
        if (storedScholarships) {
          const parsedScholarships = JSON.parse(storedScholarships);
          setScholarships(parsedScholarships);
          setLoading(false);
        } else {
          // Fallback to API or JSON file
          const response = await fetch('/data/scholarship.json');
          if (!response.ok) {
            throw new Error('Failed to fetch scholarships');
          }
          const data = await response.json();
          
          // Store in local storage for future use
          localStorage.setItem('allScholarships', JSON.stringify(data));
          
          setScholarships(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setError('Failed to load scholarships. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchScholarships();
  }, []);

  // Filter scholarships based on search query and filters
  const filteredScholarships = scholarships.filter((scholarship) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.fundedBy.toLowerCase().includes(searchQuery.toLowerCase());

    // Education level filter
    const matchesEducationLevel =
      filters.educationLevel === "" ||
      scholarship.educationLevel === filters.educationLevel;

    // Amount filter (simplified for demo)
    const matchesAmount = filters.amount === "" || true;

    // Sponsored filter
    const matchesSponsored = !filters.sponsored || scholarship.sponsored;

    return matchesSearch && matchesEducationLevel && matchesAmount && matchesSponsored;
  });

  // Handle apply button click
  const handleApplyClick = (scholarshipId) => {
    console.log("Navigating to details with ID:", scholarshipId);
    navigate("/scholarship/details", { 
      state: { scholarshipId: scholarshipId } 
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      educationLevel: "",
      amount: "",
      sponsored: false,
    });
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Stats for the enhanced stats section
  const stats = [
    { value: 33, suffix: "M+", label: "Awarded" },
    { value: 12, suffix: "K+", label: "Students" },
    { value: 5, suffix: "K+", label: "Scholarships" }
  ];

  return (
    <>
      <div ref={heroRef} className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements matching footer style */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute -top-24 -right-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-indigo-600 rounded-full opacity-5"
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
            className="absolute top-1/2 -left-32 w-56 sm:w-64 md:w-80 h-56 sm:h-64 md:h-80 bg-purple-600 rounded-full opacity-5"
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
          
          {/* Additional animated particles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
          </div>
        </div>

        <motion.div 
          className="max-w-7xl mx-auto relative z-10"
          style={{ y, opacity }}
        >
          {/* Header - Added pt-16 for padding top to prevent hiding under navbar */}
          <motion.div 
            className="text-center mb-12 pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl font-extrabold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect Scholarship
            </motion.h1>
            <motion.p 
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Browse through our curated list of scholarships and find the one that matches your needs and qualifications.
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
                  variants={itemVariants} 
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
          </motion.div>
        </motion.div>

        {/* Search and Filter Section - Enhanced with gradient background */}
        <motion.div 
          className="relative overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl transform rotate-1"></div>
          <div className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm bg-white/90 overflow-hidden z-10">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
              <div className="relative flex-grow w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                  placeholder="Search scholarships by name, description, or provider"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setSearchQuery("")}
                  >
                    <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-auto w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiFilter className="mr-2 h-5 w-5 text-gray-500" />
                Filters {showFilters ? "▲" : "▼"}
              </motion.button>
            </div>

            {/* Expandable filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Education Level</label>
                    <select
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={filters.educationLevel}
                      onChange={(e) =>
                        setFilters({ ...filters, educationLevel: e.target.value })
                      }
                    >
                      <option value="">All Education Levels</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="MBA">MBA</option>
                      <option value="Any Level">Any Level</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Amount Range</label>
                    <select
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={filters.amount}
                      onChange={(e) =>
                        setFilters({ ...filters, amount: e.target.value })
                      }
                    >
                      <option value="">All Amounts</option>
                      <option value="low">Under ₹50,000</option>
                      <option value="medium">₹50,000 - ₹75,000</option>
                      <option value="high">Over ₹75,000</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="sponsored"
                        name="sponsored"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={filters.sponsored}
                        onChange={(e) =>
                          setFilters({ ...filters, sponsored: e.target.checked })
                        }
                      />
                      <label
                        htmlFor="sponsored"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Sponsored Only
                      </label>
                    </div>
                    <motion.button
                      onClick={resetFilters}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Reset All
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results summary */}
        {!loading && !error && (
          <motion.div 
            className="mb-6 text-sm text-gray-600 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FiHeart className="text-indigo-500 mr-2" />
            <span>Showing {filteredScholarships.length} of {scholarships.length} scholarships</span>
          </motion.div>
        )}

        {/* Scholarships List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Loading scholarships...</p>
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-16 bg-white shadow-lg rounded-xl border border-red-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiInfo className="mx-auto h-16 w-16 text-red-500" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">{error}</h3>
            <p className="mt-2 text-gray-500">Please try refreshing the page.</p>
            <motion.button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Refresh Page
            </motion.button>
          </motion.div>
        ) : filteredScholarships.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white shadow-lg rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiInfo className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">No scholarships found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
            <motion.button 
              onClick={resetFilters} 
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Reset Filters
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredScholarships.map((scholarship) => (
              <motion.div
                key={scholarship.id}
                variants={itemVariants}
                className="relative overflow-hidden"
                whileHover={{ 
                  y: -10,
                }}
                onHoverStart={() => setHoveredCard(scholarship.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Card background with gradient rotation */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-2xl transform rotate-1"></div>
                
                <div className="relative bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 transition-all duration-300 p-6">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 transform scale-0 rounded-xl"
                    animate={{ 
                      scale: hoveredCard === scholarship.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {scholarship.title}
                      </h3>
                      {scholarship.sponsored && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          <FiAward className="mr-1 h-3 w-3" />
                          Sponsored
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      {scholarship.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiUser className="mr-2 h-4 w-4 text-indigo-500" />
                        <span>Funded by: {scholarship.fundedBy}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiDollarSign className="mr-2 h-4 w-4 text-green-500" />
                        <span>Amount: {scholarship.amount}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiBookOpen className="mr-2 h-4 w-4 text-blue-500" />
                        <span>Education Level: {scholarship.educationLevel}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiAward className="mr-2 h-4 w-4 text-purple-500" />
                        <span>{scholarship.scholarshipsAwarded}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="mr-2 h-4 w-4 text-red-500" />
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <motion.button
                        onClick={() => handleApplyClick(scholarship.id)}
                        className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Apply Now
                        <FiArrowRight className="ml-2" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        
        
      </div>
    </>
  );
};

export default ScholarshipPage;
 
