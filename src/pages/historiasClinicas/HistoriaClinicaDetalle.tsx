import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { deleteReceta, getReceta } from "../../services/recetaService";
import { deleteEstudio } from "../../services/estudioService";
import PageHeader from "../../components/ui/PageHeader";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

import RecetaForm from "../recetas/RecetaForm";
import Table from "../../components/ui/Table";
import AdjuntoForm from "../adjunto/adjuntoForm";
import {
  abrirAdjunto,
  deleteAdjunto,
  updateAdjunto,
} from "../../services/adjuntoService";
import type {
  AdjuntoSimple,
  HistoriaClinica,
} from "../../types/historiaClinica";
import { getHistoriaClinica } from "../../services/historiaClinicaService";
import type { Receta } from "../../types/receta";
import type { Estudio } from "../../types/estudio";
import EstudioForm from "../estudios/EstudioForm";

export default function HistoriaClinicaDetalle() {
  const { id } = useParams();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [historia, setHistoria] = useState<HistoriaClinica | null>(null);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(
    null,
  );
  const [mostrarEstudioForm, setMostrarEstudioForm] = useState(false);
  const [mostrarAdjuntoForm, setMostrarAdjuntoForm] = useState(false);
  const [mostrarEditarAdjunto, setMostrarEditarAdjunto] = useState(false);
  const [adjuntoSeleccionado, setAdjuntoSeleccionado] =
    useState<AdjuntoSimple | null>(null);
  const [descripcionAdjunto, setDescripcionAdjunto] = useState("");
  const [estudioSeleccionado, setEstudioSeleccionado] =
    useState<Estudio | null>(null);

  useEffect(() => {
    cargarHistoria();
  }, []);

  const navigate = useNavigate();

  async function cargarHistoria() {
    try {
      const data = await getHistoriaClinica(Number(id));

      setHistoria(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!historia) {
    return <DashboardLayout>Cargando...</DashboardLayout>;
  }

  async function editarReceta(id: number) {
    try {
      const data = await getReceta(id);

      setRecetaSeleccionada(data);

      setMostrarFormulario(true);
    } catch (error) {
      console.error(error);
    }
  }

  function editarAdjunto(adjunto: AdjuntoSimple) {
    setAdjuntoSeleccionado(adjunto);
    setDescripcionAdjunto(adjunto.descripcion ?? "");
    setMostrarEditarAdjunto(true);
  }

  async function guardarDescripcionAdjunto() {
    if (!adjuntoSeleccionado) {
      return;
    }

    try {
      await updateAdjunto(adjuntoSeleccionado.id, descripcionAdjunto);

      await cargarHistoria();

      setMostrarEditarAdjunto(false);
      setAdjuntoSeleccionado(null);
      setDescripcionAdjunto("");
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarReceta(id: number) {
    if (!window.confirm("¿Eliminar receta?")) return;

    try {
      await deleteReceta(id);

      cargarHistoria();
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarEstudio(id: number) {
    if (!window.confirm("¿Eliminar estudio?")) return;

    try {
      await deleteEstudio(id);

      cargarHistoria();
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarAdjunto(id: number) {
    if (!window.confirm("¿Eliminar este archivo?")) {
      return;
    }

    try {
      await deleteAdjunto(id);

      cargarHistoria();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <DashboardLayout>
      <PageHeader
        title={`Historia Clínica - ${historia.mascota.nombre}`}
        subtitle="Detalle médico de la mascota"
      />

      <div className="mb-4 flex justify-end">
        <Button
          onClick={() => {
            setRecetaSeleccionada(null);
            setMostrarFormulario(true);
          }}
        >
          Nueva Receta
        </Button>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-bold">Archivos adjuntos</h2>

          <Button onClick={() => setMostrarAdjuntoForm(true)}>
            📎 Nuevo Adjunto
          </Button>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Archivo</th>

              <th>Tipo</th>

              <th>Tamaño</th>

              <th>Descripción</th>

              <th>Fecha</th>

              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {historia.adjuntos.map((adjunto) => (
              <tr key={adjunto.id}>
                <td>{adjunto.nombre_archivo}</td>

                <td>{adjunto.tipo_archivo}</td>

                <td>
                  {adjunto.tamano
                    ? `${(adjunto.tamano / 1024).toFixed(1)} KB`
                    : "-"}
                </td>

                <td>{adjunto.descripcion ?? "-"}</td>

                <td>{new Date(adjunto.creado_en).toLocaleDateString()}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => abrirAdjunto(adjunto.id)}
                    className="
      rounded
      bg-blue-600
      px-3
      py-1
      text-white
    "
                  >
                    👁️
                  </button>

                  <button
                    onClick={() => editarAdjunto(adjunto)}
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
                    onClick={() => eliminarAdjunto(adjunto.id)}
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

        {historia.adjuntos.length === 0 && (
          <p className="mt-3 text-sm text-gray-500">
            No hay archivos adjuntos.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div
          className="
        rounded-lg
        border
        p-4
        "
        >
          <h2 className="font-bold">Diagnóstico</h2>

          <p>{historia.diagnostico}</p>
        </div>

        <div
          className="
        rounded-lg
        border
        p-4
        "
        >
          <h2 className="font-bold">Tratamiento</h2>

          <p>{historia.tratamiento ?? "-"}</p>
        </div>

        <div
          className="
        rounded-lg
        border
        p-4
        "
        >
          <h2 className="font-bold">Observaciones</h2>

          <p>{historia.observaciones ?? "-"}</p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold">Recetas</h2>

          <Table>
            <thead>
              <tr>
                <th>Indicaciones</th>

                <th>Fecha</th>

                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {historia.recetas.map((receta) => (
                <tr key={receta.id}>
                  <td>{receta.indicaciones_generales ?? "-"}</td>

                  <td>{new Date(receta.creado_en).toLocaleDateString()}</td>

                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/recetas/${receta.id}/medicamentos`)
                      }
                      className="
          rounded
          bg-blue-600
          px-3
          py-1
          text-white
          "
                    >
                      💊
                    </button>

                    <button
                      onClick={() => editarReceta(receta.id)}
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
                      onClick={() => eliminarReceta(receta.id)}
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
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-bold">Estudios</h2>

        <Button
          onClick={() => {
            setEstudioSeleccionado(null);
            setMostrarEstudioForm(true);
          }}
        >
          Nuevo Estudio
        </Button>

        <Table>
          <thead>
            <tr>
              <th>Tipo</th>

              <th>Nombre</th>

              <th>Fecha</th>

              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {historia.estudios.map((estudio) => (
              <tr key={estudio.id}>
                <td>{estudio.tipo}</td>

                <td>{estudio.nombre}</td>

                <td>
                  {new Date(estudio.fecha_realizacion).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() => {
                      setEstudioSeleccionado(estudio);
                      setMostrarEstudioForm(true);
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
                    onClick={() => eliminarEstudio(estudio.id)}
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
      </div>
      <Modal
        open={mostrarFormulario}
        title={recetaSeleccionada ? "Editar Receta" : "Nueva Receta"}
        onClose={() => {
          setMostrarFormulario(false);
          setRecetaSeleccionada(null);
        }}
      >
        <RecetaForm
          receta={recetaSeleccionada}
          historiaClinicaId={historia.id}
          onCreated={() => {
            cargarHistoria();

            setMostrarFormulario(false);

            setRecetaSeleccionada(null);
          }}
        />
      </Modal>
      <Modal
        open={mostrarEstudioForm}
        title={estudioSeleccionado ? "Editar Estudio" : "Nuevo Estudio"}
        onClose={() => {
          setMostrarEstudioForm(false);
          setEstudioSeleccionado(null);
        }}
      >
        <EstudioForm
          historiaClinicaId={historia.id}
          estudio={estudioSeleccionado}
          onCreated={() => {
            cargarHistoria();

            setMostrarEstudioForm(false);

            setEstudioSeleccionado(null);
          }}
        />
      </Modal>

      <Modal
        open={mostrarAdjuntoForm}
        title="Nuevo Adjunto"
        onClose={() => setMostrarAdjuntoForm(false)}
      >
        <AdjuntoForm
          historiaClinicaId={historia.id}
          onCreated={() => {
            cargarHistoria();

            setMostrarAdjuntoForm(false);
          }}
        />
      </Modal>
      <Modal
        open={mostrarEditarAdjunto}
        title="Editar descripción"
        onClose={() => {
          setMostrarEditarAdjunto(false);
          setAdjuntoSeleccionado(null);
          setDescripcionAdjunto("");
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Archivo</label>

            <p className="text-sm text-gray-600">
              {adjuntoSeleccionado?.nombre_archivo}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Descripción
            </label>

            <textarea
              value={descripcionAdjunto}
              onChange={(event) => setDescripcionAdjunto(event.target.value)}
              rows={4}
              className="
          w-full
          rounded
          border
          px-3
          py-2
          focus:outline-none
          focus:ring-2
        "
              placeholder="Ingrese una descripción..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                setMostrarEditarAdjunto(false);
                setAdjuntoSeleccionado(null);
                setDescripcionAdjunto("");
              }}
            >
              Cancelar
            </Button>

            <Button onClick={guardarDescripcionAdjunto}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
