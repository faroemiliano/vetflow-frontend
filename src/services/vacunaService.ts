import api from "../api/axios";

import type { Vacuna, VacunaCreate } from "../types/vacuna";

export async function getVacunas(): Promise<Vacuna[]> {
  const response = await api.get("/vacunas");

  return response.data;
}

export async function createVacuna(vacuna: VacunaCreate): Promise<Vacuna> {
  const response = await api.post("/vacunas", vacuna);

  return response.data;
}

export async function updateVacuna(
  id: number,
  vacuna: Partial<VacunaCreate>,
): Promise<Vacuna> {
  const response = await api.put(`/vacunas/${id}`, vacuna);

  return response.data;
}

export async function deleteVacuna(id: number): Promise<void> {
  await api.delete(`/vacunas/${id}`);
}
