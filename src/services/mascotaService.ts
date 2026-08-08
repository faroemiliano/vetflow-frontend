import api from "../api/axios";

import type { Mascota, MascotaCreate } from "../types/mascota";

export async function getMascotas(): Promise<Mascota[]> {
  const response = await api.get("/mascotas");

  return response.data;
}

export async function createMascota(mascota: MascotaCreate): Promise<Mascota> {
  const response = await api.post("/mascotas", mascota);

  return response.data;
}

export async function updateMascota(
  id: number,
  mascota: MascotaCreate,
): Promise<Mascota> {
  const response = await api.put(`/mascotas/${id}`, mascota);

  return response.data;
}

export async function deleteMascota(id: number): Promise<void> {
  await api.delete(`/mascotas/${id}`);
}

export async function getHistoriaClinica(id: number) {
  const response = await api.get(`/historias-clinicas/${id}`);

  return response.data;
}
