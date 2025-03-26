import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiUser, FiCalendar, FiPhone, FiMail, FiHome, FiEdit, FiLock } from "react-icons/fi";
import axios from "axios";

// Use environment variable for API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StudentProfile = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSignedIn || !user) {
      navigate("/auth/login");
      return;
    }

    // Fetch profile data from backend
    const fetchProfileData = async () => {
      try {
        console.log("Fetching profile data for user:", user.id);
        console.log("API URL being called:", `${API_BASE_URL}/students/${user.id}`);
        
        const response = await axios.get(`${API_BASE_URL}/students/${user.id}`);
        console.log("API Response:", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: response.data
        });
        
        if (response.data) {
          console.log("Profile data received:", JSON.stringify(response.data, null, 2));
          setProfileData(response.data);
        } else {
          console.log("No profile data found in response");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        console.error("Error details:", {
          message: error.message,
          code: error.code,
          stack: error.stack
        });
        
        if (error.response) {
          console.error("Error response status:", error.response.status);
          console.error("Error response data:", error.response.data);
          
          if (error.response.status === 404) {
            console.log("Profile not found for user, redirecting to create profile");
            navigate("/student/details");
          } else {
            setError(`Failed to load profile data: ${error.response.data.message || error.message}`);
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          setError("No response received from server. Please check if the backend is running.");
        } else {
          setError(`Error: ${error.message}`);
        }
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [isSignedIn, navigate, user]);

  const handleEditProfile = () => {
    navigate("/student/details");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <div className="text-center">
            <FiUser className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Profile Not Found</h2>
            <p className="mt-1 text-gray-500">You haven't completed your profile yet.</p>
            <button
              onClick={handleEditProfile}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Complete Your Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format date of birth if it exists
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="bg-indigo-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-indigo-600">
                <FiUser className="h-10 w-10" />
              </div>
              <div className="ml-4 text-white">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
                  <FiLock className="ml-2 h-4 w-4 text-indigo-200" title="Cannot be edited" />
                </div>
                <div className="flex items-center">
                  <p className="text-indigo-200">{profileData.email}</p>
                  <FiLock className="ml-2 h-4 w-4 text-indigo-200" title="Cannot be edited" />
                </div>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 flex items-center"
            >
              <FiEdit className="mr-2" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Add a note about name and email */}
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <div className="flex">
              <FiLock className="h-5 w-5 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Your name and email are managed by your account settings and cannot be changed here.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDate(profileData.dateOfBirth)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiPhone className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">{profileData.contactNumber || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiHome className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{profileData.address || "Not provided"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{profileData.gender || "Not provided"}</p>
                </div>
              </div>
            </div>

            {/* Family Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Family Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Father's Name</p>
                  <p className="font-medium">{profileData.fatherName || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mother's Name</p>
                  <p className="font-medium">{profileData.motherName || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guardian's Name</p>
                  <p className="font-medium">{profileData.guardianName || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guardian's Contact</p>
                  <p className="font-medium">{profileData.guardianContact || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Career Goals</h2>
            <p className="text-gray-700">{profileData.careerGoals || "No information provided."}</p>
          </div>

          {/* Documents Section */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Documents</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.domicileCert ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Domicile Certificate</span>
                {profileData.domicileCert && (
                  <a href={profileData.domicileCert} target="_blank" rel="noopener noreferrer" className="ml-auto text-indigo-600 hover:text-indigo-800">
                    View
                  </a>
                )}
              </div>
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.incomeCert ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Income Certificate</span>
                {profileData.incomeCert && (
                  <a href={profileData.incomeCert} target="_blank" rel="noopener noreferrer" className="ml-auto text-indigo-600 hover:text-indigo-800">
                    View
                  </a>
                )}
              </div>
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.tenthResult ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>10th Marksheet</span>
                {profileData.tenthResult && (
                  <a href={profileData.tenthResult} target="_blank" rel="noopener noreferrer" className="ml-auto text-indigo-600 hover:text-indigo-800">
                    View
                  </a>
                )}
              </div>
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.twelfthResult ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>12th Marksheet</span>
                {profileData.twelfthResult && (
                  <a href={profileData.twelfthResult} target="_blank" rel="noopener noreferrer" className="ml-auto text-indigo-600 hover:text-indigo-800">
                    View
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;