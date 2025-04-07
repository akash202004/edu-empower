import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiDollarSign, FiUsers, FiArrowRight } from "react-icons/fi";

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
  hover: { y: -5, transition: { duration: 0.2 } },
};

// Sample project data
const projects = [
  {
    id: 1,
    title: "Engineering Scholarship for Rural Students",
    description: "Help talented students from rural areas pursue engineering degrees at top universities.",
    raised: 12500,
    goal: 25000,
    backers: 78,
    daysLeft: 15,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Medical School Dreams",
    description: "Support aspiring doctors from underprivileged backgrounds to attend medical school.",
    raised: 18700,
    goal: 30000,
    backers: 124,
    daysLeft: 21,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Computer Science for All",
    description: "Provide laptops and programming courses for underprivileged students interested in tech careers.",
    raised: 8900,
    goal: 15000,
    backers: 67,
    daysLeft: 30,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

const CrowdFundingProjects = () => {
  const navigate = useNavigate();
  const projectsRef = useRef(null);

  return (
    <section className="py-16">
      <motion.div 
        ref={projectsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
          Featured Projects
          <motion.div 
            className="absolute -bottom-2 left-0 w-full h-1 bg-black"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Browse our current crowdfunding campaigns and help students achieve their educational goals
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl overflow-hidden border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${(project.raised / project.goal) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm mb-4">
                <span className="font-semibold">${project.raised.toLocaleString()} raised</span>
                <span className="text-gray-600">${project.goal.toLocaleString()} goal</span>
              </div>
              
              <div className="flex justify-between mb-6">
                <div className="flex items-center text-gray-700">
                  <FiUsers className="mr-1" />
                  <span>{project.backers} backers</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiCalendar className="mr-1" />
                  <span>{project.daysLeft} days left</span>
                </div>
              </div>
              
              <motion.button
                onClick={() => navigate(`/crowdfunding/project/${project.id}`)}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex justify-center items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Support This Project <FiArrowRight />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="text-center mt-12">
        <motion.button
          onClick={() => navigate("/crowdfunding/projects")}
          className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects
        </motion.button>
      </div>
    </section>
  );
};

export default CrowdFundingProjects;