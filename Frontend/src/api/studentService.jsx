import axios from "axios";
import API_CONFIG from "./config";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const studentService = {
  // get existing student details by userId
  getExistingStudentDetails: async (userId) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.STUDENTS.GET_BY_ID(userId)
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // Return null for 404 (not found)
      }
      console.error("Error fetching student profile:", error);
      throw error;
    }
  },

  // get existing student details by userId and create & update based on that
  createAndUpdateNewStudentDetails: async (studentData) => {
    try {
      const existingData = await studentService.getExistingStudentDetails(studentData.userId);
      if (existingData) {
        const response = await API.put(
          API_CONFIG.ENDPOINTS.STUDENTS.UPDATE_DETAILS(studentData.userId),
          studentData
        );
        return response.data;
      } else {
        const response = await API.post(
          API_CONFIG.ENDPOINTS.STUDENTS.CREATE,
          studentData
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error saving student profile:", error);
      throw error;
    }
  },

  // get student verfication details by userId
  getStudentVerificationStatus: async (userId) => {
    try {
      const response = await API.get(
        API_CONFIG.ENDPOINTS.STUDENTS.GET_BY_ID(userId)
      );
      return response.data.status;
    } catch (error) {
      console.error("Error fetching student verification status:", error);
      throw error;
    }
  },

  // delete student details by userId
  deleteStudentDetails: async (userId) => {
    try {
      const response = await API.delete(
        `${API_CONFIG.ENDPOINTS.STUDENTS.DELETE(userId)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching student profile:", error);
      throw error;
    }
  },
};

