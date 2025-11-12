import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/userService";
import { getCompanyRequests } from "../../services/requestService";
import { getAllExcesses } from "../../services/catalogService";
import { Eye } from "lucide-react";

interface RequestData {
    id: number;
    created_at: string;
    user_id: number;
    message: string;
    request_status: string;
    surplus_id: number;
    product_owner: number;
}

interface UserProfile {
    id: number;
    name: string;
    user_type: string;
    email: string;
    avatar?: string;
}

const DashboardHome: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [requests, setRequests] = useState<RequestData[]>([]);
    const [excessesCount, setExcessesCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [orderBy, setOrderBy] = useState<"fecha" | "id">("fecha");
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const profile = await getUserProfile();
                const userData = profile.user;
                setUser(userData);

                const allExcesses = await getAllExcesses();
                const userExcesses = allExcesses.filter(
                    (excess) => excess.empresaId === userData.id
                );
                setExcessesCount(userExcesses.length);

                const companyRequests = await getCompanyRequests(userData.id);
                setRequests(companyRequests);
            } catch (error) {
                console.error("Error al cargar los datos del dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const filteredRequests = useMemo(() => {
        return (requests || [])
            .filter((r): r is RequestData => !!r && typeof r === "object")
            .filter((r) => {
                const status = (r.request_status ?? "").toString().toLowerCase();
                return status === "pending" || status === "rejected";
            });
    }, [requests]);

    const searchedRequests = useMemo(() => {
        return filteredRequests.filter((r) => {
            const text = `${r.id} ${r.message}`.toLowerCase();
            return text.includes(search.toLowerCase());
        });
    }, [filteredRequests, search]);

    const orderedRequests = useMemo(() => {
        return [...searchedRequests].sort((a, b) => {
            if (orderBy === "fecha") {
                return (
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
            }
            return b.id - a.id;
        });
    }, [searchedRequests, orderBy]);

    const totalPages = Math.ceil(orderedRequests.length / itemsPerPage);
    const paginatedRequests = orderedRequests.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleViewDetails = (surplusId: number) => {
        navigate(`/producto/${surplusId}`);
    };

    if (loading) {
        return <p className="text-gray-500 p-6">Cargando datos...</p>;
    }

    const pendingCount = requests.filter(
        (r) => (r?.request_status ?? "").toLowerCase() === "pending"
    ).length;

    const rejectedCount = requests.filter(
        (r) => (r?.request_status ?? "").toLowerCase() === "rejected"
    ).length;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">
                ¡Bienvenido de nuevo, {user?.name || "Usuario"}!
            </h1>
            <p className="text-gray-500 mb-6">
                Aquí tienes un resumen de la actividad de tu marketplace.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <p className="text-sm text-gray-500">Ofertas creadas</p>
                    <h3 className="text-3xl font-bold mt-2">{excessesCount}</h3>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <p className="text-sm text-gray-500">Solicitudes pendientes</p>
                    <h3 className="text-3xl font-bold mt-2">{pendingCount}</h3>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <p className="text-sm text-gray-500">Solicitudes rechazadas</p>
                    <h3 className="text-3xl font-bold mt-2">{rejectedCount}</h3>
                </div>
            </div>

            <section className="bg-white rounded-2xl shadow-md border p-6">
                <header className="mb-4 border-b pb-3">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Solicitudes pendientes y rechazadas
                    </h2>
                    <p className="text-sm text-gray-500">
                        Revisa las solicitudes activas o que fueron rechazadas.
                    </p>
                </header>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por ID o mensaje..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full sm:w-1/3 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <select
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value as "fecha" | "id")}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    >
                        <option value="fecha">Ordenar por fecha</option>
                        <option value="id">Ordenar por ID</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-t border-gray-200">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700">
                                <th className="py-3 px-4 font-medium">ID</th>
                                <th className="py-3 px-4 font-medium">Usuario</th>
                                <th className="py-3 px-4 font-medium">Mensaje</th>
                                <th className="py-3 px-4 font-medium">Fecha</th>
                                <th className="py-3 px-4 font-medium">Estado</th>
                                <th className="py-3 px-4 font-medium text-center">Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRequests.length > 0 ? (
                                paginatedRequests.map((req) => {
                                    const status = (req.request_status ?? "")
                                        .toString()
                                        .toLowerCase();

                                    const estadoLabel =
                                        status === "pending"
                                            ? "Pendiente"
                                            : status === "rejected"
                                                ? "Rechazada"
                                                : "Desconocido";

                                    return (
                                        <tr key={req.id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4 text-gray-800 font-medium">
                                                #{req.id}
                                            </td>
                                            <td className="py-3 px-4">Usuario #{req.user_id}</td>
                                            <td className="py-3 px-4">{req.message}</td>
                                            <td className="py-3 px-4">
                                                {new Date(req.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                {estadoLabel === "Pendiente" ? (
                                                    <span className="text-yellow-600 font-medium">
                                                        Pendiente
                                                    </span>
                                                ) : estadoLabel === "Rechazada" ? (
                                                    <span className="text-red-600 font-medium">
                                                        Rechazada
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-600 font-medium">
                                                        Desconocido
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => handleViewDetails(req.surplus_id)}
                                                    className="text-green-600 hover:text-green-800 transition"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-gray-500">
                                        No hay solicitudes pendientes ni rechazadas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 text-sm rounded-lg border disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span className="text-sm text-gray-600">
                            Página {page} de {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 text-sm rounded-lg border disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DashboardHome;
