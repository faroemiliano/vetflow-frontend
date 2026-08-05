export interface MascotaSimple {
  id: number;
  nombre: string;
}

export interface UsuarioSimple {
  id: number;
  nombre: string;
}

export interface HistoriaClinica {
  id: number;

  mascota: MascotaSimple;

  usuario: UsuarioSimple;

  veterinaria_id: number;

  diagnostico: string;

  tratamiento: string | null;

  observaciones: string | null;

  creado_en: string;
}

export interface HistoriaClinicaCreate {
  mascota_id: number;

  diagnostico: string;

  tratamiento?: string;

  observaciones?: string;
}
