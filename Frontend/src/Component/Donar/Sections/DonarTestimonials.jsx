import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const DonarTestimonials = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold mb-4">
            SUCCESS STORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            Hear from Our Students
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read about the impact your donations have made on students' lives.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 p-1 rounded-2xl shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="bg-white p-8 md:p-12 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-indigo-100">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Student" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                  "The scholarship I received through Edu-Empower changed my life. I was able to complete my engineering degree and now work at a leading tech company. Without this support, I wouldn't have been able to pursue higher education."
                </blockquote>
                <div className="font-bold text-gray-900">Priya Sharma</div>
                <div className="text-sm text-gray-600">Computer Science Graduate, 2022</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonarTestimonials;