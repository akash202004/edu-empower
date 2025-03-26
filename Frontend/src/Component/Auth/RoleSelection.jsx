import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiHeart, FiBriefcase } from "react-icons/fi";

const RoleSelection = () => {
  const navigate = useNavigate();
  
  const handleRoleSelect = (role) => {
    if (role === "STUDENT") {
      // Redirect directly to the Student.jsx component without authentication
      navigate("/student", { state: { role: "STUDENT" } });
    } else {
      navigate("/auth/login", { state: { role } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Select your role
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose how you want to use Edu-Empower
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleRoleSelect("STUDENT")}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FiUser className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
            </span>
            I am a Student
          </button>
          
          <button
            onClick={() => handleRoleSelect("DONOR")}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FiHeart className="h-5 w-5 text-green-300 group-hover:text-green-200" />
            </span>
            I am a Donor
          </button>
          
          <button
            onClick={() => handleRoleSelect("ORGANIZATION")}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FiBriefcase className="h-5 w-5 text-purple-300 group-hover:text-purple-200" />
            </span>
            I am an Organization
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;