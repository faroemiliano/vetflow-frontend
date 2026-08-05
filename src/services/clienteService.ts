import api from "../api/axios";

import type { Cliente, ClienteCreate } from "../types/clientes";

export async function getClientes(): Promise<Cliente[]> {
  const response = await api.get("/clientes/");

  return response.data;
}

export async function createCliente(data: ClienteCreate): Promise<Cliente> {
  const response = await api.post("/clientes/", data);

  return response.data;
}

export async function updateCliente(
  id: number,
  data: ClienteCreate,
): Promise<Cliente> {
  const response = await api.put(`/clientes/${id}`, data);
  return response.data;
}

export async function deleteCliente(id: number): Promise<void> {
  await api.delete(`/clientes/${id}`);
}
