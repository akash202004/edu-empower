// utils/api.js (or create a new file for API utilities)
import axios from 'axios';

export const fetchUserRole = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
    return response.data.role; // Assuming your backend returns { role: "ORGANIZATION" }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};