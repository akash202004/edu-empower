import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiInfo,
  FiDollarSign,
  FiCalendar,
  FiAward,
  FiFilter
} from "react-icons/fi";
import { useUser, UserButton } from "@clerk/clerk-react";

const ScholarshipSearchInterface = () => {
  const { isSignedIn, user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ educationLevel: "", amount: "", gender: "" });

  useEffect(() => {
    setLoading(true);
    fetch("/data/scholarship.json")
      .then((response) => response.json())
      .then((data) => {
        setScholarships(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching scholarships:", error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filters.educationLevel ? scholarship.educationLevel === filters.educationLevel : true) &&
    (filters.amount ? scholarship.amount === filters.amount : true) &&
    (filters.gender ? scholarship.gender === filters.gender : true)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-black font-bold text-xl flex items-center">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-2">
              <span className="text-sm">E</span>
            </div>
            <span>Edu-Empower</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <div className="text-gray-800 flex items-center">
                  <FiUser className="mr-2" /> {user.fullName}
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <a href="/sign-in" className="text-gray-800 font-medium hover:text-black">
                Sign In
              </a>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-800 p-2 rounded-md"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-800"
              placeholder="Search scholarships by keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select name="educationLevel" className="border p-2 rounded-md" onChange={handleFilterChange}>
            <option value="">All Education Levels</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
          <select name="amount" className="border p-2 rounded-md" onChange={handleFilterChange}>
            <option value="">All Amounts</option>
            <option value="$1,000">$1,000</option>
            <option value="$5,000">$5,000</option>
            <option value="$10,000">$10,000</option>
          </select>
          <select name="gender" className="border p-2 rounded-md" onChange={handleFilterChange}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Scholarship List */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading scholarships...</div>
        ) : filteredScholarships.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border">
            <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No scholarships found</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-lg shadow p-5 border">
                <h2 className="text-lg font-semibold">{scholarship.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{scholarship.description}</p>
                <div className="mt-4 flex items-center space-x-2">
                  <FiDollarSign className="text-gray-500" />
                  <span className="font-medium">{scholarship.amount}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <FiAward className="text-gray-500" />
                  <span className="text-sm">{scholarship.scholarshipsAwarded}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <FiCalendar className="text-gray-500" />
                  <span className="text-sm">Deadline: {scholarship.deadline}</span>
                </div>
                <button className="mt-4 bg-black text-white px-4 py-2 rounded">Apply Now</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipSearchInterface;