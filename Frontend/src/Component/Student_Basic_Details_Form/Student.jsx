import React, { useState, useEffect, useRef } from "react";
import { SignInButton, SignedOut, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import CountUp from "react-countup";
import axios from "axios";

// Add the FaqItem component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -2 }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-indigo-600 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-gray-600">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

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

const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donation", authRequired: false },
];

const scholarships = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/901964/pexels-photo-901964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "David L. Burns Memorial Scholarship",
    amount: "$3,000",
    fundedBy: "Burns Foundation",
    deadline: "May 15, 2023",
    tags: ["Undergraduate", "STEM"],
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/7713311/pexels-photo-7713311.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Keri Sohlman Memorial Scholarship",
    amount: "$1,500",
    fundedBy: "Matthew Mingle",
    deadline: "June 30, 2023",
    tags: ["Graduate", "Arts"],
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/7713538/pexels-photo-7713538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Patricia Ann Whelan Memorial Scholarship",
    amount: "$500",
    fundedBy: "Whelan Family",
    deadline: "July 10, 2023",
    tags: ["High School", "Community Service"],
  },
];

// Recent winners for the testimonial section
const recentWinners = [
  {
    name: "Sophia Chen",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    scholarship: "STEM Excellence Scholarship",
    amount: "$5,000",
    quote:
      "Edu-Empower changed my life by connecting me with scholarships I never knew existed.",
    university: "MIT",
    field: "Computer Science",
  },
  {
    name: "Marcus Johnson",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    scholarship: "Future Leaders Grant",
    amount: "$2,500",
    quote:
      "The platform made it so easy to find and apply for scholarships tailored to my interests.",
    university: "Stanford",
    field: "Business Administration",
  },
  {
    name: "Aisha Patel",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    scholarship: "Global Citizen Award",
    amount: "$3,750",
    quote:
      "I was able to fund my entire semester thanks to the opportunities I found here.",
    university: "Columbia",
    field: "International Relations",
  },
];

// Add this BEFORE the component definition, not inside the JSX
const liveNotifications = [
  {
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    amount: "$2,500",
    time: "Just now",
  },
  {
    name: "Maria Garcia",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    amount: "$1,800",
    time: "2 minutes ago",
  },
  {
    name: "Jamal Williams",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    amount: "$3,200",
    time: "5 minutes ago",
  },
];

export default function ScholarshipHero() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeNotification, setActiveNotification] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (isSignedIn) {
      navigate("/scholarship");
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % recentWinners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotification((prev) => (prev + 1) % liveNotifications.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10,
  }));

  const handleUserSync = async () => {
    if (isSignedIn && user) {
      try {
        console.log("In handle sync");
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/registerorupdate`, {
          userId: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress || null,
          role: "STUDENT",
        });

        console.log(user.id);

        navigate("/scholarship");
      } catch (error) {
        console.error(
          "Error syncing user data:",
          error.response?.data || error.message
        );
      }
    }
  };

  // Auto-sync user on page load if signed in
  useEffect(() => {
    handleUserSync();
  }, [isSignedIn, user]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Hero Section with Parallax */}
      <div
        ref={heroRef}
        className="scholarship-hero-wrapper flex-grow relative"
      >
        {/* Animated Background Elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-100 opacity-30 mix-blend-multiply filter blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Main Content with Parallax Effect */}
        <motion.main
          className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-20 lg:py-28 gap-12 relative z-10"
          style={{ y, opacity }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Left Side - Enhanced Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Exclusive Scholarships,
                </motion.span>
                <br className="hidden md:inline" />
                <motion.span
                  className="text-gray-900 relative inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Matched to You
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </motion.span>
              </h1>
              <motion.p
                className="mt-6 text-xl text-gray-600 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                New scholarships published daily and matched to your profile,
                increasing your chances of winning by up to{" "}
                <span className="font-bold text-indigo-600">75%</span>.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <SignedOut>
                <SignInButton mode="modal" redirectUrl="/scholarship">
                  <motion.button
                    onClick={handleUserSync()}
                    className="mt-8 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-xl shadow-lg relative overflow-hidden group"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">
                      Apply for scholarships
                    </span>
                    <motion.span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                      transition={{ duration: 0.3 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </SignInButton>
              </SignedOut>

              <motion.div
                className="mt-4 flex items-center justify-center lg:justify-start space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-500">100% free</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-500">
                    No essay required
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-500">
                    5-min application
                  </span>
                </div>
              </motion.div>

              {/* Enhanced Stats Section with Animated Counters */}
              <motion.div
                className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 transform scale-0 group-hover:scale-100 rounded-xl"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative">
                    <p className="text-3xl font-bold text-indigo-600">
                      <CountUp end={33} suffix="M+" duration={2.5} />
                    </p>
                    <p className="text-sm text-gray-600">Awarded</p>
                  </div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 transform scale-0 group-hover:scale-100 rounded-xl"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative">
                    <p className="text-3xl font-bold text-indigo-600">
                      <CountUp end={12} suffix="K+" duration={2} />
                    </p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white p-5 rounded-xl shadow-md relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 transform scale-0 group-hover:scale-100 rounded-xl"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative">
                    <p className="text-3xl font-bold text-indigo-600">
                      <CountUp end={5} suffix="K+" duration={1.5} />
                    </p>
                    <p className="text-sm text-gray-600">Scholarships</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>{" "}
            {/* This closing tag was missing */}
            {/* Enhanced Universities Section */}
            <motion.div
              className="mt-12 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-gray-500 font-semibold uppercase mb-4">
                Scholarships Featured By:
              </p>
              <div className="flex flex-wrap items-center gap-8">
                {[
                  {
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBwuddBfDYzFHfvCjSk2dHhn1KL_weVdxIA&s",
                    alt: "Harvard",
                    height: "h-10",
                  },
                  {
                    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/800px-The_University_of_California_UCLA.svg.png",
                    alt: "UCLA",
                    height: "h-8",
                  },
                  {
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTHxjibjLvPaPJSKRAFk2Oxyr_yxfcXeDYg6BF4jWJ5AERnOPn8NgeeMy&s=10",
                    alt: "Michigan",
                    height: "h-8",
                  },
                  {
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dtvPjZYkcgpbq18XmHvPnTEuyCOGIiGl3ERrtNtzlVeXYvTtp_j-_Odx&s=10",
                    alt: "Berkeley",
                    height: "h-10",
                  },
                  {
                    src: "https://collegeaim.org/wp-content/uploads/2021/09/syracuse.png",
                    alt: "Syracuse",
                    height: "h-8",
                  },
                ].map((uni, index) => (
                  <motion.img
                    key={index}
                    src={uni.src}
                    alt={uni.alt}
                    className={`${uni.height} grayscale hover:grayscale-0 transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Enhanced Interactive Card */}
          <motion.div
            className="relative flex-1 max-w-md mx-auto mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <motion.div
              className="relative"
              animate={isHovering ? { y: -5 } : { y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0"
                animate={{
                  y: [0, 10, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Main Card with 3D Effect */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100 relative z-10"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)",
                  transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Scholarship Recipients"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Live Counter with Animation */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center">
                      <motion.span
                        className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-medium">LIVE UPDATES</span>
                    </div>
                    <h3 className="text-2xl font-bold mt-1">
                      <CountUp
                        start={33900000}
                        end={33911846}
                        duration={15}
                        prefix="$"
                      />
                    </h3>
                    <p className="text-sm opacity-90">
                      Awarded to Edu-Empower Members
                    </p>
                  </div>

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mr-1.5 animate-pulse"></span>
                      New scholarships added today
                    </span>
                  </motion.div>
                </div>

                {/* Enhanced Testimonial Section */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Recent Winners</h3>
                    <div className="flex space-x-1">
                      {recentWinners.map((_, idx) => (
                        <motion.button
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx === activeTestimonial
                              ? "bg-indigo-600"
                              : "bg-gray-300"
                          }`}
                          onClick={() => setActiveTestimonial(idx)}
                          whileHover={{ scale: 1.5 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Testimonial Carousel */}
                  <div className="relative h-40">
                    {recentWinners.map((winner, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute inset-0 flex items-start space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: idx === activeTestimonial ? 1 : 0,
                          x: idx === activeTestimonial ? 0 : 20,
                          scale: idx === activeTestimonial ? 1 : 0.9,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <div className="relative">
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-sm opacity-70"
                            animate={{
                              opacity: [0.5, 0.8, 0.5],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          <img
                            src={winner.image}
                            alt={winner.name}
                            className="w-12 h-12 rounded-full object-cover relative z-10 border-2 border-white"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {winner.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Won{" "}
                            <span className="font-semibold text-indigo-600">
                              {winner.amount}
                            </span>{" "}
                            • {winner.scholarship}
                          </p>
                          <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                            <p className="text-sm italic text-gray-700">
                              "{winner.quote}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <div className="px-6 pb-6">
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl relative overflow-hidden group"
                    whileHover={{
                      boxShadow:
                        "0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 w-0 bg-white opacity-20"
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center">
                      Find Your Scholarship Match
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced Notification Popups */}
              <AnimatePresence>
                {liveNotifications.map(
                  (notification, idx) =>
                    idx === activeNotification && (
                      <motion.div
                        key={idx}
                        className="absolute -right-10 w-70 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-sm opacity-70"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <img
                              src={notification.image}
                              alt={notification.name}
                              className="h-10 w-10 rounded-full border-2 border-white relative z-10"
                            />
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">
                              {notification.name} won{" "}
                              <span className="text-green-600">
                                {notification.amount}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.main>

        {/* How It Works Section */}
        <motion.section
          className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                How Edu-Empower Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform simplifies the scholarship process from start to
                finish
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden group"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Create Your Profile
                  </h3>
                  <p className="text-gray-600">
                    Complete your student profile with academic information,
                    interests, and achievements.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden group"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Get Matched
                  </h3>
                  <p className="text-gray-600">
                    Our algorithm matches you with scholarships that fit your
                    unique qualifications.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden group"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Apply & Win
                  </h3>
                  <p className="text-gray-600">
                    Apply directly through our platform with simplified
                    applications and track your status.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="py-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Student Success Stories
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from students who have successfully funded their education
                through Edu-Empower
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentWinners.map((winner, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md"
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-sm opacity-70"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <img
                        src={winner.image}
                        alt={winner.name}
                        className="w-14 h-14 rounded-full object-cover relative z-10 border-2 border-white"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg text-gray-900">
                        {winner.name}
                      </h3>
                      <p className="text-sm text-indigo-600">
                        {winner.scholarship}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="italic text-gray-700">"{winner.quote}"</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Award Amount</span>
                    <span className="font-bold text-indigo-600">
                      {winner.amount}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about our scholarship platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <FaqItem
                question="How do I qualify for scholarships?"
                answer="Each scholarship has its own eligibility criteria. Our matching algorithm will show you scholarships you're eligible for based on your profile information, academic achievements, and other factors."
              />
              <FaqItem
                question="Is there a fee to use Edu-Empower?"
                answer="No, Edu-Empower is completely free for students. We're committed to making education more accessible by connecting students with scholarship opportunities at no cost."
              />
              <FaqItem
                question="How often are new scholarships added?"
                answer="We add new scholarships daily. Our team constantly researches and verifies new opportunities to ensure you have access to the most current funding options."
              />
              <FaqItem
                question="Can international students apply?"
                answer="Yes, we have scholarships available for international students. When you create your profile, you can specify your citizenship status to see eligible opportunities."
              />
              <FaqItem
                question="How long does the application process take?"
                answer="Most applications through our platform take less than 5 minutes to complete. We've streamlined the process to save you time while maximizing your chances of success."
              />
              <FaqItem
                question="When will I know if I've won a scholarship?"
                answer="Notification timelines vary by scholarship provider. You can track the status of all your applications in your dashboard, and we'll notify you immediately when there's an update."
              />
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative px-6 py-16 md:p-12 lg:p-16">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

              <div className="relative z-10 text-center">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Ready to Fund Your Education?
                </motion.h2>
                <motion.p
                  className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Join thousands of students who have already discovered and won
                  scholarships through Edu-Empower. It takes less than 2 minutes
                  to get started.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <SignedOut>
                    <SignInButton mode="modal" redirectUrl="/scholarship">
                      <motion.button
                        className="px-8 py-4 bg-white text-indigo-600 text-lg font-medium rounded-xl shadow-lg relative overflow-hidden group"
                        whileHover={{
                          scale: 1.05,
                          boxShadow:
                            "0 10px 25px -5px rgba(255, 255, 255, 0.4)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">
                          Create Your Free Account
                        </span>
                        <motion.span
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                          transition={{ duration: 0.3 }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </SignInButton>
                  </SignedOut>

                  <p className="mt-4 text-sm text-indigo-200">
                    No credit card required • Instant access to scholarships
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
