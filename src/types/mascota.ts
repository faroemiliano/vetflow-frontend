export type EspecieAnimal =
  | "CANINO"
  | "FELINO"
  | "EQUINO"
  | "BOVINO"
  | "CAPRINO"
  | "OVINO"
  | "PORCINO"
  | "EXOTICO"
  | "OTRO";

export interface Mascota {
  id: number;
  nombre: string;
  especie: EspecieAnimal;
  raza: string | null;
  edad: number | null;
  cliente_id: number;
}

export interface MascotaCreate {
  nombre: string;
  especie: EspecieAnimal;
  raza: string;
  edad: number | null;
  cliente_id: number;
}
