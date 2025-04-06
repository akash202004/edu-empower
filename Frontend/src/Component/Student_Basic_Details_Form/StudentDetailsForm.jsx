import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiUpload,
  FiUser,
  FiCalendar,
  FiPhone,
  FiMail,
  FiHome,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { ErrorBoundary } from "react-error-boundary";
import CountUp from "react-countup";
import { userService } from "../../api/userService";
import { studentService } from "../../api/studentService";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Form components
const FormSection = ({ title, children }) => (
  <motion.div
    className="mb-8 bg-white p-6 rounded-xl shadow-md relative overflow-hidden"
    variants={cardVariants}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </motion.div>
);

const FormField = ({ label, icon, error, children }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
        {icon}
      </div>
      {children}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const StudentDetailsForm = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State variables
  const viewMode = location.state?.viewMode || false;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [bucketReady, setBucketReady] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  const [errors, setErrors] = useState({});

  // Form data state
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
    },
  });

  // Stats for display
  const stats = [
    { value: 95, suffix: "%", label: "Completion Rate" },
    { value: 2, suffix: "min", label: "Average Time" },
    { value: 100, suffix: "%", label: "Success Rate" },
  ];

  // Effects
  useEffect(() => {
    // Update form data when user is available
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    // Initialize Supabase bucket
    const createBucketIfNotExists = async () => {
      try {
        const { data: buckets, error: listBucketsError } =
          await supabase.storage.listBuckets();

        if (listBucketsError) {
          console.error("Error listing buckets:", listBucketsError);
          setBucketReady(true);
          return;
        }

        const bucketExists = buckets.some(
          (bucket) => bucket.name === "student-documents"
        );

        if (bucketExists) {
          console.log("Bucket 'student-documents' already exists");
          setBucketReady(true);
          return;
        }

        const { error: createError } = await supabase.storage.createBucket(
          "student-documents",
          {
            public: true,
            allowedMimeTypes: ["application/pdf"],
            fileSizeLimit: 5242880, // 5MB
          }
        );

        if (createError) {
          console.error("Error creating bucket:", createError);
          setBucketReady(true);
        } else {
          setBucketReady(true);
        }
      } catch (error) {
        console.error("Error checking bucket:", error);
        setBucketReady(true);
      }
    };

    createBucketIfNotExists();

    // Fallback timer
    const timer = setTimeout(() => {
      if (!bucketReady) setBucketReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Redirect unauthenticated users
    if (!isSignedIn) {
      navigate("/auth/login");
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    try {
      if (user & s & isSignedIn) {
        const currentUser = fetchCurrentUser();
      }
    } catch (error) {}
  }, [user, isSignedIn]);

  // Helper functions
  const calculateFormProgress = (data) => {
    const requiredFields = [
      "name",
      "dob",
      "contactNumber",
      "address",
      "email",
      "gender",
    ];
    const filledFields = requiredFields.filter((field) => data[field]);
    const progress = Math.round(
      (filledFields.length / requiredFields.length) * 100
    );
    setFormProgress(progress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent changes to name and email fields
    if (name === "name" || name === "email") {
      return;
    }

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    calculateFormProgress(updatedFormData);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [name]: files[0],
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Required personal information
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFileToSupabase = async (file, fileName) => {
    if (!file) return null;

    // Validate file
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      setApiError(
        `File ${file.name} is too large (${fileSizeInMB.toFixed(
          2
        )}MB). Maximum size is 5MB.`
      );
      return null;
    }

    if (!file.type.includes("pdf")) {
      setApiError(
        `File ${file.name} is not a PDF. Only PDF files are allowed.`
      );
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${fileName}.${fileExt}`;

    try {
      // Upload file
      const { error } = await supabase.storage
        .from("student-documents")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: "application/pdf",
        });

      if (error) {
        console.error(`Error uploading ${fileName}:`, error);
        setApiError(`Failed to upload ${file.name}: ${error.message}`);
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("student-documents")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error(`Error in Supabase upload for ${fileName}:`, error);
      setApiError(
        `Failed to upload ${file.name}: ${error.message || "Unknown error"}`
      );
      return null;
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (viewMode) {
      navigate(-1);
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      setApiError(null);

      try {
        const documentUrls = {
          domicileCertificate: null,
          incomeCertificate: null,
          tenthResult: null,
          twelfthResult: null,
        };

        const uploadPromises = [];

        // Process each document
        if (formData.documents.domicileCertificate) {
          uploadPromises.push(
            uploadFileToSupabase(
              formData.documents.domicileCertificate,
              "domicile-certificate"
            ).then((url) => {
              documentUrls.domicileCertificate = url;
            })
          );
        }

        if (formData.documents.incomeCertificate) {
          uploadPromises.push(
            uploadFileToSupabase(
              formData.documents.incomeCertificate,
              "income-certificate"
            ).then((url) => {
              documentUrls.incomeCertificate = url;
            })
          );
        }

        if (formData.documents.marksheet10) {
          uploadPromises.push(
            uploadFileToSupabase(
              formData.documents.marksheet10,
              "marksheet-10"
            ).then((url) => {
              documentUrls.tenthResult = url;
            })
          );
        }

        if (formData.documents.marksheet12) {
          uploadPromises.push(
            uploadFileToSupabase(
              formData.documents.marksheet12,
              "marksheet-12"
            ).then((url) => {
              documentUrls.twelfthResult = url;
            })
          );
        }

        await Promise.all(uploadPromises);

        // Prepare student data
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
          otherScholarships: "",
          domicileCert: documentUrls.domicileCertificate || "",
          incomeCert: documentUrls.incomeCertificate || "",
          tenthResult: documentUrls.tenthResult || "",
          twelfthResult: documentUrls.twelfthResult || "",
        };

        // Submit data
        if (formData.userId) {
          const response = studentService.createAndUpdateNewStudentDetails(
            studentData
          );
        }
        navigate("/student/profile");
      } catch (error) {
        console.error("Error saving profile:", error);

        if (error.response?.data?.errors) {
          setApiError(
            `Validation failed: ${Object.values(error.response.data.errors)
              .flat()
              .join(", ")}`
          );
        } else if (error.code === "ERR_NETWORK") {
          setApiError(
            "Cannot connect to the server. Please make sure the backend is running."
          );
        } else {
          setApiError(
            error.message ||
              error.response?.data?.message ||
              "Failed to save profile. Please try again."
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Navigation
  const handleNextStep = () => setActiveStep((prev) => Math.min(prev + 1, 3));
  const handlePrevStep = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  // Render form sections
  const renderPersonalInfo = () => (
    <FormSection title="Personal Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" icon={<FiUser />} error={errors.name}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={true}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            disabled={viewMode}
          />
        </FormField>

        <FormField label="Email Address" icon={<FiMail />} error={errors.email}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={true}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            disabled={viewMode}
          />
        </FormField>

        <FormField
          label="Date of Birth"
          icon={<FiCalendar />}
          error={errors.dob}
        >
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={viewMode}
          />
        </FormField>

        <FormField
          label="Contact Number"
          icon={<FiPhone />}
          error={errors.contactNumber}
        >
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={viewMode}
          />
        </FormField>

        <FormField label="Gender" icon={<FiUser />} error={errors.gender}>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={viewMode}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </FormField>

        <FormField label="Address" icon={<FiHome />} error={errors.address}>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={viewMode}
          ></textarea>
        </FormField>
      </div>
    </FormSection>
  );

  const renderFamilyInfo = () => (
    <>
      <FormSection title="Family Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Father's Name" icon={<FiUser />}>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName || ""}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={viewMode}
            />
          </FormField>
          <FormField label="Mother's Name" icon={<FiUser />}>
            <input
              type="text"
              name="motherName"
              value={formData.motherName || ""}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={viewMode}
            />
          </FormField>

          <FormField label="Guardian's Name" icon={<FiUser />}>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName || ""}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={viewMode}
            />
          </FormField>

          <FormField label="Guardian's Contact" icon={<FiPhone />}>
            <input
              type="tel"
              name="guardianContact"
              value={formData.guardianContact || ""}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={viewMode}
            />
          </FormField>

          <FormField label="Guardian's Email" icon={<FiMail />}>
            <input
              type="email"
              name="guardianEmail"
              value={formData.guardianEmail || ""}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={viewMode}
            />
          </FormField>

          <FormField label="Guardian's Address" icon={<FiHome />}>
            <textarea
              name="guardianAddress"
              value={formData.guardianAddress || ""}
              onChange={handleChange}
              rows="3"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={viewMode}
            ></textarea>
          </FormField>
        </div>
      </FormSection>
    </>
  );

  const renderDocuments = () => (
    <FormSection title="Required Documents">
      <p className="text-gray-600 mb-4">
        Please upload the following documents in PDF format (max 5MB each)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domicile Certificate
            </label>
            <div className="relative">
              <input
                type="file"
                name="domicileCertificate"
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
                id="domicileCertificate"
                disabled={viewMode}
              />
              <label
                htmlFor="domicileCertificate"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-md cursor-pointer ${
                  formData.documents.domicileCertificate
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
                onClick={() =>
                  !viewMode &&
                  document.getElementById("domicileCertificate").click()
                }
              >
                <div className="flex items-center">
                  {formData.documents.domicileCertificate ? (
                    <svg
                      className="w-6 h-6 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <FiUpload className="w-6 h-6 mr-2 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">
                    {formData.documents.domicileCertificate
                      ? formData.documents.domicileCertificate.name
                      : "Upload Domicile Certificate"}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income Certificate
            </label>
            <div className="relative">
              <input
                type="file"
                name="incomeCertificate"
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
                id="incomeCertificate"
                disabled={viewMode}
              />
              <label
                htmlFor="incomeCertificate"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-md cursor-pointer ${
                  formData.documents.incomeCertificate
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
                onClick={() =>
                  !viewMode &&
                  document.getElementById("incomeCertificate").click()
                }
              >
                <div className="flex items-center">
                  {formData.documents.incomeCertificate ? (
                    <svg
                      className="w-6 h-6 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <FiUpload className="w-6 h-6 mr-2 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">
                    {formData.documents.incomeCertificate
                      ? formData.documents.incomeCertificate.name
                      : "Upload Income Certificate"}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              10th Marksheet
            </label>
            <div className="relative">
              <input
                type="file"
                name="marksheet10"
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
                id="marksheet10"
                disabled={viewMode}
              />
              <label
                htmlFor="marksheet10"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-md cursor-pointer ${
                  formData.documents.marksheet10
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
                onClick={() =>
                  !viewMode && document.getElementById("marksheet10").click()
                }
              >
                <div className="flex items-center">
                  {formData.documents.marksheet10 ? (
                    <svg
                      className="w-6 h-6 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <FiUpload className="w-6 h-6 mr-2 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">
                    {formData.documents.marksheet10
                      ? formData.documents.marksheet10.name
                      : "Upload 10th Marksheet"}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              12th Marksheet
            </label>
            <div className="relative">
              <input
                type="file"
                name="marksheet12"
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
                id="marksheet12"
                disabled={viewMode}
              />
              <label
                htmlFor="marksheet12"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-md cursor-pointer ${
                  formData.documents.marksheet12
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
                onClick={() =>
                  !viewMode && document.getElementById("marksheet12").click()
                }
              >
                <div className="flex items-center">
                  {formData.documents.marksheet12 ? (
                    <svg
                      className="w-6 h-6 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <FiUpload className="w-6 h-6 mr-2 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">
                    {formData.documents.marksheet12
                      ? formData.documents.marksheet12.name
                      : "Upload 12th Marksheet"}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );

  // Main render
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong. Please refresh the page.</div>}
    >
      <div className="min-h-screen bg-white py-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-100 opacity-30 mix-blend-multiply filter blur-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 15 + 10}px`,
                height: `${Math.random() * 15 + 10}px`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <h1 className="text-3xl font-bold">
                  {viewMode ? "Student Profile" : "Student Registration"}
                </h1>
                <p className="mt-2 opacity-90">
                  {viewMode
                    ? "View your profile information"
                    : "Complete your profile to apply for scholarships"}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="bg-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep >= 1
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      1
                    </div>
                    <span
                      className={
                        activeStep >= 1
                          ? "text-indigo-600 font-medium"
                          : "text-gray-500"
                      }
                    >
                      Personal
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep >= 2
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      2
                    </div>
                    <span
                      className={
                        activeStep >= 2
                          ? "text-indigo-600 font-medium"
                          : "text-gray-500"
                      }
                    >
                      Family
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep >= 3
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      3
                    </div>
                    <span
                      className={
                        activeStep >= 3
                          ? "text-indigo-600 font-medium"
                          : "text-gray-500"
                      }
                    >
                      Documents
                    </span>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center space-x-4">
                    {!viewMode && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          disabled={activeStep === 1 || isSubmitting}
                          className={`px-4 py-2 rounded-md ${
                            activeStep === 1
                              ? " text-gray-400 cursor-not-allowed"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Previous
                        </button>

                        {activeStep < 3 ? (
                          <button
                            type="button"
                            onClick={handleNextStep}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Submitting...
                              </>
                            ) : (
                              "Submit"
                            )}
                          </button>
                        )}
                      </>
                    )}

                    {viewMode && (
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Back
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Error message */}
              {apiError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{apiError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-white border-t border-b border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderPersonalInfo()}
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderFamilyInfo()}
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderDocuments()}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer with helpful information */}
                <motion.div
                  className="mt-12 text-center text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p>
                    Need help? Contact our support team at{" "}
                    <a
                      href="mailto:support@edu-empower.com"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      support@edu-empower.com
                    </a>
                  </p>
                  <p className="mt-2">
                    Your data is securely stored and will only be used for
                    scholarship matching purposes.
                  </p>
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default StudentDetailsForm;
