import { useEffect, useState } from "react";

import type { Mascota, MascotaCreate } from "../../types/mascota";
import type { Cliente } from "../../types/clientes";

import { createMascota, updateMascota } from "../../services/mascotaService";

import Button from "../../components/ui/Button";
import Select from "../../components/ui/Selector";

interface Props {
  mascota?: Mascota | null;
  clientes: Cliente[];
  onCreated: () => void;
}

const especies = [
  {
    value: "CANINO",
    label: "Canino",
  },
  {
    value: "FELINO",
    label: "Felino",
  },
  {
    value: "EQUINO",
    label: "Equino",
  },
  {
    value: "BOVINO",
    label: "Bovino",
  },
  {
    value: "CAPRINO",
    label: "Caprino",
  },
  {
    value: "OVINO",
    label: "Ovino",
  },
  {
    value: "PORCINO",
    label: "Porcino",
  },
  {
    value: "EXOTICO",
    label: "Exótico",
  },
  {
    value: "OTRO",
    label: "Otro",
  },
];

export default function MascotaForm({ mascota, clientes, onCreated }: Props) {
  const [form, setForm] = useState<MascotaCreate>({
    nombre: "",
    especie: "CANINO",
    raza: "",
    edad: null,
    cliente_id: 0,
  });

  useEffect(() => {
    if (mascota) {
      setForm({
        nombre: mascota.nombre,
        especie: mascota.especie,
        raza: mascota.raza ?? "",
        edad: mascota.edad,
        cliente_id: mascota.cliente_id,
      });
    } else {
      setForm({
        nombre: "",
        especie: "CANINO",
        raza: "",
        edad: null,
        cliente_id: 0,
      });
    }
  }, [mascota]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (mascota) {
        await updateMascota(mascota.id, form);
      } else {
        await createMascota(form);
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
        placeholder="Nombre de mascota"
        value={form.nombre}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-2"
      />

      <Select
        label="Cliente"
        value={form.cliente_id}
        options={[
          {
            value: 0,
            label: "Seleccione cliente",
          },

          ...clientes.map((cliente) => ({
            value: cliente.id,
            label: cliente.nombre,
          })),
        ]}
        onChange={(value) =>
          setForm({
            ...form,
            cliente_id: Number(value),
          })
        }
      />

      <Select
        label="Especie"
        value={form.especie}
        options={especies}
        onChange={(value) =>
          setForm({
            ...form,
            especie: value as MascotaCreate["especie"],
          })
        }
      />

      <input
        name="raza"
        placeholder="Raza"
        value={form.raza}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        name="edad"
        placeholder="Edad"
        type="number"
        value={form.edad ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            edad: e.target.value ? Number(e.target.value) : null,
          })
        }
        className="w-full rounded-lg border p-2"
      />

      <Button type="submit">
        {mascota ? "Actualizar Mascota" : "Guardar Mascota"}
      </Button>
    </form>
  );
}
