import { useEffect, useState } from "react";

import type {
  HistoriaClinica,
  HistoriaClinicaCreate,
} from "../../types/historiaClinica";

import type { Mascota } from "../../types/mascota";

import {
  createHistoriaClinica,
  updateHistoriaClinica,
} from "../../services/historiaClinicaService";

import { getMascotas } from "../../services/mascotaService";

import Button from "../../components/ui/Button";
import Select from "../../components/ui/Selector";

interface Props {
  historia?: HistoriaClinica | null;
  onCreated: () => void;
}

export default function HistoriaClinicaForm({ historia, onCreated }: Props) {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  const [form, setForm] = useState<HistoriaClinicaCreate>({
    mascota_id: 0,
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
  });

  useEffect(() => {
    cargarMascotas();
  }, []);

  useEffect(() => {
    if (historia) {
      setForm({
        mascota_id: historia.mascota.id,

        diagnostico: historia.diagnostico,

        tratamiento: historia.tratamiento ?? "",

        observaciones: historia.observaciones ?? "",
      });
    } else {
      setForm({
        mascota_id: 0,

        diagnostico: "",

        tratamiento: "",

        observaciones: "",
      });
    }
  }, [historia]);

  async function cargarMascotas() {
    try {
      const data = await getMascotas();

      setMascotas(data);
    } catch (error) {
      console.error(error);
    }
  }

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
      if (historia) {
        await updateHistoriaClinica(historia.id, form);
      } else {
        await createHistoriaClinica(form);
      }

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Mascota"
        value={form.mascota_id}
        options={[
          {
            value: 0,
            label: "Seleccione mascota",
          },

          ...mascotas.map((mascota) => ({
            value: mascota.id,

            label: mascota.nombre,
          })),
        ]}
        onChange={(value) =>
          setForm({
            ...form,

            mascota_id: Number(value),
          })
        }
      />

      <textarea
        name="diagnostico"
        placeholder="Diagnóstico"
        value={form.diagnostico}
        onChange={handleChange}
        required
        className="
          w-full
          rounded-lg
          border
          p-2
        "
      />

      <textarea
        name="tratamiento"
        placeholder="Tratamiento"
        value={form.tratamiento ?? ""}
        onChange={handleChange}
        className="
          w-full
          rounded-lg
          border
          p-2
        "
      />

      <textarea
        name="observaciones"
        placeholder="Observaciones"
        value={form.observaciones ?? ""}
        onChange={handleChange}
        className="
          w-full
          rounded-lg
          border
          p-2
        "
      />

      <Button type="submit">
        {historia ? "Actualizar Historia" : "Guardar Historia"}
      </Button>
    </form>
  );
}
