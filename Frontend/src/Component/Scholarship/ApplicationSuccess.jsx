import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMail, FiArrowLeft, FiHome } from "react-icons/fi";

const ApplicationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get all form data from location state, with fallbacks
  const { 
    fullName = "Student", 
    email = "your email",
    contactNumber = "",
    dateOfBirth = "",
    nationality = "",
    // Add other fields as needed
  } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-8 px-8 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-white">
            <FiCheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white">Application Submitted!</h1>
        </div>
        
        <div className="p-8 text-center">
          <div className="space-y-6">
            <p className="text-xl text-gray-800">
              Thank you, <span className="font-semibold">{fullName}</span>!
            </p>
            
            <p className="text-gray-600">
              Your scholarship application has been successfully submitted. Our donors will review your profile, and you'll receive an update via email once the review process is complete.
            </p>
            
            <div className="flex items-center justify-center text-gray-600 bg-gray-50 rounded-lg p-4">
              <FiMail className="text-indigo-600 mr-2" />
              <span>Notification will be sent to: <span className="font-medium">{email}</span></span>
            </div>
            
            {contactNumber && (
              <div className="text-gray-600 text-sm">
                We may contact you at: {contactNumber}
              </div>
            )}
            
            <p className="text-gray-500 text-sm">
              Please ensure your email is accessible and check your spam folder if you don't receive any communication within 2 weeks.
            </p>
            
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate("/scholarship")}
                className="flex items-center justify-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Scholarships
              </button>
              
              <button 
                onClick={() => navigate("/")}
                className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiHome className="mr-2" />
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;