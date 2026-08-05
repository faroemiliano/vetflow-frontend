import api from "../api/axios";

import type { MovimientoCaja } from "../types/movimientoCaja";

export async function getMovimientosCaja(): Promise<MovimientoCaja[]> {
  const response = await api.get("/movimientos-caja");

  return response.data;
}
