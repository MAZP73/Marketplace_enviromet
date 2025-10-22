import { reservationsApi } from "./axiosConfig";

export interface ReservationData {
  id?: number;
  surplus_id: number;
  company_id: number;
  organization_id: number;
  quantity: number;
  status?: "reserved" | "completed" | "canceled";
}

// Obtener reservas empresa
export const getCompanyReservations = async (companyId: number) => {
  const res = await reservationsApi.get(`/company/${companyId}`);
  return res.data;
};

// Obtener reservas organización
export const getOrganizationReservations = async (organizationId: number) => {
  const res = await reservationsApi.get(`/organization/${organizationId}`);
  return res.data;
};
