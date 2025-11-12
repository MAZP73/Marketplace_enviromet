import { reservationsApi } from "./axiosConfig";

export interface ReservationData {
  id?: number;
  surplus_id: number;
  company_id: number;
  organization_id: number;
  quantity: number;
  status?: "in process" | "completed";
}

export const getCompanyReservations = async (companyId: number) => {
  const res = await reservationsApi.get(`reservations/company/${companyId}`);
  return res.data;
};

export const getOrganizationReservations = async (organizationId: number) => {
  const res = await reservationsApi.get(`reservations/organization/${organizationId}`);
  return res.data;
};

export const updateReservationStatus = async (
  id: number,
  status: "completed"
) => {
  const res = await reservationsApi.patch(`/reservations/${id}`, { status });
  return res.data;
};
