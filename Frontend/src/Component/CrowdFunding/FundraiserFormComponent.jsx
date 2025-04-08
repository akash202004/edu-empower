"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ImageIcon,
  InfoIcon,
  PencilIcon,
  DollarSignIcon,
} from "lucide-react";
import { fundraiserService } from "../../api/fundraiserService";

// Custom Input Component
const CustomInput = ({ ...props }) => (
  <input
    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    {...props}
  />
);

// Custom Textarea Component
const CustomTextarea = ({ ...props }) => (
  <textarea
    className="border border-gray-300 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
    {...props}
  />
);

// Custom Button Component
const CustomButton = ({ children, ...props }) => (
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
    {...props}
  >
    {children}
  </button>
);

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

  const isEditMode = !!initialData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fundraiserService.createAndUpdateFundraiser(formData);
      console.log("Success:", res);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to save fundraiser:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div className="flex items-center gap-2">
        <PencilIcon size={18} />
        <CustomInput
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <InfoIcon size={18} />
        <CustomTextarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <ImageIcon size={18} />
        <CustomInput
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <InfoIcon size={18} />
        <CustomTextarea
          name="about"
          placeholder="About"
          value={formData.about}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <DollarSignIcon size={18} />
        <CustomInput
          name="goalAmount"
          type="number"
          placeholder="Goal Amount"
          value={formData.goalAmount}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <CalendarIcon size={18} />
        <CustomInput
          name="deadline"
          type="date"
          placeholder="Deadline"
          value={formData.deadline}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <InfoIcon size={18} />
        <CustomInput
          name="organizationId"
          placeholder="Organization ID"
          value={formData.organizationId}
          onChange={handleChange}
        />
      </div>

      <CustomButton type="submit">
        {isEditMode ? "Update Fundraiser" : "Create Fundraiser"}
      </CustomButton>
    </form>
  );
};
