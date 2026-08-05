import api from "../api/axios";
import type { Caja, CajaResumen } from "../types/caja";

export async function getCajaAbierta(): Promise<Caja | null> {
  const response = await api.get("/cajas/abierta");
  return response.data;
}

export async function getResumenCaja(): Promise<CajaResumen> {
  const response = await api.get("/cajas/resumen");
  return response.data;
}

export async function abrirCaja(
  saldoInicial: number,
  observaciones?: string,
): Promise<Caja> {
  const response = await api.post("/cajas", {
    saldo_inicial: saldoInicial,
    observaciones,
  });

  return response.data;
}

export async function cerrarCaja(
  cajaId: number,
  observaciones?: string,
): Promise<Caja> {
  const response = await api.patch(`/cajas/${cajaId}/cerrar`, {
    observaciones,
  });

  return response.data;
}
