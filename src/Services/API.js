import axios from "axios";

const BASE_URL = "http://192.168.0.109:3000/api";

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
