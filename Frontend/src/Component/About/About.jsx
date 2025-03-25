import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiTrendingUp, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  // Team members
  const teamMembers = [
    {
      name: "Aisha Patel",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      description: "Former education policy advisor with a passion for making education accessible to all."
    },
    {
      name: "Raj Sharma",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      description: "Tech enthusiast who believes in using technology to solve social challenges."
    },
    {
      name: "Priya Singh",
      role: "Head of Partnerships",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
      description: "Experienced in building relationships with educational institutions and corporate sponsors."
    }
  ];

  // Stats
  const stats = [
    { label: "Students Helped", value: "5,000+", icon: <FiUsers className="text-indigo-500" /> },
    { label: "Scholarships Awarded", value: "₹2.5 Cr+", icon: <FiAward className="text-purple-500" /> },
    { label: "Educational Institutions", value: "120+", icon: <FiBookOpen className="text-blue-500" /> },
    { label: "Success Rate", value: "92%", icon: <FiTrendingUp className="text-green-500" /> }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">About Us</h2>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Mission & Vision
          </h3>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            We're dedicated to breaking down financial barriers to education and empowering students to achieve their dreams.
          </p>
        </motion.div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-indigo-600 px-6 py-4">
              <div className="flex items-center">
                <FiTarget className="text-white text-2xl mr-3" />
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                To create a platform that connects students with financial resources, mentorship, and community support to make quality education accessible to all, regardless of economic background.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FiBookOpen className="h-4 w-4" />
                  </span>
                  <span className="ml-3 text-gray-600">Provide access to scholarships and funding</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FiUsers className="h-4 w-4" />
                  </span>
                  <span className="ml-3 text-gray-600">Build a supportive community of learners</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FiHeart className="h-4 w-4" />
                  </span>
                  <span className="ml-3 text-gray-600">Empower students to pursue their dreams</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-purple-600 px-6 py-4">
              <div className="flex items-center">
                <FiTrendingUp className="text-white text-2xl mr-3" />
                <h3 className="text-xl font-bold text-white">Our Vision</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                A world where every student has the opportunity to pursue quality education without financial constraints, leading to a more equitable and prosperous society.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <FiAward className="h-4 w-4" />
                  </span>
                  <span className="ml-3 text-gray-600">Become the leading platform for educational funding</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <FiUsers className="h-4 w-4" />
                  </span>
                  <span className="ml-3 text-gray-600">Connect 1 million students with resources by 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <FiHeart className="h-4 w-4" />
                  </span>
                  <span className="ml-3 text-gray-600">Create lasting impact on educational accessibility</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                  {stat.icon}
                </div>
                <h4 className="text-3xl font-bold text-gray-900">{stat.value}</h4>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Team</h2>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Meet the People Behind Edu-Empower
          </h3>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our diverse team brings together expertise in education, technology, and social impact.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 00-7.679 3.766c0 .322.036.637.106.94-3.462-.173-6.532-1.832-8.584-4.354a4.118 4.118 0 001.27 5.49 4.092 4.092 0 01-1.858-.513v.052c0 1.995 1.418 3.66 3.304 4.038a4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
