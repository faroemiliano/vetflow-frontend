import { useEffect, useState } from "react";

import type { Cliente } from "../../types/clientes";

import { getClientes, deleteCliente } from "../../services/clienteService";

import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";

import ClienteForm from "./ClientesForm";

import Modal from "../../components/ui/Modal";

import Table from "../../components/ui/Table";

import Toolbar from "../../components/ui/Toolbar";
import SearchInput from "../../components/ui/SearchInput";

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<Cliente | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  async function cargarClientes() {
    try {
      const data = await getClientes();

      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function eliminar(id: number) {
    const confirmar = window.confirm("¿Desea eliminar este cliente?");

    if (!confirmar) return;

    try {
      await deleteCliente(id);

      cargarClientes();
    } catch (error) {
      console.error(error);
    }
  }

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (cliente.email ?? "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (cliente.telefono ?? "").includes(busqueda),
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Clientes"
        subtitle="Gestiona los clientes de la veterinaria"
      />

      <Toolbar>
        <button
          onClick={() => {
            setClienteSeleccionado(null);
            setMostrarFormulario(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Nuevo Cliente
        </button>

        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar cliente..."
        />
      </Toolbar>

      <Modal
        open={mostrarFormulario}
        title={clienteSeleccionado ? "Editar Cliente" : "Nuevo Cliente"}
        onClose={() => {
          setMostrarFormulario(false);
          setClienteSeleccionado(null);
        }}
      >
        <ClienteForm
          cliente={clienteSeleccionado}
          onCreated={() => {
            cargarClientes();

            setMostrarFormulario(false);

            setClienteSeleccionado(null);
          }}
        />
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>

            <th>Email</th>

            <th>Teléfono</th>
          </tr>
        </thead>

        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>

              <td>{cliente.email}</td>

              <td>{cliente.telefono}</td>

              <td className="space-x-2">
                <button
                  onClick={() => eliminar(cliente.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  🗑️
                </button>

                <button
                  onClick={() => {
                    setClienteSeleccionado(cliente);
                    setMostrarFormulario(true);
                  }}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardLayout>
  );
}
