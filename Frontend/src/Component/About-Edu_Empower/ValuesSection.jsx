import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGlobe, FiTrendingUp } from 'react-icons/fi';

const ValuesSection = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      } 
    }
  };

  const values = [
    {
      icon: <FiHeart className="h-8 w-8 text-red-500" />,
      title: "Compassion",
      description: "We believe in treating everyone with dignity and understanding the unique challenges each student faces."
    },
    {
      icon: <FiGlobe className="h-8 w-8 text-blue-500" />,
      title: "Inclusivity",
      description: "We're committed to creating opportunities for students from all backgrounds, regardless of geography, gender, or socioeconomic status."
    },
    {
      icon: <FiTrendingUp className="h-8 w-8 text-green-500" />,
      title: "Innovation",
      description: "We continuously seek new ways to connect students with resources and break down traditional barriers to education."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            OUR VALUES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Drives Us</h2>
          <p className="text-lg text-gray-700">
            Our core values guide everything we do at Edu-Empower, from how we build our platform to how we interact with our community.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;