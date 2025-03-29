import React from 'react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const OrganizationHero = ({ handleImageError, IMAGES, scholarshipPrograms }) => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  
  // Updated to navigate to the dashboard
  const handleCreateScholarship = () => {
    if (isSignedIn) {
      navigate('/organization/dashboard');
    } else {
      // If not signed in, redirect to login with organization role and redirectTo parameter
      navigate('/auth/login', { 
        state: { 
          role: 'ORGANIZATION',
          redirectTo: '/organization/dashboard' 
        } 
      });
    }
  };
  
  // Check if user is already signed in on component mount
  React.useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role === 'ORGANIZATION') {
      // If already signed in as organization, redirect to dashboard
      navigate('/organization/dashboard');
    }
  }, [isSignedIn, user, navigate]);
  
  return (
    <div className="relative bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left content */}
          <div className="md:w-1/2 md:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-indigo-600 mb-4">
                Empower Education,
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Lives
              </h2>
              <div className="w-full h-1 bg-indigo-600 mb-6"></div>
              <p className="text-lg text-gray-700 mb-8">
                Our platform helps organizations create, manage, and measure the impact of scholarship programs with 
                <span className="text-indigo-600 font-semibold"> up to 60% less administrative overhead</span>.
              </p>
              
              <SignedOut>
                <SignInButton mode="modal" redirectUrl="/organization/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 mb-8"
                  >
                    Create Your Scholarship
                  </motion.button>
                </SignInButton>
              </SignedOut>
              
              <SignedIn>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 mb-8"
                  onClick={handleCreateScholarship}
                >
                  Create Your Scholarship
                </motion.button>
              </SignedIn>
              
              {/* Rest of the component remains the same */}
            </motion.div>
          </div>
          
          {/* Right content remains the same */}
        </div>
      </div>
    </div>
  );
};

export default OrganizationHero;