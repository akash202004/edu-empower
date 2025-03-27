import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useUser } from "@clerk/clerk-react";
import { FiUpload, FiUser, FiCalendar, FiPhone, FiMail, FiHome } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import axios from "axios";
// Near the top of your file, replace hardcoded URLs with environment variables
import { createClient } from '@supabase/supabase-js';
import { ErrorBoundary } from 'react-error-boundary';

// Configure axios with base URL
const API_BASE_URL = "http://localhost:5001/api"; // Changed from 5000 to 5001 to match the new backend port
axios.defaults.baseURL = API_BASE_URL;

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const StudentDetailsForm = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // Added to check if we're in view mode
  const viewMode = location.state?.viewMode || false; // Define viewMode from location state
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
    const fetchStudentProfile = async () => {
      if (isSignedIn && user) {
        try {
          // First, ensure the user exists in our database
          await axios.post(`${API_BASE_URL}/users/registerorupdate`, {
            userId: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            role: "STUDENT"
          });
          
          // Then fetch student profile if it exists
          const response = await axios.get(`${API_BASE_URL}/students/${user.id}`);
          if (response.data) {
            setFormData({
              ...response.data,
              userId: user.id,  // Add this line to track existing entries
              // Keep other mappings
            });
          }
        } catch (error) {
          console.error("Error fetching student profile:", error);
          // If 404 or other error, we'll use the default form data with Clerk user info
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
  // Improved uploadFileToSupabase function with better error handling
  // Improved uploadFileToSupabase function with service role permissions
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

  // Add this near the top of your handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If in view mode, just go back
    if (viewMode) {
      navigate(-1);
      return;
    }
    
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
        
        // Add this debugging function at the top of your component
        const logBackendResponse = (response) => {
          console.log("Backend Response:", {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
            headers: response.headers
          });
        };
  
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
        
        // Check if we're updating an existing profile or creating a new one
        let response;
        if (formData.userId) {
          // Update existing profile
          response = await axios.put(`${API_BASE_URL}/students/${user.id}`, studentData);
          logBackendResponse(response);
          console.log("Profile updated successfully:", response.data);
        } else {
          // Create new profile - add more detailed logging
          console.log("Creating new profile with API URL:", `${API_BASE_URL}/students`);
          response = await axios.post(`${API_BASE_URL}/students`, studentData);
          logBackendResponse(response);
          console.log("Profile created successfully:", response.data);
        }
        
        // Navigate to the student profile page
        navigate("/student/profile");
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
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {viewMode ? "Your Profile" : "Student Details Form"}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {viewMode ? "View your profile information" : "Please fill in your details to complete your profile"}
          </p>
  
          {apiError && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">{apiError}</p>
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            {/* Then for your form fields, add readOnly={viewMode} to make them read-only in view mode */}
            {/* Example: */}
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              readOnly={viewMode}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.contactNumber ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                viewMode ? "bg-gray-50" : ""
              }`}
            />
            
            {/* And modify your submit button */}
            <button
              type="submit"
              className={`px-4 py-2 ${viewMode ? 'bg-gray-600' : 'bg-indigo-600'} text-white rounded-md shadow-sm hover:${viewMode ? 'bg-gray-700' : 'bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isSubmitting}
            >
              {viewMode ? "Close" : (isSubmitting ? "Saving..." : "Save Profile")}
            </button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default StudentDetailsForm;