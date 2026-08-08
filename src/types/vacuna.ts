export interface Vacuna {
  id: number;
  nombre: string;
  descripcion?: string | null;
  activo: boolean;
  veterinaria_id: number;
}

export interface VacunaCreate {
  nombre: string;
  descripcion?: string;
  activo: boolean;
}
