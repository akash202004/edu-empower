import axios from 'axios';
import API_CONFIG from './config';

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL
});

// Add request interceptor to handle auth tokens if needed
API.interceptors.request.use((config) => {
  // You can add auth token here if needed
  return config;
});

const studentService = {
  // Get student profile by user ID
  getStudentProfile: async (userId) => {
    try {
      const response = await API.get(`${API_CONFIG.ENDPOINTS.STUDENTS}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw error;
    }
  },

  // Create or update student profile
  saveStudentProfile: async (studentData) => {
    try {
      // Check if we're updating an existing profile
      if (studentData.userId) {
        const response = await API.put(
          `${API_CONFIG.ENDPOINTS.STUDENTS}/${studentData.userId}`, 
          studentData
        );
        return response.data;
      } else {
        // Create new profile
        const response = await API.post(API_CONFIG.ENDPOINTS.STUDENTS, studentData);
        return response.data;
      }
    } catch (error) {
      console.error('Error saving student profile:', error);
      throw error;
    }
  },

  // Register or update user in the system
  registerOrUpdateUser: async (userData) => {
    try {
      const response = await API.post(
        `${API_CONFIG.ENDPOINTS.USERS}/registerorupdate`, 
        userData
      );
      return response.data;
    } catch (error) {
      console.error('Error registering/updating user:', error);
      throw error;
    }
  }
};

export default studentService;