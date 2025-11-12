import { requestsApi } from "./axiosConfig";

export interface RequestData {
  surplus_id: number;
  message: string;
  request_status: string;
}


export const createRequest = async (data: RequestData) => {
  const res = await requestsApi.post("/", data);
  return res.data;
};


export const getCompanyRequests = async (companyId: number) => {
  const res = await requestsApi.get(`/company/${companyId}`);
  return res.data;
};


export const acceptRequest = async (requestId: number) => {
  const res = await requestsApi.patch(`/${requestId}/accept`);
  return res.data;
};


export const rejectRequest = async (requestId: number) => {
  const res = await requestsApi.patch(`/${requestId}/reject`);
  return res.data;
};
