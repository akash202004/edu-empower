const API_CONFIG = {
  BASE_URL: `${import.meta.env.VITE_BACKEND_URL}`,
  ENDPOINTS: {
    USERS: {
      REGISTERORUPDATE: "/users/registerorupdate",
      GETUSER: (userId) => `/users/${userId}`,
      DELETE: (userId) => `/users/${userId}`,
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
    SCHOLARSHIPS: {
      GET_ALL: "/scholarships",
      GET_BY_ID: (id) => `/scholarships/${id}`,
      CREATE: "/scholarships",
      UPDATE: (id) => `/scholarships/${id}`,
      DELETE: (id) => `/scholarships/${id}`,
      ACTIVE: "/scholarships/active",
      EXPIRED: "/scholarships/expired",
    },
    APPLICATIONS: {
      CREATE: "/applications",
      GET_ALL: "/applications",
      GET_BY_ID: (id) => `/applications/${id}`,
      GET_BY_STUDENT_ID: (studentId) => `/applications/student/${studentId}`,
      UPDATE_STATUS: (id) => `/applications/${id}`,
      DELETE: (id) => `/applications/${id}`,
    },
    FUNDRAISERS: {
      GET_ALL: "/fundraiser",
      GET_BY_ID: (id) => `/fundraiser/${id}`,
      CREATE: "/fundraisers",
      UPDATE: (id) => `/fundraiser/${id}`,
      DELETE: (id) => `/fundraiser/${id}`,
    },
    DONATIONS: "/donations",
  },
};

export default API_CONFIG;