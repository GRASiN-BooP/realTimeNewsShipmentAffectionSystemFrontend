import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export { BASE_URL, ENDPOINTS, axiosInstance };
