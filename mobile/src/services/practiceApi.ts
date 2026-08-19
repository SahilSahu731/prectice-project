import { api } from "./api";

import {CreatePracticeInput, Practice} from "../types/practice";

export const getPractices = async (): Promise<Practice[]> => {
  const response = await api.get("/practices");
  return response.data;
};

export const createPractice = async (data: CreatePracticeInput): Promise<Practice> => {
  const response = await api.post("/practices",data);
  return response.data;
};

export const updatePractice = async (id: string, data: CreatePracticeInput): Promise<Practice> => {
  const response = await api.put(`/practices/${id}`,data);
  return response.data;
};

export const completePractice = async (id: string): Promise<Practice> => {
  const response = await api.patch(`/practices/${id}/complete`);
  return response.data;
};

export const deletePractice = async (id: string): Promise<void> => {
  await api.delete(`/practices/${id}`);
};