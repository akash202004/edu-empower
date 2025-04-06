const API_CONFIG = {
  BASE_URL: `${import.meta.env.VITE_BACKEND_URL}`,
  ENDPOINTS: {
    USERS: {
      REGISTERORUPDATE: "/users/registerorupdate",
      GETUSER: `/users/${userId}`,
      DELETE: `/users/${userId}`,
    },
    STUDENTS: {
      CREATE: "/students",
      GET_BY_ID: (userId) => `/students/${userId}`,
      UPDATE_DETAILS: (userId) => `/students/${userId}`,
      DELETE: (userId) => `/students/${userId}`,
    },
    ORGANIZATIONS: {
      CREATE: "/organizations",
      GET_BY_ID: (id) => `/organizations/${id}`,
      UPDATE: (id) => `/organizations/${id}`,
      DELETE: (id) => `/organizations/${id}`,
      VERIFY: (id) => `/organizations/${id}/verify`,
    },
    SCHOLARSHIPS: "/scholarships",
    DONATIONS: "/donations",
  },
};

export default API_CONFIG;
