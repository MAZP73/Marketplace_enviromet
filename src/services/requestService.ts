import { requestsApi } from "./axiosConfig";

export interface RequestData {
  id?: number;
  surplus_id: number;
  company_id: number;
  organization_id: number;
  message: string;
  status?: "pending" | "accepted" | "rejected";
}

// Crear solicitud
export const createRequest = async (data: RequestData) => {
  const res = await requestsApi.post("/", data);
  return res.data;
};

// Obtener solicitudes
export const getCompanyRequests = async (companyId: number) => {
  const res = await requestsApi.get(`/company/${companyId}`);
  return res.data;
};

// Aceptar una solicitud
export const acceptRequest = async (requestId: number) => {
  const res = await requestsApi.patch(`/${requestId}/accept`);
  return res.data;
};

// Rechazar una solicitud
export const rejectRequest = async (requestId: number) => {
  const res = await requestsApi.patch(`/${requestId}/reject`);
  return res.data;
};
