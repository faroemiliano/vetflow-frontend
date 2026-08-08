import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import RecetaForm from "./RecetaForm";

export default function NuevaReceta() {
  const { historiaId } = useParams();

  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <PageHeader
        title="Nueva Receta"
        subtitle="Crear receta desde historia clínica"
      />

      <RecetaForm
        historiaClinicaId={Number(historiaId)}
        onCreated={() => {
          navigate("/recetas");
        }}
      />
    </DashboardLayout>
  );
}
