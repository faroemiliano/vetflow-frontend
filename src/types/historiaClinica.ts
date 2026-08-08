import type { Estudio } from "./estudio";

export interface AdjuntoSimple {
  id: number;
  nombre_archivo: string;
  tipo_archivo: string;
  tamano: number | null;
  descripcion: string | null;
  creado_en: string;
}

export interface MascotaSimple {
  id: number;
  nombre: string;
}

export interface UsuarioSimple {
  id: number;
  nombre: string;
}

export interface RecetaSimple {
  id: number;

  indicaciones_generales: string | null;

  creado_en: string;
}

export interface HistoriaClinica {
  id: number;

  mascota: MascotaSimple;

  usuario: UsuarioSimple;

  veterinaria_id: number;

  diagnostico: string;

  tratamiento: string | null;

  observaciones: string | null;

  recetas?: RecetaSimple[];

  estudios: Estudio[];

  adjuntos: AdjuntoSimple[];

  creado_en: string;
}

export interface HistoriaClinicaCreate {
  mascota_id: number;

  diagnostico: string;

  tratamiento?: string;

  observaciones?: string;
}
