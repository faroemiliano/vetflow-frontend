import { useEffect, useState } from "react";

import type {
  AplicacionVacuna,
  AplicacionVacunaCreate,
} from "../../types/aplicacionVacunas";

import type { Vacuna } from "../../types/vacuna";

import {
  createAplicacion,
  updateAplicacion,
} from "../../services/aplicacionVacunaService";

import { getVacunas } from "../../services/vacunaService";

import Button from "../../components/ui/Button";
import Select from "../../components/ui/Selector";

interface Props {
  mascotaId: number;
  aplicacion?: AplicacionVacuna | null;
  onCreated: () => void;
}

export default function AplicacionVacunaForm({
  mascotaId,
  aplicacion,
  onCreated,
}: Props) {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);

  const [form, setForm] = useState<AplicacionVacunaCreate>({
    vacuna_id: 0,
    fecha_aplicacion: "",
    fecha_proxima: "",
    observaciones: "",
  });

  useEffect(() => {
    cargarVacunas();
  }, []);

  useEffect(() => {
    if (aplicacion) {
      setForm({
        vacuna_id: aplicacion.vacuna.id,
        fecha_aplicacion: aplicacion.fecha_aplicacion,
        fecha_proxima: aplicacion.fecha_proxima ?? "",
        observaciones: aplicacion.observaciones ?? "",
      });
    } else {
      setForm({
        vacuna_id: 0,
        fecha_aplicacion: "",
        fecha_proxima: "",
        observaciones: "",
      });
    }
  }, [aplicacion]);

  async function cargarVacunas() {
    try {
      const data = await getVacunas();

      setVacunas(data.filter((v) => v.activo));
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
      if (aplicacion) {
        await updateAplicacion(aplicacion.id, form);
      } else {
        await createAplicacion(mascotaId, form);
      }

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Vacuna"
        value={form.vacuna_id}
        options={[
          {
            value: 0,
            label: "Seleccione una vacuna",
          },

          ...vacunas.map((vacuna) => ({
            value: vacuna.id,
            label: vacuna.nombre,
          })),
        ]}
        onChange={(value) =>
          setForm({
            ...form,
            vacuna_id: Number(value),
          })
        }
      />

      <div>
        <label className="mb-1 block font-medium">Fecha de aplicación</label>

        <input
          type="date"
          name="fecha_aplicacion"
          value={form.fecha_aplicacion}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Próxima dosis</label>

        <input
          type="date"
          name="fecha_proxima"
          value={form.fecha_proxima ?? ""}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Observaciones</label>

        <textarea
          name="observaciones"
          value={form.observaciones ?? ""}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <Button type="submit">
        {aplicacion ? "Actualizar Aplicación" : "Registrar Vacuna"}
      </Button>
    </form>
  );
}
