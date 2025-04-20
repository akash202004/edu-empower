"use client";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ImageIcon,
  InfoIcon,
  PencilIcon,
  DollarSignIcon,
  SaveIcon,
  ArrowLeftIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

// Reusable Components
const CustomInput = ({ icon, label, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
    )}
    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      {icon && <span className="text-gray-500">{icon}</span>}
      <input className="w-full focus:outline-none" {...props} />
    </div>
  </div>
);

const CustomTextarea = ({ icon, label, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
    )}
    <div className="flex items-start gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      {icon && <span className="text-gray-500 mt-1">{icon}</span>}
      <textarea
        className="w-full focus:outline-none resize-none min-h-[100px]"
        {...props}
      />
    </div>
  </div>
);

const CustomButton = ({ children, variant = "primary", icon, ...props }) => {
  const baseClasses =
    "px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
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

export const EditFundraiserFormComponent = ({ id }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    about: "",
    goalAmount: "",
    deadline: "",
    organizationId: user.id,
  });

  const [originalData, setOriginalData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing data
  useEffect(() => {
    const fetchFundraiser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/fundraiser/${id}`
        );
        const fetchedData = {
          ...res.data,
          deadline: res.data.deadline?.split("T")[0] || "",
        };
        setFormData(fetchedData);
        setOriginalData(fetchedData);
      } catch (err) {
        console.error("Failed to fetch Crowdfunding details:", err);
        toast.error("Failed to fetch Crowdfunding details");
        setError("Failed to load fundraiser.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFundraiser();
  }, [id]);

  const isFutureDate = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };
  

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
  
    if (!formData.deadline) {
      toast.error("Please select a deadline.");
      setIsSubmitting(false);
      return;
    }
  
    if (!isFutureDate(formData.deadline)) {
      toast.error("Deadline cannot be in the past.");
      setIsSubmitting(false);
      return;
    }
  
    const amount = Number(formData.goalAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Goal amount must be a positive number.");
      setIsSubmitting(false);
      return;
    }
  
    const imageUrlPattern = /\.(jpeg|jpg|gif|png|webp|bmp)(\?.*)?$/i;
    if (!imageUrlPattern.test(formData.imageUrl)) {
      toast.error("Please enter a valid image URL.");
      setIsSubmitting(false);
      return;
    }
  
    const descriptionLength = formData.description.length;
    if (descriptionLength < 10 || descriptionLength > 500) {
      toast.error("Description must be between 10 and 500 characters long.");
      setIsSubmitting(false);
      return;
    }
  
    const aboutLength = formData.about.length;
    if (aboutLength < 10 || aboutLength > 1000) {
      toast.error("About section must be between 10 and 1000 characters long.");
      setIsSubmitting(false);
      return;
    }
  
    const changedFields = {};
    for (const key in formData) {
      const newValue =
        key === "goalAmount"
          ? Number(formData[key])
          : key === "deadline"
          ? new Date(formData[key]).toISOString()
          : formData[key];
  
      const originalValue =
        key === "goalAmount"
          ? Number(originalData[key])
          : key === "deadline"
          ? new Date(originalData[key]).toISOString().split("T")[0]
          : originalData[key];
  
      if (newValue !== originalValue) {
        changedFields[key] = newValue;
      }
    }
  
    if (Object.keys(changedFields).length === 0) {
      setIsSubmitting(false);
      return navigate(`/crowdfunding/${id}`);
    }
  
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fundraiser/${id}`,
        changedFields
      );
      console.log("Updated:", res.data);
      toast.success("Crowdfunding updated successfully!");
      navigate(`/crowdfunding/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update fundraiser.");
      toast.error("Failed to update fundraiser.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (isLoading) return <p className="p-10">Loading fundraiser...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Fundraiser</h1>
        </div>

        <div className="bg-white p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomInput
              icon={<PencilIcon size={18} />}
              label="Fundraiser Title"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <CustomTextarea
              icon={<InfoIcon size={18} />}
              label="Description"
              name="description"
              placeholder="Short description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <CustomInput
              icon={<ImageIcon size={18} />}
              label="Image URL"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
            <CustomTextarea
              icon={<InfoIcon size={18} />}
              label="About"
              name="about"
              placeholder="About the fundraiser"
              value={formData.about}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                icon={<DollarSignIcon size={18} />}
                label="Goal Amount"
                name="goalAmount"
                type="number"
                placeholder="Goal Amount"
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
                {isSubmitting ? "Updating..." : "Save Changes"}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
