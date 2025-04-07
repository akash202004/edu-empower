import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiUser, FiSend } from "react-icons/fi";
import Newsletter from "../Common/Newsletter";

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
      // Redirect to the confirmation page
      navigate("/contact-submitted");
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
            <form onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.elements.email.value;
              if (email) {
                toast.success("✅ Successfully subscribed to newsletter!");
                e.target.reset();
              } else {
                toast.error("Please enter your email address");
              }
            }} className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your email address" 
                  className="pl-10 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-full bg-white border-2 border-black text-gray-800"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="px-6 py-3 text-base font-medium text-indigo-700 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px]"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend className="h-5 w-5" />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
            Connect With Us
            <motion.div 
              className="absolute -bottom-2 left-0 w-full h-1 bg-black"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Follow us on social media for updates, success stories, and educational content
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-6"
        >
          {/* Facebook */}
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-black flex flex-col items-center w-40"
          >
            <div className="bg-blue-600 text-white p-4 rounded-full mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </div>
            <span className="font-semibold">Facebook</span>
          </motion.a>

          {/* Twitter */}
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-black flex flex-col items-center w-40"
          >
            <div className="bg-blue-400 text-white p-4 rounded-full mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
              </svg>
            </div>
            <span className="font-semibold">Twitter</span>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-black flex flex-col items-center w-40"
          >
            <div className="bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 text-white p-4 rounded-full mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span className="font-semibold">Instagram</span>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-black flex flex-col items-center w-40"
          >
            <div className="bg-blue-700 text-white p-4 rounded-full mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <span className="font-semibold">LinkedIn</span>
          </motion.a>

          {/* YouTube */}
          <motion.a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-black flex flex-col items-center w-40"
          >
            <div className="bg-red-600 text-white p-4 rounded-full mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <span className="font-semibold">YouTube</span>
          </motion.a>
        </motion.div>
      </section>

      {/* Footer Banner */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="bg-indigo-900 text-white py-8 px-4 sm:px-6 lg:px-8 text-center mt-16"
      >
        <p className="text-lg">
          Have more questions? Our team is just a message away. <br />
          <span className="font-semibold">We look forward to hearing from you!</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
