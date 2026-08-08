import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Receta } from "../../types/receta";

import { getRecetas, deleteReceta } from "../../services/recetaService";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "../../components/ui/Toolbar";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";

import RecetaForm from "./RecetaForm";

export default function Recetas() {
  const [recetas, setRecetas] = useState<Receta[]>([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(
    null,
  );

  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    cargarRecetas();
  }, []);

  async function cargarRecetas() {
    try {
      const data = await getRecetas();

      setRecetas(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id: number) {
    if (!window.confirm("¿Eliminar receta?")) return;

    try {
      await deleteReceta(id);

      cargarRecetas();
    } catch (error) {
      console.error(error);
    }
  }

  const recetasFiltradas = recetas.filter((receta) =>
    receta.historia_clinica.mascota.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <PageHeader title="Recetas" subtitle="Gestiona las recetas médicas" />

      <Toolbar>
        <Button
          onClick={() => {
            setRecetaSeleccionada(null);

            setMostrarFormulario(true);
          }}
        >
          Nueva Receta
        </Button>

        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar receta..."
        />
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>Mascota</th>

            <th>Veterinario</th>

            <th>Diagnóstico</th>

            <th>Indicaciones</th>

            <th>Fecha</th>

            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {recetasFiltradas.map((receta) => (
            <tr key={receta.id}>
              <td>{receta.historia_clinica.mascota.nombre}</td>

              <td>{receta.usuario.nombre}</td>

              <td>{receta.historia_clinica.diagnostico}</td>

              <td>{receta.indicaciones_generales ?? "-"}</td>

              <td>{new Date(receta.creado_en).toLocaleDateString()}</td>
              <td className="space-x-2">
                <button>✏️</button>

                <button>🗑️</button>

                <button
                  onClick={() => navigate(`/recetas/${receta.id}/medicamentos`)}
                >
                  💊
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        open={mostrarFormulario}
        title={recetaSeleccionada ? "Editar Receta" : "Nueva Receta"}
        onClose={() => {
          setMostrarFormulario(false);
          setRecetaSeleccionada(null);
        }}
      >
        {mostrarFormulario && (
          <RecetaForm
            key={recetaSeleccionada?.id ?? "nueva"}
            receta={recetaSeleccionada}
            onCreated={() => {
              cargarRecetas();
              setMostrarFormulario(false);
              setRecetaSeleccionada(null);
            }}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
}
