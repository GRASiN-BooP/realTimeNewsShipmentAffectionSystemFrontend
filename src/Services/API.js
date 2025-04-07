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
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { BASE_URL, ENDPOINTS, axiosInstance };
