import api from "../api/axios";

import type {
  RecetaMedicamento,
  RecetaMedicamentoCreate,
} from "../types/recetaMedicamento";

export async function getMedicamentos(
  recetaId: number,
): Promise<RecetaMedicamento[]> {
  const response = await api.get(`/recetas/${recetaId}/medicamentos`);

  return response.data;
}

export async function createMedicamento(
  recetaId: number,
  data: RecetaMedicamentoCreate,
) {
  const response = await api.post(`/recetas/${recetaId}/medicamentos`, data);

  return response.data;
}

export async function updateMedicamento(
  medicamentoId: number,
  data: Partial<RecetaMedicamentoCreate>,
) {
  const response = await api.put(
    `/recetas/medicamentos/${medicamentoId}`,
    data,
  );

  return response.data;
}

export async function deleteMedicamento(medicamentoId: number) {
  await api.delete(`/recetas/medicamentos/${medicamentoId}`);
}
