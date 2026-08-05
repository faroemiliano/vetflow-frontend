import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/clientes/Clientes";
import Mascotas from "../pages/mascotas/Mascotas";
import Turnos from "../pages/turnos/Turnos";
import HistoriasClinicas from "../pages/historiasClinicas/historiasClinicas";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/clientes" element={<Clientes />} />

        <Route path="/mascotas" element={<Mascotas />} />

        <Route path="/turnos" element={<Turnos />} />

        <Route path="/historias-clinicas" element={<HistoriasClinicas />} />
      </Routes>
    </BrowserRouter>
  );
}
