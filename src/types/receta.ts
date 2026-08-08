export interface Receta {
  id: number;

  historia_clinica: {
    id: number;

    mascota: {
      id: number;
      nombre: string;
    };

    diagnostico: string;
  };

  usuario: {
    id: number;
    nombre: string;
  };

  veterinaria_id: number;

  indicaciones_generales?: string | null;

  creado_en: string;

  actualizado_en: string;
}

export interface RecetaCreate {
  historia_clinica_id: number;

  indicaciones_generales?: string;
}
