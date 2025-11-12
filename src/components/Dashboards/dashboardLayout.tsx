import React from "react";
import { useNavigate } from "react-router-dom";
import {
    LogOut,
    PlusCircle,
    Clock,
    CheckCircle,
    Home,
} from "lucide-react";

interface DashboardLayoutProps {
    children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            <aside className="w-64 bg-white border-r flex flex-col">

                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Marketplace</h1>
                    <p className="text-sm text-gray-500">Panel Principal</p>
                </div>

                <nav className="flex-1 p-4 space-y-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <Home className="w-5 h-5" /> Inicio
                    </button>

                    <button
                        onClick={() => navigate("/dashboard/Crear_excedente")}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                        <PlusCircle className="w-5 h-5" /> Crear Excedente
                    </button>

                    <button
                        onClick={() => navigate("/dashboard/Mis_ofertas")}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                        <PlusCircle className="w-5 h-5" /> Mis Ofertas
                    </button>

                    <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Solicitudes</p>
                        <ul className="space-y-1">
                            <li
                                onClick={() => navigate("/dashboard/mis_solicitudes")}
                                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                <Clock className="w-4 h-4" /> Mis Solicitudes
                            </li>
                            <li
                                onClick={() => navigate("/dashboard/solicitudes_enviadas")}
                                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                <CheckCircle className="w-4 h-4" /> Solicitudes Enviadas
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Reservas</p>
                        <ul className="space-y-1">
                            <li
                                onClick={() => navigate("/dashboard/reservas/activas")}
                                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                <Clock className="w-4 h-4" /> Activas
                            </li>
                            <li
                                onClick={() => navigate("/dashboard/reservas/completadas")}
                                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
                            >
                                <CheckCircle className="w-4 h-4" /> Completadas
                            </li>
                        </ul>
                    </div>
                </nav>

                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 p-4 text-gray-600 hover:bg-gray-100 border-t"
                >
                    <LogOut className="w-5 h-5" /> Salir
                </button>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
    );
};

export default DashboardLayout;
