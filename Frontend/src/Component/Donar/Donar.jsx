import React, { useState, useRef, useEffect } from "react";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiHeart, FiDollarSign, FiUsers, FiBookOpen, FiArrowRight, FiCheck } from "react-icons/fi";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// Import sections
import DonarHero from "./Sections/DonarHero";
import DonarFeatures from "./Sections/DonarFeatures";
import DonarImpact from "./Sections/DonarImpact";
import DonarOptions from "./Sections/DonarOptions";
import DonarTestimonials from "./Sections/DonarTestimonials";
import DonarCTA from "./Sections/DonarCTA";

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

// Custom hook for detecting when elements are in view
const useInView = (ref, options = {}) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
            
            if (options.once && entry.isIntersecting) {
                observer.unobserve(ref.current);
            }
        }, {
            threshold: options.amount || 0,
            rootMargin: options.margin || '0px',
        });

        observer.observe(ref.current);

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options.once, options.amount, options.margin]);

    return isInView;
};

const navigation = [
    { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
    { name: "Scholarship", path: "/scholarship", authRequired: true },
    { name: "Donation", path: "/donation", authRequired: false },
];

const DonarPage = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  
  // Refs for scroll-based animations
  const heroRef = useRef(null);
  const impactRef = useRef(null);
  const donationOptionsRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  // InView states
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 });
  const isDonationOptionsInView = useInView(donationOptionsRef, { once: true, amount: 0.3 });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (isSignedIn) {
      navigate("/donation"); // Redirect if already signed in
    }
  }, [isSignedIn, navigate]);

  // Donation options
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-indigo-50" ref={pageRef}>
      
      
      {/* Hero Section */}
      <DonarHero />
      
      {/* Features Section */}
      <DonarFeatures />
      
      {/* Impact Section */}
      <DonarImpact />
      
      {/* Donation Options Section */}
      <DonarOptions />
      
      {/* Testimonials Section */}
      <DonarTestimonials />
      
      {/* CTA Section */}
      <DonarCTA />
      
     
    </div>
  );
};

export default DonarPage;