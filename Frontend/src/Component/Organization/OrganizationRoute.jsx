import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiBarChart2, FiArrowRight } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { organizationService } from '../../api/organizationService';

const OrganizationRoute = () => {
  const navigate = useNavigate();
  
  const handleCreateScholarship = () => {
    // Use the service to handle authentication and redirection
    organizationService.handleScholarshipCreation(navigate);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Empower Students Through Scholarships
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create opportunities that change lives. Join our platform to offer scholarships and make education accessible to deserving students.
            </motion.p>
            <motion.button
              onClick={handleCreateScholarship}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Scholarship <FiArrowRight className="inline ml-2" />
            </motion.button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Organizations Choose Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiAward className="text-4xl text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Streamlined Scholarship Management</h3>
                <p className="text-gray-600">Create, manage, and track scholarships with our intuitive dashboard. Simplify your administrative workflow.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiUsers className="text-4xl text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Reach Qualified Applicants</h3>
                <p className="text-gray-600">Connect with motivated students who match your criteria. Our platform helps you find the perfect candidates.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiBarChart2 className="text-4xl text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Impact Analytics</h3>
                <p className="text-gray-600">Measure your impact with detailed analytics. Track application trends and scholarship outcomes.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-indigo-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Join hundreds of organizations already creating opportunities for students across the country.
            </p>
            <motion.button
              onClick={handleCreateScholarship}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-indigo-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrganizationRoute;