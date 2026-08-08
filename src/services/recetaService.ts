import api from "../api/axios";

import type { Receta, RecetaCreate } from "../types/receta";

export async function getRecetas(): Promise<Receta[]> {
  const response = await api.get("/recetas/");

  return response.data;
}

export async function createReceta(data: RecetaCreate) {
  const response = await api.post("/recetas/", data);

  return response.data;
}

export async function updateReceta(id: number, data: Partial<RecetaCreate>) {
  const response = await api.put(`/recetas/${id}`, data);

  return response.data;
}

export async function deleteReceta(id: number) {
  await api.delete(`/recetas/${id}`);
}

export async function getReceta(id: number): Promise<Receta> {
  const response = await api.get(`/recetas/${id}`);

  return response.data;
}
