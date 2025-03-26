import { useState } from "react";
import axios from "axios";

const ScholarshipForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalAmount: "",
    organizationId: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      alert("Scholarship created successfully!");
      setFormData({ title: "", description: "", totalAmount: "", organizationId: "" }); // Reset form
    } catch (err) {
      setError("Error creating scholarship. Try again.");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mt-20 mb-4 text-center">Create a Scholarship</h2>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Organization ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization ID</label>
          <input
            type="text"
            name="organizationId"
            value={formData.organizationId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default ScholarshipForm;
