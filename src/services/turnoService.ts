import api from "../api/axios";

import type { EstadoTurno, Turno, TurnoCreate } from "../types/turno";

export async function getTurnos(): Promise<Turno[]> {
  const response = await api.get("/turnos");

  return response.data;
}

export async function createTurno(turno: TurnoCreate): Promise<Turno> {
  const response = await api.post("/turnos", turno);

  return response.data;
}

export async function updateTurno(
  id: number,
  turno: Partial<TurnoCreate>,
): Promise<Turno> {
  const response = await api.put(`/turnos/${id}`, turno);

  return response.data;
}

export async function deleteTurno(id: number): Promise<void> {
  await api.delete(`/turnos/${id}`);
}

export async function updateEstadoTurno(
  id: number,
  estado: EstadoTurno,
): Promise<Turno> {
  const response = await api.put(`/turnos/${id}`, {
    estado,
  });

  return response.data;
}
