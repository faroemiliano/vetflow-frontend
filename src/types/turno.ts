export type EstadoTurno = "PENDIENTE" | "CONFIRMADO" | "ATENDIDO" | "CANCELADO";

export interface UsuarioTurno {
  id: number;
  nombre: string;
  apellido: string;
  rol: string;
}

export interface MascotaTurno {
  id: number;
  nombre: string;
  especie: string;
  raza: string | null;
}

export interface Turno {
  id: number;
  fecha_hora: string;
  motivo: string | null;
  estado: EstadoTurno;
  observaciones: string | null;

  creado_en: string;
  actualizado_en: string;

  usuario: UsuarioTurno;
  mascota: MascotaTurno;
}

export interface TurnoCreate {
  usuario_id: number;
  mascota_id: number;

  fecha_hora: string;

  motivo?: string;

  observaciones?: string;
}
