import { useEffect, useState } from "react";

import type { Mascota } from "../../types/mascota";
import type { Cliente } from "../../types/clientes";

import { getMascotas, deleteMascota } from "../../services/mascotaService";
import { getClientes } from "../../services/clienteService";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "../../components/ui/Toolbar";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";

import MascotaForm from "../mascotas/MascotasForm";

export default function Mascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [busqueda, setBusqueda] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [mascotaSeleccionada, setMascotaSeleccionada] =
    useState<Mascota | null>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const [mascotasData, clientesData] = await Promise.all([
        getMascotas(),
        getClientes(),
      ]);

      setMascotas(mascotasData);
      setClientes(clientesData);
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminar(id: number) {
    if (!window.confirm("¿Desea eliminar esta mascota?")) return;

    try {
      await deleteMascota(id);

      cargarDatos();
    } catch (error) {
      console.error(error);
    }
  }

  const mascotasFiltradas = mascotas.filter((mascota) =>
    mascota.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  function nombreCliente(clienteId: number) {
    return clientes.find((c) => c.id === clienteId)?.nombre ?? "-";
  }

  const navigate = useNavigate();

  function navegarVacunas(id: number) {
    navigate(`/mascotas/${id}/vacunas`);
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Mascotas"
        subtitle="Gestiona las mascotas registradas"
      />

      <Toolbar>
        <Button
          onClick={() => {
            setMascotaSeleccionada(null);
            setMostrarFormulario(true);
          }}
        >
          Nueva Mascota
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
            <th>Nombre</th>
            <th>Cliente</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {mascotasFiltradas.map((mascota) => (
            <tr key={mascota.id}>
              <td>{mascota.nombre}</td>

              <td>{nombreCliente(mascota.cliente_id)}</td>

              <td>{mascota.especie}</td>

              <td>{mascota.raza ?? "-"}</td>

              <td>{mascota.edad ?? "-"}</td>

              <td className="space-x-2">
                <button
                  onClick={() => navegarVacunas(mascota.id)}
                  className="rounded bg-blue-600 px-3 py-1 text-white"
                >
                  💉
                </button>

                <button
                  onClick={() => {
                    setMascotaSeleccionada(mascota);
                    setMostrarFormulario(true);
                  }}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  ✏️
                </button>

                <button
                  onClick={() => eliminar(mascota.id)}
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
        title={mascotaSeleccionada ? "Editar Mascota" : "Nueva Mascota"}
        onClose={() => {
          setMostrarFormulario(false);
          setMascotaSeleccionada(null);
        }}
      >
        <MascotaForm
          mascota={mascotaSeleccionada}
          clientes={clientes}
          onCreated={() => {
            cargarDatos();
            setMostrarFormulario(false);
            setMascotaSeleccionada(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
