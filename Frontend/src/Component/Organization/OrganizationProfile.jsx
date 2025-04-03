<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { FiEdit2, FiSave, FiX, FiCheck, FiUpload, FiExternalLink } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, you would upload the document and save the data to your API
      // For now, we'll simulate a successful save
      
      // Simulate document upload
      let documentURL = organization.documentURL;
      if (documentFile) {
        // In a real app, you would upload the file to a storage service
        documentURL = URL.createObjectURL(documentFile);
      }
      
      const updatedData = {
        ...formData,
        documentURL
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrganization(updatedData);
      setIsEditing(false);
      setSaveStatus({
        show: true,
        success: true,
        message: 'Profile updated successfully!'
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: '' });
      }, 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveStatus({
        show: true,
        success: false,
        message: 'Failed to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData(organization);
    setIsEditing(false);
    setDocumentFile(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Status message */}
          {saveStatus.show && (
            <div className={`mb-4 p-4 rounded-md ${saveStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex items-center">
                {saveStatus.success ? <FiCheck className="mr-2" /> : <FiX className="mr-2" />}
                <p>{saveStatus.message}</p>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Organization Profile</h1>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 flex items-center text-sm font-medium"
                >
                  <FiEdit2 className="mr-1.5" /> Edit Profile
                </button>
              ) : null}
            </div>
            
            <div className="p-6">
              {!isEditing ? (
                // View mode
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{organization.organizationName}</h2>
                    <div className="mt-1 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        organization.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {organization.verified ? 'Verified' : 'Verification Pending'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Organization Details</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Registration Number</p>
                          <p className="mt-1">{organization.registrationNumber || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Contact Person</p>
                          <p className="mt-1">{organization.contactPerson || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="mt-1">{organization.contactEmail || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="mt-1">{organization.contactNumber || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Website</p>
                          <p className="mt-1">
                            {organization.websiteURL ? (
                              <a 
                                href={organization.websiteURL.startsWith('http') ? organization.websiteURL : `https://${organization.websiteURL}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800 flex items-center"
                              >
                                {organization.websiteURL}
                                <FiExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            ) : "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="mt-1">{organization.address || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Verification Document</h3>
                    {organization.documentURL ? (
                      <div className="mt-2">
                        <a 
                          href={organization.documentURL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FiExternalLink className="mr-2 -ml-1 h-5 w-5 text-gray-500" />
                          View Document
                        </a>
                      </div>
                    ) : (
                      <p className="text-gray-500">No document uploaded</p>
                    )}
                  </div>
                </div>
              ) : (
                // Edit mode
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                        Organization Name*
                      </label>
                      <input
                        type="text"
                        name="organizationName"
                        id="organizationName"
                        required
                        value={formData.organizationName || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                        Registration Number*
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        id="registrationNumber"
                        required
                        value={formData.registrationNumber || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                        Contact Person*
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        id="contactPerson"
                        required
                        value={formData.contactPerson || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                        Contact Email*
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        id="contactEmail"
                        required
                        value={formData.contactEmail || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                        Contact Number*
                      </label>
                      <input
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        required
                        value={formData.contactNumber || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="websiteURL" className="block text-sm font-medium text-gray-700">
                        Website URL
                      </label>
                      <input
                        type="text"
                        name="websiteURL"
                        id="websiteURL"
                        value={formData.websiteURL || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., www.example.org"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address*
                      </label>
                      <textarea
                        name="address"
                        id="address"
                        required
                        rows={3}
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                        Verification Document* (Registration Certificate)
                      </label>
                      <div className="mt-1 flex items-center">
                        <label
                          htmlFor="document-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                        >
                          <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <span>Upload a file</span>
                                <input
                                  id="document-upload"
                                  name="document-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                              </div>
                              <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                            </div>
                          </div>
                        </label>
                      </div>
                      {documentFile && (
                        <p className="mt-2 text-sm text-gray-500">
                          Selected file: {documentFile.name}
                        </p>
                      )}
                      {!documentFile && organization.documentURL && (
                        <p className="mt-2 text-sm text-gray-500">
                          Current document already uploaded. Upload a new one to replace it.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-5">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FiSave className="mr-1.5" /> Save Changes
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrganizationProfile;
=======
import React from 'react'

function OrganizationProfile() {
  return (
    <div>
      Organization Profile
    </div>
  )
}

export default OrganizationProfile
>>>>>>> 9092c4742d5dd3f83cd7941e330ddf8e2ac41ab5
