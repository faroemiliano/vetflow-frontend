import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";

import { getResumenCaja } from "../services/cajaService";
import { getMovimientosCaja } from "../services/movimientoCajaService";
import Badge from "../components/ui/Badge";
import type { CajaResumen } from "../types/caja";
import type { MovimientoCaja } from "../types/movimientoCaja";
import PageHeader from "../components/ui/PageHeader";
import {
  Landmark,
  Receipt,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

export default function Dashboard() {
  const [resumen, setResumen] = useState<CajaResumen | null>(null);

  const [movimientos, setMovimientos] = useState<MovimientoCaja[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDashboard();
  }, []);

  async function cargarDashboard() {
    try {
      const [resumenData, movimientosData] = await Promise.all([
        getResumenCaja(),
        getMovimientosCaja(),
      ]);

      setResumen(resumenData);
      setMovimientos(movimientosData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !resumen) {
    return <h1>Cargando...</h1>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          subtitle="Resumen general de la veterinaria"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Saldo Inicial"
            value={`$ ${resumen.saldo_inicial}`}
            icon={<Wallet className="h-6 w-6 text-blue-600" />}
          />

          <StatCard
            title="Ingresos"
            value={`$ ${resumen.ingresos}`}
            icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          />

          <StatCard
            title="Egresos"
            value={`$ ${resumen.egresos}`}
            icon={<TrendingDown className="h-6 w-6 text-red-600" />}
          />

          <StatCard
            title="Movimientos"
            value={resumen.cantidad_movimientos}
            icon={<Receipt className="h-6 w-6 text-purple-600" />}
          />

          <StatCard
            title="Saldo Actual"
            value={`$ ${resumen.saldo_actual}`}
            icon={<Landmark className="h-6 w-6 text-amber-600" />}
          />
        </div>

        <Table>
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Tipo</th>
              <th className="px-4 py-3 text-left">Origen</th>
              <th className="px-4 py-3 text-left">Descripción</th>
              <th className="px-4 py-3 text-right">Monto</th>
            </tr>
          </thead>

          <tbody>
            {movimientos.map((movimiento) => (
              <tr
                key={movimiento.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  {new Date(movimiento.creado_en).toLocaleString("es-AR")}
                </td>

                <td className="px-4 py-3">
                  <Badge
                    color={movimiento.tipo === "INGRESO" ? "green" : "red"}
                  >
                    {movimiento.tipo}
                  </Badge>
                </td>

                <td className="px-4 py-3">{movimiento.origen}</td>

                <td className="px-4 py-3">{movimiento.descripcion}</td>

                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    movimiento.tipo === "INGRESO"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {movimiento.tipo === "INGRESO" ? "+" : "-"} $
                  {movimiento.monto}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
