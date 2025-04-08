"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ImageIcon,
  InfoIcon,
  PencilIcon,
  DollarSignIcon,
  TargetIcon,
  SaveIcon,
  ArrowLeftIcon
} from "lucide-react";
import { fundraiserService } from "../../api/fundraiserService";

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
  hover: { y: -5, transition: { duration: 0.2 } },
};

// Custom Input Component
const CustomInput = ({ icon, label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-700 font-medium mb-2">{label}</label>}
    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      {icon && <span className="text-gray-500">{icon}</span>}
      <input
        className="w-full focus:outline-none"
        {...props}
      />
    </div>
  </div>
);

// Custom Textarea Component
const CustomTextarea = ({ icon, label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-700 font-medium mb-2">{label}</label>}
    <div className="flex items-start gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      {icon && <span className="text-gray-500 mt-1">{icon}</span>}
      <textarea
        className="w-full focus:outline-none resize-none min-h-[100px]"
        {...props}
      />
    </div>
  </div>
);

// Custom Button Component
const CustomButton = ({ children, variant = "primary", icon, ...props }) => {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-white text-indigo-600 hover:bg-gray-100",
  };
  
  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]}`}
      whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export const FundraiserFormComponent = ({ initialData = null }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    about: initialData?.about || "",
    goalAmount: initialData?.goalAmount || "",
    deadline: initialData?.deadline?.slice(0, 10) || "",
    organizationId: initialData?.organizationId || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isEditMode = !!initialData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const res = await fundraiserService.createAndUpdateFundraiser(formData);
      console.log("Success:", res);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to save fundraiser:", err);
      setError("Failed to save fundraiser. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-8 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Fundraiser" : "Create New Fundraiser"}
          </h1>
        </div>

        <motion.div 
          variants={cardVariants}
          className="bg-white p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomInput
              icon={<PencilIcon size={18} />}
              label="Fundraiser Title"
              name="title"
              placeholder="Enter a clear, descriptive title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <CustomTextarea
              icon={<InfoIcon size={18} />}
              label="Short Description"
              name="description"
              placeholder="Provide a brief overview of your fundraiser (100-150 characters)"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <CustomInput
              icon={<ImageIcon size={18} />}
              label="Image URL"
              name="imageUrl"
              placeholder="Enter the URL of your fundraiser's main image"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />

            <CustomTextarea
              icon={<InfoIcon size={18} />}
              label="About the Fundraiser"
              name="about"
              placeholder="Provide detailed information about your fundraiser, its purpose, and how the funds will be used"
              value={formData.about}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                icon={<DollarSignIcon size={18} />}
                label="Goal Amount ($)"
                name="goalAmount"
                type="number"
                placeholder="Enter your funding goal"
                value={formData.goalAmount}
                onChange={handleChange}
                required
              />

              <CustomInput
                icon={<CalendarIcon size={18} />}
                label="Deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            <CustomInput
              icon={<TargetIcon size={18} />}
              label="Organization ID"
              name="organizationId"
              placeholder="Enter your organization ID"
              value={formData.organizationId}
              onChange={handleChange}
              required
            />

            <div className="flex justify-end space-x-4 pt-6">
              <CustomButton 
                type="button" 
                variant="secondary" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </CustomButton>
              <CustomButton 
                type="submit" 
                disabled={isSubmitting}
                icon={<SaveIcon size={18} />}
              >
                {isSubmitting 
                  ? "Saving..." 
                  : isEditMode 
                    ? "Update Fundraiser" 
                    : "Create Fundraiser"
                }
              </CustomButton>
            </div>
          </form>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100"
        >
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">Tips for a Successful Fundraiser</h3>
          <ul className="space-y-2 text-indigo-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use a clear, compelling title that explains your cause</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Add a high-quality image that represents your fundraiser</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tell your story in detail - why this matters and how funds will be used</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Set a realistic funding goal and deadline</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};
