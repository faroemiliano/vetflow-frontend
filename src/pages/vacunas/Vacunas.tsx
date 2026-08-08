import { useEffect, useState } from "react";

import type { Vacuna } from "../../types/vacuna";

import { getVacunas, deleteVacuna } from "../../services/vacunaService";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "../../components/ui/Toolbar";
import SearchInput from "../../components/ui/SearchInput";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

import VacunaForm from "./VacunasForm";

export default function Vacunas() {
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [vacunaSeleccionada, setVacunaSeleccionada] = useState<Vacuna | null>(
    null,
  );

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarVacunas();
  }, []);

  async function cargarVacunas() {
    try {
      const data = await getVacunas();

      setVacunas(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id: number) {
    const confirmar = window.confirm("¿Desea eliminar esta vacuna?");

    if (!confirmar) return;

    try {
      await deleteVacuna(id);

      cargarVacunas();
    } catch (error) {
      console.error(error);
    }
  }

  const vacunasFiltradas = vacunas.filter((vacuna) =>
    vacuna.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <PageHeader title="Vacunas" subtitle="Gestiona el catálogo de vacunas" />

      <Toolbar>
        <Button
          onClick={() => {
            setVacunaSeleccionada(null);
            setMostrarFormulario(true);
          }}
        >
          Nueva Vacuna
        </Button>

        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar vacuna..."
        />
      </Toolbar>

      <Modal
        open={mostrarFormulario}
        title={vacunaSeleccionada ? "Editar Vacuna" : "Nueva Vacuna"}
        onClose={() => {
          setMostrarFormulario(false);
          setVacunaSeleccionada(null);
        }}
      >
        <VacunaForm
          vacuna={vacunaSeleccionada}
          onCreated={() => {
            cargarVacunas();

            setMostrarFormulario(false);

            setVacunaSeleccionada(null);
          }}
        />
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Activa</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {vacunasFiltradas.map((vacuna) => (
            <tr key={vacuna.id}>
              <td>{vacuna.nombre}</td>

              <td>{vacuna.descripcion ?? "-"}</td>

              <td>{vacuna.activo ? "✅" : "❌"}</td>

              <td className="space-x-2">
                <button
                  onClick={() => {
                    setVacunaSeleccionada(vacuna);
                    setMostrarFormulario(true);
                  }}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  ✏️
                </button>

                <button
                  onClick={() => eliminar(vacuna.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardLayout>
  );
}
