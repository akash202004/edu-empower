import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowLeft, FiHome, FiMail } from "react-icons/fi";
// Remove or comment out this import
// import confetti from "canvas-confetti";

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
};

const ContactSubmitted = () => {
  const navigate = useNavigate();

  // Trigger confetti effect when component mounts
  React.useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Launch confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }));
    }, 250);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <motion.div 
            variants={cardVariants}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <FiCheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Message Sent Successfully!</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Thank you for reaching out to us. We've received your message and will get back to you shortly.
            </p>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">What happens next?</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 font-semibold mr-3 flex-shrink-0">1</span>
                <span>Our team will review your message within 1-2 business days.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 font-semibold mr-3 flex-shrink-0">2</span>
                <span>You'll receive a confirmation email with a reference number for your inquiry.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 font-semibold mr-3 flex-shrink-0">3</span>
                <span>A member of our team will respond to your specific questions or concerns.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 font-semibold mr-3 flex-shrink-0">4</span>
                <span>If needed, we'll schedule a follow-up call or provide additional resources.</span>
              </li>
            </ol>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">While you wait, you can:</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-semibold mb-2 text-gray-800">Explore our resources</h3>
                <p className="text-gray-600 text-sm">
                  Check out our educational resources, blog posts, and success stories to learn more about our platform.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-semibold mb-2 text-gray-800">Browse campaigns</h3>
                <p className="text-gray-600 text-sm">
                  Discover and support educational campaigns that align with your interests and values.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-semibold mb-2 text-gray-800">Follow us on social media</h3>
                <p className="text-gray-600 text-sm">
                  Stay updated with our latest news, events, and educational initiatives on our social platforms.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-semibold mb-2 text-gray-800">Check our FAQ</h3>
                <p className="text-gray-600 text-sm">
                  Find answers to common questions about our platform, services, and educational support programs.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={cardVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
              whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft className="h-5 w-5" />
              Back to Contact
            </motion.button>
            
            <motion.button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
              whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHome className="h-5 w-5" />
              Go to Homepage
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Additional Support Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-12 text-center"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Need immediate assistance?</h2>
          <p className="text-gray-600 mb-6">
            For urgent inquiries, you can reach out to us directly
          </p>
          <div className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-200">
            <FiMail className="h-5 w-5 text-indigo-600" />
            <span className="font-medium">urgent@eduempower.org</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSubmitted;