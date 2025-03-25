import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiUpload, FiUser, FiCalendar, FiPhone, FiMail, FiHome } from "react-icons/fi";

const StudentDetailsForm = () => {
  // Near the top of your component:
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  
  // Add this effect to redirect unauthenticated users
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/auth/login");
    }
  }, [isSignedIn, navigate]);
  
  // Check if we have saved data in localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('studentProfileData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Merge saved data with current user data from Clerk
        setFormData({
          ...parsedData,
          name: user?.fullName || parsedData.name,
          email: user?.primaryEmailAddress?.emailAddress || parsedData.email,
        });
      } catch (error) {
        console.error("Error parsing saved profile data:", error);
      }
    }
  }, [user]);
  
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    dob: "",
    contactNumber: "",
    address: "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    gender: "",
    motherName: "",
    fatherName: "",
    guardianName: "",
    guardianContact: "",
    guardianAddress: "",
    guardianEmail: "",
    aboutSelf: "",
    documents: {
      domicileCertificate: null,
      incomeCertificate: null,
      marksheet10: null,
      marksheet12: null,
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [name]: files[0]
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    
    // Check required documents
    const requiredDocs = [
      "domicileCertificate", 
      "incomeCertificate", 
      "marksheet10", 
      "marksheet12"
    ];
    
    requiredDocs.forEach(doc => {
      if (!formData.documents[doc]) {
        newErrors[doc] = `${doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save the form data to localStorage
      const dataToSave = {
        ...formData,
        // Remove actual file objects as they can't be stored in localStorage
        documents: {
          domicileCertificate: formData.documents.domicileCertificate ? true : null,
          incomeCertificate: formData.documents.incomeCertificate ? true : null,
          marksheet10: formData.documents.marksheet10 ? true : null,
          marksheet12: formData.documents.marksheet12 ? true : null,
        }
      };
      
      localStorage.setItem('studentProfileData', JSON.stringify(dataToSave));
      console.log("Form submitted and saved to localStorage:", dataToSave);
      
      // Navigate to the scholarship page
      navigate("/scholarship");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Student Details Form</h1>
        <p className="text-gray-600 text-center mb-8">
          Please fill in your details to complete your profile
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`pl-10 w-full p-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={`pl-10 w-full p-2 border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your contact number"
                  />
                </div>
                {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your email address"
                    readOnly={!!user?.primaryEmailAddress?.emailAddress}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiHome className="text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={`pl-10 w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Your complete address"
                  ></textarea>
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Family Information Section */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Family Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Father's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mother's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian's Name
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Guardian's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian's Contact
                </label>
                <input
                  type="tel"
                  name="guardianContact"
                  value={formData.guardianContact}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Guardian's contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian's Email
                </label>
                <input
                  type="email"
                  name="guardianEmail"
                  value={formData.guardianEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Guardian's email"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian's Address
                </label>
                <textarea
                  name="guardianAddress"
                  value={formData.guardianAddress}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Guardian's complete address"
                ></textarea>
              </div>
            </div>
          </div>

          {/* About Yourself Section */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">About Yourself</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tell us about yourself
              </label>
              <textarea
                name="aboutSelf"
                value={formData.aboutSelf}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Share a bit about yourself, your interests, goals, and aspirations..."
              ></textarea>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Document Upload</h2>
            <p className="text-sm text-gray-600 mb-4">Please upload the following documents in PDF format:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domicile Certificate <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full p-2 border ${errors.domicileCertificate ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md cursor-pointer hover:bg-gray-50`}>
                    <FiUpload className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formData.documents.domicileCertificate ? formData.documents.domicileCertificate.name : "Upload PDF"}
                    </span>
                    <input
                      type="file"
                      name="domicileCertificate"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.domicileCertificate && <p className="text-red-500 text-xs mt-1">{errors.domicileCertificate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Income Certificate <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full p-2 border ${errors.incomeCertificate ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md cursor-pointer hover:bg-gray-50`}>
                    <FiUpload className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formData.documents.incomeCertificate ? formData.documents.incomeCertificate.name : "Upload PDF"}
                    </span>
                    <input
                      type="file"
                      name="incomeCertificate"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.incomeCertificate && <p className="text-red-500 text-xs mt-1">{errors.incomeCertificate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  10th Marksheet <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full p-2 border ${errors.marksheet10 ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md cursor-pointer hover:bg-gray-50`}>
                    <FiUpload className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formData.documents.marksheet10 ? formData.documents.marksheet10.name : "Upload PDF"}
                    </span>
                    <input
                      type="file"
                      name="marksheet10"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.marksheet10 && <p className="text-red-500 text-xs mt-1">{errors.marksheet10}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  12th Marksheet <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <label className={`flex items-center justify-center w-full p-2 border ${errors.marksheet12 ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md cursor-pointer hover:bg-gray-50`}>
                    <FiUpload className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formData.documents.marksheet12 ? formData.documents.marksheet12.name : "Upload PDF"}
                    </span>
                    <input
                      type="file"
                      name="marksheet12"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.marksheet12 && <p className="text-red-500 text-xs mt-1">{errors.marksheet12}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDetailsForm;