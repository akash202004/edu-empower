import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight, FiSend, FiHeart, FiGlobe, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef(null);
  const newsletterRef = useRef(null);
  const linksRef = useRef(null);

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

  // InView states
  const isNewsletterInView = useInView(newsletterRef, { once: true, amount: 0.3 });
  const isLinksInView = useInView(linksRef, { once: true, amount: 0.3 });

  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your backend
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset the subscribed state after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  // Quick links for footer
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Scholarships", path: "/scholarship" },
    { name: "Crowdfunding", path: "/crowdfunding" },
    { name: "Donations", path: "/donation" },
    { name: "Contact", path: "/contact" },
  ];

  // Resources links
  const resourceLinks = [
    { name: "Student Guide", path: "/resources/student-guide" },
    { name: "Donor FAQ", path: "/resources/donor-faq" },
    { name: "Success Stories", path: "/resources/success-stories" },
    { name: "Blog", path: "/blog" },
    { name: "Help Center", path: "/help" },
  ];

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-b from-white to-indigo-50 text-gray-600 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
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
        {/* Background blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-3000"></div>
      </div>

      {/* Newsletter Section */}
      <motion.div 
        ref={newsletterRef}
        className="relative z-10 max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
        initial="hidden"
        animate={isNewsletterInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl transform rotate-1"></div>
          <div className="relative bg-white p-8 sm:p-10 rounded-xl shadow-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm bg-white/90 overflow-hidden z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={itemVariants}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 relative inline-block mb-4">
                  Join Our <span className="text-indigo-600 relative">
                    Community
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-black"
                      initial={{ width: 0 }}
                      animate={isNewsletterInView ? { width: "100%" } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.span>
                  </span>
                </h3>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter for the latest scholarship opportunities, educational resources, and platform updates.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiHeart className="text-indigo-500" />
                  <span>Join 10,000+ subscribers who are making a difference</span>
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
              >
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <motion.button
                    type="submit"
                    className={`px-6 py-3 rounded-lg font-medium text-white ${
                      subscribed 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    } transition-all duration-200 flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                    whileHover={{ 
                      y: -5, 
                      x: -5, 
                      boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {subscribed ? 'Subscribed!' : 'Subscribe'} 
                    {subscribed ? <FiCheckCircle className="ml-2" /> : <FiSend className="ml-2" />}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <motion.div 
          ref={linksRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12"
          variants={containerVariants}
          initial="hidden"
          animate={isLinksInView ? "visible" : "hidden"}
        >
          {/* Column 1: About */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <Link to="/" className="text-2xl font-bold text-gray-900 relative inline-block">
                Edu-Empower
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={isLinksInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.8 }}
                ></motion.span>
              </Link>
            </div>
            <p className="text-gray-600 mb-4">
              Breaking down financial barriers to education through scholarships, crowdfunding, and community support.
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: <FiFacebook />, href: "#", color: "hover:bg-blue-600" },
                { icon: <FiTwitter />, href: "#", color: "hover:bg-sky-500" },
                { icon: <FiInstagram />, href: "#", color: "hover:bg-pink-600" },
                { icon: <FiLinkedin />, href: "#", color: "hover:bg-blue-700" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-600 bg-gray-100 ${social.color} hover:text-white transition-colors duration-300 border border-gray-300`}
                  whileHover={{ scale: 1.1, rotate: 5, borderColor: "#000" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 relative inline-block">
              Quick Links
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600"
                initial={{ width: 0 }}
                animate={isLinksInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              ></motion.span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center group"
                  >
                    <FiArrowRight className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 relative inline-block">
              Resources
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600"
                initial={{ width: 0 }}
                animate={isLinksInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.span>
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center group"
                  >
                    <FiArrowRight className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 relative inline-block">
              Contact Us
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600"
                initial={{ width: 0 }}
                animate={isLinksInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.span>
            </h4>
            <ul className="space-y-3">
              <motion.li 
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="mailto:support@edu-empower.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                  <div className="mr-3 p-2 bg-indigo-100 rounded-full text-indigo-600 border border-indigo-200">
                    <FiMail className="h-4 w-4" />
                  </div>
                  support@edu-empower.com
                </a>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="tel:+919876543210" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                  <div className="mr-3 p-2 bg-indigo-100 rounded-full text-indigo-600 border border-indigo-200">
                    <FiPhone className="h-4 w-4" />
                  </div>
                  +91 9876543210
                </a>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                  <div className="mr-3 p-2 bg-indigo-100 rounded-full text-indigo-600 border border-indigo-200">
                    <FiMapPin className="h-4 w-4" />
                  </div>
                  Bangalore, India
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Copyright Section */}
      <motion.div 
        className="border-t border-gray-200 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Edu-Empower. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </motion.div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 text-white shadow-lg z-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        whileHover={{ 
          y: -5, 
          x: -5, 
          boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
