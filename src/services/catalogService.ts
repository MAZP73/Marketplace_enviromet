import { catalogApi } from "./axiosConfig";

export interface Excess {
  excessId?: number;
  empresaId: number;
  productName: string;
  description: string;
  category: string;
  quantity: number;
  unitMeasurement: string;
  publishDate?: string;
  expirationDate?: string;
  city: string;
  address: string;
  status?: string;
}

export const getAllExcesses = async (): Promise<Excess[]> => {
  const res = await catalogApi.get("/");
  return res.data;
};

export const createExcess = async (excess: Excess): Promise<Excess> => {
  const res = await catalogApi.post("/", excess);
  return res.data;
};

export const reserveExcess = async (id: number): Promise<Excess> => {
  const res = await catalogApi.patch(`/reservar/${id}`);
  return res.data;
};

export const getExcessById = async (id: number): Promise<Excess> => {
  const res = await catalogApi.get(`/excedente/${id}`);
  return res.data;
};

export const getGreeting = async (): Promise<{ message: string; status: string }> => {
  const res = await catalogApi.get("/greeting");
  return res.data;
};
