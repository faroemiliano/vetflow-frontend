import { useEffect, useState } from "react";

import type { Turno, TurnoCreate } from "../../types/turno";
import type { Mascota } from "../../types/mascota";

import { createTurno, updateTurno } from "../../services/turnoService";

import { getMascotas } from "../../services/mascotaService";

import api from "../../api/axios";

import Button from "../../components/ui/Button";
import Select from "../../components/ui/Selector";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  rol: string;
}

interface Props {
  turno?: Turno | null;
  onCreated: () => void;
}

export default function TurnoForm({ turno, onCreated }: Props) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  const [form, setForm] = useState<TurnoCreate>({
    usuario_id: 0,
    mascota_id: 0,
    fecha_hora: "",
    motivo: "",
    observaciones: "",
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (turno) {
      setForm({
        usuario_id: turno.usuario.id,

        mascota_id: turno.mascota.id,

        fecha_hora: turno.fecha_hora.slice(0, 16),

        motivo: turno.motivo ?? "",

        observaciones: turno.observaciones ?? "",
      });
    }
  }, [turno]);

  async function cargarDatos() {
    try {
      const [usuariosResponse, mascotasResponse] = await Promise.all([
        api.get("/usuarios"),

        getMascotas(),
      ]);

      setUsuarios(
        usuariosResponse.data.filter(
          (usuario: Usuario) => usuario.rol === "VETERINARIO",
        ),
      );

      setMascotas(mascotasResponse);
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
      if (turno) {
        await updateTurno(turno.id, form);
      } else {
        await createTurno(form);
      }

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Veterinario"
        value={form.usuario_id}
        options={[
          {
            value: 0,
            label: "Seleccione veterinario",
          },

          ...usuarios.map((usuario) => ({
            value: usuario.id,

            label: `${usuario.nombre} ${usuario.apellido}`,
          })),
        ]}
        onChange={(value) =>
          setForm({
            ...form,

            usuario_id: Number(value),
          })
        }
      />

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

      <input
        type="datetime-local"
        name="fecha_hora"
        value={form.fecha_hora}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
        required
      />

      <input
        name="motivo"
        placeholder="Motivo"
        value={form.motivo ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <textarea
        name="observaciones"
        placeholder="Observaciones"
        value={form.observaciones ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <Button type="submit">
        {turno ? "Actualizar Turno" : "Crear Turno"}
      </Button>
    </form>
  );
}
