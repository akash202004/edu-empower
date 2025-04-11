import axios from "axios";
import API_CONFIG from "./config";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const organizationService = {
  // create a new organization
  createOrganization: async (data) => {
    try {
      // First check if organization exists for this user
      const existingOrg = await organizationService.getExistingOrganizationDetails(data.user_id);
      
      if (existingOrg) {
        const response = await API.put(
          API_CONFIG.ENDPOINTS.ORGANIZATIONS.UPDATE(existingOrg.id),
          data
        );
        return response.data;
      } else {
        const response = await API.post(
          API_CONFIG.ENDPOINTS.ORGANIZATIONS.CREATE,
          data
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      throw error;
    }
  },

  // get organization details by ID
  getExistingOrganizationDetails: async (id) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET_BY_ID(id)
      );
      return response.data;
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching organization details:", error);
      throw error;
    }
  },

  // delete organization by ID
  deleteOrganization: async (id) => {
    try {
      const response = await API.delete(
        API_CONFIG.ENDPOINTS.ORGANIZATIONS.DELETE(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting organization:", error);
      throw error;
    }
  },

  // get organization verification status by ID
  getOrganizationVerificationStatus: async (id) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET_BY_ID(id)
      );
      return response.data.verified;
    } catch (error) {
      console.error("Error fetching organization verfication status:", error);
      throw error;
    }
  },
};