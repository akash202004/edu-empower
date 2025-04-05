import { motion } from 'framer-motion';

// FAQ animations
export const faqItemVariants = {
  container: {
    hover: { y: -2 }
  },
  content: {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 }
  }
};

// Transition presets
export const transitions = {
  default: { duration: 0.3 },
  slow: { duration: 0.6 },
  spring: { type: "spring", stiffness: 100 }
};

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  }
};

// Float animations
export const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0], 
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    } 
  }
};

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    } 
  }
};

export const shimmerAnimation = {
  initial: { backgroundPosition: "0% 50%" },
  animate: { 
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], 
    transition: { 
      duration: 8, 
      repeat: Infinity, 
      ease: "linear" 
    } 
  }
};

// Advanced animations
export const rotateAnimation = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360, 
    transition: { 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear" 
    } 
  }
};

export const bounceAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -20, 0], 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 10, 
      repeat: Infinity, 
      repeatDelay: 1
    } 
  }
};

export const glowAnimation = {
  initial: { boxShadow: "0 0 0 rgba(79, 70, 229, 0)" },
  animate: { 
    boxShadow: ["0 0 0 rgba(79, 70, 229, 0)", "0 0 20px rgba(79, 70, 229, 0.7)", "0 0 0 rgba(79, 70, 229, 0)"], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    } 
  }
};