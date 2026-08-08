import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import type { AplicacionVacuna } from "../../types/aplicacionVacunas";

import {
  getAplicaciones,
  deleteAplicacion,
} from "../../services/aplicacionVacunaService";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "../../components/ui/Toolbar";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";

import AplicacionVacunaForm from "./VacunasAplicacionMascotaForm";

export default function VacunasMascota() {
  const { id } = useParams();

  const mascotaId = Number(id);

  const [aplicaciones, setAplicaciones] = useState<AplicacionVacuna[]>([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [aplicacionSeleccionada, setAplicacionSeleccionada] =
    useState<AplicacionVacuna | null>(null);

  useEffect(() => {
    cargarAplicaciones();
  }, []);

  async function cargarAplicaciones() {
    try {
      const data = await getAplicaciones(mascotaId);

      setAplicaciones(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id: number) {
    if (!window.confirm("¿Eliminar aplicación?")) return;

    try {
      await deleteAplicacion(id);

      cargarAplicaciones();
    } catch (error) {
      console.error(error);
    }
  }

  function formatearFecha(fecha: string) {
    const [anio, mes, dia] = fecha.split("-");

    return `${dia}/${mes}/${anio}`;
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Vacunas"
        subtitle="Historial de vacunación de la mascota"
      />

      <Toolbar>
        <Button
          onClick={() => {
            setAplicacionSeleccionada(null);

            setMostrarFormulario(true);
          }}
        >
          Aplicar Vacuna
        </Button>
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>Vacuna</th>

            <th>Aplicación</th>

            <th>Próxima</th>

            <th>Observaciones</th>

            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {aplicaciones.map((aplicacion) => (
            <tr key={aplicacion.id}>
              <td>{aplicacion.vacuna.nombre}</td>

              <td>{formatearFecha(aplicacion.fecha_aplicacion)}</td>

              <td>
                {aplicacion.fecha_proxima
                  ? formatearFecha(aplicacion.fecha_proxima)
                  : "-"}
              </td>

              <td>{aplicacion.observaciones ?? "-"}</td>

              <td className="space-x-2">
                <button
                  onClick={() => {
                    setAplicacionSeleccionada(aplicacion);

                    setMostrarFormulario(true);
                  }}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  ✏️
                </button>

                <button
                  onClick={() => eliminar(aplicacion.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white"
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
        title={aplicacionSeleccionada ? "Editar Aplicación" : "Aplicar Vacuna"}
        onClose={() => {
          setMostrarFormulario(false);

          setAplicacionSeleccionada(null);
        }}
      >
        <AplicacionVacunaForm
          mascotaId={mascotaId}
          aplicacion={aplicacionSeleccionada}
          onCreated={() => {
            cargarAplicaciones();

            setMostrarFormulario(false);

            setAplicacionSeleccionada(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
