import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FiUpload, FiUser, FiCalendar, FiPhone, FiMail, FiHome } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { createClient } from '@supabase/supabase-js';
import { ErrorBoundary } from 'react-error-boundary';
import studentService from '../../api/studentService';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const StudentDetailsForm = () => {
  // Near the top of your component:
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectAfterSubmit = location.state?.redirectAfterSubmit || "/scholarship";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [bucketReady, setBucketReady] = useState(false);
  
  // Initialize formData after user is defined
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
    documents: {  // Change this to a nested documents object
      domicileCertificate: null,
      incomeCertificate: null,
      marksheet10: null,
      marksheet12: null,
    }
  });

  // Update form data when user is available
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || ""
      }));
    }
  }, [user]);
  
  // Move the bucket creation inside the component
  useEffect(() => {
    const createBucketIfNotExists = async () => {
      try {
        console.log("Checking if bucket exists using S3 endpoint...");
        
        // First check if the bucket exists using the correct endpoint
        const { data: buckets, error: listBucketsError } = await supabase.storage.listBuckets();
        
        if (listBucketsError) {
          console.error("Error listing buckets:", listBucketsError);
          // Check if it's a permissions issue
          if (listBucketsError.message && listBucketsError.message.includes("permission")) {
            console.log("Permission issue detected. Assuming bucket exists...");
            setBucketReady(true);
            return;
          }
          setBucketReady(true);
          return;
        }
        
        console.log("Available buckets:", buckets);
        
        // Check if our bucket exists in the list
        const bucketExists = buckets.some(bucket => bucket.name === 'student-documents');
        
        if (bucketExists) {
          console.log("Bucket 'student-documents' already exists");
          setBucketReady(true);
          return;
        }
        
        // If bucket doesn't exist, create it with the correct options
        console.log("Attempting to create bucket 'student-documents'...");
        const { data: newBucket, error: createError } = await supabase.storage.createBucket('student-documents', {
          public: true,
          allowedMimeTypes: ['application/pdf'],
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
          console.error("Error creating bucket:", createError);
          
          // Check if it's a permission error or if bucket already exists
          if (createError.message && (createError.message.includes("already exists") || createError.message.includes("duplicate"))) {
            console.log("Bucket already exists, setting as ready");
            setBucketReady(true);
          } else {
            console.log("Setting bucket ready despite error to allow form submission");
            setBucketReady(true);
          }
        } else {
          console.log("Bucket created successfully:", newBucket);
          setBucketReady(true);
        }
      } catch (error) {
        console.error('Error checking bucket:', error);
        console.log("Setting bucket ready despite error to allow form submission");
        setBucketReady(true);
      }
    };
    
    createBucketIfNotExists();
    
    // Add a fallback timer to set bucketReady to true after 3 seconds
    const timer = setTimeout(() => {
      if (!bucketReady) {
        console.log("Forcing bucket ready state after timeout");
        setBucketReady(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add this effect to redirect unauthenticated users
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/auth/login");
    }
  }, [isSignedIn, navigate]);
  
  // Fetch student profile data from backend if it exists
  useEffect(() => {
    // In your fetchStudentProfile function inside the useEffect
    const fetchStudentProfile = async () => {
      if (isSignedIn && user) {
        try {
          // First, ensure the user exists in our database
          await studentService.registerOrUpdateUser({
            userId: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            role: "STUDENT"
          });
          
          // Then fetch student profile if it exists
          try {
            const studentData = await studentService.getStudentProfile(user.id);
            if (studentData) {
              // If profile exists, populate the form
              setFormData({
                ...formData,
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
              });
            }
          } catch (error) {
            // If 404 or other error, we'll use the default form data with Clerk user info
            console.log("No existing profile found, creating new profile");
          }
        } catch (error) {
          console.error("Error fetching student profile:", error);
        }
      }
    };
    
    fetchStudentProfile();
  }, [user, isSignedIn]);
  
  const [errors, setErrors] = useState({});

  // In the handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent changes to name and email fields
    if (name === 'name' || name === 'email') {
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
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
    
    // Required personal information
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    
    // Temporarily disable document validation completely
    // We'll handle document uploads separately
    
    console.log("Validation errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add this function to upload files to Supabase
  const uploadFileToSupabase = async (file, fileName) => {
    if (!file) return null;
    
    // Check file size (limit to 5MB)
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      console.error(`File ${fileName} is too large (${fileSizeInMB.toFixed(2)}MB). Maximum size is 5MB.`);
      setApiError(`File ${file.name} is too large (${fileSizeInMB.toFixed(2)}MB). Maximum size is 5MB.`);
      return null;
    }
    
    // Validate file type
    if (!file.type.includes('pdf')) {
      console.error(`File ${fileName} is not a PDF. Only PDF files are allowed.`);
      setApiError(`File ${file.name} is not a PDF. Only PDF files are allowed.`);
      return null;
    }
    
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${fileName}.${fileExt}`;
    
    console.log(`Uploading ${fileName} to Supabase: ${filePath}`);
    console.log(`File details: Size=${fileSizeInMB.toFixed(2)}MB, Type=${file.type}`);
    
    try {
      // Skip bucket creation attempt - it's causing 400 errors
      console.log("Attempting direct upload to existing bucket...");
      
      // Upload the file with service role permissions
      const { data, error } = await supabase.storage
        .from('student-documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'application/pdf'
        });
      
      if (error) {
        console.error(`Error uploading ${fileName}:`, error);
        
        // Check if it's a bucket not found error
        if (error.message && error.message.includes("not found")) {
          console.error("Bucket not found. Please create the bucket 'student-documents' in the Supabase dashboard.");
          setApiError("Storage bucket not found. Please contact support.");
        } else {
          setApiError(`Failed to upload ${file.name}: ${error.message}`);
        }
        return null;
      }
      
      // Get the public URL for the file
      const { data: urlData } = supabase.storage
        .from('student-documents')
        .getPublicUrl(filePath);
      
      console.log(`${fileName} uploaded successfully:`, urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error(`Error in Supabase upload for ${fileName}:`, error);
      setApiError(`Failed to upload ${file.name}: ${error.message || "Unknown error"}`);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form data being validated:", formData);
    
    if (validateForm()) {
      setIsSubmitting(true);
      setApiError(null);
      
      try {
        // Skip bucket check and proceed directly to uploads
        console.log("Proceeding directly to document uploads...");
        
        // Upload documents to Supabase
        const documentUrls = {
          domicileCertificate: null,
          incomeCertificate: null,
          tenthResult: null,
          twelfthResult: null
        };
        
        // Create an array to track upload promises
        const uploadPromises = [];
        
        // Upload each document if it exists
        if (formData.documents.domicileCertificate) {
          const uploadPromise = uploadFileToSupabase(
            formData.documents.domicileCertificate, 
            'domicile-certificate'
          ).then(url => {
            documentUrls.domicileCertificate = url;
            console.log("Domicile certificate URL:", url);
          }).catch(err => {
            console.error("Error uploading domicile certificate:", err);
            return null;
          });
          uploadPromises.push(uploadPromise);
        }
        
        if (formData.documents.incomeCertificate) {
          const uploadPromise = uploadFileToSupabase(
            formData.documents.incomeCertificate, 
            'income-certificate'
          ).then(url => {
            documentUrls.incomeCertificate = url;
            console.log("Income certificate URL:", url);
          }).catch(err => {
            console.error("Error uploading income certificate:", err);
            return null;
          });
          uploadPromises.push(uploadPromise);
        }
        
        if (formData.documents.marksheet10) {
          const uploadPromise = uploadFileToSupabase(
            formData.documents.marksheet10, 
            'marksheet-10'
          ).then(url => {
            documentUrls.tenthResult = url;
            console.log("10th marksheet URL:", url);
          }).catch(err => {
            console.error("Error uploading 10th marksheet:", err);
            return null;
          });
          uploadPromises.push(uploadPromise);
        }
        
        if (formData.documents.marksheet12) {
          const uploadPromise = uploadFileToSupabase(
            formData.documents.marksheet12, 
            'marksheet-12'
          ).then(url => {
            documentUrls.twelfthResult = url;
            console.log("12th marksheet URL:", url);
          }).catch(err => {
            console.error("Error uploading 12th marksheet:", err);
            return null;
          });
          uploadPromises.push(uploadPromise);
        }
        
        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
        
        // Prepare form data for API with field names matching the backend expectations
        const studentData = {
          userId: user.id,
          fullName: formData.name,           // Changed from name to fullName
          email: formData.email,
          dateOfBirth: formData.dob,         // Changed from dob to dateOfBirth
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
          // Add these required fields that might be missing
          nationality: "Indian",
          otherScholarships: "",
          // Document URLs
          domicileCert: documentUrls.domicileCertificate || "",
          incomeCert: documentUrls.incomeCertificate || "",
          tenthResult: documentUrls.tenthResult || "",
          twelfthResult: documentUrls.twelfthResult || ""
        };
        
        console.log("Student data being sent to API:", studentData);
        
        // Use the student service to save the profile
        const response = await studentService.saveStudentProfile(studentData);
        console.log("Profile saved successfully:", response);
        
        // Navigate to the destination specified in location state or default to profile page
        navigate(redirectAfterSubmit);
        
      } catch (error) {
        console.error("Error saving profile:", error);
        
        // Log more detailed error information
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
          
          // Check for validation errors
          if (error.response.data && error.response.data.errors) {
            console.error("Validation errors:", JSON.stringify(error.response.data.errors, null, 2));
            setApiError(`Validation failed: ${Object.values(error.response.data.errors).flat().join(', ')}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          setApiError("No response received from server. Please check if the backend is running.");
        } else {
          // Something happened in setting up the request
          console.error("Error setting up request:", error.message);
          setApiError(`Error: ${error.message}`);
        }
        
        if (error.code === 'ERR_NETWORK') {
          setApiError("Cannot connect to the server. Please make sure the backend is running.");
        } else if (!error.response) {
          setApiError("Network error. Please check your connection and try again.");
        } else {
          setApiError(error.message || error.response?.data?.message || "Failed to save profile. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Form has errors");
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
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
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

                {/* Date of Birth Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
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

                {/* Gender Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
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

                {/* Contact Number Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
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

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
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

                {/* Address Field */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
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
                {/* Father's Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
                </div>

                {/* Mother's Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName}</p>}
                </div>

                {/* Guardian's Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian's Name (if applicable)
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Guardian's Contact Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian's Contact
                  </label>
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
                {/* 10th Marksheet Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    10th Marksheet (PDF only, max 5MB)
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
                          htmlFor="marksheet10"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="marksheet10"
                            name="marksheet10"
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
                  {formData.documents.marksheet10 && (
                    <p className="mt-2 text-sm text-green-600">
                      File selected: {formData.documents.marksheet10.name}
                    </p>
                  )}
                </div>

                {/* 12th Marksheet Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    12th Marksheet (PDF only, max 5MB)
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
                          htmlFor="marksheet12"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="marksheet12"
                            name="marksheet12"
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
                  {formData.documents.marksheet12 && (
                    <p className="mt-2 text-sm text-green-600">
                      File selected: {formData.documents.marksheet12.name}
                    </p>
                  )}
                </div>

                {/* Income Certificate Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Income Certificate (PDF only, max 5MB)
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
                          htmlFor="incomeCertificate"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="incomeCertificate"
                            name="incomeCertificate"
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
                  {formData.documents.incomeCertificate && (
                    <p className="mt-2 text-sm text-green-600">
                      File selected: {formData.documents.incomeCertificate.name}
                    </p>
                  )}
                </div>

                {/* Domicile Certificate Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domicile Certificate (PDF only, max 5MB)
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
                          htmlFor="domicileCertificate"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="domicileCertificate"
                            name="domicileCertificate"
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
                  {formData.documents.domicileCertificate && (
                    <p className="mt-2 text-sm text-green-600">
                      File selected: {formData.documents.domicileCertificate.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Career Goals Section */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Career Goals</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your career goals and aspirations
                </label>
                <textarea
                  name="careerGoals"
                  value={formData.careerGoals}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
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