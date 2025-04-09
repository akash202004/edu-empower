import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { 
  FiPlus, 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiPieChart, 
  FiUsers, 
  FiTrendingUp, 
  FiAward,
  FiRefreshCw,
  FiDollarSign
} from 'react-icons/fi';
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

  // Fetch scholarships from API
  const fetchScholarships = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/scholarships', {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${user?.id}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from API');
      }
      
      // Sort scholarships into categories based on expiredAt date
      const now = new Date();
      const upcoming = [];
      const current = [];
      const past = [];
      
      data.forEach((scholarship) => {
        const expiredAt = new Date(scholarship.expiredAt);
        
        if (expiredAt > now) {
          upcoming.push(scholarship);
        } else {
          past.push(scholarship);
        }
      });
      
      // Current scholarships are those where allocatedAmount > 0
      const currentScholarships = data.filter(scholarship => 
        scholarship.allocatedAmount > 0
      );
      
      const categorizedScholarships = { 
        upcoming, 
        current: currentScholarships, 
        past 
      };
      
      // Save to local storage as fallback
      localStorage.setItem('organizationScholarships', JSON.stringify(categorizedScholarships));
      
      setScholarships(categorizedScholarships);
    } catch (err) {
      console.error('Error fetching scholarships:', err);
      setError('Failed to load scholarships. Please try again later.');
      
      // Fallback to local storage if API fails
      const storedScholarships = localStorage.getItem('organizationScholarships');
      if (storedScholarships) {
        setScholarships(JSON.parse(storedScholarships));
      }
    } finally {
      setLoading(false);
    }
  };

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

    // Add new scholarship if it exists in location state
    if (newScholarship && showSuccess) {
      // Refresh data from API to include the new scholarship
      fetchScholarships();
    } else {
      // Initial data load
      fetchScholarships();
    }
  }, [isSignedIn, navigate, newScholarship, showSuccess]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
    { icon: <FiUsers className="text-blue-500" />, title: "Total Applicants", value: scholarships.current.reduce((sum, s) => sum + (s.applications?.length || 0), 0), change: "+12%" },
    { icon: <FiAward className="text-green-500" />, title: "Active Scholarships", value: scholarships.current.length, change: "+5%" },
    { icon: <FiTrendingUp className="text-purple-500" />, title: "Funds Allocated", value: formatCurrency(scholarships.current.reduce((sum, s) => sum + s.allocatedAmount, 0)), change: "+18%" },
    { icon: <FiPieChart className="text-orange-500" />, title: "Total Funding", value: formatCurrency(scholarships.current.reduce((sum, s) => sum + s.totalAmount, 0)), change: "+8%" }
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
        
        {/* Error message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center"
          >
            <FiAlertCircle className="text-red-500 mr-3 text-xl" />
            <p className="text-red-700">{error}</p>
            <button 
              onClick={fetchScholarships}
              className="ml-auto text-sm bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-3 rounded-md transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}
        
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
              <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/organization/dashboard/create-scholarship')}
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchScholarships}
                  className="flex items-center bg-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-900 transition-colors"
                >
                  <FiRefreshCw className="mr-2" /> Refresh
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
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {scholarships[tab]?.length || 0}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {scholarships[activeTab]?.length > 0 ? (
                    scholarships[activeTab].map((scholarship) => (
                      <motion.div
                        key={scholarship.id}
                        variants={itemVariants}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className="h-3 bg-indigo-600"></div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                            {scholarship.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {scholarship.description}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <FiCalendar className="mr-2" />
                            <span>
                              Deadline: {formatDate(scholarship.expiredAt)}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <FiUsers className="mr-2" />
                            <span>
                              {scholarship.applications?.length || 0} Applicants
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <FiDollarSign className="mr-2" />
                            <span>
                              Allocated: {formatCurrency(scholarship.allocatedAmount)} of {formatCurrency(scholarship.totalAmount)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <span className="text-indigo-600 font-semibold">
                              Max Income: ₹{scholarship.maxFamilyIncome.toLocaleString('en-IN')}
                            </span>
                            <button 
                              onClick={() => navigate(`/organization/scholarships/${scholarship.id}`)}
                              className="text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-1.5 px-3 rounded-md transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No {activeTab} scholarships found.</p>
                      {activeTab === 'upcoming' && (
                        <button 
                          onClick={() => navigate('/organization/create-scholarship')}
                          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
                        >
                          <FiPlus className="mr-1" /> Create a new scholarship
                        </button>
                      )}
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

export default OrganizationDashboard;