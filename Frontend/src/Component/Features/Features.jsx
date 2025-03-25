import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiDollarSign, FiUsers, FiSearch, FiCheckCircle, FiShield } from 'react-icons/fi';

const Features = () => {
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

  // Features data
  const features = [
    {
      icon: <FiAward className="h-6 w-6 text-indigo-600" />,
      title: "Scholarship Matching",
      description: "Our intelligent matching system connects you with scholarships that fit your profile, increasing your chances of success."
    },
    {
      icon: <FiDollarSign className="h-6 w-6 text-indigo-600" />,
      title: "Crowdfunding Platform",
      description: "Create personalized campaigns to fund your education with support from family, friends, and the wider community."
    },
    {
      icon: <FiUsers className="h-6 w-6 text-indigo-600" />,
      title: "Mentorship Network",
      description: "Connect with experienced mentors who can guide you through your educational journey and career planning."
    },
    {
      icon: <FiSearch className="h-6 w-6 text-indigo-600" />,
      title: "Advanced Search",
      description: "Filter scholarships by amount, eligibility criteria, deadline, and more to find the perfect opportunities."
    },
    {
      icon: <FiCheckCircle className="h-6 w-6 text-indigo-600" />,
      title: "Application Tracking",
      description: "Keep track of all your scholarship applications in one place with status updates and deadline reminders."
    },
    {
      icon: <FiShield className="h-6 w-6 text-indigo-600" />,
      title: "Verified Opportunities",
      description: "All scholarships and funding opportunities on our platform are verified to ensure legitimacy and trustworthiness."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Succeed
          </h3>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our comprehensive platform provides all the tools and resources you need to fund your education.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">How It Works</h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple Process, Powerful Results
            </h3>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Getting started with Edu-Empower is easy. Follow these simple steps to begin your journey.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-indigo-100 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Create Your Profile</h4>
                <p className="text-gray-600">
                  Sign up and complete your profile with your academic background, achievements, and financial needs.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Explore Opportunities</h4>
                <p className="text-gray-600">
                  Browse scholarships that match your profile or create a crowdfunding campaign for your education.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Apply & Succeed</h4>
                <p className="text-gray-600">
                  Submit applications, track your progress, and receive the funding you need for your education.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Student Testimonial" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <svg className="h-12 w-12 text-indigo-300 mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-xl text-gray-600 italic mb-6">
                "Edu-Empower changed my life. I was struggling to fund my engineering degree until I found a perfect scholarship match through the platform. The application process was straightforward, and now I'm pursuing my dream career without financial stress."
              </p>
              <div>
                <h5 className="text-lg font-bold text-gray-900">Ananya Desai</h5>
                <p className="text-indigo-600">Computer Engineering Student, Mumbai</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;