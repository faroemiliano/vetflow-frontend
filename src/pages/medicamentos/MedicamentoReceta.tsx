import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import type { RecetaMedicamento } from "../../types/recetaMedicamento";

import {
  getMedicamentos,
  deleteMedicamento,
} from "../../services/recetaMedicamentoService";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "../../components/ui/Toolbar";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";

import RecetaMedicamentoForm from "./MedicamentoRecetaForm";

export default function MedicamentosReceta() {
  const { recetaId } = useParams();

  const idReceta = Number(recetaId);

  const [medicamentos, setMedicamentos] = useState<RecetaMedicamento[]>([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] =
    useState<RecetaMedicamento | null>(null);

  useEffect(() => {
    cargarMedicamentos();
  }, []);

  async function cargarMedicamentos() {
    try {
      const data = await getMedicamentos(idReceta);

      setMedicamentos(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id: number) {
    if (!window.confirm("¿Eliminar medicamento?")) return;

    try {
      await deleteMedicamento(id);

      cargarMedicamentos();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Medicamentos"
        subtitle="Medicamentos asociados a la receta"
      />

      <Toolbar>
        <Button
          onClick={() => {
            setMedicamentoSeleccionado(null);

            setMostrarFormulario(true);
          }}
        >
          Nuevo Medicamento
        </Button>
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>

            <th>Dosis</th>

            <th>Frecuencia</th>

            <th>Duración</th>

            <th>Vía</th>

            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id}>
              <td>{medicamento.nombre}</td>

              <td>{medicamento.dosis}</td>

              <td>{medicamento.frecuencia}</td>

              <td>{medicamento.duracion}</td>

              <td>{medicamento.via_administracion}</td>

              <td className="space-x-2">
                <button
                  onClick={() => {
                    setMedicamentoSeleccionado(medicamento);

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
                  onClick={() => eliminar(medicamento.id)}
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
        title={
          medicamentoSeleccionado ? "Editar Medicamento" : "Nuevo Medicamento"
        }
        onClose={() => {
          setMostrarFormulario(false);

          setMedicamentoSeleccionado(null);
        }}
      >
        <RecetaMedicamentoForm
          recetaId={idReceta}
          medicamento={medicamentoSeleccionado}
          onCreated={() => {
            cargarMedicamentos();

            setMostrarFormulario(false);

            setMedicamentoSeleccionado(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
