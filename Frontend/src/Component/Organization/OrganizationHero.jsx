import React from 'react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const OrganizationHero = ({ handleUserSync, handleImageError, IMAGES, scholarshipPrograms }) => {
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
                <SignInButton mode="modal">
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
                  onClick={handleUserSync}
                >
                  Create Your Scholarship
                </motion.button>
              </SignedIn>
              
              <div className="flex flex-wrap gap-6 mb-12">
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">Streamlined Management</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">Verified Applicants</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span className="text-gray-700">Impact Reporting</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-600">500+</div>
                  <div className="text-sm text-gray-600">Organizations</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-600">₹25M+</div>
                  <div className="text-sm text-gray-600">Disbursed</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-600">10K+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right content - Scholarship management card */}
          <div className="md:w-1/2 mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={IMAGES.dashboardImg} 
                  alt="Scholarship Dashboard" 
                  className="w-full h-48 object-cover"
                  onError={handleImageError}
                />
                <div className="absolute bottom-0 left-0 bg-indigo-600 text-white px-4 py-2">
                  <div className="text-xs">ORGANIZATION DASHBOARD</div>
                  <div className="text-xl font-bold">Scholarship Management</div>
                  <div className="text-xs">Streamlined end-to-end process</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Current Active Scholarships</h3>
                
                <div className="space-y-4">
                  {scholarshipPrograms.map((program, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-indigo-600">{program.title}</div>
                          <div className="text-sm text-gray-600">Amount: {program.amount} per student</div>
                          <div className="text-sm text-gray-600">Recipients: {program.recipients}</div>
                        </div>
                        <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                          Deadline: {program.deadline}
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-indigo-600">42</span> applications received
                        </div>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Remove the WhyChooseEduEmpower component from here */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationHero;