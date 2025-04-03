import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FiTarget, FiHeart, FiTrendingUp, FiUsers, FiBookOpen, FiAward, FiCheck, FiArrowRight } from 'react-icons/fi';
import CountUp from 'react-countup';

const About = () => {
  const aboutRef = useRef(null);
  
  // Additional refs for scroll-based visibility
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  
  // InView states for each section
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  
  // Parallax effect setup - reduced for better visibility
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start start", "end start"]
  });
  
  // Reduced parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.95]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Text reveal variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Team members
  const teamMembers = [
    {
      name: "Aisha Patel",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      description: "Former education policy advisor with a passion for making education accessible to all."
    },
    {
      name: "Raj Sharma",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "Tech innovator with 15+ years experience building platforms that connect people with opportunities."
    },
    {
      name: "Priya Mehta",
      role: "Head of Partnerships",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
      description: "Former NGO director who has established partnerships with over 200 educational institutions."
    }
  ];

  // Impact stats
  const impactStats = [
    { value: 12000, label: "Students Supported", icon: <FiUsers className="h-6 w-6" /> },
    { value: 85, label: "Success Rate", suffix: "%", icon: <FiTrendingUp className="h-6 w-6" /> },
    { value: 500, label: "Partner Schools", icon: <FiBookOpen className="h-6 w-6" /> },
    { value: 4.5, label: "Million in Funding", decimals: 1, icon: <FiAward className="h-6 w-6" /> }
  ];

  // Core values
  const coreValues = [
    {
      title: "Accessibility",
      description: "We believe education should be accessible to everyone regardless of financial background.",
      icon: <FiTarget className="h-10 w-10 text-indigo-600" />
    },
    {
      title: "Empowerment",
      description: "Our platform empowers students to take control of their educational journey.",
      icon: <FiTrendingUp className="h-10 w-10 text-indigo-600" />
    },
    {
      title: "Community",
      description: "We foster a supportive community of students, donors, and educational institutions.",
      icon: <FiHeart className="h-10 w-10 text-indigo-600" />
    }
  ];

  // FAQ items
  const [activeIndex, setActiveIndex] = useState(null);
  const faqItems = [
    {
      question: "How does Edu-Empower select scholarship recipients?",
      answer: "We use a transparent merit and need-based system that evaluates academic performance, financial need, and personal circumstances. Our AI-powered matching algorithm helps identify the most suitable candidates for each scholarship opportunity."
    },
    {
      question: "Can international students apply for scholarships?",
      answer: "Yes, many of our scholarship opportunities are available to international students. Each scholarship has its own eligibility criteria, which are clearly listed on the scholarship details page."
    },
    {
      question: "How can I contribute as a donor?",
      answer: "You can contribute by creating a scholarship fund, donating to existing scholarships, or participating in our crowdfunding campaigns. We offer flexible donation options and provide full transparency on how your contributions are used."
    },
    {
      question: "What makes Edu-Empower different from other platforms?",
      answer: "Our platform combines AI-powered matching, transparent fund management, and a supportive community approach. We focus on creating sustainable educational opportunities rather than just one-time financial aid."
    }
  ];

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div ref={aboutRef} className="relative bg-white overflow-hidden">
      {/* Background elements - significantly reduced opacity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-normal filter blur-xl opacity-20"></div>
        <div className="absolute top-1/4 -left-24 w-72 h-72 bg-purple-100 rounded-full mix-blend-normal filter blur-xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-normal filter blur-xl opacity-20"></div>
      </div>

      {/* Animated particles - removed for better visibility */}
      
      {/* Content with reduced parallax effect */}
      <motion.div 
        className="relative z-10 pt-16 pb-20"
        style={{ y }}
      >
        {/* Hero section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div ref={missionRef} className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full mb-4">
                OUR MISSION
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Empowering Students Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-sm">
                Educational Opportunity
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-800 mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Edu-Empower bridges the gap between students with potential and the resources they need to succeed. 
              We connect deserving students with scholarships, mentors, and a supportive community.
            </motion.p>
          </div>

          {/* Impact stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md p-6 text-center transform transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix || ""} 
                    decimals={stat.decimals || 0}
                    duration={2.5} 
                    separator="," 
                  />
                </h3>
                <p className="text-sm text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Our story section */}
          <div ref={storyRef} className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              variants={textRevealVariants}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full mb-4">
                OUR STORY
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-shadow-sm">From Vision to Reality: The Edu-Empower Journey</h2>
              <p className="text-gray-800 mb-6 font-medium">
                Founded in 2020, Edu-Empower began with a simple observation: too many talented students were missing educational opportunities due to financial constraints. What started as a small scholarship matching service has grown into a comprehensive platform connecting students, donors, and educational institutions.
              </p>
              <p className="text-gray-800 mb-8 font-medium">
                Our team of educators, technologists, and social entrepreneurs is united by a common belief: education is the most powerful tool for social mobility and economic empowerment.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["Launched with 10 scholarship opportunities", "Expanded to 500+ partner institutions", "Developed AI-powered matching algorithm", "Created crowdfunding platform for student projects"].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center text-gray-800 font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <FiCheck className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More About Our Impact
                <FiArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isStoryInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-indigo-100 rounded-full"></div>
              <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-purple-100 rounded-full"></div>
              
              {/* Stats card */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-xl p-4 z-20"
                animate={{ y: [0, 5, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <FiTrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Success Rate</p>
                    <p className="text-xl font-bold text-gray-900">85% Graduation</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Core values section */}
          <div ref={valuesRef} className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.span 
                className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              >
                OUR VALUES
              </motion.span>
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-6 text-shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              >
                Guiding Principles That Drive Us
              </motion.h2>
              <motion.p 
                className="text-gray-800 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              >
                Our core values shape everything we do, from how we build our platform to how we interact with our community.
              </motion.p>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isValuesInView ? "visible" : "hidden"}
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 bg-indigo-500 rounded-full inline-block mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-800 font-medium">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Team section */}
          <div ref={teamRef} className="mb-24 relative z-30 bg-white py-8 rounded-2xl shadow-lg">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.span 
                className="inline-block px-3 py-1 text-xs font-semibold bg-pink-100 text-pink-800 rounded-full mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              >
                OUR TEAM
              </motion.span>
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-6 text-shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              >
                Meet the Changemakers
              </motion.h2>
              <motion.p 
                className="text-gray-800 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              >
                Our diverse team brings together expertise in education, technology, and social impact.
              </motion.p>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 px-4"
              variants={containerVariants}
              initial="hidden"
              animate={isTeamInView ? "visible" : "hidden"}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow relative z-20 border border-gray-200"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-indigo-600 mb-3 font-medium">{member.role}</p>
                    <p className="text-gray-800 font-medium">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* FAQ section */}
          <div ref={faqRef} className="mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.span 
                className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              >
                FAQ
              </motion.span>
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-6 text-shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p 
                className="text-gray-800 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              >
                Find answers to common questions about our platform, scholarships, and how you can get involved.
              </motion.p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="mb-4 bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button 
                    className="flex justify-between items-center w-full p-6 text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="font-bold text-gray-900">{item.question}</h3>
                    <svg 
                      className={`w-5 h-5 text-indigo-600 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <motion.div 
                    className="overflow-hidden"
                    initial={false}
                    animate={{ 
                      height: activeIndex === index ? 'auto' : 0,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-800 border-t border-gray-100 font-medium">
                      {item.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA section */}
          <motion.div 
            ref={ctaRef}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-shadow-sm">Ready to Make a Difference?</h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto font-medium">
              Whether you're a student seeking opportunities, a donor looking to make an impact, or an institution wanting to partner with us, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Join as a Student
              </motion.button>
              <motion.button 
                className="px-8 py-3 bg-indigo-800 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Become a Donor
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
