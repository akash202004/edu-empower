import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiDollarSign, FiUsers, FiBookOpen, FiArrowRight } from "react-icons/fi";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

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

const DonarOptions = () => {
  const navigate = useNavigate();
  
  const donationOptions = [
    {
      title: "One-time Donation",
      description: "Make a single donation to support education for underprivileged students.",
      icon: FiDollarSign,
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Monthly Giving",
      description: "Set up a recurring donation to provide consistent support to students in need.",
      icon: FiHeart,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Sponsor a Student",
      description: "Cover the educational expenses of a specific student throughout their academic journey.",
      icon: FiUsers,
      color: "from-purple-400 to-indigo-500"
    },
    {
      title: "Fund a Scholarship",
      description: "Create a scholarship fund to support multiple students based on merit or need.",
      icon: FiBookOpen,
      color: "from-orange-400 to-pink-500"
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            WAYS TO GIVE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            Choose How You Want to Help
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer multiple ways for you to make a difference in students' lives.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {donationOptions.map((option, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className={`w-14 h-14 mb-6 rounded-lg flex items-center justify-center bg-gradient-to-r ${option.color}`}>
                <option.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
              <p className="text-gray-600 mb-6">{option.description}</p>
              <SignedOut>
                <SignInButton mode="modal" redirectUrl="/donation">
                  <button className="flex items-center text-indigo-600 font-medium">
                    Get Started <FiArrowRight className="ml-2" />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button 
                  className="flex items-center text-indigo-600 font-medium"
                  onClick={() => navigate("/donation")}
                >
                  Get Started <FiArrowRight className="ml-2" />
                </button>
              </SignedIn>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DonarOptions;