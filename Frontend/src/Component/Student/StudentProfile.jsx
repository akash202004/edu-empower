import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiUser, FiCalendar, FiPhone, FiMail, FiHome, FiEdit } from "react-icons/fi";

const StudentProfile = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/auth/login");
      return;
    }

    // Load profile data from localStorage
    const savedData = localStorage.getItem('studentProfileData');
    if (savedData) {
      try {
        setProfileData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing saved profile data:", error);
      }
    }
    setLoading(false);
  }, [isSignedIn, navigate]);

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
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-indigo-200">{profileData.email}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{profileData.dob || "Not provided"}</p>
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
            <h2 className="text-lg font-semibold text-gray-700 mb-2">About Me</h2>
            <p className="text-gray-700">{profileData.aboutSelf || "No information provided."}</p>
          </div>

          {/* Documents Section */}
          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Documents</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.documents.domicileCertificate ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Domicile Certificate</span>
              </div>
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.documents.incomeCertificate ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Income Certificate</span>
              </div>
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.documents.marksheet10 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>10th Marksheet</span>
              </div>
              <div className="p-3 border rounded-md flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${profileData.documents.marksheet12 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>12th Marksheet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;