import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";

export const catalogApi = axios.create({
  baseURL: API_ENDPOINTS.catalog,
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestsApi = axios.create({
  baseURL: API_ENDPOINTS.requests,
  headers: {
    "Content-Type": "application/json",
  },
});

export const reservationsApi = axios.create({
  baseURL: API_ENDPOINTS.reservations,
  headers: {
    "Content-Type": "application/json",
  },
});

export const usersApi = axios.create({
  baseURL: API_ENDPOINTS.users,
  headers: {
    "Content-Type": "application/json",
  },
});


const apis = [catalogApi, requestsApi, reservationsApi, usersApi];

apis.forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
});
