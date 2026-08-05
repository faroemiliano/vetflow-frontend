export interface MovimientoCaja {
  id: number;

  caja_id: number;
  veterinaria_id: number;
  usuario_id: number;

  factura_id: number | null;
  pago_id: number | null;

  tipo: "INGRESO" | "EGRESO";

  origen: "PAGO" | "GASTO" | "AJUSTE" | "APERTURA" | "CIERRE";

  descripcion: string;

  monto: string;

  creado_en: string;
}
