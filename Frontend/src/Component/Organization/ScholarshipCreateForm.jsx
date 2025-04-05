import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { fadeIn, cardVariants, staggerContainer } from "../Utils/AnimationUtils";

const ScholarshipForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalAmount: "",
    organizationId: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure required fields are filled
    if (!formData.title || !formData.description || !formData.totalAmount || !formData.organizationId) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/scholarships", formData);
      console.log("Scholarship Created:", response.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ title: "", description: "", totalAmount: "", organizationId: "" }); // Reset form
    } catch (err) {
      setError("Error creating scholarship. Try again.");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div 
        className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="max-w-lg mx-auto w-full bg-white p-8 rounded-lg shadow-md"
          variants={cardVariants}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Create a Scholarship</h2>
          
          {error && (
            <motion.div 
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>{error}</p>
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>Scholarship created successfully!</p>
            </motion.div>
          )}
          
          <motion.form 
            onSubmit={handleSubmit}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-4" variants={cardVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Scholarship Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                placeholder="Enter scholarship title"
              />
            </motion.div>
            
            <motion.div className="mb-4" variants={cardVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                placeholder="Enter scholarship description"
                rows="4"
              ></textarea>
            </motion.div>
            
            <motion.div className="mb-4" variants={cardVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalAmount">
                Total Amount
              </label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                placeholder="Enter total scholarship amount"
              />
            </motion.div>
            
            <motion.div className="mb-6" variants={cardVariants}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizationId">
                Organization ID
              </label>
              <input
                type="text"
                id="organizationId"
                name="organizationId"
                value={formData.organizationId}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                placeholder="Enter your organization ID"
              />
            </motion.div>
            
            <motion.div className="flex items-center justify-center" variants={cardVariants}>
              <motion.button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? "Creating..." : "Create Scholarship"}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScholarshipForm;
