import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import TurnoForm from "./TurnoForm";
import type { Turno } from "../../types/turno";
import type { EstadoTurno } from "../../types/turno";
import {
  getTurnos,
  deleteTurno,
  updateEstadoTurno,
} from "../../services/turnoService";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "../../components/ui/Toolbar";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import StatusBadge from "../../components/ui/StatusBadge";

export default function Turnos() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [turnoSeleccionado, setTurnoSeleccionado] = useState<Turno | null>(
    null,
  );
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarTurnos();
  }, []);

  async function cargarTurnos() {
    try {
      const data = await getTurnos();

      setTurnos(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id: number) {
    const confirmar = window.confirm("¿Desea eliminar este turno?");

    if (!confirmar) return;

    try {
      await deleteTurno(id);

      cargarTurnos();
    } catch (error) {
      console.error(error);
    }
  }

  const turnosFiltrados = turnos.filter((turno) =>
    turno.mascota.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  async function cambiarEstado(id: number, estado: EstadoTurno) {
    try {
      await updateEstadoTurno(id, estado);

      cargarTurnos();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Turnos"
        subtitle="Gestiona los turnos de la veterinaria"
      />

      <Toolbar>
        <Button
          onClick={() => {
            setTurnoSeleccionado(null);
            setMostrarFormulario(true);
          }}
        >
          Nuevo Turno
        </Button>

        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar por mascota..."
        />
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>Fecha</th>

            <th>Mascota</th>

            <th>Veterinario</th>

            <th>Estado</th>

            <th>Motivo</th>

            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {turnosFiltrados.map((turno) => (
            <tr key={turno.id}>
              <td>{new Date(turno.fecha_hora).toLocaleString()}</td>

              <td>{turno.mascota.nombre}</td>

              <td>
                {turno.usuario.nombre} {turno.usuario.apellido}
              </td>

              <td>
                <select
                  value={turno.estado}
                  onChange={(e) =>
                    cambiarEstado(turno.id, e.target.value as EstadoTurno)
                  }
                  className="
rounded-lg
border
px-2
py-1
text-sm
"
                >
                  <option value="PENDIENTE">PENDIENTE</option>

                  <option value="CONFIRMADO">CONFIRMADO</option>

                  <option value="ATENDIDO">ATENDIDO</option>

                  <option value="CANCELADO">CANCELADO</option>
                </select>
              </td>

              <td>{turno.motivo ?? "-"}</td>

              <td className="space-x-2">
                <button
                  onClick={() => {
                    setTurnoSeleccionado(turno);
                    setMostrarFormulario(true);
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={() => eliminar(turno.id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        open={mostrarFormulario}
        title={turnoSeleccionado ? "Editar Turno" : "Nuevo Turno"}
        onClose={() => {
          setMostrarFormulario(false);

          setTurnoSeleccionado(null);
        }}
      >
        <TurnoForm
          turno={turnoSeleccionado}
          onCreated={() => {
            cargarTurnos();

            setMostrarFormulario(false);

            setTurnoSeleccionado(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
