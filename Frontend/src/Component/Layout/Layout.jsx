import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <motion.div 
        className="flex-grow pt-16 bg-[#2a303e]"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Layout;