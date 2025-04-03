import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const organizationService = {
  getOrganizationProfile: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/organizations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching organization profile:', error);
      throw error;
    }
  },
  
  updateOrganizationProfile: async (userId, profileData) => {
    try {
      const response = await axios.put(`${API_URL}/organizations/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating organization profile:', error);
      throw error;
    }
  },
  
  getOrganizationScholarships: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/organizations/${userId}/scholarships`);
      return response.data;
    } catch (error) {
      console.error('Error fetching organization scholarships:', error);
      throw error;
    }
  }
};

export default organizationService;