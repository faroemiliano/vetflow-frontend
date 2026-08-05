export interface Cliente {
  id: number;
  nombre: string;
  telefono?: string | null;
  email?: string | null;
}

export interface ClienteCreate {
  nombre: string;
  telefono?: string;
  email?: string;
}
