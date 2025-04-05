import axios from "axios";

export const fetchCurrentUser = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`
    );

    return {
      userId: response.data.id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
