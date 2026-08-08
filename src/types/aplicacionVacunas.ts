import type { Mascota } from "./mascota";
import type { Vacuna } from "./vacuna";

export interface AplicacionVacuna {
  id: number;

  mascota: Mascota;

  vacuna: Vacuna;

  fecha_aplicacion: string;

  fecha_proxima?: string | null;

  observaciones?: string | null;

  veterinaria_id: number;

  creado_en: string;

  actualizado_en: string;
}

export interface AplicacionVacunaCreate {
  vacuna_id: number;

  fecha_aplicacion: string;

  fecha_proxima?: string;

  observaciones?: string;
}
