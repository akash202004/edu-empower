import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { FiEdit2, FiSave, FiX, FiCheck, FiUpload, FiExternalLink } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, cardVariants, floatAnimation } from '../Utils/AnimationUtils';
import { organizationService } from '../../api/organizationService';
import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const OrganizationProfile = () => {
  const { user } = useUser();
  const [organization, setOrganization] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: '' });
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchOrganizationProfile = async () => {
      if (!user?.id) {
        console.log("No user ID found");
        return;
      }
  
      try {
        console.log("Fetching organization for user ID:", user.id);
        
        // ===== 1. FIRST TRY SUPABASE =====
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('organizations')
          .select('*')
          .eq('user_id', user.id)
          .single();
  
        console.log("Supabase response:", { supabaseData, supabaseError });
  
        // ===== 2. IF SUPABASE HAS DATA, USE IT =====
        if (supabaseData) {
          const profileData = {
            organizationName: supabaseData.organization_name || '',
            registrationNumber: supabaseData.registration_number || '',
            contactPerson: supabaseData.contact_person || user.fullName || '',
            contactEmail: supabaseData.contact_email || user.primaryEmailAddress?.emailAddress || '',
            contactNumber: supabaseData.contact_number || '',
            address: supabaseData.address || '',
            websiteURL: supabaseData.website_url || '',
            documentURL: supabaseData.document_url || '',
            verified: supabaseData.verified || false,
            verifiedAt: supabaseData.verified_at || null,
          };
          setOrganization(profileData);
          setFormData(profileData);
          return; // Exit if Supabase data exists
        }
  
        // ===== 3. IF SUPABASE FAILS, FALLBACK TO API =====
        console.log("Falling back to API fetch...");
        const apiResponse = await organizationService.getExistingOrganizationDetails(user.id)
        
        if (!apiResponse.ok) {
          throw new Error(`API error! Status: ${apiResponse.status}`);
        }
  
        const apiData = await apiResponse.json();
        console.log("API response:", apiData);
  
        // ===== 4. TRANSFORM API DATA TO MATCH STRUCTURE =====
        const apiProfileData = {
          organizationName: apiData.organizationName || user.fullName || 'Organization Name',
          registrationNumber: apiData.registrationNumber || '',
          contactPerson: apiData.contactPerson || user.fullName || 'Contact Person',
          contactEmail: apiData.contactEmail || user.primaryEmailAddress?.emailAddress || '',
          contactNumber: apiData.contactNumber || '',
          address: apiData.address || '',
          websiteURL: apiData.websiteURL || '',
          documentURL: apiData.documentURL || '',
          verified: apiData.verified || false,
          verifiedAt: apiData.verifiedAt || null,
        };
  
        setOrganization(apiProfileData);
        setFormData(apiProfileData);
  
      } catch (err) {
        console.error("Fetch error:", err);
        setApiError(err.message || "Failed to load profile");
  
        // ===== 5. ULTIMATE FALLBACK: DEFAULT DATA =====
        const defaultData = {
          organizationName: user.fullName || 'Organization Name',
          registrationNumber: '',
          contactPerson: user.fullName || 'Contact Person',
          contactEmail: user.primaryEmailAddress?.emailAddress || '',
          contactNumber: '',
          address: '',
          websiteURL: '',
          documentURL: '',
          verified: false,
          verifiedAt: null,
        };
        setOrganization(defaultData);
        setFormData(defaultData);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrganizationProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocumentFile(file);
      setFormData(prev => ({ ...prev, documentURL: URL.createObjectURL(file) }));
    }
  };

  const uploadDocumentToSupabase = async (file) => {
    if (!file) return null;
  
    // Check file size (5MB max example)
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      setApiError(`File is too large (${fileSizeInMB.toFixed(2)}MB). Max size is 5MB.`);
      return null;
    }
  
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `org-docs/${user.id}/${Date.now()}.${fileExt}`;
  
    try {
      // ===== UPLOAD TO SUPABASE STORAGE =====
      const { data, error: uploadError } = await supabase.storage
        .from('organization-documents') // 🚀 MUST match your bucket name
        .upload(fileName, file, {
          cacheControl: '3600', // Cache for 1 hour
          upsert: false, // Don't overwrite existing files
          contentType: file.type // Set correct MIME type
        });
  
      if (uploadError) throw uploadError;
  
      // ===== GET PUBLIC URL =====
      const { data: { publicUrl } } = await supabase.storage
        .from('organization-documents')
        .getPublicUrl(fileName);
  
      return publicUrl;
  
    } catch (error) {
      console.error('Supabase Storage Error:', error);
      setApiError(
        error.message.includes('Bucket not found') 
          ? 'Storage bucket not found. Contact support.' 
          : `Upload failed: ${error.message}`
      );
      return null;
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setApiError(null);
      setSaveStatus({ show: false, success: false, message: '' });
  
      // 1. Upload document if a new file was selected
      let documentUrl = formData.documentURL;
      if (documentFile) {
        documentUrl = await uploadDocumentToSupabase(documentFile);
        if (!documentUrl) {
          setApiError('Document upload failed');
          return;
        }
      }
  
      // 2. Prepare the organization data payload
      const organizationData = {
        userId: user.id, // Changed from user_id to userId to match backend expectations
        organizationName: formData.organizationName,
        registrationNumber: formData.registrationNumber,
        contactPerson: formData.contactPerson,
        contactEmail: formData.contactEmail,
        contactNumber: formData.contactNumber,
        address: formData.address,
        websiteURL: formData.websiteURL,
        documentURL: documentUrl,
        verified: false, // Reset verification status on updates
      };
  
      console.log("Saving organization data:", organizationData);
      
      // 3. Use the organizationService instead of direct axios call
      const responseData = await organizationService.createOrganization(organizationData);
      
      console.log("API response:", responseData);
  
      // 5. Update local state with new data
      const updatedProfile = {
        organizationName: responseData.organizationName,
        registrationNumber: responseData.registrationNumber,
        contactPerson: responseData.contactPerson,
        contactEmail: responseData.contactEmail,
        contactNumber: responseData.contactNumber,
        address: responseData.address,
        websiteURL: responseData.websiteURL,
        documentURL: responseData.documentURL,
        verified: responseData.verified,
        verifiedAt: responseData.verifiedAt
      };
  
      setOrganization(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
      setDocumentFile(null);
      
      // 6. Show success message
      setSaveStatus({
        show: true,
        success: true,
        message: 'Profile updated successfully!'
      });
  
    } catch (err) {
      console.error('Save operation failed:', err);
      setApiError(err.message || 'Failed to save organization profile');
      setSaveStatus({
        show: true,
        success: false,
        message: err.message || 'Failed to save changes'
      });
    } finally {
      setLoading(false);
      
      // Auto-hide status message after 3 seconds
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const handleCancel = () => {
    setFormData(organization);
    setIsEditing(false);
    setDocumentFile(null);
    setApiError(null);
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
              <div className="flex justify-between mt-15 items-center">
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

            {/* API Error message */}
            {apiError && (
              <motion.div 
                className="px-6 py-3 bg-red-100 text-red-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center">
                  <FiX className="mr-2" />
                  {apiError}
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
                      value={formData?.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization?.organizationName}
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
                      value={formData?.registrationNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization?.registrationNumber}
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
                      value={formData?.contactPerson}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization?.contactPerson}
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
                      value={formData?.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization?.contactEmail}
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
                      value={formData?.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization?.contactNumber}
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
                      value={formData?.websiteURL}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md flex items-center justify-between">
                      {organization?.websiteURL}
                      {organization?.websiteURL && (
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
                      value={formData?.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization?.address}
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
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-md">
                      {organization?.documentURL ? (
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
                    <div className={`w-3 h-3 rounded-full mr-2 ${organization?.verified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm font-medium">
                      {organization?.verified ? 'Verified Organization' : 'Verification Pending'}
                    </span>
                  </div>
                  {organization?.verifiedAt && (
                    <div className="text-xs text-gray-500 mt-1">
                      Verified on {new Date(organization?.verifiedAt).toLocaleDateString()}
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