import React from "react";
import { motion } from "framer-motion";
import { SignInButton, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const DonarCTA = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your contribution, no matter how small, can help transform a student's future.
            Join us in our mission to make quality education accessible to all.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/donation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Donate Now
                </motion.button>
              </SignInButton>
            </SignedOut>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg shadow-lg hover:bg-white/10 transition-all duration-200"
              onClick={() => navigate("/about-edu-empower")}
            >
              Learn More About Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonarCTA;