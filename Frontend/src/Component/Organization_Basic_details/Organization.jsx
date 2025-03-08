import React, { useState } from "react";

const Organization = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    registrationNumber: "",
    contactPerson: "",
    contactEmail: "",
    website: "",
    missionStatement: "",
    servicesOffered: ""
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-25">
      <div className="shadow-xl rounded-lg p-6 md:p-10 max-w-3xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Organization Registration Form</h1>
          <p className="text-gray-600">Please fill out all the required information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Information Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Organization Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">Organization Name*</label>
                <input 
                  type="text" 
                  id="organizationName"
                  name="organizationName" 
                  placeholder="Enter organization name" 
                  value={formData.organizationName} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">Registration Number*</label>
                <input 
                  type="text" 
                  id="registrationNumber"
                  name="registrationNumber" 
                  placeholder="Enter registration number" 
                  value={formData.registrationNumber} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">Contact Person*</label>
                <input 
                  type="text" 
                  id="contactPerson"
                  name="contactPerson" 
                  placeholder="Enter contact person's name" 
                  value={formData.contactPerson} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email*</label>
                <input 
                  type="email" 
                  id="contactEmail"
                  name="contactEmail" 
                  placeholder="Enter contact email" 
                  value={formData.contactEmail} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Website Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">Additional Details</h2>
            <div className="mb-4">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input 
                type="url" 
                id="website"
                name="website" 
                placeholder="Enter website URL" 
                value={formData.website} 
                onChange={handleChange} 
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="missionStatement" className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
              <textarea 
                id="missionStatement"
                name="missionStatement" 
                placeholder="Describe your organization's mission" 
                value={formData.missionStatement} 
                onChange={handleChange} 
                rows="3"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out font-medium"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Organization;
