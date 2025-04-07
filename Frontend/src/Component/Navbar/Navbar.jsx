import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useUser, useClerk, SignedIn, SignedOut } from "@clerk/clerk-react";
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser, FiHome, FiBookOpen, FiDollarSign, FiHeart, FiInfo, FiMail } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation links with icons
  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome className="mr-2" /> },
    { name: "About", path: "/about-edu-empower", icon: <FiInfo className="mr-2" /> },
    { name: "Scholarships", path: "/scholarship", icon: <FiBookOpen className="mr-2" /> },
    { name: "Crowdfunding", path: "/crowdfunding", icon: <FiDollarSign className="mr-2" /> },
    { name: "Donation", path: "/donation", icon: <FiHeart className="mr-2" /> },
    { name: "Contact", path: "/contact", icon: <FiMail className="mr-2" /> },
  ];

  // Handle profile navigation
  const handleViewProfile = () => {
    // Log the user metadata to debug
    console.log("User metadata:", user?.publicMetadata);
    
    const role = user?.publicMetadata?.role || "STUDENT";
    console.log("Detected role:", role);
    
    // Check if the current path includes "organization" to determine context
    const isInOrganizationSection = location.pathname.includes("/organization");
    console.log("Is in organization section:", isInOrganizationSection);
    
    if (isInOrganizationSection || role === "ORGANIZATION") {
      // Direct redirect to organization profile if in organization section
      navigate("/organization/profile");
    } else if (role === "STUDENT") {
      navigate("/student/profile");
    } else {
      navigate("/donation");
    }
    setIsProfileOpen(false);
    setIsMenuOpen(false); // Close mobile menu when navigating
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    await signOut();
    setIsProfileOpen(false);
  };

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      color: "#4F46E5",
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3
      }
    }
  };

  const profileMenuVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 bg-white ${
        scrolled 
          ? 'py-0.5 border-b-2 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]' 
          : 'py-1'
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="relative">
                <div className="relative">
                  <img
                    className="h-8 w-auto"
                    src="/logo.png"
                    alt="Edu-Empower"
                  />
                </div>
              </div>
              <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Edu-Empower
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
                className="relative"
              >
                <Link
                  to={link.path}
                  className={`px-2 py-1 rounded-md text-sm font-medium flex items-center ${
                    location.pathname === link.path
                      ? 'text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 transition-colors duration-300'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                    layoutId="navbar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            {/* Auth buttons */}
            {isSignedIn ? (
              <div className="relative ml-3">
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={toggleProfile}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-white">
                        {user?.imageUrl ? (
                          <img
                            src={user.imageUrl}
                            alt={user.fullName || "User"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                            {user?.fullName?.charAt(0) || <FiUser />}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="ml-2 hidden lg:block">{user?.fullName?.split(' ')[0] || "User"}</span>
                    <FiChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                </motion.div>

                {/* Profile dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-1"
                      variants={profileMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <button
                        onClick={handleViewProfile}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 flex items-center"
                      >
                        <FiUser className="mr-2 h-4 w-4" />
                        Your Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 flex items-center"
                      >
                        <FiLogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/auth/role-selection">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                    whileHover={{ y: -2, x: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                    whileTap={{ scale: 0.95, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                  >
                    Sign up
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="flex md:hidden ml-2">
              <motion.button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors duration-300 border border-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg rounded-b-xl overflow-hidden border-2 border-t-0 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                      location.pathname === link.path
                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              {!isSignedIn && (
                <div className="pt-4 pb-2 border-t border-gray-200">
                  <div className="flex items-center px-3">
                    <div className="w-full">
                      <Link to="/auth/role-selection" onClick={() => setIsMenuOpen(false)}>
                        <motion.button
                          className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                          whileHover={{ y: -2, x: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                          whileTap={{ scale: 0.98, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                        >
                          Sign up
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
