export type ViaAdministracion =
  | "ORAL"
  | "INYECTABLE"
  | "TOPICA"
  | "OFTALMICA"
  | "OTICA"
  | "NASAL"
  | "RECTAL"
  | "OTRA";

export interface RecetaMedicamento {
  id: number;

  receta_id: number;

  nombre: string;

  presentacion?: string | null;

  dosis: string;

  frecuencia: string;

  duracion: string;

  via_administracion: ViaAdministracion;

  observaciones?: string | null;
}

export interface RecetaMedicamentoCreate {
  nombre: string;

  presentacion?: string | null;

  dosis: string;

  frecuencia: string;

  duracion: string;

  via_administracion: ViaAdministracion;

  observaciones?: string | null;
}
