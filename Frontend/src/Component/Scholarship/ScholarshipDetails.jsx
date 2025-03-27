import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiDollarSign, FiBookOpen, FiAward, FiUser, FiInfo, FiList, FiArrowRight } from "react-icons/fi";
import CountUp from 'react-countup';

const ScholarshipDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Parallax effect setup
  const detailsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: detailsRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);
  
  const scholarshipId = location.state?.scholarshipId;
  
  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      if (!scholarshipId) {
        setError("No scholarship selected. Please go back and select a scholarship.");
        setLoading(false);
        return;
      }
      
      try {
        console.log("Fetching scholarship with ID:", scholarshipId);
        // Fetch from the JSON file
        const response = await fetch("/data/scholarship.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const scholarships = await response.json();
        console.log("All scholarships:", scholarships);
        
        // Don't convert to number, compare as strings
        const selectedScholarship = scholarships.find(s => s.id === scholarshipId);
        console.log("Found scholarship:", selectedScholarship);
        
        if (selectedScholarship) {
          setScholarship(selectedScholarship);
        } else {
          setError("Scholarship not found. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching scholarship details:", error);
        setError("Failed to load scholarship details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchScholarshipDetails();
  }, [scholarshipId]);
  
  const handleProceedToApplication = () => {
    navigate("/scholarship/apply", { 
      state: { 
        scholarshipId: scholarshipId
      } 
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { y: -5, transition: { duration: 0.2 } }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading scholarship details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <FiInfo className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{error}</h2>
          <motion.button
            onClick={() => navigate("/scholarship")}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Scholarships
          </motion.button>
        </div>
      </div>
    );
  }
  
  return (
    <div ref={detailsRef} className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
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
      
      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
        style={{ y, opacity }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate("/scholarship")}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiArrowLeft className="mr-2" />
            Back to scholarships
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-8 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            <motion.h1 
              className="text-3xl font-bold text-white relative z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Scholarship Details
            </motion.h1>
            <motion.p 
              className="text-indigo-100 mt-2 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Review the details before applying
            </motion.p>
          </div>
          
          <div className="p-8">
            <motion.h2 
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {scholarship.title}
            </motion.h2>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {scholarship.sponsored && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mr-2">
                  <FiAward className="mr-1" /> Sponsored
                </span>
              )}
            </motion.div>
            
            <motion.div 
              className="prose max-w-none mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p>{scholarship.description}</p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 transform scale-0 group-hover:scale-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiUser className="mr-2 h-5 w-5 text-indigo-600" />
                    <span className="font-medium">Funded By</span>
                  </div>
                  <p className="text-gray-800 font-medium">{scholarship.fundedBy}</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 transform scale-0 group-hover:scale-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiDollarSign className="mr-2 h-5 w-5 text-green-600" />
                    <span className="font-medium">Amount</span>
                  </div>
                  <p className="text-gray-800 font-medium">{scholarship.amount}</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 transform scale-0 group-hover:scale-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiBookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="font-medium">Education Level</span>
                  </div>
                  <p className="text-gray-800 font-medium">{scholarship.educationLevel}</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 transform scale-0 group-hover:scale-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiCalendar className="mr-2 h-5 w-5 text-red-600" />
                    <span className="font-medium">Application Deadline</span>
                  </div>
                  <p className="text-gray-800 font-medium">{scholarship.deadline}</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group md:col-span-2"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 transform scale-0 group-hover:scale-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiAward className="mr-2 h-5 w-5 text-purple-600" />
                    <span className="font-medium">Scholarships Awarded</span>
                  </div>
                  <p className="text-gray-800 font-medium">{scholarship.scholarshipsAwarded}</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-yellow-800">
                    Application Information
                  </h3>
                  <div className="mt-2 text-yellow-700">
                    <p>
                      Before applying, please ensure you have all required documents ready. The application process takes approximately 15-20 minutes to complete.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.button
                onClick={() => navigate("/scholarship")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiArrowLeft className="mr-2" />
                Back to Scholarships
              </motion.button>
              
              <motion.button
                onClick={handleProceedToApplication}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Application
                <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={cardVariants} 
            whileHover="hover"
            className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden group"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 transform scale-0 group-hover:scale-100 rounded-xl"
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <p className="text-3xl font-bold text-indigo-600"><CountUp end={33} suffix="M+" duration={2.5} /></p>
              <p className="text-sm text-gray-600">Awarded</p>
            </div>
          </motion.div>
          <motion.div 
            variants={cardVariants} 
            whileHover="hover"
            className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden group"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 transform scale-0 group-hover:scale-100 rounded-xl"
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <p className="text-3xl font-bold text-indigo-600"><CountUp end={12} suffix="K+" duration={2} /></p>
              <p className="text-sm text-gray-600">Students</p>
            </div>
          </motion.div>
          <motion.div 
            variants={cardVariants} 
            whileHover="hover"
            className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden group"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 transform scale-0 group-hover:scale-100 rounded-xl"
              transition={{ duration: 0.3 }}
            />
            <div className="relative">
              <p className="text-3xl font-bold text-indigo-600"><CountUp end={5} suffix="K+" duration={1.5} /></p>
              <p className="text-sm text-gray-600">Scholarships</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScholarshipDetails;