import axios from "axios";
import API_CONFIG from "./config";

// Update the API configuration to avoid path duplication
const API = axios.create({
  baseURL: "http://localhost:3000", // Base URL without /api
});

export const organizationService = {
  // create a new organization
  createOrganization: async (data) => {
    try {
      // First check if organization exists for this user
      let existingOrg = null;
      try {
        existingOrg = await organizationService.getExistingOrganizationDetails(data.userId);
      } catch (error) {
        // If we get a 404, it means the organization doesn't exist yet, which is fine
        if (error.response && error.response.status !== 404) {
          throw error; // Re-throw if it's not a 404 error
        }
      }
      
      if (existingOrg) {
        const response = await API.put(
          `/api/organizations/${existingOrg.id}`, // Fixed path
          data
        );
        return response.data;
      } else {
        const response = await API.post(
          "/api/organizations", // Fixed path
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
      const response = await API.get(`/api/organizations/${id}`); // Fixed path
      return response.data;
    } catch (error) {
      console.error("Error fetching organization details:", error);
      throw error;
    }
  },

  // delete organization by ID
  deleteOrganization: async (id) => {
    try {
      const response = await API.delete(`/api/organizations/${id}`); // Fixed path
      return response.data;
    } catch (error) {
      console.error("Error deleting organization:", error);
      throw error;
    }
  },

  // get organization verification status by ID
  getOrganizationVerificationStatus: async (id) => {
    try {
      const response = await API.get(`/api/organizations/${id}`); // Fixed path
      return response.data.verified;
    } catch (error) {
      console.error("Error fetching organization verification status:", error);
      throw error;
    }
  },
  
  // Check if user is authenticated and redirect accordingly
  handleScholarshipCreation: (navigate) => {
    const isAuthenticated = localStorage.getItem('clerk-user') || false;
    
    if (!isAuthenticated) {
      // Save the intended destination
      localStorage.setItem('auth_redirect', '/organization/dashboard');
      // Redirect to login
      navigate('/auth/login', { 
        state: { 
          role: 'ORGANIZATION',
          redirectTo: '/organization/dashboard'
        } 
      });
      return false;
    }
    
    // User is authenticated, proceed to dashboard
    navigate('/organization/dashboard');
    return true;
  }
};