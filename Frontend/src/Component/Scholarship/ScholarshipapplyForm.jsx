import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";
import { FiUpload, FiCheck, FiInfo, FiCalendar, FiUser, FiPhone, FiHome, FiUsers, FiFileText, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ScholarshipApplyForm = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

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
  // Update uploadProgress state to include domicileCert
  const [uploadProgress, setUploadProgress] = useState({
    tenthResult: 0,
    twelfthResult: 0,
    incomeCert: 0,
    domicileCert: 0
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  // Upload File to Cloudinary
  // Update uploadToCloudinary function to handle domicileCert
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formDataForUpload = new FormData();
    formDataForUpload.append("file", file);
    formDataForUpload.append("upload_preset", "your_preset_here");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
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
      return null;
    }
  };

  // Update handleSubmit to include domicileCert
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
  
    try {
      // Upload documents to Cloudinary
      const tenthResultUrl = await uploadToCloudinary(formData.tenthResult);
      const twelfthResultUrl = await uploadToCloudinary(formData.twelfthResult);
      const incomeCertUrl = await uploadToCloudinary(formData.incomeCert);
      const domicileCertUrl = await uploadToCloudinary(formData.domicileCert);
  
      // Prepare data for backend
      const scholarshipApplicationData = {
        ...formData,
        tenthResult: tenthResultUrl,
        twelfthResult: twelfthResultUrl,
        incomeCert: incomeCertUrl,
        domicileCert: domicileCertUrl,
        userId: user?.id,
      };
  
      // Send data to backend
      const response = await axios.post(
        "http://localhost:3000/api/scholarship-applications",
        scholarshipApplicationData
      );
  
      // Navigate to success page with ALL form data
      navigate("/scholarship/application-success", { 
        state: { 
          ...formData,
          email: formData.email || user?.primaryEmailAddress?.emailAddress 
        } 
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({ name, label, accept, value }) => (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2 flex items-center">
        {name === "tenthResult" && <FiFileText className="mr-2 text-indigo-600" />}
        {name === "twelfthResult" && <FiFileText className="mr-2 text-indigo-600" />}
        {name === "incomeCert" && <FiFileText className="mr-2 text-indigo-600" />}
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id={name}
        />
        <label
          htmlFor={name}
          className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
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
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-10">
          <h1 className="text-3xl font-bold text-white">Scholarship Application Form</h1>
          <p className="text-indigo-100 mt-3 text-lg">
            Complete the form below to apply for our scholarship program
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          {submitError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{submitError}</p>
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiUser className="mr-2 text-indigo-600" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 font-medium mb-3">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <FiCalendar className="mr-2 text-indigo-600" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              
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
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your nationality"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <FiPhone className="mr-2 text-indigo-600" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your contact number"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <FiMail className="mr-2 text-indigo-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <FiHome className="mr-2 text-indigo-600" />
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your complete address"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <FiUser className="mr-2 text-indigo-600" />
                  About Yourself
                </label>
                <textarea
                  name="aboutYourself"
                  value={formData.aboutYourself}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Tell us about yourself, your background, interests, and achievements"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiUsers className="mr-2 text-indigo-600" />
              Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 font-medium mb-3">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your father's name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your mother's name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">Guardian's Name</label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter your guardian's name (if applicable)"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">Guardian's Contact</label>
                <input
                  type="tel"
                  name="guardianContact"
                  value={formData.guardianContact}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter guardian's contact number"
                />
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiInfo className="mr-2 text-indigo-600" />
              Scholarship Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-3">Why do you need this scholarship?</label>
                <textarea
                  name="scholarshipReason"
                  value={formData.scholarshipReason}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Explain why you need this scholarship and how it will help you achieve your goals"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">Career Goals</label>
                <textarea
                  name="careerGoals"
                  value={formData.careerGoals}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Describe your career goals and how this scholarship will help you achieve them"
                ></textarea>
              </div>
              
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
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="verified" className="ml-3 block text-gray-700">
              I verify that all the information provided is accurate and complete
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipApplyForm;
