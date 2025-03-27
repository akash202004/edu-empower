import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight, FiSend, FiHeart, FiGlobe, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
    <footer className="relative bg-gradient-to-b from-white to-gray-100 text-gray-600 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <motion.div 
            className="absolute -top-24 -right-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-indigo-600 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute top-1/2 -left-32 w-56 sm:w-64 md:w-80 h-56 sm:h-64 md:h-80 bg-purple-600 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, 30, 0],
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 max-w-7xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl transform rotate-1"></div>
          <div className="relative bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm bg-white/90 overflow-hidden z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">Join Our Community</h3>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter for the latest scholarship opportunities, educational resources, and platform updates.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiHeart className="text-indigo-500" />
                  <span>Join 10,000+ subscribers who are making a difference</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
                    } transition-all duration-200 flex items-center justify-center shadow-md`}
                    whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Column 1: About */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <Link to="/" className="text-2xl font-bold text-gray-900">Edu-Empower</Link>
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-600 bg-gray-100 ${social.color} hover:text-white transition-colors duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center group"
                  >
                    <FiArrowRight className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center group"
                  >
                    <FiArrowRight className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@edu-empower.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                  <div className="mr-3 p-2 bg-indigo-100 rounded-full text-indigo-600">
                    <FiMail className="h-4 w-4" />
                  </div>
                  support@edu-empower.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                  <div className="mr-3 p-2 bg-indigo-100 rounded-full text-indigo-600">
                    <FiPhone className="h-4 w-4" />
                  </div>
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-start">
                  <div className="mr-3 p-2 bg-indigo-100 rounded-full text-indigo-600">
                    <FiMapPin className="h-4 w-4" />
                  </div>
                  <span>123 Education Street, Knowledge City, India - 400001</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Edu-Empower. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300">Terms of Service</Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
