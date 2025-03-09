import React, { useState } from "react";
import {
  FiSearch,
  FiTrendingUp,
  FiChevronDown,
  FiCalendar,
  FiAward,
  FiDollarSign,
  FiBookOpen,
  FiCheck,
  FiMenu,
  FiX
} from "react-icons/fi";

const ScholarshipSearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-black font-bold text-2xl flex items-center">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-2">
                <span className="text-sm">E</span>
              </div>
              Edu-Empower
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8 text-gray-800 font-medium">
            <button className="hover:text-black relative group">
              <div className="flex items-center">
                View Scholarships <FiChevronDown className="ml-1" />
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button className="hover:text-black relative group">
              <span>Banking</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button className="hover:text-black relative group">
              <span>Resources</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button className="hover:text-black relative group">
              <span>Leaders</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button className="hover:text-black relative group">
              <span>Funds</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button className="hover:text-black relative group">
              <div className="flex items-center">
                Company <FiChevronDown className="ml-1" />
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white p-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button className="flex items-center justify-between py-2 border-b border-gray-100">
                View Scholarships <FiChevronDown />
              </button>
              <button className="py-2 border-b border-gray-100">Banking</button>
              <button className="py-2 border-b border-gray-100">Resources</button>
              <button className="py-2 border-b border-gray-100">Leaders</button>
              <button className="py-2 border-b border-gray-100">Funds</button>
              <button className="flex items-center justify-between py-2 border-b border-gray-100">
                Company <FiChevronDown />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-4 text-gray-500" />
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-black focus:border-black focus:outline-none transition"
              placeholder="Search scholarships by keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center text-gray-700 mt-3 text-sm hover:text-black transition">
            <FiTrendingUp className="mr-2" /> Show popular searches
          </button>
        </div>

        {/* Filter and Sort Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 items-center">
          <div className="md:col-span-3">
            <button className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 w-full hover:border-gray-500 transition">
              Any Education Level <FiChevronDown />
            </button>
          </div>
          <div className="md:col-span-3">
            <button className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 w-full hover:border-gray-500 transition">
              Any Category <FiChevronDown />
            </button>
          </div>
          <div className="md:col-span-3">
            <button className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 w-full hover:border-gray-500 transition">
              Any Status <FiChevronDown />
            </button>
          </div>
          <div className="md:col-span-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative mr-2">
                <input 
                  type="checkbox" 
                  id="noEssay" 
                  className="appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-black checked:border-transparent focus:outline-none cursor-pointer"
                />
                <FiCheck className="absolute top-0.5 left-0.5 text-white pointer-events-none opacity-0 check-visible" />
              </div>
              <label htmlFor="noEssay" className="text-gray-800 font-medium cursor-pointer">
                No-Essay Only
              </label>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2 hidden sm:inline">Sort by:</span>
              <button className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 hover:border-gray-500 transition">
                Newest <FiChevronDown className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Scholarship Card */}
        <div className="bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Scholarship Badge */}
            <div className="mr-6 mb-4 md:mb-0">
              <div className="relative w-32 h-32 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-lg">$2,000</div>
                <div className="absolute bottom-0 left-0 right-0 text-center text-xs font-bold text-white bg-black py-1 rounded-b-lg">
                  SCHOLARSHIP
                </div>
              </div>
            </div>

            {/* Scholarship Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    No Essay Scholarship by Sallie
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <span>Funded by</span>
                    <div className="w-6 h-6 bg-gray-800 text-white rounded-full mx-2 flex items-center justify-center">
                      <span className="text-xs">S</span>
                    </div>
                    <span className="font-medium">Sallie</span>
                    <FiCheck className="ml-1 text-green-500" />
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    Sponsored
                  </span>
                </div>
              </div>

              {/* Scholarship Info */}
              <p className="text-gray-700 mt-3">
                Sallie will award $2,000 each month to eligible entrants. No
                essay or account profiles required.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  {
                    label: "Education level",
                    icon: <FiBookOpen />,
                    value: "Any",
                  },
                  {
                    label: "Amount",
                    icon: <FiDollarSign />,
                    value: "$2,000",
                  },
                  {
                    label: "Scholarships awarded",
                    icon: <FiAward />,
                    value: "1 monthly winner",
                  },
                  {
                    label: "Next Deadline",
                    icon: <FiCalendar />,
                    value: "Apr 1, 2025",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="text-gray-500 text-sm mb-1">
                      {item.label}
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">{item.icon}</span>
                      <span className="font-medium text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-4 md:ml-6 md:mt-0">
              <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .check-visible {
          opacity: 0;
        }
        input:checked + .check-visible {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ScholarshipSearchInterface;