import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FiUpload, FiCheck, FiInfo, FiCalendar, FiUser, FiPhone, FiHome, FiUsers, FiFileText, FiMail, FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ScholarshipApplyForm = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get scholarship info from location state
  const scholarshipId = location.state?.scholarshipId;
  const scholarshipTitle = location.state?.scholarshipTitle || "Scholarship";
  const userRole = location.state?.role || "STUDENT";

  // Form validation state
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});

  // Initialize form with user data if available
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "Not Specified",
    nationality: "",
    contactNumber: "",
    email: "",
    address: "",
    aboutYourself: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianContact: "",
    scholarshipReason: "",
    careerGoals: "",
    otherScholarships: false,
    tenthResult: null, 
    twelfthResult: null, 
    incomeCert: null,
    domicileCert: null,
    verified: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({
    tenthResult: 0,
    twelfthResult: 0,
    incomeCert: 0,
    domicileCert: 0
  });

  // Validate form fields
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.trim().length < 3) error = "Name must be at least 3 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "contactNumber":
        if (!value.trim()) error = "Contact number is required";
        else if (!/^\d{10}$/.test(value.replace(/[^0-9]/g, ''))) 
          error = "Please enter a valid 10-digit number";
        break;
      case "dateOfBirth":
        if (!value) error = "Date of birth is required";
        else {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          if (age < 15) error = "You must be at least 15 years old";
          if (age > 100) error = "Please enter a valid date of birth";
        }
        break;
      case "nationality":
        if (!value.trim()) error = "Nationality is required";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.trim().length < 10) error = "Please enter your complete address";
        break;
      case "aboutYourself":
        if (!value.trim()) error = "This field is required";
        else if (value.trim().length < 50) error = "Please provide at least 50 characters";
        break;
      case "fatherName":
      case "motherName":
        if (!value.trim()) error = "This field is required";
        break;
      case "scholarshipReason":
      case "careerGoals":
        if (!value.trim()) error = "This field is required";
        else if (value.trim().length < 100) error = "Please provide at least 100 characters";
        break;
      case "tenthResult":
      case "twelfthResult":
      case "incomeCert":
        if (!value) error = "This document is required";
        else if (value.size > 5 * 1024 * 1024) error = "File size must not exceed 5MB";
        break;
      default:
        break;
    }
    
    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "guardianName" && key !== "guardianContact" && key !== "domicileCert") {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    const newValue = type === "file" ? files[0] : type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });
    
    // Mark field as touched
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    
    // Validate field
    const error = validateField(name, newValue);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  // Upload File to Cloudinary
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formDataForUpload = new FormData();
    formDataForUpload.append("file", file);
    formDataForUpload.append("Eduempower", "your_preset_here");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/pahari/raw/upload",
        formDataForUpload,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            
            if (file === formData.tenthResult) {
              setUploadProgress(prev => ({...prev, tenthResult: percentCompleted}));
            } else if (file === formData.twelfthResult) {
              setUploadProgress(prev => ({...prev, twelfthResult: percentCompleted}));
            } else if (file === formData.incomeCert) {
              setUploadProgress(prev => ({...prev, incomeCert: percentCompleted}));
            } else if (file === formData.domicileCert) {
              setUploadProgress(prev => ({...prev, domicileCert: percentCompleted}));
            }
          }
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error(`Failed to upload ${file.name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementsByName(firstErrorField)[0]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      toast.error("Please fix the errors in the form before submitting");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");
  
    try {
      // Upload documents to Cloudinary
      const [tenthResultUrl, twelfthResultUrl, incomeCertUrl, domicileCertUrl] = await Promise.all([
        uploadToCloudinary(formData.tenthResult),
        uploadToCloudinary(formData.twelfthResult),
        uploadToCloudinary(formData.incomeCert),
        formData.domicileCert ? uploadToCloudinary(formData.domicileCert) : Promise.resolve(null)
      ]);
  
      // Prepare data for backend
      const scholarshipApplicationData = {
        ...formData,
        tenthResult: tenthResultUrl,
        twelfthResult: twelfthResultUrl,
        incomeCert: incomeCertUrl,
        domicileCert: domicileCertUrl,
        userId: user?.id,
        scholarshipId,
        applicationDate: new Date().toISOString(),
        status: "Pending"
      };
  
      // Send data to backend
      const response = await axios.post(
        "http://localhost:3000/api/scholarship-applications",
        scholarshipApplicationData
      );
  
      setSubmitSuccess(true);
      toast.success("Application submitted successfully!");
      
      // Navigate to success page with form data
      navigate("/scholarship/application-success", { 
        state: { 
          ...formData,
          scholarshipTitle,
          email: formData.email || user?.primaryEmailAddress?.emailAddress,
          applicationId: response.data.id || "APP" + Date.now()
        } 
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError(error.message || "Failed to submit application. Please try again.");
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({ name, label, accept, value, required = true }) => (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2 flex items-center">
        <FiFileText className="mr-2 text-indigo-600" />
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id={name}
          required={required}
        />
        <label
          htmlFor={name}
          className={`flex items-center justify-center w-full px-4 py-3 border-2 ${
            errors[name] && formTouched[name] 
              ? "border-red-300 bg-red-50" 
              : "border-dashed border-gray-300"
          } rounded-lg cursor-pointer hover:bg-gray-50 transition-colors`}
        >
          {value ? (
            <div className="flex items-center text-indigo-600">
              <FiCheck className="mr-2" />
              <span className="truncate max-w-xs">{value.name}</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <FiUpload className="mr-2" />
              <span>Upload {label}</span>
            </div>
          )}
        </label>
        {uploadProgress[name] > 0 && uploadProgress[name] < 100 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress[name]}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{uploadProgress[name]}% uploaded</p>
          </div>
        )}
        {errors[name] && formTouched[name] && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <FiAlertCircle className="mr-1" /> {errors[name]}
          </p>
        )}
      </div>
    </div>
  );

  // Input field component with validation
  const InputField = ({ 
    name, 
    label, 
    type = "text", 
    placeholder, 
    required = true, 
    icon = null,
    rows = null
  }) => (
    <div className={rows ? "md:col-span-2" : ""}>
      <label className="block text-gray-700 font-medium mb-3 flex items-center">
        {icon}
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {rows ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          rows={rows}
          className={`w-full px-5 py-3 border ${
            errors[name] && formTouched[name] 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          className={`w-full px-5 py-3 border ${
            errors[name] && formTouched[name] 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
          placeholder={placeholder}
        />
      )}
      {errors[name] && formTouched[name] && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" /> {errors[name]}
        </p>
      )}
    </div>
  );

  // If not signed in, redirect to login
  // Modified section to allow students to proceed without signing in
  if (!isSignedIn && userRole !== "STUDENT") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <FiInfo className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in required</h2>
          <p className="mt-2 text-gray-600">
            You need to sign in to apply for scholarships
          </p>
          <div className="mt-8">
            <button 
              onClick={() => navigate("/auth/role-selection")}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Scholarships
        </button>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-10">
            <h1 className="text-3xl font-bold text-white">Application for {scholarshipTitle}</h1>
            <p className="text-indigo-100 mt-3 text-lg">
              Complete the form below to apply for this scholarship program
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            {submitError && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 flex items-center">
                  <FiAlertCircle className="mr-2" /> {submitError}
                </p>
              </div>
            )}

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FiUser className="mr-2 text-indigo-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField 
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  icon={<FiUser className="mr-2 text-indigo-600" />}
                />
                
                <InputField 
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  icon={<FiCalendar className="mr-2 text-indigo-600" />}
                />
                
                <div>
                  <label className="block text-gray-700 font-medium mb-3">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="Not Specified">Not Specified</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <InputField 
                  name="nationality"
                  label="Nationality"
                  placeholder="Enter your nationality"
                />
                
                <InputField 
                  name="contactNumber"
                  label="Contact Number"
                  type="tel"
                  placeholder="Enter your contact number"
                  icon={<FiPhone className="mr-2 text-indigo-600" />}
                />
                
                <InputField 
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  icon={<FiMail className="mr-2 text-indigo-600" />}
                />
                
                <InputField 
                  name="address"
                  label="Address"
                  placeholder="Enter your complete address"
                  icon={<FiHome className="mr-2 text-indigo-600" />}
                  rows={3}
                />
                
                <InputField 
                  name="aboutYourself"
                  label="About Yourself"
                  placeholder="Tell us about yourself, your background, interests, and achievements"
                  icon={<FiUser className="mr-2 text-indigo-600" />}
                  rows={4}
                />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FiUsers className="mr-2 text-indigo-600" />
                Family Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField 
                  name="fatherName"
                  label="Father's Name"
                  placeholder="Enter your father's name"
                />
                
                <InputField 
                  name="motherName"
                  label="Mother's Name"
                  placeholder="Enter your mother's name"
                />
                
                <InputField 
                  name="guardianName"
                  label="Guardian's Name"
                  placeholder="Enter your guardian's name (if applicable)"
                  required={false}
                />
                
                <InputField 
                  name="guardianContact"
                  label="Guardian's Contact"
                  type="tel"
                  placeholder="Enter guardian's contact number"
                  required={false}
                />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FiInfo className="mr-2 text-indigo-600" />
                Scholarship Information
              </h2>
              <div className="space-y-6">
                <InputField 
                  name="scholarshipReason"
                  label="Why do you need this scholarship?"
                  placeholder="Explain why you need this scholarship and how it will help you achieve your goals"
                  rows={4}
                />
                
                <InputField 
                  name="careerGoals"
                  label="Career Goals"
                  placeholder="Describe your career goals and how this scholarship will help you achieve them"
                  rows={4}
                />
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="otherScholarships"
                    checked={formData.otherScholarships}
                    onChange={handleChange}
                    id="otherScholarships"
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="otherScholarships" className="ml-3 block text-gray-700">
                    I am currently receiving other scholarships
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FiFileText className="mr-2 text-indigo-600" />
                Required Documents
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Please upload the following documents in PDF format. Each file should not exceed 5MB.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FileUploadField
                  name="tenthResult"
                  label="10th Grade Marksheet"
                  accept=".pdf,.jpg,.jpeg,.png"
                  value={formData.tenthResult}
                />
                
                <FileUploadField
                  name="twelfthResult"
                  label="12th Grade Marksheet"
                  accept=".pdf,.jpg,.jpeg,.png"
                  value={formData.twelfthResult}
                />
                
                <FileUploadField
                  name="incomeCert"
                  label="Income Certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  value={formData.incomeCert}
                />
                
                <FileUploadField
                  name="domicileCert"
                  label="Domicile Certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  value={formData.domicileCert}
                  required={false}
                />
              </div>
            </div>

            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={handleChange}
                id="verified"
                required
                className={`h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                  errors.verified && formTouched.verified ? "ring-2 ring-red-500" : ""
                }`}
              />
              <label htmlFor="verified" className="ml-3 block text-gray-700">
                I verify that all the information provided is accurate and complete
              </label>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplyForm;
