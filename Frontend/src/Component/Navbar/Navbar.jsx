import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser, useClerk, SignedIn, SignedOut } from "@clerk/clerk-react";
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser, FiHome, FiBookOpen, FiDollarSign, FiHeart, FiInfo, FiMail } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Add breakpoint detection for more precise responsive behavior
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  // Navigation links with icons
  const navLinks = [
    { name: "Home", path: "/", icon: <FiHome className="mr-2" /> },
    { name: "About", path: "/about", icon: <FiInfo className="mr-2" /> },
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
    // Close profile dropdown when opening menu
    if (!isMenuOpen) {
      setIsProfileOpen(false);
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    // Close mobile menu when opening profile
    if (!isProfileOpen && window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsProfileOpen(false);
    setIsMenuOpen(false); // Close mobile menu when logging out
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  const profileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile menu if clicked outside
      if (isProfileOpen && !event.target.closest('.profile-menu-container')) {
        setIsProfileOpen(false);
      }
      
      // Close mobile menu if clicked outside on mobile
      if (isMenuOpen && window.innerWidth < 768 && !event.target.closest('.mobile-menu-container') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isMenuOpen]);

  // Enhanced resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-close menus on resize
      if (width >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      // Adjust profile menu on different screen sizes
      if (width < 768 && isProfileOpen && !isMobile) {
        setIsProfileOpen(false);
      }
    };
  
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, isProfileOpen, isMobile]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-white bg-opacity-90 backdrop-blur-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo - made more responsive */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-lg sm:text-xl font-bold text-purple-700">Edu-Empower</span>
            </Link>
          </div>

          {/* Desktop Navigation - improved spacing */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-2 lg:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 hover:text-purple-700 ${
                  location.pathname === link.path
                    ? "text-purple-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <span className="md:hidden lg:inline-flex">{link.icon}</span>
                <span className={isTablet && link.name.length > 8 ? "text-xs" : ""}>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* User Menu (Desktop) - improved for tablet */}
          <div className="hidden md:flex md:items-center">
            <SignedIn>
              <div className="relative profile-menu-container">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-1 lg:space-x-2 text-gray-700 hover:text-purple-700 transition-colors duration-200"
                >
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="text-purple-700" />
                    )}
                  </div>
                  <span className="text-xs lg:text-sm font-medium hidden lg:block">
                    {user?.firstName || "User"}
                  </span>
                  <FiChevronDown
                    className={`transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    } w-4 h-4`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={profileMenuVariants}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <button
                        onClick={handleViewProfile}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        <FiUser className="mr-2" />
                        View Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        <FiLogOut className="mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex space-x-1 lg:space-x-2">
                <Link
                  to="/auth/role-selection"
                  className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-white bg-purple-700 rounded-md hover:bg-purple-800 transition-colors duration-200"
                >
                  Sign In / Sign Up
                </Link>
              </div>
            </SignedOut>
          </div>

          {/* Mobile menu button - improved touch target */}
          <div className="flex md:hidden">
            <SignedIn>
              <div className="flex items-center space-x-2">
                <div className="relative profile-menu-container mr-1">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 touch-manipulation"
                    aria-label="User profile"
                  >
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <FiUser className="text-purple-700" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={profileMenuVariants}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                      >
                        <button
                          onClick={handleViewProfile}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          <FiUser className="mr-2" />
                          View Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          <FiLogOut className="mr-2" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </SignedIn>

            <button
              onClick={toggleMenu}
              className="menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-700 focus:outline-none touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - improved animation and accessibility */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden mobile-menu-container overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg mx-2 sm:mx-4">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={menuItemVariants}>
                  <Link
                    to={link.path}
                    className={`flex items-center px-3 py-2.5 text-base font-medium rounded-md transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-purple-700 bg-purple-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <SignedOut>
                <motion.div variants={menuItemVariants} className="pt-4 border-t border-gray-200">
                  <Link
                    to="/auth/role-selection"
                    className="flex items-center px-3 py-2.5 text-base font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In / Sign Up
                  </Link>
                </motion.div>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
