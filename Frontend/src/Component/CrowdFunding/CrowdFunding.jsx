import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion} from "framer-motion";
import { FiSearch, FiFilter, FiArrowRight, FiBookOpen, FiDollarSign, FiUsers} from "react-icons/fi";

// Import sections
import CrowdFundingHero from "./Sections/CrowdFundingHero";
import CrowdFundingFeatures from "./Sections/CrowdFundingFeatures";
import CrowdFundingCTA from "./Sections/CrowdFundingCTA";
import CrowdFundingTestimonials from "./Sections/CrowdFundingTestimonials";

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
  hover: { y: -10, transition: { duration: 0.2 } },
};

// Sample project data (in a real app, this would come from an API)
const projectsData = [
  {
    id: 1,
    title: "Engineering Scholarship for Rural Students",
    description: "Help talented students from rural areas pursue engineering degrees at top universities.",
    raised: 12500,
    goal: 25000,
    backers: 78,
    daysLeft: 15,
    category: "scholarship",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Medical School Dreams: Support Future Doctors",
    description: "Fund scholarships for promising students from underserved communities to attend medical school.",
    raised: 35000,
    goal: 50000,
    backers: 142,
    daysLeft: 30,
    category: "scholarship",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "Laptops for Low-Income College Students",
    description: "Provide essential technology tools for students who cannot afford them but need them for their studies.",
    raised: 8200,
    goal: 15000,
    backers: 64,
    daysLeft: 22,
    category: "technology",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "STEM Education for Girls in Developing Countries",
    description: "Support programs that encourage girls to pursue education and careers in science, technology, engineering, and mathematics.",
    raised: 18700,
    goal: 30000,
    backers: 210,
    daysLeft: 45,
    category: "program",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 5,
    title: "Art Supplies for Underfunded Schools",
    description: "Provide art supplies to schools in low-income areas to ensure all students have access to creative education.",
    raised: 5600,
    goal: 10000,
    backers: 89,
    daysLeft: 18,
    category: "supplies",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    title: "First-Generation College Student Fund",
    description: "Support students who are the first in their families to attend college with scholarships and mentoring.",
    raised: 22000,
    goal: 40000,
    backers: 156,
    daysLeft: 60,
    category: "scholarship",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

const CrowdFunding = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);
  
  // Filter and sort projects when search term, category, or sort option changes
  useEffect(() => {
    let result = [...projects];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        // In a real app, you would sort by creation date
        break;
      case "mostFunded":
        result.sort((a, b) => b.raised - a.raised);
        break;
      case "endingSoon":
        result.sort((a, b) => a.daysLeft - b.daysLeft);
        break;
      case "mostPopular":
        result.sort((a, b) => b.backers - a.backers);
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [searchTerm, selectedCategory, sortBy, projects]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <CrowdFundingHero />
      
      {/* Features Section */}
      <CrowdFundingFeatures />
      
      {/* Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
              Current Campaigns
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              ></motion.div>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
              Browse and support educational campaigns that resonate with you
            </p>
            
     
          </motion.div>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search campaigns..."
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="newest">Newest</option>
                  <option value="mostFunded">Most Funded</option>
                  <option value="endingSoon">Ending Soon</option>
                  <option value="mostPopular">Most Popular</option>
                </select>
                
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <FiFilter className="h-5 w-5" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === "all" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                All Categories
              </button>
              <button
                onClick={() => handleCategoryChange("scholarship")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === "scholarship" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Scholarships
              </button>
              <button
                onClick={() => handleCategoryChange("technology")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === "technology" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Technology
              </button>
              <button
                onClick={() => handleCategoryChange("supplies")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === "supplies" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                School Supplies
              </button>
              <button
                onClick={() => handleCategoryChange("program")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === "program" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Educational Programs
              </button>
            </div>
          
          {/* Project Cards */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">${project.raised.toLocaleString()} raised</span>
                        <span className="text-gray-500">${project.goal.toLocaleString()} goal</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (project.raised / project.goal) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <FiUsers className="mr-1" />
                        <span>{project.backers} backers</span>
                      </div>
                      <div className="flex items-center">
                        <FiBookOpen className="mr-1" />
                        <span>{project.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <button 
                      onClick={() => navigate(`/crowdfunding/project/${project.id}`)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
                    >
                      Support This Project
                      <FiArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FiSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            )}
          </motion.div>
          
          {/* Load More Button */}
          {filteredProjects.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition">
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <CrowdFundingTestimonials />
      
      {/* CTA Section */}
      <CrowdFundingCTA />
    </div>
  );
};

export default CrowdFunding;