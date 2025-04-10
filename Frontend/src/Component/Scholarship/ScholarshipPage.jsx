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
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const [searchQuery, setSearchQuery] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    maxFamilyIncome: "",
    amount: "",
    deadline: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Fetch scholarships from the API
  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/scholarships');
        if (!response.ok) {
          throw new Error('Failed to fetch scholarships');
        }
        const data = await response.json();
        
        // Transform the API data to match our frontend structure
        const transformedData = data.map(scholarship => ({
          id: scholarship.id,
          title: scholarship.title,
          description: scholarship.description,
          amount: formatCurrency(scholarship.totalAmount),
          totalAmount: scholarship.totalAmount,
          fundedBy: scholarship.organization?.name || 'Unknown Organization',
          educationLevel: 'Any Level', // Default since API doesn't provide this
          scholarshipsAwarded: `${scholarship.applications?.length || 0} awarded`,
          deadline: formatDate(scholarship.expiredAt),
          maxFamilyIncome: scholarship.maxFamilyIncome,
          sponsored: false, // Default since API doesn't provide this
          createdAt: scholarship.createdAt,
          organization: scholarship.organization
        }));
        
        setScholarships(transformedData);
        setLoading(false);
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

    // Family income filter
    const matchesFamilyIncome =
      filters.maxFamilyIncome === "" ||
      scholarship.maxFamilyIncome <= parseFloat(filters.maxFamilyIncome);

    // Amount filter
    const matchesAmount = 
      filters.amount === "" ||
      (filters.amount === "low" && scholarship.totalAmount < 50000) ||
      (filters.amount === "medium" && scholarship.totalAmount >= 50000 && scholarship.totalAmount <= 75000) ||
      (filters.amount === "high" && scholarship.totalAmount > 75000);

    // Deadline filter (upcoming only)
    const matchesDeadline = 
      filters.deadline !== "expired" || 
      new Date(scholarship.deadline) > new Date();

    return matchesSearch && matchesFamilyIncome && matchesAmount && matchesDeadline;
  });

  // Handle apply button click
  const handleApplyClick = (scholarshipId) => {
    navigate("/scholarship/details", { 
      state: { scholarshipId: scholarshipId } 
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      maxFamilyIncome: "",
      amount: "",
      deadline: "",
    });
  };

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

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      y: -10, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      } 
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Stats for the enhanced stats section
  const stats = [
    { 
      value: scholarships.reduce((sum, s) => sum + s.totalAmount, 0) / 1000000, 
      suffix: "M+", 
      label: "Total Funds" 
    },
    { 
      value: scholarships.reduce((sum, s) => sum + (s.applications?.length || 0), 0), 
      suffix: "+", 
      label: "Applications" 
    },
    { 
      value: scholarships.length, 
      suffix: "+", 
      label: "Scholarships" 
    }
  ];

  return (
    <>
      <div ref={heroRef} className="min-h-screen bg-gradient-to-b from-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-500 opacity-10 mix-blend-multiply filter blur-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
              }}
              animate={{
                x: [0, Math.random() * 150 - 75],
                y: [0, Math.random() * 150 - 75],
                scale: [1, Math.random() * 1.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Background blobs */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-0 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-3000"></div>
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
              className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 relative inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your <span className="text-indigo-600 relative">
                Perfect Scholarship
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-black"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.span>
              </span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Browse through our curated list of scholarships and find the one that matches your needs and qualifications.
            </motion.p>
            
            {/* Enhanced Stats Section with Animated Counters */}
            <motion.div 
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants} 
                  whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                  className="bg-white p-4 sm:p-5 rounded-xl shadow-md relative overflow-hidden group border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 transform scale-0 group-hover:scale-100 rounded-xl"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative">
                    <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
                      <CountUp 
                        end={stat.value} 
                        suffix={stat.suffix} 
                        duration={2.5} 
                        decimals={stat.value < 1 ? 1 : 0}
                      />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
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
          <div className="relative bg-white p-6 rounded-xl shadow-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm bg-white/90 overflow-hidden z-10">
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
                className="flex items-center justify-center px-4 py-2 border-2 border-black rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-auto w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
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
                    <label className="block text-sm font-medium text-gray-700">Max Family Income</label>
                    <select
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={filters.maxFamilyIncome}
                      onChange={(e) =>
                        setFilters({ ...filters, maxFamilyIncome: e.target.value })
                      }
                    >
                      <option value="">Any Income</option>
                      <option value="100000">Under ₹1,00,000</option>
                      <option value="50000">Under ₹50,000</option>
                      <option value="25000">Under ₹25,000</option>
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
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                    <select
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={filters.deadline}
                      onChange={(e) =>
                        setFilters({ ...filters, deadline: e.target.value })
                      }
                    >
                      <option value="">All Deadlines</option>
                      <option value="expired">Upcoming Only</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
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
            className="text-center py-16 bg-white shadow-lg rounded-xl border-2 border-red-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiInfo className="mx-auto h-16 w-16 text-red-500" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">{error}</h3>
            <p className="mt-2 text-gray-500">Please try refreshing the page.</p>
            <motion.button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ 
                y: -5, 
                x: -5, 
                boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Refresh Page
            </motion.button>
          </motion.div>
        ) : filteredScholarships.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white shadow-lg rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiInfo className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">No scholarships found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
            <motion.button 
              onClick={resetFilters} 
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ 
                y: -5, 
                x: -5, 
                boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
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
                whileHover="hover"
                onHoverStart={() => setHoveredCard(scholarship.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Card background with gradient rotation */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-2xl transform rotate-1"></div>
                
                <div className="relative bg-white overflow-hidden shadow-md rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 p-6">
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
                      {scholarship.maxFamilyIncome && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FiInfo className="mr-2 h-4 w-4 text-yellow-500" />
                          <span>Max Family Income: {formatCurrency(scholarship.maxFamilyIncome)}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <motion.button
                        onClick={() => handleApplyClick(scholarship.id)}
                        className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        whileHover={{ 
                          y: -5, 
                          x: -5, 
                          boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
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