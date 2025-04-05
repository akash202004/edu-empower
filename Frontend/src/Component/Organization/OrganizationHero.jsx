import React, {useEffect} from 'react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fadeIn, staggerContainer, cardVariants, floatAnimation } from '../Utils/AnimationUtils';

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

  const handleUserSync = async () => {
    if (isSignedIn && user) {
      try {
        await axios.post("http://localhost:3001/api/users/registerorupdate", {
          userId: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress || null,
          role: "ORGANIZATION",
        });

        console.log(user.id);
        console.log(user.fullName);
        console.log(user.primaryEmailAddress?.emailAddress || null);

        navigate("/organization/dashboard"); // Redirect after successful sync
      } catch (error) {
        console.error("Error syncing user data:", error.response?.data || error.message);
      }
    }
  };

  // Auto-sync user on page load if signed in
  useEffect(() => {
    handleUserSync();
  }, [isSignedIn, user]);
  
  return (
    <div className="relative bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left content */}
          <div className="md:w-1/2 md:pr-12">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
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
              
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <SignedOut>
                  <SignInButton mode="modal" redirectUrl="/organization/dashboard">
                    <motion.button
                      onClick={handleUserSync}
                      variants={cardVariants}
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
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 mb-8"
                    onClick={handleCreateScholarship}
                  >
                    Create Your Scholarship
                  </motion.button>
                </SignedIn>
              </motion.div>
              
              {/* Rest of the component remains the same */}
            </motion.div>
          </div>
          
          {/* Right content - Add animation */}
          <motion.div 
            className="md:w-1/2 mt-12 md:mt-0"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
          >
            <img
              src={IMAGES.dashboardImg}
              alt="Scholarship Dashboard"
              className="w-full h-auto rounded-lg shadow-xl"
              onError={handleImageError}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationHero;