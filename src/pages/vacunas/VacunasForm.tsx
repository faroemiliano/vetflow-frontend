import { useEffect, useState } from "react";

import type { Vacuna, VacunaCreate } from "../../types/vacuna";

import { createVacuna, updateVacuna } from "../../services/vacunaService";

import Button from "../../components/ui/Button";

interface Props {
  vacuna?: Vacuna | null;
  onCreated: () => void;
}

export default function VacunaForm({ vacuna, onCreated }: Props) {
  const [form, setForm] = useState<VacunaCreate>({
    nombre: "",
    descripcion: "",
    activo: true,
  });

  useEffect(() => {
    if (vacuna) {
      setForm({
        nombre: vacuna.nombre,
        descripcion: vacuna.descripcion ?? "",
        activo: vacuna.activo,
      });
    } else {
      setForm({
        nombre: "",
        descripcion: "",
        activo: true,
      });
    }
  }, [vacuna]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      activo: e.target.checked,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (vacuna) {
        await updateVacuna(vacuna.id, form);
      } else {
        await createVacuna(form);
      }

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block font-medium">Nombre</label>

        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Descripción</label>

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="activo"
          checked={form.activo}
          onChange={handleCheckbox}
        />
        Activa
      </label>

      <Button type="submit">
        {vacuna ? "Actualizar Vacuna" : "Guardar Vacuna"}
      </Button>
    </form>
  );
}
