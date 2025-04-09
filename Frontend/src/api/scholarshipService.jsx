import axios from "axios";
import API_CONFIG from "./config";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

const scholarshipService = {
  // Get all scholarships
  getAllScholarships: async () => {
    try {
      const response = await API.get(API_CONFIG.ENDPOINTS.SCHOLARSHIPS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      throw error;
    }
  },

  // Get active scholarships
  getActiveScholarships: async () => {
    try {
      const response = await API.get(API_CONFIG.ENDPOINTS.SCHOLARSHIPS.ACTIVE);
      return response.data;
    } catch (error) {
      console.error("Error fetching active scholarships:", error);
      throw error;
    }
  },

  // Get expired scholarships
  getExpiredScholarships: async () => {
    try {
      const response = await API.get(API_CONFIG.ENDPOINTS.SCHOLARSHIPS.EXPIRED);
      return response.data;
    } catch (error) {
      console.error("Error fetching expired scholarships:", error);
      throw error;
    }
  },

  // Get scholarship by ID
  getExistingScholarshipById: async (id) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.SCHOLARSHIPS.GET_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching scholarship:", error);
      throw error;
    }
  },

  // Create a new scholarship
  createAndUpdateScholarship: async (data) => {
    try {
      const existingScolarshipId = getExistingScholarshipById.data.id;
      if (existingScolarshipId) {
        const response = await API.put(
          API_CONFIG.ENDPOINTS.SCHOLARSHIPS.UPDATE(id),
          data
        );
        return response.data;
      } else {
        const response = await API.post(
          API_CONFIG.ENDPOINTS.SCHOLARSHIPS.CREATE,
          data
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error creating scholarship:", error);
      throw error;
    }
  },

  // Delete scholarship
  deleteScholarship: async (id) => {
    try {
      const response = await API.delete(
        API_CONFIG.ENDPOINTS.SCHOLARSHIPS.DELETE(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      throw error;
    }
  },
};

export default scholarshipService;
