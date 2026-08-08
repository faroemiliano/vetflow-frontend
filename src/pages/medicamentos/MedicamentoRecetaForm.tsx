import { useEffect, useState } from "react";

import type {
  RecetaMedicamento,
  RecetaMedicamentoCreate,
} from "../../types/recetaMedicamento";

import {
  createMedicamento,
  updateMedicamento,
} from "../../services/recetaMedicamentoService";

import Button from "../../components/ui/Button";

interface Props {
  recetaId: number;

  medicamento?: RecetaMedicamento | null;

  onCreated: () => void;
}

const formularioInicial: RecetaMedicamentoCreate = {
  nombre: "",

  presentacion: "",

  dosis: "",

  frecuencia: "",

  duracion: "",

  via_administracion: "ORAL",

  observaciones: "",
};

export default function RecetaMedicamentoForm({
  recetaId,

  medicamento,

  onCreated,
}: Props) {
  const [form, setForm] = useState<RecetaMedicamentoCreate>(formularioInicial);

  useEffect(() => {
    if (medicamento) {
      setForm({
        nombre: medicamento.nombre,

        presentacion: medicamento.presentacion ?? "",

        dosis: medicamento.dosis,

        frecuencia: medicamento.frecuencia,

        duracion: medicamento.duracion,

        via_administracion: medicamento.via_administracion,

        observaciones: medicamento.observaciones ?? "",
      });
    } else {
      setForm(formularioInicial);
    }
  }, [medicamento]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (medicamento) {
        await updateMedicamento(
          medicamento.id,

          form,
        );
      } else {
        await createMedicamento(
          recetaId,

          form,
        );
      }

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre medicamento"
        className="
        w-full
        rounded-lg
        border
        p-2
        "
        required
      />

      <input
        name="presentacion"
        value={form.presentacion ?? ""}
        onChange={handleChange}
        placeholder="Presentación"
        className="
        w-full
        rounded-lg
        border
        p-2
        "
      />

      <input
        name="dosis"
        value={form.dosis}
        onChange={handleChange}
        placeholder="Dosis (ej: 500mg)"
        className="
        w-full
        rounded-lg
        border
        p-2
        "
        required
      />

      <input
        name="frecuencia"
        value={form.frecuencia}
        onChange={handleChange}
        placeholder="Frecuencia (ej: cada 8 horas)"
        className="
        w-full
        rounded-lg
        border
        p-2
        "
        required
      />

      <input
        name="duracion"
        value={form.duracion}
        onChange={handleChange}
        placeholder="Duración (ej: 7 días)"
        className="
        w-full
        rounded-lg
        border
        p-2
        "
        required
      />

      <select
        name="via_administracion"
        value={form.via_administracion}
        onChange={handleChange}
        className="
        w-full
        rounded-lg
        border
        p-2
        "
      >
        <option value="ORAL">Oral</option>

        <option value="INYECTABLE">Inyectable</option>

        <option value="TOPICA">Tópica</option>

        <option value="OFTALMICA">Oftálmica</option>

        <option value="OTICA">Ótica</option>

        <option value="NASAL">Nasal</option>

        <option value="RECTAL">Rectal</option>

        <option value="OTRA">Otra</option>
      </select>

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
        {medicamento ? "Actualizar Medicamento" : "Guardar Medicamento"}
      </Button>
    </form>
  );
}
