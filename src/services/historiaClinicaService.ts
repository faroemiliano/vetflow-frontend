import api from "../api/axios";

import type {
  HistoriaClinica,
  HistoriaClinicaCreate,
} from "../types/historiaClinica";

export async function getHistoriasClinicas(): Promise<HistoriaClinica[]> {
  const response = await api.get("/historias-clinicas");

  return response.data;
}

export async function createHistoriaClinica(
  historia: HistoriaClinicaCreate,
): Promise<HistoriaClinica> {
  const response = await api.post("/historias-clinicas", historia);

  return response.data;
}

export async function updateHistoriaClinica(
  id: number,
  historia: Partial<HistoriaClinicaCreate>,
): Promise<HistoriaClinica> {
  const response = await api.put(`/historias-clinicas/${id}`, historia);

  return response.data;
}

export async function deleteHistoriaClinica(id: number): Promise<void> {
  await api.delete(`/historias-clinicas/${id}`);
}

export async function getHistoriaClinica(id: number): Promise<HistoriaClinica> {
  const response = await api.get(`/historias-clinicas/${id}`);

  return response.data;
}
