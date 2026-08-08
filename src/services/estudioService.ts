import api from "../api/axios";

import type { Estudio, EstudioCreate } from "../types/estudio";

export async function getEstudios(): Promise<Estudio[]> {
  const response = await api.get("/estudios/");

  return response.data;
}

export async function getEstudio(id: number): Promise<Estudio> {
  const response = await api.get(`/estudios/${id}`);

  return response.data;
}

export async function createEstudio(estudio: EstudioCreate): Promise<Estudio> {
  const response = await api.post("/estudios/", estudio);

  return response.data;
}

export async function updateEstudio(
  id: number,
  estudio: Partial<EstudioCreate>,
): Promise<Estudio> {
  const response = await api.put(`/estudios/${id}`, estudio);

  return response.data;
}

export async function deleteEstudio(id: number): Promise<void> {
  await api.delete(`/estudios/${id}`);
}
