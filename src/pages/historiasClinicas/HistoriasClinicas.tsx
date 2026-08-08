import { useEffect, useState } from "react";

import type { HistoriaClinica } from "../../types/historiaClinica";
import { useNavigate } from "react-router-dom";
import {
  getHistoriasClinicas,
  deleteHistoriaClinica,
} from "../../services/historiaClinicaService";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "../../components/ui/Toolbar";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import HistoriaClinicaForm from "./HistoriasClinicasForm";
import Modal from "../../components/ui/Modal";

export default function HistoriasClinicas() {
  const [historias, setHistorias] = useState<HistoriaClinica[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [historiaSeleccionada, setHistoriaSeleccionada] =
    useState<HistoriaClinica | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    cargarHistorias();
  }, []);

  async function cargarHistorias() {
    try {
      const data = await getHistoriasClinicas();

      setHistorias(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id: number) {
    const confirmar = window.confirm("¿Desea eliminar esta historia clínica?");

    if (!confirmar) return;

    try {
      await deleteHistoriaClinica(id);

      cargarHistorias();
    } catch (error) {
      console.error(error);
    }
  }

  const historiasFiltradas = historias.filter((historia) =>
    historia.mascota.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Historias Clínicas"
        subtitle="Registro médico de las mascotas"
      />

      <Toolbar>
        <Button
          onClick={() => {
            setHistoriaSeleccionada(null);
            setMostrarFormulario(true);
          }}
        >
          Nueva Historia
        </Button>

        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar mascota..."
        />
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>Mascota</th>

            <th>Veterinario</th>

            <th>Diagnóstico</th>

            <th>Tratamiento</th>

            <th>Fecha</th>

            <th>Acciones</th>
            <th>Recetas</th>
          </tr>
        </thead>

        <tbody>
          {historiasFiltradas.map((historia) => (
            <tr key={historia.id}>
              <td>{historia.mascota.nombre}</td>

              <td>{historia.usuario.nombre}</td>

              <td>{historia.diagnostico}</td>

              <td>{historia.tratamiento ?? "-"}</td>

              <td>
                {historia.recetas.length === 0
                  ? "Sin recetas"
                  : `${historia.recetas.length} receta(s)`}
              </td>

              <td>{new Date(historia.creado_en).toLocaleDateString()}</td>

              <td className="space-x-2">
                <button
                  onClick={() => {
                    setHistoriaSeleccionada(historia);
                    setMostrarFormulario(true);
                  }}
                  className="
    rounded
    bg-yellow-500
    px-3
    py-1
    text-white
    "
                >
                  ✏️
                </button>

                <button
                  onClick={() => eliminar(historia.id)}
                  className="
    rounded
    bg-red-600
    px-3
    py-1
    text-white
    "
                >
                  🗑️
                </button>

                <button
                  onClick={() => {
                    navigate(`/historias-clinicas/${historia.id}`);
                  }}
                  className="
    rounded
    bg-blue-600
    px-3
    py-1
    text-white
  "
                >
                  📄
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        open={mostrarFormulario}
        title={
          historiaSeleccionada
            ? "Editar Historia Clínica"
            : "Nueva Historia Clínica"
        }
        onClose={() => {
          setMostrarFormulario(false);

          setHistoriaSeleccionada(null);
        }}
      >
        <HistoriaClinicaForm
          historia={historiaSeleccionada}
          onCreated={() => {
            cargarHistorias();

            setMostrarFormulario(false);

            setHistoriaSeleccionada(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
