import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiUpload, FiUser, FiCalendar, FiPhone, FiMail, FiHome } from "react-icons/fi";
import { createClient } from '@supabase/supabase-js';
import { ErrorBoundary } from 'react-error-boundary';
import studentService from '../../api/studentService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const StudentDetailsForm = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectAfterSubmit = location.state?.redirectAfterSubmit || "/scholarship";
  
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contactNumber: "",
    address: "",
    email: "",
    gender: "",
    motherName: "",
    fatherName: "",
    guardianName: "",
    guardianContact: "",
    guardianAddress: "",
    guardianEmail: "",
    careerGoals: "",
    documents: {
      domicileCertificate: null,
      incomeCertificate: null,
      marksheet10: null,
      marksheet12: null,
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || ""
      }));
    }
  }, [user]);

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn) navigate("/auth/login");
  }, [isSignedIn, navigate]);

  // Fetch student profile if exists
  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (!isSignedIn || !user) return;
      
      try {
        await studentService.registerOrUpdateUser({
          userId: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          role: "STUDENT"
        });
        
        const studentData = await studentService.getStudentProfile(user.id);
        if (studentData) {
          setFormData(prev => ({
            ...prev,
            userId: studentData.userId,
            name: studentData.fullName || user.fullName,
            email: studentData.email || user.primaryEmailAddress?.emailAddress,
            dob: studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toISOString().split('T')[0] : "",
            contactNumber: studentData.contactNumber || "",
            address: studentData.address || "",
            gender: studentData.gender || "",
            motherName: studentData.motherName || "",
            fatherName: studentData.fatherName || "",
            guardianName: studentData.guardianName || "",
            guardianContact: studentData.guardianContact || "",
            guardianAddress: studentData.guardianAddress || "",
            guardianEmail: studentData.guardianEmail || "",
            careerGoals: studentData.careerGoals || "",
          }));
        }
      } catch (error) {
        console.log("No existing profile found or error fetching:", error);
      }
    };
    
    fetchStudentProfile();
  }, [user, isSignedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'email') return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [name]: files[0] }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFileToSupabase = async (file, fileName) => {
    if (!file) return null;
    
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      setApiError(`File ${file.name} is too large (${fileSizeInMB.toFixed(2)}MB). Maximum size is 5MB.`);
      return null;
    }
    
    if (!file.type.includes('pdf')) {
      setApiError(`File ${file.name} is not a PDF. Only PDF files are allowed.`);
      return null;
    }
    
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${fileName}.${fileExt}`;
    
    try {
      const { error } = await supabase.storage
        .from('student-documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'application/pdf'
        });
      
      if (error) {
        setApiError(`Failed to upload ${file.name}: ${error.message}`);
        return null;
      }
      
      const { data: urlData } = supabase.storage
        .from('student-documents')
        .getPublicUrl(filePath);
      
      return urlData.publicUrl;
    } catch (error) {
      setApiError(`Failed to upload ${file.name}: ${error.message || "Unknown error"}`);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      // Upload documents
      const documentUrls = {};
      const uploadPromises = [];
      
      const documentTypes = [
        { key: 'domicileCertificate', name: 'domicile-certificate' },
        { key: 'incomeCertificate', name: 'income-certificate' },
        { key: 'marksheet10', name: 'marksheet-10' },
        { key: 'marksheet12', name: 'marksheet-12' }
      ];
      
      documentTypes.forEach(({ key, name }) => {
        if (formData.documents[key]) {
          uploadPromises.push(
            uploadFileToSupabase(formData.documents[key], name)
              .then(url => { documentUrls[key] = url; })
              .catch(err => console.error(`Error uploading ${key}:`, err))
          )
        }
      });
      
      await Promise.all(uploadPromises);
      
      // Prepare and submit student data
      const studentData = {
        userId: user.id,
        fullName: formData.name,
        email: formData.email,
        dateOfBirth: formData.dob,
        contactNumber: formData.contactNumber,
        address: formData.address,
        gender: formData.gender,
        motherName: formData.motherName || "",
        fatherName: formData.fatherName || "",
        guardianName: formData.guardianName || "",
        guardianContact: formData.guardianContact || "",
        guardianAddress: formData.guardianAddress || "",
        guardianEmail: formData.guardianEmail || "",
        careerGoals: formData.careerGoals || "",
        nationality: "Indian",
        domicileCert: documentUrls.domicileCertificate || "",
        incomeCert: documentUrls.incomeCertificate || "",
        tenthResult: documentUrls.marksheet10 || "",
        twelfthResult: documentUrls.marksheet12 || ""
      };
      
      await studentService.saveStudentProfile(studentData);
      navigate(redirectAfterSubmit);
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error.response?.data?.errors) {
        setApiError(`Validation failed: ${Object.values(error.response.data.errors).flat().join(', ')}`);
      } else if (error.request) {
        setApiError("No response from server. Please check if backend is running.");
      } else {
        setApiError(error.message || "Failed to save profile. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Student Details Form</h1>
          <p className="text-gray-600 text-center mb-8">
            Please fill in your details to complete your profile
          </p>

          {apiError && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="mr-2" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-200"
                    readOnly
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <div className="flex items-center">
                    <FiPhone className="text-gray-400 mr-2" />
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="+91XXXXXXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center">
                    <FiMail className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-200"
                      readOnly
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="flex items-center">
                    <FiHome className="text-gray-400 mr-2" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                  </div>
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Family Information Section */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="mr-2" /> Family Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Contact</label>
                  <input
                    type="tel"
                    name="guardianContact"
                    value={formData.guardianContact}
                    onChange={handleChange}
                    placeholder="+91XXXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiUpload className="mr-2" /> Document Upload
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'marksheet10', label: '10th Marksheet' },
                  { name: 'marksheet12', label: '12th Marksheet' },
                  { name: 'incomeCertificate', label: 'Income Certificate' },
                  { name: 'domicileCertificate', label: 'Domicile Certificate' }
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label} (PDF only, max 5MB)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor={name}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id={name}
                              name={name}
                              type="file"
                              className="sr-only"
                              accept="application/pdf"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF up to 5MB</p>
                      </div>
                    </div>
                    {formData.documents[name] && (
                      <p className="mt-2 text-sm text-green-600">
                        File selected: {formData.documents[name].name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Goals Section */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Career Goals</h2>
              <textarea
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us about your career goals and aspirations"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default StudentDetailsForm;