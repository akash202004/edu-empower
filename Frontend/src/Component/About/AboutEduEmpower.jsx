import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiUsers, FiSearch, FiAward, FiHeart, FiDollarSign, FiBarChart2, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import CountUp from 'react-countup';

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

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm overflow-hidden"
      whileHover={{ y: -2 }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-gray-800">{question}</h3>
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

// Core solutions data
const coreSolutions = [
  {
    icon: <FiUsers className="w-7 h-7 text-indigo-300" />,
    title: "Crowdfunding Platform",
    description: "Students create profiles, share educational goals, and receive donations from individuals and organizations with transparent fund tracking."
  },
  {
    icon: <FiSearch className="w-7 h-7 text-indigo-300" />,
    title: "Scholarship Finder",
    description: "A database of scholarships with AI-driven shortlisting based on need and merit."
  },
  {
    icon: <FiAward className="w-7 h-7 text-indigo-300" />,
    title: "AI-Based Student Selection",
    description: "AI verifies documents, scores responses, and ranks students based on financial need and academic performance."
  },
  {
    icon: <FiHeart className="w-7 h-7 text-indigo-300" />,
    title: "Donor Portal",
    description: "Donors can browse profiles, donate, or sponsor students directly."
  },
  {
    icon: <FiBarChart2 className="w-7 h-7 text-indigo-300" />,
    title: "Transparency & Reporting",
    description: "Real-time fund tracking and impact assessment reports."
  },
  {
    icon: <FiDollarSign className="w-7 h-7 text-indigo-300" />,
    title: "Skill-Based Enhancement",
    description: "Students earn points from free courses, boosting their scholarship ranking."
  }
];

// Problem solutions data
const problemSolutions = [
  {
    title: "Financial Support for Students",
    description: "Reduces financial barriers to education through crowdfunding and scholarships."
  },
  {
    title: "AI-Powered Scholarship Matching",
    description: "Ensures students get the best funding opportunities based on merit and need."
  },
  {
    title: "Transparent Fund Management",
    description: "Ensures accountability and builds trust in donors."
  },
  {
    title: "Skill Development",
    description: "Encourages students to upskill through free online courses."
  },
  {
    title: "Mentorship & Community Support",
    description: "Provides direct guidance and learning resources from professionals."
  },
  {
    title: "Emergency Student Support",
    description: "A quick-access feature helps students get urgent financial aid or educational resources."
  }
];

// Feasibility analysis data
const feasibilityData = [
  {
    category: "Practical Implementation",
    points: [
      "AI-driven scholarship selection ensures fairness and transparency."
    ]
  },
  {
    category: "Technical Viability",
    points: [
      "Uses AI for student selection, scholarship recommendations, and donor-student matching.",
      "Cloud-based platform with secure payment integration and real-time tracking of fund allocation."
    ]
  },
  {
    category: "Market Potential",
    points: [
      "High demand for equitable educational funding solutions.",
      "Direct resource donations allow students to receive books, laptops.",
      "Targets students, donors, NGOs, and corporate sponsors"
    ]
  }
];

// Technical feasibility data
const technicalFeasibility = [
  {
    title: "Technology Stack",
    description: "MERN stack for web development, AWS for hosting, AI-based assessment engine."
  },
  {
    title: "Integration & Security",
    description: "Uses JWT for authentication, role-based access control (RBAC) for different user types."
  }
];

// Operational feasibility data
const operationalFeasibility = [
  {
    title: "Staff Training",
    description: "Ensuring institutions and NGOs can manage the platform effectively."
  },
  {
    title: "Data Privacy",
    description: "Compliance with data protection standards for donor and student information."
  }
];

// Financial viability data
const financialViability = [
  {
    title: "Revenue Streams",
    description: "Small transaction fees, premium donor features, corporate sponsorships."
  },
  {
    title: "Sustainability",
    description: "Partnerships with educational institutions, government grants, and NGOs."
  }
];

// Impact data
const impactData = [
  {
    title: "Improved Student Experience",
    points: [
      "AI-based selection removes bias and ensures fair scholarship allocation",
      "Crowdfunding allows students to receive support from multiple donors"
    ]
  },
  {
    title: "Access to Critical Information",
    points: [
      "Smart scholarship finder with advanced filters for easy searching",
      "Real-time tracking of fund utilization and impact reports"
    ]
  },
  {
    title: "Reduced Stress & Time",
    points: [
      "Students no longer need to browse multiple sites for financial aid",
      "Donors can efficiently find students who match their giving criteria"
    ]
  }
];

// Key advantages data
const keyAdvantages = [
  "All-in-One Solution: Crowdfunding, scholarships, donations, and mentorship in a single platform.",
  "Transparency: Real-time fund tracking builds trust.",
  "Equity in Education: Combines financial aid with mentorship and skill-building.",
  "Instant Support: Students can receive direct resource donations like laptops and books.",
  "Scalability: Can expand to universities, NGOs, and corporate sponsorships."
];

const AboutEduEmpower = () => {
  // Refs for scroll-based visibility
  const aboutRef = useRef(null);
  const missionRef = useRef(null);
  const solutionsRef = useRef(null);
  const feasibilityRef = useRef(null);
  const impactRef = useRef(null);
  const advantagesRef = useRef(null);

  // InView states for each section
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isSolutionsInView = useInView(solutionsRef, { once: true, amount: 0.3 });
  const isFeasibilityInView = useInView(feasibilityRef, { once: true, amount: 0.3 });
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 });
  const isAdvantagesInView = useInView(advantagesRef, { once: true, amount: 0.3 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 text-gray-800 min-h-screen border-4 border-black">
      {/* Hero Section with Parallax */}
      <div ref={aboutRef} className="relative border-b-4 border-black">
        {/* Animated Background Elements */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500 opacity-10 mix-blend-multiply filter blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 150 - 75],
              scale: [1, Math.random() * 1.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Main Hero Content */}
        <motion.section 
          className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          style={{ y, opacity }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 relative inline-block">
                About <span className="text-indigo-600 relative">
                  Edu-Empower
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.span>
                </span> 
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Democratizing Access to Educational Funding and Support
              </p>
              
              {/* Stats Counter Section */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div 
                  className="bg-indigo-50 p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600">
                    <CountUp end={5000} duration={2.5} separator="," />+
                  </div>
                  <p className="text-gray-700">Students Supported</p>
                </motion.div>
                <motion.div 
                  className="bg-indigo-50 p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600">
                    <CountUp end={2.5} duration={2.5} decimals={1} suffix="M" />
                  </div>
                  <p className="text-gray-700">Funds Raised</p>
                </motion.div>
                <motion.div 
                  className="bg-indigo-50 p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600">
                    <CountUp end={1200} duration={2.5} separator="," />+
                  </div>
                  <p className="text-gray-700">Scholarships</p>
                </motion.div>
                <motion.div 
                  className="bg-indigo-50 p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600">
                    <CountUp end={350} duration={2.5} />+
                  </div>
                  <p className="text-gray-700">Partner Organizations</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Mission Section */}
      <section 
        ref={missionRef} 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 border-b-4 border-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-indigo-600 relative inline-block">
              Our Mission
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                initial={{ width: 0 }}
                animate={isMissionInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto p-6 border-2 border-black rounded-2xl bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Edu-Empower is a comprehensive platform designed to bridge the gap between students and educational funding resources. By creating a unified ecosystem for scholarships, crowdfunding, and donations, we aim to democratize access to educational opportunities and reduce financial barriers to education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Solutions */}
      <section 
        ref={solutionsRef}
        className="py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate={isSolutionsInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
              Core Solutions
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                initial={{ width: 0 }}
                animate={isSolutionsInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our platform offers a comprehensive set of solutions to address educational funding challenges.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={isSolutionsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreSolutions.map((solution, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, x: -5, boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 border-2 border-black">
                  {React.cloneElement(solution.icon, { className: "w-7 h-7 text-indigo-600" })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{solution.title}</h3>
                <p className="text-gray-700">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Addresses The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block z-10">
            How It Addresses The Problem
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-black"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our comprehensive approach tackles educational funding challenges from multiple angles.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {problemSolutions.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white p-5 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              >
                <h3 className="text-lg font-bold mb-2 text-indigo-600">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feasibility Analysis */}
      <section 
        ref={feasibilityRef}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 border-b-4 border-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
              Feasibility Analysis
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A comprehensive assessment of the platform's viability across multiple dimensions.
            </p>
          </motion.div>

          {/* Main Feasibility Categories */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {feasibilityData.map((category, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              >
                <h3 className="text-xl font-bold mb-4 text-indigo-600">{category.category}</h3>
                <ul className="space-y-2">
                  {category.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheck className="mt-1 mr-2 text-indigo-500 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Technical, Operational, and Financial Feasibility */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Feasibility */}
            <motion.div 
              initial="hidden"
              animate={isFeasibilityInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            >
              <h3 className="text-xl font-bold mb-4 text-center text-indigo-600">Technical Feasibility</h3>
              <div className="space-y-4">
                {technicalFeasibility.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Operational Feasibility */}
            <motion.div 
              initial="hidden"
              animate={isFeasibilityInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            >
              <h3 className="text-xl font-bold mb-4 text-center text-indigo-600">Operational Feasibility</h3>
              <div className="space-y-4">
                {operationalFeasibility.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Financial Viability */}
            <motion.div 
              initial="hidden"
              animate={isFeasibilityInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            >
              <h3 className="text-xl font-bold mb-4 text-center text-indigo-600">Financial Viability</h3>
              <div className="space-y-4">
                {financialViability.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact on Target Audience */}
      <section 
        ref={impactRef}
        className="py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
              Potential Impact
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              How Edu-Empower transforms the educational funding landscape for students and donors.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {impactData.map((impact, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              >
                <h3 className="text-xl font-bold mb-4 text-indigo-600">{impact.title}</h3>
                <ul className="space-y-3">
                  {impact.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheck className="mt-1 mr-2 text-indigo-500 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Advantages */}
      <section 
        ref={advantagesRef}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50 border-b-4 border-black"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
              Key Advantages
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              What sets Edu-Empower apart from traditional educational funding platforms.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-1 gap-6"
          >
            <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <ul className="space-y-4">
                {keyAdvantages.map((advantage, index) => (
                  <motion.li 
                    key={index}
                    variants={cardVariants}
                    className="flex items-start"
                  >
                    <FiCheck className="mt-1 mr-3 text-indigo-500 flex-shrink-0" />
                    <span className="text-gray-700">{advantage}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
              Frequently Asked Questions
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Common questions about Edu-Empower and how it works.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <FaqItem 
              question="How does the AI-based student selection work?"
              answer="Our AI system analyzes student applications by verifying documents, scoring responses, and ranking students based on a combination of financial need and academic performance. This ensures a fair and transparent selection process."
            />
            <FaqItem 
              question="How is transparency maintained in fund allocation?"
              answer="We provide real-time tracking of all funds, allowing donors to see exactly how their contributions are being used. Regular impact assessment reports are also generated to show the outcomes of the funding."
            />
            <FaqItem 
              question="Can organizations partner with Edu-Empower?"
              answer="Yes, we welcome partnerships with educational institutions, NGOs, and corporate sponsors. These partnerships help us expand our reach and provide more resources to students in need."
            />
            <FaqItem 
              question="How does the skill-based enhancement system work?"
              answer="Students can take free online courses through our platform to earn points. These points boost their ranking in the scholarship selection process, encouraging continuous learning and skill development."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 max-w-5xl mx-auto rounded-3xl my-16 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Ready to Make a Difference?</h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Join Edu-Empower today and be part of a movement that's democratizing access to education.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth/role-selection">
                <motion.button
                  className="px-6 py-3 text-base font-medium text-indigo-700 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 w-48"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join as Student
                </motion.button>
              </Link>
              <Link to="/donation">
                <motion.button
                  className="px-6 py-3 text-base font-medium text-white bg-transparent border border-white rounded-full shadow-lg hover:bg-white/10 transition-all duration-300 w-48"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Become a Donor
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutEduEmpower;