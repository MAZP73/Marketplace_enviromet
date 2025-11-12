import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/Dashboards/dashboardLayout";
import DashboardHome from "../components/Dashboards/dashboardHome";
import SolicitudesPendientes from "../components/Requests/my_request";
import SolicitudesEnviadas from "../components/Requests/submitted_requests";
import ActiveReservations from "../components/Reservations/accept_r";
import ReservasCompletadas from "../components/Reservations/complete_r";
import MyOffers from "../components/Dashboards/MyOffers";
import CreateExcess from "../components/Dashboards/CreateExcessForm";

const DashboardPage: React.FC = () => {

    const companyIdString = localStorage.getItem("companyId");
    const companyId = companyIdString ? parseInt(companyIdString) : null;

    if (!companyId) {
        return <p>No se encontró el ID de la empresa. Inicia sesión nuevamente.</p>;
    }

    return (
        <DashboardLayout>
            <Routes>

                <Route index element={<DashboardHome />} />


                <Route path="Crear_excedente" element={< CreateExcess />} />

                <Route path="Mis_ofertas" element={<MyOffers />} />
                <Route path="mis_solicitudes" element={<SolicitudesPendientes companyId={companyId} />} />
                <Route path="solicitudes_enviadas" element={<SolicitudesEnviadas companyId={companyId} />} />


                <Route path="reservas/activas" element={< ActiveReservations />} />
                <Route path="reservas/completadas" element={<ReservasCompletadas />} />
                <Route path="reservas/canceladas" element={<div>Reservas Canceladas</div>} />

            </Routes>
        </DashboardLayout >
    );
};

export default DashboardPage;
