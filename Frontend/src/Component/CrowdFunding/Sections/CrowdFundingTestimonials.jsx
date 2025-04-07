import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Medical Student",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "Thanks to the generous donors on Edu-Empower, I was able to raise enough money to cover my first year of medical school. The platform was easy to use, and the support team helped me create a compelling campaign.",
    raised: "$12,500",
    school: "Stanford University"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Computer Science Major",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "I needed a new laptop for my programming courses, and within two weeks of launching my campaign, I reached my goal. The Edu-Empower community is incredibly supportive and believes in the power of education.",
    raised: "$2,800",
    school: "MIT"
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Engineering Student",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "As a first-generation college student, I was struggling to afford my engineering textbooks. The crowdfunding campaign I created helped me purchase all the materials I needed and connect with mentors in my field.",
    raised: "$1,500",
    school: "Georgia Tech"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Art History Graduate",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote: "I raised funds for my study abroad program in Italy, which was crucial for my art history research. The platform's focus on educational causes helped me reach donors who specifically wanted to support academic pursuits.",
    raised: "$5,200",
    school: "NYU"
  }
];

const CrowdFundingTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const handleDotClick = (index) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
            Success Stories
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-black"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear from students who have successfully funded their educational journeys
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center bg-white rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="md:w-1/3 p-8 bg-indigo-600 text-white h-full flex flex-col justify-center">
                <div className="mb-6">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-24 h-24 rounded-full border-4 border-white mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-bold text-center mb-1">{testimonials[currentIndex].name}</h3>
                <p className="text-indigo-200 text-center mb-4">{testimonials[currentIndex].role}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-indigo-200">School:</span>
                    <span className="font-medium">{testimonials[currentIndex].school}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-200">Raised:</span>
                    <span className="font-medium">{testimonials[currentIndex].raised}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <svg className="h-12 w-12 text-indigo-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl text-gray-700 mb-8 italic">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex justify-center md:justify-start space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border-2 border-black hover:bg-gray-100 transition z-10"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border-2 border-black hover:bg-gray-100 transition z-10"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CrowdFundingTestimonials;