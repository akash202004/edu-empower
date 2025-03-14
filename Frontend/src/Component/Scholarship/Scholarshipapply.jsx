import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Scholarshipapply() {
  const navigate = useNavigate();
  const location = useLocation();
  const scholarship = location.state?.scholarship; // Get scholarship data

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-3xl mb-6 md:text-5xl font-bold text-gray-900">
        {scholarship ? scholarship.title : "Tell us more about yourself"}
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        {scholarship
          ? scholarship.description
          : "We'll create a polished profile to include in every application you submit, so you'll always look great to scholarship and grant panels."}
      </p>

      {/* Get Started Button */}
      <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
      onClick={() => navigate('/scholarship/apply/form')}>
        Get Started
      </button>

      {/* Image Placeholder */}
      <div className="mt-10">
        <img
          src="/profile-preview.png"
          alt="Profile preview"
          className="w-full max-w-lg mx-auto shadow-lg rounded-lg"
        />
      </div>
    </div>
  );
}

export default Scholarshipapply;
