import axios from "axios";
import API_CONFIG from "./config";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const userService = {
  // get user details by userId
  getUserById: async (userId) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.USERS.GETUSER(userId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // get user role by userId
  getUserRole: async (userId) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.USERS.GETUSER(userId)
      );
      return response.data.role;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // register or update user
  registerOrUpdateUser: async (userData) => {
    try {
      const response = await API.post(
        API_CONFIG.ENDPOINTS.USERS.REGISTERORUPDATE,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error registering/updating user:", error);
      throw error;
    }
  },

  // delete user
  deleteUser: async (userId) => {
    try {
      const response = await API.delete(
        API_CONFIG.ENDPOINTS.USERS.DELETE(userId)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};