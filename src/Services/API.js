import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
  GET_USER: "/auth/user",
  GET_INCIDENTS: "/dashboard/incidents",
  GET_SUMMARY_COUNT: "/dashboard/shipment-summary",
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { BASE_URL, ENDPOINTS, axiosInstance };
