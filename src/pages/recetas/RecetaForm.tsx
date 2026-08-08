import { useEffect, useState } from "react";

import type { Receta, RecetaCreate } from "../../types/receta";
import type { HistoriaClinica } from "../../types/historiaClinica";

import { createReceta, updateReceta } from "../../services/recetaService";

import { getHistoriasClinicas } from "../../services/historiaClinicaService";

import Button from "../../components/ui/Button";

interface Props {
  receta?: Receta | null;

  historiaClinicaId?: number;

  onCreated: () => void;
}

const formularioInicial: RecetaCreate = {
  historia_clinica_id: 0,
  indicaciones_generales: "",
};

export default function RecetaForm({
  receta,
  historiaClinicaId,
  onCreated,
}: Props) {
  const [historias, setHistorias] = useState<HistoriaClinica[]>([]);

  const [form, setForm] = useState<RecetaCreate>({
    historia_clinica_id: historiaClinicaId ?? 0,
    indicaciones_generales: "",
  });

  useEffect(() => {
    cargarHistorias();
  }, []);

  useEffect(() => {
    if (historiaClinicaId) {
      setForm({
        historia_clinica_id: historiaClinicaId,
        indicaciones_generales: "",
      });
    }
  }, [historiaClinicaId]);

  async function cargarHistorias() {
    try {
      const data = await getHistoriasClinicas();

      setHistorias(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (receta) {
      setForm({
        historia_clinica_id: receta.historia_clinica.id,
        indicaciones_generales: receta.indicaciones_generales ?? "",
      });
    } else if (historiaClinicaId) {
      setForm({
        historia_clinica_id: historiaClinicaId,
        indicaciones_generales: "",
      });
    } else {
      setForm({
        ...formularioInicial,
      });
    }
  }, [receta, historiaClinicaId]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (form.historia_clinica_id === 0) {
        alert("Seleccione una historia clínica");

        return;
      }

      if (receta) {
        await updateReceta(receta.id, form);
      } else {
        await createReceta(form);
      }

      onCreated();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!historiaClinicaId && (
        <select
          value={form.historia_clinica_id}
          onChange={(e) => {
            setForm({
              ...form,

              historia_clinica_id: Number(e.target.value),
            });
          }}
          className="
    w-full
    rounded-lg
    border
    p-2
    "
        >
          <option value={0}>Seleccione historia clínica</option>

          {historias.map((historia) => (
            <option key={historia.id} value={historia.id}>
              {historia.mascota.nombre}
              {" - "}
              {historia.diagnostico}
            </option>
          ))}
        </select>
      )}

      {historiaClinicaId && (
        <p className="text-sm text-gray-600">
          Historia clínica seleccionada: #{historiaClinicaId}
        </p>
      )}

      <textarea
        name="indicaciones_generales"
        value={form.indicaciones_generales ?? ""}
        onChange={handleChange}
        placeholder="Indicaciones generales"
        className="
        w-full
        rounded-lg
        border
        p-2
        "
      />

      <Button type="submit">
        {receta ? "Actualizar Receta" : "Guardar Receta"}
      </Button>
    </form>
  );
}
