"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiHeart,
  FiEdit,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";
import { fundraiserService } from "../../api/fundraiserService";
import { EditFundraiserFormComponent } from "./EditFundraiserForm";
import { useUser } from "@clerk/clerk-react";

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

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState(50);
  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const currentOrganizationId = user?.id;
  const isOwner = project?.organizationId === currentOrganizationId;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      setLoading(true);
      try {
        const foundProject = await fundraiserService.getFundraiserById(id);
        if (foundProject) setProject(foundProject);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!donationAmount || donationAmount < 1) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    try {
      toast.loading("Creating payment order...");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: donationAmount }),
        }
      );

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) {
        toast.error(data.message || "Order creation failed");
        return;
      }

      const options = {
        key: import.meta.env.VITE_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "Edu-Empower",
        description: "Donation for fundraiser",
        order_id: data.id,
        handler: async (response) => {
          const verifyRes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donorId: user?.id,
                fundraiserId: project?.id,
                amount: donationAmount,
              }),
            }
          );

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Donation successful");
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#6366f1",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const timeDiff = end - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Project Not Found
          </h2>
          <button
            onClick={() => navigate("/crowdfunding")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return <EditFundraiserFormComponent id={id} />;
  }

  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.round(((project.raisedAmount || 0) / project.goalAmount) * 100),
    100
  );

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/crowdfunding")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition font-medium"
          >
            <FiArrowLeft className="h-5 w-5" /> Back to Projects
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="md:col-span-2">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              {/* Project Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                <div className="h-96 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Project Title and Stats */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {project.title}
                  </h1>
                  {isOwner && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      <FiEdit /> Edit
                    </button>
                  )}
                </div>
                <p className="text-xl text-gray-700 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center">
                    <span className="font-semibold">
                      ₹{project.raisedAmount?.toLocaleString() || 0}
                    </span>
                    <span className=" ml-1 font-semibold">
                      raised of ₹{project.goalAmount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="font-semibold">0</span>
                    <span className="text-gray-500 ml-1">backers</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="font-semibold">
                      {calculateDaysLeft(project.deadline)}
                    </span>
                    <span className="text-gray-500 ml-1">days left</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div
                    className="bg-indigo-600 h-4 rounded-full"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  ></div>
                </div>

                {/* Share buttons */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <FiShare2 className="h-4 w-4" /> Share
                  </button>
                  <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <FiHeart className="h-4 w-4" /> Like
                  </button>
                  <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <FiBookmark className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-8">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "about"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </button>
                  <button
                    className={`px-6 py-3 font-medium ${
                      activeTab === "updates"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("updates")}
                  >
                    Updates
                  </button>
                </div>

                <div className="py-6">
                  {activeTab === "about" && (
                    <div className="prose prose-indigo max-w-none">
                      <p className="text-gray-700">{project.about}</p>
                    </div>
                  )}

                  {activeTab === "updates" && (
                    <div className="space-y-6">
                      <p className="text-gray-500 italic">No updates yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white p-6 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Support This Project
              </h2>

              <form onSubmit={handleDonate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Donation Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₹</span>
                    </div>
                    <input
                      type="number"
                      min="5"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[25, 50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`px-4 py-2 rounded-lg border ${
                        donationAmount === amount
                          ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  whileHover={{
                    y: -5,
                    x: -5,
                    boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Donate Now
                </motion.button>

                <div className="text-sm text-gray-500 text-center">
                  Your donation is tax-deductible to the extent allowed by law.
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Share this project</h3>
                <div className="flex gap-3">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778C2.036 8.746 2 12 2 12s.036 3.259.403 4.819a2.5 2.5 0 0 0 1.767 1.763c1.566.41 7.83.417 7.83.417s6.265.007 7.831-.403a2.51 2.51 0 0 0 1.767-1.763C21.964 15.26 22 12 22 12s-.036-3.253-.407-4.797zM10 15V9l5.2 3-5.2 3z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
