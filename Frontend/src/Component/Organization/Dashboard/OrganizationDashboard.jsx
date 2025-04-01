import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FiPlus, FiCalendar, FiClock, FiCheckCircle, FiAlertCircle, FiPieChart, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { motion } from 'framer-motion';

const OrganizationDashboard = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [scholarships, setScholarships] = useState({
    upcoming: [],
    current: [],
    past: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  
  // Check for success message from location state
  const successMessage = location.state?.message;
  const showSuccess = location.state?.success;
  const newScholarship = location.state?.scholarship;

  useEffect(() => {
    // Check if user is signed in
    if (!isSignedIn) {
      navigate('/auth/login', { 
        state: { 
          role: 'ORGANIZATION',
          redirectTo: '/organization/dashboard'
        } 
      });
      return;
    }

    // Load scholarships from local storage
    const loadScholarships = () => {
      try {
        const storedScholarships = localStorage.getItem('organizationScholarships');
        
        if (storedScholarships) {
          setScholarships(JSON.parse(storedScholarships));
          setLoading(false);
          return true;
        }
        return false;
      } catch (err) {
        console.error('Error loading scholarships from local storage:', err);
        return false;
      }
    };

    // Add new scholarship if it exists in location state
    if (newScholarship && showSuccess) {
      // Determine which category to add it to based on deadline
      const scholarshipDeadline = new Date(newScholarship.deadline);
      const now = new Date();
      const category = scholarshipDeadline > now ? 'upcoming' : 'current';
      
      // Get existing scholarships
      let existingScholarships = { upcoming: [], current: [], past: [] };
      try {
        const stored = localStorage.getItem('organizationScholarships');
        if (stored) {
          existingScholarships = JSON.parse(stored);
        }
      } catch (err) {
        console.error('Error parsing stored scholarships:', err);
      }
      
      // Add new scholarship with a unique ID
      const updatedScholarships = {
        ...existingScholarships,
        [category]: [
          ...existingScholarships[category],
          { ...newScholarship, id: Date.now(), applicants: 0 }
        ]
      };
      
      // Save to local storage
      localStorage.setItem('organizationScholarships', JSON.stringify(updatedScholarships));
      setScholarships(updatedScholarships);
      setLoading(false);
    } else {
      // Try to load from local storage first
      const loaded = loadScholarships();
      
      // If no data in local storage, fetch from JSON file
      if (!loaded) {
        fetchScholarships();
      }
    }
  }, [isSignedIn, navigate, newScholarship, showSuccess]);
  
  // Fetch scholarships data from JSON file (fallback)
  const fetchScholarships = async () => {
    try {
      // For demo purposes, we'll use the JSON file
      const response = await fetch('/data/scholarship.json');
      if (!response.ok) {
        throw new Error('Failed to fetch scholarships');
      }
      
      const data = await response.json();
      
      // Sort scholarships into categories based on dates
      const now = new Date();
      const upcoming = [];
      const current = [];
      const past = [];
      
      // For demo, we'll distribute them randomly
      data.forEach((scholarship, index) => {
        const enrichedScholarship = {
          ...scholarship,
          id: `demo-${index}`,
          applicants: Math.floor(Math.random() * 100)
        };
        
        if (index % 3 === 0) {
          upcoming.push(enrichedScholarship);
        } else if (index % 3 === 1) {
          current.push(enrichedScholarship);
        } else {
          past.push(enrichedScholarship);
        }
      });
      
      const categorizedScholarships = { upcoming, current, past };
      
      // Save to local storage
      localStorage.setItem('organizationScholarships', JSON.stringify(categorizedScholarships));
      
      setScholarships(categorizedScholarships);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching scholarships:', err);
      setError('Failed to load scholarships. Please try again later.');
      setLoading(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Stats data
  const statsData = [
    { icon: <FiUsers className="text-blue-500" />, title: "Total Students", value: "1,245", change: "+12%" },
    { icon: <FiAward className="text-green-500" />, title: "Scholarships", value: Object.values(scholarships).flat().length, change: "+5%" },
    { icon: <FiTrendingUp className="text-purple-500" />, title: "Success Rate", value: "87%", change: "+3%" },
    { icon: <FiPieChart className="text-orange-500" />, title: "Total Funding", value: "₹24.5L", change: "+18%" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        {/* Success message */}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-center"
          >
            <FiCheckCircle className="text-green-500 mr-3 text-xl" />
            <p className="text-green-700">{successMessage || 'Operation completed successfully!'}</p>
          </motion.div>
        )}
        
        {/* Rest of the component remains the same */}
        <motion.div 
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName || 'Organization'}</h1>
                <p className="text-indigo-100">Manage your scholarships and track applications</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/organization/create-scholarship')}
                  className="flex items-center bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-50 transition-colors"
                >
                  <FiPlus className="mr-2" /> Create Scholarship
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/organization/analytics')}
                  className="flex items-center bg-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-900 transition-colors"
                >
                  <FiPieChart className="mr-2" /> Analytics
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Stats section */}
        <motion.div 
          className="max-w-7xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
                <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Scholarship tabs */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {['current', 'upcoming', 'past'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex-1 md:flex-none ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Scholarships
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-md flex items-start">
                  <FiAlertCircle className="text-red-500 mt-0.5 mr-3" />
                  <p className="text-red-700">{error}</p>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {scholarships[activeTab].length > 0 ? (
                    scholarships[activeTab].map((scholarship, index) => (
                      <motion.div
                        key={scholarship.id || index}
                        variants={itemVariants}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className="h-3 bg-indigo-600"></div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{scholarship.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scholarship.description}</p>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <FiCalendar className="mr-2" />
                            <span>Deadline: {scholarship.deadline || 'June 30, 2023'}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <FiUsers className="mr-2" />
                            <span>{scholarship.applicants || 0} Applicants</span>
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <span className="text-indigo-600 font-semibold">₹{scholarship.totalAmount || scholarship.amount || '50,000'}</span>
                            <button className="text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-1.5 px-3 rounded-md transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No {activeTab} scholarships found.</p>
                      <button 
                        onClick={() => navigate('/organization/create-scholarship')}
                        className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
                      >
                        <FiPlus className="mr-1" /> Create a new scholarship
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Find the section with action buttons in the OrganizationDashboard component
// This is likely in a header or action section of the dashboard

// Look for a section that might contain buttons like "Create Scholarship" or similar
// Add this button nearby:

<motion.button
  onClick={() => navigate('/organization/analytics')}
  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <FiPieChart className="mr-2 -ml-1 h-5 w-5" />
  Scholarship Analytics
</motion.button>

// Make sure to import FiPieChart at the top of the file if it's not already imported:
// Add this to your imports at the top of the file:
// import { FiPieChart } from 'react-icons/fi';

export default OrganizationDashboard;