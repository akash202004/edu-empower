import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiHeart, FiBriefcase } from "react-icons/fi";

const RoleSelection = () => {
  const navigate = useNavigate();
  
  const handleRoleSelect = (role) => {
    if (role === "STUDENT") {
      // For students, navigate directly to student page without authentication
      navigate("/student", { state: { role: "STUDENT" } });
    } else if (role === "DONOR") {
      // For donors, navigate to donation page
      navigate("/donation", { state: { role: "DONOR" } });
    } else if (role === "ORGANIZATION") {
      // For organizations, navigate to organization page
      navigate("/organization", { state: { role: "ORGANIZATION" } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Choose your role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select how you want to use Edu-Empower
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button 
            onClick={() => handleRoleSelect("STUDENT")}
            className="w-full p-4 border rounded-lg flex items-center hover:bg-indigo-50 hover:border-indigo-500 transition-all"
          >
            <FiUser className="h-8 w-8 text-indigo-600 mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-medium">Student</h3>
              <p className="text-sm text-gray-500">Apply for scholarships and educational opportunities</p>
            </div>
          </button>
          
          <button 
            onClick={() => handleRoleSelect("DONOR")}
            className="w-full p-4 border rounded-lg flex items-center hover:bg-indigo-50 hover:border-indigo-500 transition-all"
          >
            <FiHeart className="h-8 w-8 text-indigo-600 mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-medium">Donor</h3>
              <p className="text-sm text-gray-500">Support students through donations</p>
            </div>
          </button>
          
          <button 
            onClick={() => handleRoleSelect("ORGANIZATION")}
            className="w-full p-4 border rounded-lg flex items-center hover:bg-indigo-50 hover:border-indigo-500 transition-all"
          >
            <FiBriefcase className="h-8 w-8 text-indigo-600 mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-medium">Organization</h3>
              <p className="text-sm text-gray-500">Create and manage scholarship programs</p>
            </div>
          </button>
        </div>
        
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;