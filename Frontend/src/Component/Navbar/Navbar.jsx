import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    await signOut();
    // Close dropdown after logout
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Edu-Empower"
              />
              <span className="ml-2 text-xl font-bold text-indigo-600">Edu-Empower</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/scholarship"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              Scholarships
            </Link>
            <Link
              to="/crowdfunding"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              Crowdfunding
            </Link>
            {isSignedIn ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none"
                  >
                    <span className="mr-2">{user.firstName}</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl || "https://via.placeholder.com/40"}
                      alt={user.firstName}
                    />
                    <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/student/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                    <Link 
                      to="/student/details" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/role-selection"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/scholarship"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Scholarships
            </Link>
            <Link
              to="/crowdfunding"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Crowdfunding
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isSignedIn ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl || "https://via.placeholder.com/40"}
                      alt={user.firstName}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.firstName} {user.lastName}</div>
                    <div className="text-sm font-medium text-gray-500">{user.emailAddresses[0].emailAddress}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                  >
                    <FiUser className="mr-2 h-4 w-4" />
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-5">
                <Link
                  to="/auth/role-selection"
                  className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
