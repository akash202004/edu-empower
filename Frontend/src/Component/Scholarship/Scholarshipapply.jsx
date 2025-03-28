import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { FiArrowRight, FiCalendar, FiDollarSign, FiBookOpen, FiAward, FiUser, FiInfo, FiList, FiLogOut } from "react-icons/fi";

const Scholarshipapply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const scholarshipId = location.state?.scholarshipId;
  
  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      if (!scholarshipId) {
        setError("No scholarship selected. Please go back and select a scholarship.");
        setLoading(false);
        return;
      }
      
      try {
        // Fetch from the JSON file
        const response = await fetch("/data/scholarship.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const scholarships = await response.json();
        const selectedScholarship = scholarships.find(s => s.id === scholarshipId);
        
        if (selectedScholarship) {
          setScholarship(selectedScholarship);
        } else {
          setError("Scholarship not found. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching scholarship details:", error);
        setError("Failed to load scholarship details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchScholarshipDetails();
  }, [scholarshipId]);
  
  const handleProceed = () => {
    console.log("Proceeding to application form with ID:", scholarshipId);
    console.log("Scholarship title:", scholarship?.title);
    
    // Check if scholarshipId is defined
    if (!scholarshipId) {
      console.error("Scholarship ID is undefined. Cannot proceed to application form.");
      return;
    }
    
    // Redirect directly to the ScholarshipApplicationForm page
    navigate("/ScholarshipApplicationForm", { 
      state: { 
        scholarshipId: scholarshipId,
        scholarshipTitle: scholarship?.title
      }
    });
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading scholarship details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <FiInfo className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{error}</h2>
          <button
            onClick={() => navigate("/scholarship")}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Scholarships
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Scholarship Application</h1>
                <p className="text-indigo-100 mt-2">
                  You're applying for the following scholarship
                </p>
              </div>
              {isSignedIn && (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{scholarship.title}</h2>
              <p className="text-gray-600 mb-6">{scholarship.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiUser className="mr-2 h-5 w-5 text-indigo-600" />
                    <span className="font-medium">Funded By</span>
                  </div>
                  <p>{scholarship.fundedBy}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiDollarSign className="mr-2 h-5 w-5 text-green-600" />
                    <span className="font-medium">Amount</span>
                  </div>
                  <p>{scholarship.amount}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiBookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="font-medium">Education Level</span>
                  </div>
                  <p>{scholarship.educationLevel}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiCalendar className="mr-2 h-5 w-5 text-red-600" />
                    <span className="font-medium">Application Deadline</span>
                  </div>
                  <p>{scholarship.deadline}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiAward className="mr-2 h-5 w-5 text-purple-600" />
                    <span className="font-medium">Scholarships Awarded</span>
                  </div>
                  <p>{scholarship.scholarshipsAwarded}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FiInfo className="mr-2 h-5 w-5 text-orange-600" />
                    <span className="font-medium">Eligibility</span>
                  </div>
                  <p>{scholarship.eligibility}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <div className="flex items-center text-gray-700 mb-2">
                  <FiList className="mr-2 h-5 w-5 text-indigo-600" />
                  <span className="font-medium">Required Documents</span>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {scholarship.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                  <li className="text-gray-600">Domicile Certificate</li>
                  <li className="text-gray-600">Income Certificate</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiInfo className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Application Information
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Please ensure you have all required documents ready before proceeding with your application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/scholarship")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Scholarships
              </button>
              
              <button
                onClick={handleProceed}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Proceed to Application
                <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarshipapply;
