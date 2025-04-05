import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { FiEdit2, FiSave, FiX, FiCheck, FiUpload, FiExternalLink } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, cardVariants, floatAnimation } from '../Utils/AnimationUtils';

const OrganizationProfile = () => {
  const { user } = useUser();
  const [organization, setOrganization] = useState({
    organizationName: '',
    registrationNumber: '',
    contactPerson: '',
    contactEmail: '',
    contactNumber: '',
    address: '',
    websiteURL: '',
    documentURL: '',
    verified: false,
    verifiedAt: null
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [documentFile, setDocumentFile] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: '' });

  useEffect(() => {
    // Simulate fetching organization data
    const fetchOrganizationProfile = async () => {
      try {
        if (user) {
          // In a real app, you would fetch data from your API
          // For now, we'll use mock data based on the user
          const mockData = {
            organizationName: user.fullName || 'Organization Name',
            registrationNumber: 'ORG12345678',
            contactPerson: user.fullName || 'Contact Person',
            contactEmail: user.primaryEmailAddress?.emailAddress || 'email@example.com',
            contactNumber: '+1234567890',
            address: '123 Main St, City, Country',
            websiteURL: 'www.example.org',
            documentURL: '',
            verified: false,
            verifiedAt: null
          };
          
          setOrganization(mockData);
          setFormData(mockData);
        }
      } catch (err) {
        console.error("Error fetching organization profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDocumentChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
      setFormData({
        ...formData,
        documentURL: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleSave = async () => {
    try {
      // In a real app, you would send the data to your API
      console.log("Saving organization profile:", formData);
      console.log("Document file:", documentFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrganization(formData);
      setIsEditing(false);
      setSaveStatus({
        show: true,
        success: true,
        message: 'Profile updated successfully!'
      });
      
      // Hide the status message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: '' });
      }, 3000);
    } catch (err) {
      console.error("Error saving organization profile:", err);
      setSaveStatus({
        show: true,
        success: false,
        message: 'Failed to update profile. Please try again.'
      });
    }
  };

  const handleCancel = () => {
    setFormData(organization);
    setIsEditing(false);
    setDocumentFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-12">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Header */}
            <div className="bg-indigo-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-white">Organization Profile</h1>
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-md flex items-center"
                  >
                    <FiEdit2 className="mr-2" /> Edit Profile
                  </motion.button>
                ) : (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <FiSave className="mr-2" /> Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="bg-white text-gray-700 px-4 py-2 rounded-md flex items-center"
                    >
                      <FiX className="mr-2" /> Cancel
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Status message */}
            {saveStatus.show && (
              <motion.div 
                className={`px-6 py-3 ${saveStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center">
                  {saveStatus.success ? (
                    <FiCheck className="mr-2" />
                  ) : (
                    <FiX className="mr-2" />
                  )}
                  {saveStatus.message}
                </div>
              </motion.div>
            )}
            
            {/* Profile content */}
            <div className="p-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Organization Name */}
                <motion.div className="col-span-2" variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization.organizationName}
                    </div>
                  )}
                </motion.div>
                
                {/* Registration Number */}
                <motion.div variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization.registrationNumber}
                    </div>
                  )}
                </motion.div>
                
                {/* Contact Person */}
                <motion.div variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization.contactPerson}
                    </div>
                  )}
                </motion.div>
                
                {/* Contact Email */}
                <motion.div variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization.contactEmail}
                    </div>
                  )}
                </motion.div>
                
                {/* Contact Number */}
                <motion.div variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization.contactNumber}
                    </div>
                  )}
                </motion.div>
                
                {/* Website URL */}
                <motion.div variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="websiteURL"
                      value={formData.websiteURL}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md flex items-center justify-between">
                      {organization.websiteURL}
                      {organization.websiteURL && (
                        <a 
                          href={organization.websiteURL.startsWith('http') ? organization.websiteURL : `https://${organization.websiteURL}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
                
                {/* Address */}
                <motion.div className="col-span-2" variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization.address}
                    </div>
                  )}
                </motion.div>
                
                {/* Document Upload */}
                <motion.div className="col-span-2" variants={cardVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Document
                  </label>
                  {isEditing ? (
                    <div className="mt-1 flex items-center">
                      <label className="block">
                        <span className="sr-only">Choose file</span>
                        <input 
                          type="file" 
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100"
                          onChange={handleDocumentChange}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization.documentURL ? (
                        <a 
                          href={organization.documentURL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          View Document <FiExternalLink className="ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-500">No document uploaded</span>
                      )}
                    </div>
                  )}
                </motion.div>
                
                {/* Verification Status */}
                <motion.div className="col-span-2" variants={cardVariants}>
                  <div className="flex items-center mt-4">
                    <div className={`w-3 h-3 rounded-full mr-2 ${organization.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm font-medium">
                      {organization.verified ? 'Verified Organization' : 'Verification Pending'}
                    </span>
                  </div>
                  {organization.verifiedAt && (
                    <div className="text-xs text-gray-500 mt-1">
                      Verified on {new Date(organization.verifiedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizationProfile;
