import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCompanyRequests,
} from "../../services/requestService";
import { Eye } from "lucide-react";

interface Solicitud {
    id: number;
    created_at: string;
    user_id: number;
    message: string;
    request_status: string;
    surplus_id: number;
    product_owner: number;
}

interface Props {
    companyId: number;
}

const SolicitudesEnviadas: React.FC<Props> = ({ companyId }) => {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [ordenarPor, setOrdenarPor] = useState<"fecha" | "id">("fecha");
    const [filtroEstado, setFiltroEstado] = useState<
        "todas" | "pending" | "accepted" | "rejected"
    >("todas");
    const [pagina, setPagina] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const elementosPorPagina = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const cargarSolicitudes = async () => {
            setCargando(true);
            setError(null);
            try {
                const data = await getCompanyRequests(companyId);
                const solicitudesExternas = data.filter(
                    (s: Solicitud) => s.product_owner !== companyId
                );
                setSolicitudes(solicitudesExternas);
            } catch (err) {
                console.error("Error al cargar solicitudes:", err);
                setError("Error al cargar las solicitudes.");
            } finally {
                setCargando(false);
            }
        };
        cargarSolicitudes();
    }, [companyId]);

    const solicitudesFiltradas = useMemo(() => {
        return solicitudes.filter((s) => {
            const coincideBusqueda =
                s.message.toLowerCase().includes(busqueda.toLowerCase()) ||
                s.id.toString().includes(busqueda);
            const coincideEstado =
                filtroEstado === "todas" || s.request_status === filtroEstado;
            return coincideBusqueda && coincideEstado;
        });
    }, [solicitudes, busqueda, filtroEstado]);

    const solicitudesOrdenadas = useMemo(() => {
        return [...solicitudesFiltradas].sort((a, b) => {
            if (ordenarPor === "fecha") {
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            }
            return b.id - a.id;
        });
    }, [solicitudesFiltradas, ordenarPor]);

    const totalPaginas = Math.ceil(
        solicitudesOrdenadas.length / elementosPorPagina
    );
    const solicitudesPaginadas = solicitudesOrdenadas.slice(
        (pagina - 1) * elementosPorPagina,
        pagina * elementosPorPagina
    );

    const verDetalle = (surplusId: number) => {
        navigate(`/producto/${surplusId}`);
    };

    if (cargando)
        return <p className="text-center text-gray-600 mt-8">Cargando solicitudes...</p>;

    if (error)
        return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <section className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md">
            <header className="mb-6 border-b pb-3">
                <h1 className="text-2xl font-bold text-gray-800">
                    Solicitudes Enviadas
                </h1>
            </header>

            <section className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Buscar por mensaje o ID..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPagina(1);
                    }}
                    className="w-full sm:w-1/3 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                    <select
                        value={filtroEstado}
                        onChange={(e) =>
                            setFiltroEstado(
                                e.target.value as "todas" | "pending" | "accepted" | "rejected"
                            )
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="todas">Todas</option>
                        <option value="pending">Pendientes</option>
                        <option value="accepted">Aceptadas</option>
                        <option value="rejected">Rechazadas</option>
                    </select>

                    <select
                        value={ordenarPor}
                        onChange={(e) =>
                            setOrdenarPor(e.target.value as "fecha" | "id")
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="fecha">Ordenar por Fecha</option>
                        <option value="id">Ordenar por ID</option>
                    </select>
                </div>
            </section>

            <main className="overflow-x-auto">
                <table className="w-full text-sm text-left border-t border-gray-200">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700">
                            <th className="py-3 px-4 font-medium">ID</th>
                            <th className="py-3 px-4 font-medium">Usuario ID</th>
                            <th className="py-3 px-4 font-medium">Mensaje</th>
                            <th className="py-3 px-4 font-medium">Fecha</th>
                            <th className="py-3 px-4 font-medium">Estado</th>
                            <th className="py-3 px-4 font-medium text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudesPaginadas.map((req) => (
                            <tr key={req.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium text-gray-800">
                                    #{req.id}
                                </td>
                                <td className="py-3 px-4">{req.user_id}</td>
                                <td className="py-3 px-4">{req.message || "-"}</td>
                                <td className="py-3 px-4">
                                    {new Date(req.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                    {req.request_status === "pending" ? (
                                        <span className="text-yellow-600 font-medium">Pendiente</span>
                                    ) : req.request_status === "accepted" ? (
                                        <span className="text-green-600 font-medium">Aceptada</span>
                                    ) : (
                                        <span className="text-red-600 font-medium">Rechazada</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => verDetalle(req.surplus_id)}
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            <footer className="flex justify-center items-center mt-6">
                <div className="flex gap-2">
                    <button
                        disabled={pagina === 1}
                        onClick={() => setPagina((p) => p - 1)}
                        className={`px-3 py-1 border rounded-lg ${pagina === 1
                            ? "text-gray-400 border-gray-200"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        ←
                    </button>
                    <span>
                        Página {pagina} de {totalPaginas}
                    </span>
                    <button
                        disabled={pagina === totalPaginas}
                        onClick={() => setPagina((p) => p + 1)}
                        className={`px-3 py-1 border rounded-lg ${pagina === totalPaginas
                            ? "text-gray-400 border-gray-200"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        →
                    </button>
                </div>
            </footer>
        </section>
    );
};

export default SolicitudesEnviadas;
