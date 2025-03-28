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
    scholarshipTitle = "the scholarship"
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
              Your application for <span className="font-medium">{scholarshipTitle}</span> has been successfully submitted. We'll review your application and get back to you soon.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center text-gray-700 mb-2">
                <FiMail className="mr-2 h-5 w-5 text-indigo-600" />
                <span>A confirmation email has been sent to:</span>
              </div>
              <p className="font-medium text-gray-900">{email}</p>
            </div>
            
            <div className="pt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
              <button
                onClick={() => navigate("/scholarship")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiArrowLeft className="mr-2 -ml-1 h-5 w-5" />
                Browse More Scholarships
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiHome className="mr-2 -ml-1 h-5 w-5" />
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;