import { useEffect, useState } from "react";

import type { Estudio, EstudioCreate } from "../../types/estudio";

import { createEstudio, updateEstudio } from "../../services/estudioService";

import Button from "../../components/ui/Button";

interface Props {
  historiaClinicaId: number;

  estudio?: Estudio | null;

  onCreated: () => void;
}

export default function EstudioForm({
  historiaClinicaId,
  estudio,
  onCreated,
}: Props) {
  const [form, setForm] = useState<EstudioCreate>({
    historia_clinica_id: historiaClinicaId,

    tipo: "",

    nombre: "",

    resultado: "",

    observaciones: "",

    fecha_realizacion: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    if (estudio) {
      setForm({
        historia_clinica_id: estudio.historia_clinica_id,

        tipo: estudio.tipo,

        nombre: estudio.nombre,

        resultado: estudio.resultado ?? "",

        observaciones: estudio.observaciones ?? "",

        fecha_realizacion: estudio.fecha_realizacion.slice(0, 16),
      });
    }
  }, [estudio]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (estudio) {
        await updateEstudio(estudio.id, form);
      } else {
        await createEstudio(form);
      }

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        placeholder="Tipo (Radiografía, análisis...)"
        className="
w-full
rounded-lg
border
p-2
"
      />

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del estudio"
        className="
w-full
rounded-lg
border
p-2
"
      />

      <input
        type="datetime-local"
        name="fecha_realizacion"
        value={form.fecha_realizacion}
        onChange={handleChange}
        className="
w-full
rounded-lg
border
p-2
"
      />

      <textarea
        name="resultado"
        value={form.resultado ?? ""}
        onChange={handleChange}
        placeholder="Resultado"
        className="
w-full
rounded-lg
border
p-2
"
      />

      <textarea
        name="observaciones"
        value={form.observaciones ?? ""}
        onChange={handleChange}
        placeholder="Observaciones"
        className="
w-full
rounded-lg
border
p-2
"
      />

      <Button type="submit">
        {estudio ? "Actualizar Estudio" : "Guardar Estudio"}
      </Button>
    </form>
  );
}
