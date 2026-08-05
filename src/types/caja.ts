import type { MovimientoCaja } from "./movimientoCaja";

export interface Caja {
  id: number;

  veterinaria_id: number;

  usuario_apertura_id: number;
  usuario_cierre_id: number | null;

  saldo_inicial: string;
  saldo_final: string | null;

  fecha_apertura: string;
  fecha_cierre: string | null;

  estado: "ABIERTA" | "CERRADA";

  observaciones: string | null;

  movimientos: MovimientoCaja[];
}

export interface CajaResumen {
  caja_id: number;

  saldo_inicial: string;

  ingresos: string;

  egresos: string;

  cantidad_movimientos: number;

  saldo_actual: string;
}
