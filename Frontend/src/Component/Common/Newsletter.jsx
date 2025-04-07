import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiMail, FiSend } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Newsletter = ({ bgColor = "bg-gradient-to-r from-indigo-600 to-purple-600", className = "" }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, you would call an API to subscribe the user
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("✅ Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("❌ Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${bgColor} max-w-5xl mx-auto rounded-3xl my-16 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Join Our Community</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Stay updated with our latest news, events, and educational resources by subscribing to our newsletter.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="pl-10 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-full bg-white border-2 border-black text-gray-800"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 text-base font-medium text-indigo-700 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px]"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-indigo-600" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <>
                  <FiSend className="h-5 w-5" />
                  Subscribe
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;