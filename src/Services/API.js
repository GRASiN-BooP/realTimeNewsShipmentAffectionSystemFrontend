import axios from "axios";

const BASE_URL =
  "https://shipment-tracker-with-real-time-news-1.onrender.com/api";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
  GET_USER: "/auth/user",
  GET_INCIDENTS: "/presentation/incidents",
  GET_SUMMARY_COUNT: "/shipment-stats",
  GET_SHIPMENT_STATUS_CHART_DATA: "/graph-data/pie-chart-shipments",
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      toast.error("Session expired. Please log in again.");
      navigate("/authenticate");
    }
    return Promise.reject(error);
  }
);

export { BASE_URL, ENDPOINTS, axiosInstance };
