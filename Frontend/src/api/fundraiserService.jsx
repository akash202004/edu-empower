import axios from "axios";
import API_CONFIG from "./config";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const fundraiserService = {
  getFundraiserById: async (id) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.FUNDRAISERS.GET_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching fundraiser by ID:", error);
      throw error;
    }
  },

  createAndUpdateFundraiser: async (data) => {
    try {
      const existingFundraiser = await fundraiserService.getFundraiserById(
        data.id
      );
      if (existingFundraiser) {
        const response = await API.put(
          API_CONFIG.ENDPOINTS.FUNDRAISERS.UPDATE(id),
          data
        );
        return response.data;
      } else {
        const response = await API.post(
          API_CONFIG.ENDPOINTS.FUNDRAISERS.CREATE,
          data
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error creating fundraiser:", error);
      throw error;
    }
  },

  getAllFundraisers: async () => {
    try {
      const response = await API.get(API_CONFIG.ENDPOINTS.FUNDRAISERS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all fundraisers:", error);
      throw error;
    }
  },

  deleteFundraiser: async (id) => {
    try {
      const response = await API.delete(
        API_CONFIG.ENDPOINTS.FUNDRAISERS.DELETE(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting fundraiser:", error);
      throw error;
    }
  },
};
