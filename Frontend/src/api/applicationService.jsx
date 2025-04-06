import axios from "axios";
import API_CONFIG from "./config";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

const applicationService = {
  // Create a new application
  createAndUpdateApplication: async (applicationData) => {
    try {
      if (getExistingApplicationById) {
        const response = await API.patch(
          API_CONFIG.ENDPOINTS.APPLICATIONS.UPDATE_STATUS(id),
          statusData
        );
        return response.data;
      } else {
        const response = await API.post(
          API_CONFIG.ENDPOINTS.APPLICATIONS.CREATE,
          applicationData
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  },

  // Get all applications
  getAllApplications: async () => {
    try {
      const response = await API.get(API_CONFIG.ENDPOINTS.APPLICATIONS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  },

  // Get applications by studentId
  getApplicationsByStudentId: async (studentId) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.APPLICATIONS.GET_BY_STUDENT_ID(studentId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching student applications:", error);
      throw error;
    }
  },

  // Get application by ID
  getExistingApplicationById: async (id) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.APPLICATIONS.GET_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching application:", error);
      throw error;
    }
  },

  // Delete application
  deleteApplication: async (id) => {
    try {
      const response = await API.delete(
        API_CONFIG.ENDPOINTS.APPLICATIONS.DELETE(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting application:", error);
      throw error;
    }
  },
};

export default applicationService;
