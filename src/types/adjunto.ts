export interface Adjunto {
  id: number;

  historia_clinica_id: number;

  estudio_id: number | null;

  descripcion: string | null;

  nombre_archivo: string;

  ruta_archivo: string;

  tipo_archivo: string;

  tamano: number | null;

  usuario_id: number;

  veterinaria_id: number;

  creado_en: string;
}

export interface AdjuntoSimple {
  id: number;

  nombre_archivo: string;

  tipo_archivo: string;

  tamano: number | null;

  descripcion: string | null;

  creado_en: string;
}
