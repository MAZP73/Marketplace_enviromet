import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";

//catálogo
export const catalogApi = axios.create({
  baseURL: API_ENDPOINTS.catalog,
  headers: {
    "Content-Type": "application/json",
  },
});

//solicitudes
export const requestsApi = axios.create({
  baseURL: API_ENDPOINTS.requests,
  headers: {
    "Content-Type": "application/json",
  },
});

//reservas
export const reservationsApi = axios.create({
  baseURL: API_ENDPOINTS.reservations,
  headers: {
    "Content-Type": "application/json",
  },
});

//usuarios
export const usersApi = axios.create({
  baseURL: API_ENDPOINTS.users,
  headers: {
    "Content-Type": "application/json",
  },
});