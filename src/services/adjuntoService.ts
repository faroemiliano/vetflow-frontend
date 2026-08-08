import api from "../api/axios";

import type { Adjunto } from "../types/adjunto";

export async function getAdjuntos(): Promise<Adjunto[]> {
  const response = await api.get("/adjunto/");

  return response.data;
}

export async function getAdjunto(id: number): Promise<Adjunto> {
  const response = await api.get(`/adjunto/${id}`);

  return response.data;
}

export async function createAdjunto(
  historiaClinicaId: number,
  archivo: File,
  descripcion?: string,
  estudioId?: number,
): Promise<Adjunto> {
  const formData = new FormData();

  formData.append("historia_clinica_id", String(historiaClinicaId));

  if (estudioId) {
    formData.append("estudio_id", String(estudioId));
  }

  if (descripcion) {
    formData.append("descripcion", descripcion);
  }

  formData.append("archivo", archivo);

  const response = await api.post("/adjunto/", formData);

  return response.data;
}

export async function updateAdjunto(
  id: number,
  descripcion: string,
): Promise<Adjunto> {
  const response = await api.patch(`/adjunto/${id}`, {
    descripcion,
  });

  return response.data;
}

export async function deleteAdjunto(id: number): Promise<void> {
  await api.delete(`/adjunto/${id}`);
}

export function getAdjuntoArchivoUrl(id: number): string {
  return `${import.meta.env.VITE_API_URL}/adjunto/${id}/archivo`;
}

export async function descargarAdjunto(id: number): Promise<Blob> {
  const response = await api.get(`/adjunto/${id}/archivo`, {
    responseType: "blob",
  });

  return response.data;
}

export async function abrirAdjunto(id: number): Promise<void> {
  const blob = await descargarAdjunto(id);

  const url = URL.createObjectURL(blob);

  window.open(url, "_blank");

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
