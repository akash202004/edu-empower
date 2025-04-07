import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiUser, FiCalendar, FiPhone, FiMail, FiHome, FiEdit, FiLock } from "react-icons/fi";
import axios from "axios";
import { studentService } from "../../api/studentService";

// Use environment variable for API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StudentProfile = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState({
    name: "",
    dob: "",
    contactNumber: "",
    address: "",
    email: "",
    nationality: "",
    gender: "",
    motherName: "",
    fatherName: "",
    guardianName: "",
    guardianContact: "",
    guardianAddress: "",
    aboutMe: "",
    documents: {
      domicileCertificate: null,
      incomeCertificate: null,
      marksheet10: null,
      marksheet12: null,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {  // Make the function async
      if (!isSignedIn || !user) {
        navigate("/auth/login");
        return;
      }
      
      try {
        setLoading(true);
        const response = await studentService.getExistingStudentDetails(user.id); // Add await
        
        if (response) {  // Check response directly
          console.log("Profile data received:", response);
          setProfileData({
            name: response.fullName || "",
            email: response.email || "",
            dob: response.dateOfBirth || "",
            contactNumber: response.contactNumber || "",
            address: response.address || "",
            gender: response.gender || "",
            nationality: response.nationality || "",
            motherName: response.motherName || "",
            fatherName: response.fatherName || "",
            guardianName: response.guardianName || "",
            guardianContact: response.guardianContact || "",
            guardianAddress: response.guardianAddress || "",
            aboutMe: response.aboutMe || "",
            documents: {
              domicileCertificate: response.domicileCert || null,
              incomeCertificate: response.incomeCert || null,
              marksheet10: response.tenthResult || null,
              marksheet12: response.twelfthResult || null,
            }
          });
        } else {
          console.log("No profile data found");
          navigate("/student/details");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        if (error.response?.status === 404) {
          navigate("/student/details");
        } else {
          setError(error.message || "Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchdata();
  }, [isSignedIn, navigate, user]);

  const handleEditProfile = () => {
    navigate("/student/details");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Try Again
          </button>
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
        <div className="bg-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-indigo-500 p-3 rounded-full">
                <FiUser className="h-10 w-10" />
              </div>
              <div className="ml-4 text-white">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
                  <FiLock className="ml-2 h-4 w-4 text-indigo-200" title="Cannot be edited" />
                </div>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors"
            >
              <FiEdit className="mr-2" />
              Edit Profile
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
              <div className="space-y-4">
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
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{profileData.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiMail className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Alternate Email</p>
                    <p className="font-medium">{profileData.alternateEmail || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Address Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiHome className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {profileData.address || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiHome className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium">{profileData.city || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiHome className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium">{profileData.state || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiHome className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Postal Code</p>
                    <p className="font-medium">{profileData.postalCode || "Not provided"}</p>
                  </div>
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