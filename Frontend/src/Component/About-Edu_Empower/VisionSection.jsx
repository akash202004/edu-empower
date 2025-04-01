import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget } from 'react-icons/fi';

const VisionSection = ({ isVisionInView }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="vision" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isVisionInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            className="order-2 md:order-1 relative rounded-2xl overflow-hidden shadow-xl"
            variants={fadeIn}
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Students collaborating" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent flex items-end">
              <div className="p-6">
                <p className="text-white text-lg font-medium">Building a global community of learners</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="order-1 md:order-2" variants={fadeIn}>
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
              OUR VISION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A World Where Education is Accessible to All</h2>
            <p className="text-lg text-gray-700 mb-6">
              We envision a future where every student, regardless of their socioeconomic background, has equal access to educational opportunities. Our platform serves as a bridge connecting deserving students with the resources they need to succeed.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              By 2030, we aim to support over 1 million students globally, creating a ripple effect that transforms communities through the power of education.
            </p>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <FiTarget className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Strategic Goals</h3>
                <p className="text-gray-700">Expanding access, improving outcomes, building community</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;