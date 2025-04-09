import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FiArrowLeft, FiSave, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const CreateScholarship = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalAmount: '',
    maxFamilyIncome: 0,
    expiredAt: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate form data
      if (!formData.title || !formData.description || !formData.totalAmount || !formData.expiredAt) {
        throw new Error('Please fill all required fields');
      }
      
      // Prepare the data to match backend schema
      const scholarshipData = {
        title: formData.title,
        description: formData.description,
        totalAmount: parseFloat(formData.totalAmount),
        allocatedAmount: 0, // Default to 0 as per schema
        organizationId: user.id,
        maxFamilyIncome: parseFloat(formData.maxFamilyIncome) || 0,
        expiredAt: new Date(formData.expiredAt).toISOString(),
      };
      
      // Send data to backend API
      const response = await axios.post('http://localhost:3001/api/scholarships', scholarshipData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.sessionToken}`
        }
      });
      
      // Navigate back to dashboard with success message
      navigate('/organization/dashboard', { 
        state: { 
          success: true, 
          message: 'Scholarship created successfully!',
          scholarship: response.data
        } 
      });
    } catch (err) {
      console.error('Error creating scholarship:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create scholarship. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => navigate('/organization/dashboard')}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FiArrowLeft className="mr-2" /> Back to Dashboard
            </button>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Scholarship</h1>
            
            {error && (
              <div className="mb-6 bg-red-50 p-4 rounded-md flex items-start">
                <FiAlertCircle className="text-red-500 mt-0.5 mr-3" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Scholarship Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter scholarship name"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Provide detailed description of the scholarship"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                    Total Amount (₹) *
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    required
                    min="0"
                    step="0.01"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="10000"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxFamilyIncome" className="block text-sm font-medium text-gray-700">
                    Maximum Family Income (₹)
                  </label>
                  <input
                    type="number"
                    id="maxFamilyIncome"
                    name="maxFamilyIncome"
                    min="0"
                    step="0.01"
                    value={formData.maxFamilyIncome}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Leave 0 for no income limit"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="expiredAt" className="block text-sm font-medium text-gray-700">
                  Application Deadline *
                </label>
                <input
                  type="datetime-local"
                  id="expiredAt"
                  name="expiredAt"
                  required
                  value={formData.expiredAt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/organization/dashboard')}
                  className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" /> Create Scholarship
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateScholarship;