import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiArrowLeft, FiArrowRight, FiAward, FiInfo, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const ScholarshipApplicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  
  // Get scholarship info from location state
  const { scholarshipId, scholarshipTitle } = location.state || {};
  
  // Form state
  const [formData, setFormData] = useState({
    whyNeedScholarship: "",
    whyPerfectFit: "",
    otherScholarships: false
  });
  
  const [charCount, setCharCount] = useState({
    whyNeedScholarship: 0,
    whyPerfectFit: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const MAX_CHARS = 2500;
  
  // Redirect if not signed in or missing scholarship data
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/auth/login", { 
        state: { 
          returnUrl: location.pathname,
          scholarshipData: { scholarshipId, scholarshipTitle }
        } 
      });
      return;
    }
    
    if (!scholarshipId) {
      const storedData = sessionStorage.getItem('scholarshipApplicationData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.scholarshipId) {
          return;
        }
      }
      navigate("/scholarship");
    }
  }, [isSignedIn, scholarshipId, navigate, location.pathname]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (value.length <= MAX_CHARS) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (name === 'whyNeedScholarship' || name === 'whyPerfectFit') {
        setCharCount(prev => ({
          ...prev,
          [name]: value.length
        }));
      }
    }
  };
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (formData.whyNeedScholarship.trim().length < 100) {
      setError("Please provide a detailed explanation of why you need this scholarship (minimum 100 characters).");
      return;
    }
    
    if (formData.whyPerfectFit.trim().length < 100) {
      setError("Please explain why you're a perfect fit for this scholarship (minimum 100 characters).");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Combine answers for the backend
      const scholarshipReason = `
        Why I Need This Scholarship:
        ${formData.whyNeedScholarship.trim()}
        
        Why I'm a Perfect Fit:
        ${formData.whyPerfectFit.trim()}
      `.trim();
      
      // Prepare request data according to Prisma schema
      const requestData = {
        studentId: user.id,
        scholarshipId,
        scholarshipReason,
        otherScholarships: formData.otherScholarships,
        // Status will be set to PENDING by default in the backend
      };
      
      // Make POST request to backend API
      const response = await axios.post("http://localhost:3000/api/applications", requestData, {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${userToken}`
        },
        validateStatus: (status) => status < 500
      });
      
      // Handle response statuses
      if (response.status === 201) {
        setSuccess(true);
        
        setTimeout(() => {
          navigate("/scholarship/application-success", { 
            state: { 
              fullName: user.fullName,
              email: user.primaryEmailAddress?.emailAddress,
              scholarshipTitle,
              applicationId: response.data.id, // Using 'id' from Prisma schema
              submissionDate: new Date().toLocaleDateString()
            }
          });
        }, 1500);
      } else if (response.status === 409) {
        setError("You have already applied for this scholarship.");
      } else if (response.status === 400) {
        const errorMessage = response.data.errors 
          ? Object.values(response.data.errors).join(', ')
          : "Please check your application details and try again.";
        setError(errorMessage);
      } else {
        throw new Error(response.data.message || "Application submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          setError("Please log in to submit an application.");
        } else if (error.response.status === 403) {
          setError("You don't have permission to perform this action.");
        } else if (error.response.status === 404) {
          setError("The scholarship could not be found.");
        } else if (error.response.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while processing your application.");
        }
      } else if (error.request) {
        setError("Network error. Please check your internet connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleBack = () => {
    sessionStorage.setItem('scholarshipApplicationData', JSON.stringify({
      ...formData,
      scholarshipId,
      scholarshipTitle
    }));
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Scholarship Application
          </motion.h1>
          <motion.p 
            className="mt-2 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {scholarshipTitle || "Complete your application"}
          </motion.p>
        </div>
        
        {/* Success message */}
        {success && (
          <motion.div 
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiCheckCircle className="h-5 w-5 mr-2" />
            <span>Application submitted successfully! Redirecting...</span>
          </motion.div>
        )}
        
        {/* Error message */}
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start">
              <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium">Application Error</h4>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="bg-white shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center">
              <FiAward className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">Tell Us About Yourself</h2>
            </div>
            <p className="mt-1 text-indigo-100">
              Your answers help us understand why you're the right candidate for this scholarship.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Question 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why do you need this scholarship? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="whyNeedScholarship"
                  value={formData.whyNeedScholarship}
                  onChange={handleChange}
                  rows={6}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:opacity-70"
                  placeholder="Explain your financial situation, challenges, and how this scholarship would help you..."
                  disabled={isSubmitting || success}
                  required
                  minLength={100}
                />
                <div className="mt-1 text-sm text-gray-500 flex justify-between">
                  <span>Minimum 100 characters</span>
                  <span className={charCount.whyNeedScholarship > MAX_CHARS * 0.9 ? "text-red-500" : ""}>
                    {charCount.whyNeedScholarship}/{MAX_CHARS}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Question 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why are you a perfect fit for this scholarship? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="whyPerfectFit"
                  value={formData.whyPerfectFit}
                  onChange={handleChange}
                  rows={6}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:opacity-70"
                  placeholder="Describe your qualifications, achievements, and how you plan to use this scholarship..."
                  disabled={isSubmitting || success}
                  required
                  minLength={100}
                />
                <div className="mt-1 text-sm text-gray-500 flex justify-between">
                  <span>Minimum 100 characters</span>
                  <span className={charCount.whyPerfectFit > MAX_CHARS * 0.9 ? "text-red-500" : ""}>
                    {charCount.whyPerfectFit}/{MAX_CHARS}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Other Scholarships Question */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="otherScholarships"
                  name="otherScholarships"
                  type="checkbox"
                  checked={formData.otherScholarships}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  disabled={isSubmitting || success}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="otherScholarships" className="font-medium text-gray-700">
                  Are you currently receiving or applying for other scholarships?
                </label>
                <p className="text-gray-500">
                  This information helps us understand your full financial aid situation.
                </p>
              </div>
            </div>
            
            {/* Tips */}
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <div className="flex items-start">
                <FiInfo className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                <div className="text-sm text-blue-700">
                  <h4 className="font-medium">Tips for a strong application:</h4>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>Be specific about your financial situation and needs</li>
                    <li>Highlight relevant achievements and experiences</li>
                    <li>Explain how this scholarship aligns with your career goals</li>
                    <li>Describe how you'll use the funds to advance your education</li>
                    <li>Be honest about other scholarship applications</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Form actions */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={isSubmitting || success}
              >
                <FiArrowLeft className="mr-2 -ml-1 h-5 w-5" />
                Back
              </button>
              
              <button
                type="submit"
                className={`inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  isSubmitting || success ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting || success}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Your application will be reviewed by our scholarship committee. You'll be notified via email.
          </p>
          <p className="mt-1">
            Need help? Contact <a href="mailto:scholarships@example.com" className="text-indigo-600 hover:underline">scholarships@example.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplicationForm;