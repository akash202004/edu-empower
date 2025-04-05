import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiUser} from "react-icons/fi";
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

};

export default StudentProfile;