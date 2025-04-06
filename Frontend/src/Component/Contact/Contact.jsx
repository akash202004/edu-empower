import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiUser, FiSend } from "react-icons/fi";

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
  hover: { y: -5, transition: { duration: 0.2 } },
};

// Custom hook for detecting when elements are in view
const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      
      if (options.once && entry.isIntersecting) {
        observer.unobserve(ref.current);
      }
    }, {
      threshold: options.amount || 0,
      rootMargin: options.margin || '0px',
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options.once, options.amount, options.margin]);

  return isInView;
};

const Contact = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Refs for scroll-based animations
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  // InView states
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.3 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "your_service_id",
        "your_template_id",
        formData,
        "your_public_key"
      );
      toast.success("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("❌ Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 text-gray-800 min-h-screen">
      {/* Hero Section with Parallax */}
      <div ref={contactRef} className="relative">
        {/* Animated Background Elements */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500 opacity-10 mix-blend-multiply filter blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 150 - 75],
              scale: [1, Math.random() * 1.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Main Hero Content */}
        <motion.section 
          className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          style={{ y, opacity }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 relative inline-block">
                Get in <span className="text-indigo-600 relative">
                  Touch
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.span>
                </span> 
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                We're here to help and answer any questions you might have
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="mb-6">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-medium"
              >
                <span className="text-xl">←</span> Back to Home
              </button>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
              Send us a Message
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600"
                initial={{ width: 0 }}
                animate={isFormInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8 }}
              ></motion.span>
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                variants={cardVariants}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Subject
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="relative"
              >
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FiSend className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Your message..."
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="bg-indigo-600 text-white w-full py-3 rounded-xl hover:bg-indigo-700 transition font-semibold flex justify-center items-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                disabled={isLoading}
                whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
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
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            ref={infoRef}
            initial="hidden"
            animate={isInfoInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col justify-between"
          >
            <motion.div 
              variants={cardVariants}
              className="bg-white p-8 rounded-2xl shadow-2xl mb-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
                Contact Information
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={isInfoInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.8 }}
                ></motion.span>
              </h2>

              <div className="space-y-6">
                <motion.div 
                  variants={cardVariants}
                  className="flex items-start"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 border border-indigo-200">
                    <FiMail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">support@eduempower.org</p>
                    <p className="text-gray-600">info@eduempower.org</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardVariants}
                  className="flex items-start"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 border border-indigo-200">
                    <FiPhone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardVariants}
                  className="flex items-start"
                >
                  <div className="bg-indigo-100 p-3 rounded-full mr-4 border border-indigo-200">
                    <FiMapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">
                      123 Education Lane<br />
                      Knowledge City, CA 94105<br />
                      United States
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              className="bg-indigo-600 p-8 rounded-2xl shadow-2xl text-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="text-2xl font-bold mb-4">Our Support Hours</h3>
              <p className="mb-4">We're here to help you with any questions about our platform.</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-indigo-500">
                <p className="font-semibold">Emergency Support:</p>
                <p>For urgent matters, please email: urgent@eduempower.org</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
            Frequently Asked Questions
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-black"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Find quick answers to common questions about contacting us
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          <motion.div 
            variants={cardVariants}
            className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">How quickly will I receive a response?</h3>
            <p className="text-gray-700">
              We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please use our emergency support email.
            </p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">Can I schedule a call with your team?</h3>
            <p className="text-gray-700">
              Yes! You can request a call by filling out the contact form and mentioning your preferred time slots. Our team will get back to you to confirm.
            </p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">How can I report a technical issue?</h3>
            <p className="text-gray-700">
              For technical issues, please include "Technical Support" in the subject line and provide as much detail as possible about the problem you're experiencing.
            </p>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            className="bg-white p-6 rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">Do you offer partnership opportunities?</h3>
            <p className="text-gray-700">
              Yes, we're always open to partnerships with educational institutions, NGOs, and corporate sponsors. Please contact us with "Partnership Inquiry" in the subject line.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
            Find Us
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-black"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.424640053257!2d87.37286567974036!3d23.51722472424523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7715f5d396cad%3A0xb158a587000d891c!2sNSHM%20Knowledge%20Campus%2C%20Durgapur!5e0!3m2!1sen!2sin!4v1743968740753!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Edu-Empower Location"
          ></iframe>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 max-w-5xl mx-auto rounded-3xl my-16 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
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
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white flex-grow bg-white border-2 border-black text-gray-800"
              />
              <motion.button
                className="px-6 py-3 text-base font-medium text-indigo-700 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
