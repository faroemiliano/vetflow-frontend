import { useEffect, useState } from "react";

import type { Cliente, ClienteCreate } from "../../types/clientes";

import { createCliente, updateCliente } from "../../services/clienteService";

import Button from "../../components/ui/Button";

interface Props {
  cliente?: Cliente | null;
  onCreated: () => void;
}

export default function ClienteForm({ cliente, onCreated }: Props) {
  const [form, setForm] = useState<ClienteCreate>({
    nombre: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    if (cliente) {
      setForm({
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        email: cliente.email,
      });
    }
  }, [cliente]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (cliente) {
        await updateCliente(cliente.id, form);
      } else {
        await createCliente(form);
      }

      setForm({
        nombre: cliente.nombre,
        telefono: cliente.telefono ?? "",
        email: cliente.email ?? "",
      });

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl bg-white p-6 shadow"
    >
      <div className="space-y-4">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
          required
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border p-2"
        />

        <Button type="submit">
          {cliente ? "Actualizar Cliente" : "Guardar Cliente"}
        </Button>
      </div>
    </form>
  );
}
