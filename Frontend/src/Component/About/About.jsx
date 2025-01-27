import React from 'react';
import handshake from '../../assets/handshake.png';  // Handshake PNG image
import microloanImage from '../../assets/bulb.png'; // Microloan PNG image (replace with your own image path)
import mentorshipImage from '../../assets/group.png'; // Mentorship PNG image (replace with your own image path)

const EducationFunding = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-lg p-12 mb-8 relative">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-3">Empowering Student Control</h1>
          <p className="text-gray-600 mb-6">
            Empower students to raise funds for education. Find scholarships based on your needs.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
            Get Started
          </button>
        </div>
        <div className="absolute top-8 right-8">
          {/* Custom hand icon - simplified version */}
          <img 
            src={handshake} 
            alt="Handshake Icon" 
            className="max-w-full h-auto w-24 md:w-32 lg:w-40 transform shadow-xl" 
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Microloans & Grants Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2">Microloans & Grants</h2>
          <p className="text-gray-600 mb-12">Flexible Loans & Grants Support</p>
          <div className="bg-white shadow-lg rounded-lg p-4 inline-block">
            <img src={microloanImage} alt="Microloans Icon" className="w-8 h-8" />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Mentorship & Financial
          </p>
        </div>

        {/* Mentorship & Financial Tools Card */}
        <div className="bg-gray-100 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2">Mentorship & Financial Tools</h2>
          <p className="text-gray-600 mb-12">Guidance & Financial Literacy Support</p>
          <div className="bg-white shadow-lg rounded-lg p-4 inline-block">
            <img src={mentorshipImage} alt="Mentorship Icon" className="w-8 h-8" />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Community Support & 
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationFunding;
