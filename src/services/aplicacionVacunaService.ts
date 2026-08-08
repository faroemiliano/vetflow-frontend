import api from "../api/axios";

import type {
  AplicacionVacuna,
  AplicacionVacunaCreate,
} from "../types/aplicacionVacunas";

export async function getAplicaciones(
  mascotaId: number,
): Promise<AplicacionVacuna[]> {
  const response = await api.get(`/vacunas/mascotas/${mascotaId}`);

  return response.data;
}

export async function createAplicacion(
  mascotaId: number,
  data: AplicacionVacunaCreate,
) {
  const response = await api.post(`/vacunas/mascotas/${mascotaId}`, data);

  return response.data;
}

export async function updateAplicacion(
  id: number,
  data: Partial<AplicacionVacunaCreate>,
) {
  const response = await api.put(`/vacunas/aplicaciones/${id}`, data);

  return response.data;
}

export async function deleteAplicacion(id: number) {
  await api.delete(`/vacunas/aplicaciones/${id}`);
}
