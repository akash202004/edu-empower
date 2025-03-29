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
  
  // First, update the state to include all the new fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalAmount: '',
    educationLevel: 'Undergraduate',
    startDate: '',
    deadline: '',
    eligibility: '',
    requirements: '',
    maxFamilyIncome: '',
    needsCrowdfunding: false,
    crowdfundingAmount: '',
    panCard: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    requiredDocuments: {
      domicile: false,
      incomeCertificate: false,
      marksheet10: false,
      marksheet12: false
    }
  });
  
  // Add a handler for checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    
    if (name.startsWith('doc-')) {
      // Handle document checkboxes
      const docName = name.replace('doc-', '');
      setFormData(prev => ({
        ...prev,
        requiredDocuments: {
          ...prev.requiredDocuments,
          [docName]: checked
        }
      }));
    } else {
      // Handle other checkboxes
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };
  
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
      // Create a new scholarship object with additional fields
      const newScholarship = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        organizationId: user?.id || 'unknown',
        organizationName: user?.fullName || 'Organization',
        status: 'active',
        applicants: 0,
        fundedBy: user?.fullName || 'Organization',
        scholarshipsAwarded: '0 awarded',
        sponsored: false,
        // Format required documents as a string for display
        formattedRequiredDocs: Object.entries(formData.requiredDocuments)
          .filter(([_, isRequired]) => isRequired)
          .map(([docName]) => {
            const docMap = {
              domicile: 'Domicile Certificate',
              incomeCertificate: 'Income Certificate',
              marksheet10: '10th Marksheet',
              marksheet12: '12th Marksheet'
            };
            return docMap[docName] || docName;
          })
          .join(', ') + (formData.requirements ? `, ${formData.requirements}` : '')
      };
      
      // If crowdfunding is not needed, remove those fields
      if (!newScholarship.needsCrowdfunding) {
        delete newScholarship.crowdfundingAmount;
        delete newScholarship.panCard;
        delete newScholarship.accountNumber;
        delete newScholarship.ifscCode;
        delete newScholarship.bankName;
        delete newScholarship.branchName;
      }
      
      // Save to local storage for organization dashboard
      const orgScholarships = JSON.parse(localStorage.getItem('organizationScholarships') || '{"upcoming":[],"current":[],"past":[]}');
      
      // Determine which category to add it to based on deadline
      const scholarshipDeadline = new Date(newScholarship.deadline);
      const now = new Date();
      let category;
      
      if (scholarshipDeadline < now) {
        category = 'past';
      } else if (scholarshipDeadline.getTime() - now.getTime() < 30 * 24 * 60 * 60 * 1000) {
        // If deadline is less than 30 days away, consider it current
        category = 'current';
      } else {
        category = 'upcoming';
      }
      
      // Add to only the appropriate category
      orgScholarships[category].push(newScholarship);
      localStorage.setItem('organizationScholarships', JSON.stringify(orgScholarships));
      
      // Also save to general scholarships for the main scholarship page
      const allScholarships = JSON.parse(localStorage.getItem('allScholarships') || '[]');
      allScholarships.push(newScholarship);
      localStorage.setItem('allScholarships', JSON.stringify(allScholarships));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back to dashboard
      navigate('/organization/dashboard', { 
        state: { 
          success: true, 
          message: 'Scholarship created successfully!',
          scholarship: newScholarship
        } 
      });
    } catch (err) {
      console.error('Error creating scholarship:', err);
      setError('Failed to create scholarship. Please try again.');
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
                    value={formData.totalAmount}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
                    Education Level *
                  </label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    required
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="MBA">MBA</option>
                    <option value="PhD">PhD</option>
                    <option value="Any Level">Any Level</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Application Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              {/* Crowdfunding section */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="needsCrowdfunding"
                      name="needsCrowdfunding"
                      type="checkbox"
                      checked={formData.needsCrowdfunding}
                      onChange={handleCheckboxChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="needsCrowdfunding" className="font-medium text-gray-700">
                      Enable Crowdfunding for this Scholarship
                    </label>
                    <p className="text-gray-500 text-sm">
                      Check this if you need additional funding from donors
                    </p>
                  </div>
                </div>
                
                {formData.needsCrowdfunding && (
                  <div className="pl-7 space-y-4 mt-3 border-l-2 border-indigo-100">
                    <div>
                      <label htmlFor="crowdfundingAmount" className="block text-sm font-medium text-gray-700">
                        Crowdfunding Amount Needed (₹) *
                      </label>
                      <input
                        type="number"
                        id="crowdfundingAmount"
                        name="crowdfundingAmount"
                        required={formData.needsCrowdfunding}
                        value={formData.crowdfundingAmount}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">
                        PAN Card Number *
                      </label>
                      <input
                        type="text"
                        id="panCard"
                        name="panCard"
                        required={formData.needsCrowdfunding}
                        value={formData.panCard}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          id="accountNumber"
                          name="accountNumber"
                          required={formData.needsCrowdfunding}
                          value={formData.accountNumber}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                          IFSC Code *
                        </label>
                        <input
                          type="text"
                          id="ifscCode"
                          name="ifscCode"
                          required={formData.needsCrowdfunding}
                          value={formData.ifscCode}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                          Bank Name *
                        </label>
                        <input
                          type="text"
                          id="bankName"
                          name="bankName"
                          required={formData.needsCrowdfunding}
                          value={formData.bankName}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
                          Branch Name *
                        </label>
                        <input
                          type="text"
                          id="branchName"
                          name="branchName"
                          required={formData.needsCrowdfunding}
                          value={formData.branchName}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="maxFamilyIncome" className="block text-sm font-medium text-gray-700">
                    Maximum Family Income (₹)
                  </label>
                  <input
                    type="number"
                    id="maxFamilyIncome"
                    name="maxFamilyIncome"
                    value={formData.maxFamilyIncome}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              {/* Required Documents section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Documents *
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="doc-domicile"
                        name="doc-domicile"
                        type="checkbox"
                        checked={formData.requiredDocuments.domicile}
                        onChange={handleCheckboxChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="doc-domicile" className="font-medium text-gray-700">Domicile Certificate</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="doc-incomeCertificate"
                        name="doc-incomeCertificate"
                        type="checkbox"
                        checked={formData.requiredDocuments.incomeCertificate}
                        onChange={handleCheckboxChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="doc-incomeCertificate" className="font-medium text-gray-700">Income Certificate</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="doc-marksheet10"
                        name="doc-marksheet10"
                        type="checkbox"
                        checked={formData.requiredDocuments.marksheet10}
                        onChange={handleCheckboxChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="doc-marksheet10" className="font-medium text-gray-700">10th Marksheet</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="doc-marksheet12"
                        name="doc-marksheet12"
                        type="checkbox"
                        checked={formData.requiredDocuments.marksheet12}
                        onChange={handleCheckboxChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="doc-marksheet12" className="font-medium text-gray-700">12th Marksheet</label>
                    </div>
                  </div>
                </div>
                
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                  Additional Required Documents
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={3}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="E.g., Academic transcripts, Letter of recommendation, etc."
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