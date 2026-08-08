export interface Estudio {
  id: number;

  tipo: string;

  nombre: string;

  resultado: string | null;

  observaciones: string | null;

  fecha_realizacion: string;

  historia_clinica_id: number;

  usuario_id: number;

  veterinaria_id: number;
}

export interface EstudioCreate {
  historia_clinica_id: number;

  tipo: string;

  nombre: string;

  resultado?: string;

  observaciones?: string;

  fecha_realizacion: string;
}
