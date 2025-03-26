import React, { useState, useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
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
} from "react-icons/fi";
import { motion } from "framer-motion";

// Keep only one ScholarshipPage component
const ScholarshipPage = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

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

  // Fetch scholarships from the JSON file
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        console.log("Attempting to fetch scholarships...");
        const response = await fetch("/data/scholarship.json");
        console.log("Fetch response:", response);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Fetched scholarships:", data);
        setScholarships(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
        setError("Failed to load scholarships. Please try again later.");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Added pt-16 for padding top to prevent hiding under navbar */}
        <motion.div 
          className="text-center mb-12 pt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Find Your Perfect Scholarship
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-5">
            Browse through our curated list of scholarships and find the one that matches your needs and qualifications.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-auto w-full"
            >
              <FiFilter className="mr-2 h-5 w-5 text-gray-500" />
              Filters {showFilters ? "▲" : "▼"}
            </button>
          </div>

          {/* Expandable filters */}
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
                <button
                  onClick={resetFilters}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Reset All
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results summary */}
        {!loading && !error && (
          <motion.div 
            className="mb-6 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Showing {filteredScholarships.length} of {scholarships.length} scholarships
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
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
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
            <button 
              onClick={resetFilters} 
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Reset Filters
            </button>
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
                className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {scholarship.title}
                    </h3>
                    {scholarship.sponsored && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
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
                    <button
                      onClick={() => handleApplyClick(scholarship.id)}
                      className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipPage;
