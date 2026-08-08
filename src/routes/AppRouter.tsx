import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/clientes/Clientes";
import Mascotas from "../pages/mascotas/Mascotas";
import Turnos from "../pages/turnos/Turnos";
import HistoriasClinicas from "../pages/historiasClinicas/HistoriasClinicas";
import Vacunas from "../pages/vacunas/Vacunas";
import VacunasMascota from "../pages/vacunas/VacunasAplicacionMascota";
import Recetas from "../pages/recetas/Receta";
import NuevaReceta from "../pages/recetas/NuevaReceta";
import MedicamentosReceta from "../pages/medicamentos/MedicamentoReceta";
import HistoriaClinicaDetalle from "../pages/historiasClinicas/HistoriaClinicaDetalle";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/clientes" element={<Clientes />} />

        <Route path="/mascotas" element={<Mascotas />} />

        <Route path="/turnos" element={<Turnos />} />

        <Route path="/historias-clinicas" element={<HistoriasClinicas />} />

        <Route path="/vacunas" element={<Vacunas />} />

        <Route path="/mascotas/:id/vacunas" element={<VacunasMascota />} />

        <Route path="/recetas" element={<Recetas />} />

        <Route path="/recetas/nueva/:historiaId" element={<NuevaReceta />} />

        <Route
          path="/recetas/:recetaId/medicamentos"
          element={<MedicamentosReceta />}
        />

        <Route
          path="/historias-clinicas/:id"
          element={<HistoriaClinicaDetalle />}
        />
      </Routes>
    </BrowserRouter>
  );
}
