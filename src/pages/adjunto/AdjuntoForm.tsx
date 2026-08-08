import { useState } from "react";

import Button from "../../components/ui/Button";

import { createAdjunto } from "../../services/adjuntoService";

interface Props {
  historiaClinicaId: number;
  onCreated: () => void;
}

export default function AdjuntoForm({ historiaClinicaId, onCreated }: Props) {
  const [archivo, setArchivo] = useState<File | null>(null);

  const [descripcion, setDescripcion] = useState("");

  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!archivo) {
      alert("Seleccione un archivo");

      return;
    }

    try {
      setGuardando(true);

      await createAdjunto(historiaClinicaId, archivo, descripcion || undefined);

      setArchivo(null);
      setDescripcion("");

      onCreated();
    } catch (error) {
      console.error(error);

      alert("No se pudo subir el archivo");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block font-medium">Archivo</label>

        <input
          type="file"
          onChange={(e) => {
            setArchivo(e.target.files?.[0] ?? null);
          }}
          className="w-full rounded-lg border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Descripción</label>

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del archivo"
          className="w-full rounded-lg border p-2"
        />
      </div>

      <Button type="submit" disabled={guardando}>
        {guardando ? "Subiendo..." : "Subir Archivo"}
      </Button>
    </form>
  );
}
