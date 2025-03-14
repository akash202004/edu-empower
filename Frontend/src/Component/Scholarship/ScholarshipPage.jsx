import React, { useState, useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FiSearch,
  FiUser,
  FiInfo,
  FiDollarSign,
  FiCalendar,
  FiAward,
} from "react-icons/fi";

const ScholarshipSearchInterface = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    educationLevel: "",
    amount: "",
    gender: "",
  });

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

  const handleApplyNow = (scholarship) => {
    if (isSignedIn) {
      navigate("/scholarship/apply", { state: { scholarship } }); // Pass data
    } else {
      navigate("/sign-in");
    }
  };

  const filteredScholarships = scholarships.filter(
    (scholarship) =>
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.educationLevel
        ? scholarship.educationLevel === filters.educationLevel
        : true) &&
      (filters.amount ? scholarship.amount === filters.amount : true) &&
      (filters.gender ? scholarship.gender === filters.gender : true)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Search & Filters */}
      <div className="container mx-auto px-4 py-20">
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
          <select
            name="educationLevel"
            className="border p-2 rounded-md"
            onChange={handleFilterChange}
          >
            <option value="">All Education Levels</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
          <select
            name="amount"
            className="border p-2 rounded-md"
            onChange={handleFilterChange}
          >
            <option value="">All Amounts</option>
            <option value="$1,000">$1,000</option>
            <option value="$5,000">$5,000</option>
            <option value="$10,000">$10,000</option>
          </select>
          <select
            name="gender"
            className="border p-2 rounded-md"
            onChange={handleFilterChange}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Scholarship List */}
      <div className="container mx-auto px-4 ">
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            Loading scholarships...
          </div>
        ) : filteredScholarships.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border">
            <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No scholarships found</h3>
            <p>Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white rounded-lg shadow p-5 border"
              >
                <h2 className="text-lg font-semibold">{scholarship.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {scholarship.description}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <FiDollarSign className="text-gray-500" />
                  <span className="font-medium">{scholarship.amount}</span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <FiAward className="text-gray-500" />
                  <span className="text-sm">
                    {scholarship.scholarshipsAwarded}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <FiCalendar className="text-gray-500" />
                  <span className="text-sm">
                    Deadline: {scholarship.deadline}
                  </span>
                </div>
                <button
                  className="mt-4 bg-black cursor-pointer text-white px-4 py-2 rounded transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_#ffffffaa] hover:bg-gray-900"
                  onClick={() => handleApplyNow(scholarship)} // Pass scholarship data
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipSearchInterface;
