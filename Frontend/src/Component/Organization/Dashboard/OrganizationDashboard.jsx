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
  const [fetchAttempts, setFetchAttempts] = useState(0);
  
  // Check for success message from location state
  const successMessage = location.state?.message;
  const showSuccess = location.state?.success;
  const newScholarship = location.state?.scholarship;

  // Fetch scholarships from API
  const fetchScholarships = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Increment fetch attempts counter
      setFetchAttempts(prev => prev + 1);
      
      const response = await fetch('http://localhost:3000/api/scholarships', {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          'Authorization': `Bearer ${user?.id || ''}`
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000) // 10 second timeout
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
      setError(`Failed to load scholarships: ${err.message}. Please try again later.`);
      
      // Fallback to local storage if API fails
      const storedScholarships = localStorage.getItem('organizationScholarships');
      if (storedScholarships) {
        try {
          setScholarships(JSON.parse(storedScholarships));
        } catch (parseError) {
          console.error('Error parsing stored scholarships:', parseError);
        }
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
    
    // Set up periodic refresh (every 5 minutes)
    const refreshInterval = setInterval(() => {
      fetchScholarships();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
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

  // Stats data - with fallback to prevent errors
  const statsData = [
    { 
      icon: <FiUsers className="text-blue-500" />, 
      title: "Total Applicants", 
      value: scholarships.current.reduce((sum, s) => sum + (s.applications?.length || 0), 0), 
      change: "+12%" 
    },
    { 
      icon: <FiAward className="text-green-500" />, 
      title: "Active Scholarships", 
      value: scholarships.current.length, 
      change: "+5%" 
    },
    { 
      icon: <FiTrendingUp className="text-purple-500" />, 
      title: "Funds Allocated", 
      value: formatCurrency(scholarships.current.reduce((sum, s) => sum + (s.allocatedAmount || 0), 0)), 
      change: "+18%" 
    },
    { 
      icon: <FiPieChart className="text-orange-500" />, 
      title: "Total Funding", 
      value: formatCurrency(scholarships.current.reduce((sum, s) => sum + (s.totalAmount || 0), 0)), 
      change: "+8%" 
    }
  ];

  // Render a fallback UI when no data is available
  const renderEmptyState = () => (
    <div className="text-center py-16 px-4">
      <FiAward className="mx-auto text-gray-300 text-5xl mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">No Scholarships Found</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {fetchAttempts > 1 
          ? "We're having trouble connecting to the server. Please try again later." 
          : "You haven't created any scholarships yet. Get started by creating your first scholarship."}
      </p>
      <button
        onClick={() => navigate('/organization/dashboard/create-scholarship')}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FiPlus className="mr-2" /> Create Scholarship
      </button>
    </div>
  );

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
              className="ml-auto text-sm bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 px-3 rounded-md transition-colors flex items-center"
            >
              <FiRefreshCw className="mr-1" /> Retry
            </button>
          </motion.div>
        )}
        
        {/* Dashboard header */}
        <motion.div 
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Organization Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your scholarships and track applications
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                onClick={() => navigate('/organization/dashboard/create-scholarship')}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="mr-2" /> Create Scholarship
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Stats section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-green-600">
                    {stat.change}
                  </span>{' '}
                  <span className="text-gray-500">from last month</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        
        {/* Scholarship tabs */}
        {!loading && (
          <div className="max-w-7xl mx-auto">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['current', 'upcoming', 'past'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab} Scholarships
                    <span className="ml-2 py-0.5 px-2.5 text-xs rounded-full bg-gray-100">
                      {scholarships[tab]?.length || 0}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Scholarship list */}
            <div className="mt-6">
              {scholarships[activeTab]?.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {scholarships[activeTab].map((scholarship) => (
                    <motion.div
                      key={scholarship.id}
                      variants={itemVariants}
                      className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                    >
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {scholarship.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {scholarship.description}
                        </p>
                      </div>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Total Amount</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(scholarship.totalAmount || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Allocated</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(scholarship.allocatedAmount || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Applicants</p>
                            <p className="text-sm font-medium text-gray-900">
                              {scholarship.applications?.length || 0}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Deadline</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(scholarship.expiredAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-4 sm:px-6 bg-gray-50">
                        <div className="flex justify-between">
                          <button
                            onClick={() => navigate(`/scholarship/${scholarship.id}`)}
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => navigate(`/organization/dashboard/scholarship-analytics`)}
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                          >
                            View Analytics
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                renderEmptyState()
              )}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default OrganizationDashboard;