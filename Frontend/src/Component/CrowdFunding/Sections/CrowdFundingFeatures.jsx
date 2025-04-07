import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiUsers, FiShield, FiTrendingUp, FiGlobe, FiHeart } from "react-icons/fi";

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

const CrowdFundingFeatures = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
            Why Choose Our Platform
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-black"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're dedicated to making educational fundraising accessible, transparent, and effective
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-50 p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-200">
              <FiTarget className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Focused on Education</h3>
            <p className="text-gray-700">
              Our platform is exclusively dedicated to educational causes, ensuring your campaign reaches donors who are passionate about supporting students.
            </p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-50 p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-200">
              <FiShield className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Campaigns</h3>
            <p className="text-gray-700">
              We verify all campaigns to ensure legitimacy, building trust with donors and increasing your chances of reaching your funding goals.
            </p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-50 p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-200">
              <FiUsers className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Community Support</h3>
            <p className="text-gray-700">
              Join a community of students, educators, and donors who believe in the transformative power of education and mutual support.
            </p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-50 p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-200">
              <FiTrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Campaign Coaching</h3>
            <p className="text-gray-700">
              Receive guidance on creating compelling campaigns, sharing your story effectively, and maximizing your fundraising potential.
            </p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-50 p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-200">
              <FiGlobe className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Global Reach</h3>
            <p className="text-gray-700">
              Connect with donors from around the world who are eager to support educational initiatives and help students achieve their dreams.
            </p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-50 p-8 rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-200">
              <FiHeart className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Lower Fees</h3>
            <p className="text-gray-700">
              We charge lower platform fees compared to general crowdfunding sites, ensuring more of your donations go directly to your education.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CrowdFundingFeatures;