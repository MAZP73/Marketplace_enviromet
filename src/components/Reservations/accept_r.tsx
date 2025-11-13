import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, MapPin, CheckCircle } from "lucide-react";
import { getCompanyReservations, updateReservationStatus } from "../../services/reservationService";

interface Reservation {
    id: number;
    created_at: string;
    surplus_id: number;
    user_id: number;
    reservation_status: "in process" | "completed";
}

const ReservasActivas: React.FC = () => {
    const navigate = useNavigate();
    const storedCompanyId = localStorage.getItem("companyId");
    const companyId = storedCompanyId ? parseInt(storedCompanyId) : null;

    const [reservas, setReservas] = useState<Reservation[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [ordenarPor, setOrdenarPor] = useState<"fecha" | "id">("fecha");
    const [pagina, setPagina] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [reservaSeleccionada, setReservaSeleccionada] = useState<Reservation | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [actualizando, setActualizando] = useState(false);

    const elementosPorPagina = 5;

    useEffect(() => {
        const cargarReservas = async () => {
            if (!companyId) return;
            setCargando(true);
            setError(null);
            try {
                const data = await getCompanyReservations(companyId);
                const activas = Array.isArray(data)
                    ? data.filter((r: Reservation) => r.reservation_status === "in process")
                    : [];
                setReservas(activas);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Error al cargar las reservas.");
            } finally {
                setCargando(false);
            }
        };

        cargarReservas();
    }, [companyId]);

    const reservasFiltradas = useMemo(() => {
        return reservas.filter((r) => {
            const fechaFormateada = new Date(r.created_at).toLocaleDateString();
            return (
                r.id.toString().includes(busqueda) ||
                r.user_id.toString().includes(busqueda) ||
                r.reservation_status.toLowerCase().includes(busqueda.toLowerCase()) ||
                fechaFormateada.includes(busqueda)
            );
        });
    }, [reservas, busqueda]);

    const reservasOrdenadas = useMemo(() => {
        return [...reservasFiltradas].sort((a, b) =>
            ordenarPor === "fecha"
                ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                : b.id - a.id
        );
    }, [reservasFiltradas, ordenarPor]);

    const totalPaginas = Math.ceil(reservasOrdenadas.length / elementosPorPagina);
    const reservasPaginadas = useMemo(() => {
        const start = (pagina - 1) * elementosPorPagina;
        const end = start + elementosPorPagina;
        return reservasOrdenadas.slice(start, end);
    }, [reservasOrdenadas, pagina]);

    const verDetalle = (surplusId: number) => navigate(`/producto/${surplusId}`);

    const verMapa = (reserva: Reservation) => {
        if (reserva.user_id === companyId) {
            alert("No puedes abrir el mapa de tus propias reservas.");
            return;
        }
        setReservaSeleccionada(reserva);
        setMostrarModal(true);
    };

    const cambiarEstado = async (id: number) => {
        try {
            setActualizando(true);
            await updateReservationStatus(id, "completed");
            setReservas((prev) =>
                prev.map((r) =>
                    r.id === id ? { ...r, reservation_status: "completed" } : r
                )
            );
            setMostrarModal(false);
        } catch (error) {
            alert("Error al actualizar el estado de la reserva.");
        } finally {
            setActualizando(false);
        }
    };



    if (!companyId)
        return <p className="text-center text-red-500 mt-8">No hay companyId en localStorage.</p>;
    if (cargando)
        return <p className="text-center text-gray-600 mt-8">Cargando reservas...</p>;
    if (error)
        return <p className="text-center text-red-500 mt-8">{error}</p>;

    return (
        <section className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md">
            <header className="mb-6 border-b pb-3">
                <h1 className="text-2xl font-bold text-gray-800">Reservas Activas</h1>
            </header>

            <section className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Buscar por ID, usuario o fecha..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPagina(1);
                    }}
                    className="w-full sm:w-1/3 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={ordenarPor}
                    onChange={(e) => setOrdenarPor(e.target.value as "fecha" | "id")}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="fecha">Ordenar por Fecha</option>
                    <option value="id">Ordenar por ID</option>
                </select>
            </section>

            {reservasPaginadas.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No hay reservas activas para mostrar.</p>
            ) : (
                <main className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-t border-gray-200">
                        <thead>
                            <tr className="bg-gray-50 text-gray-700">
                                <th className="py-3 px-4 font-medium">ID</th>
                                <th className="py-3 px-4 font-medium">Usuario ID</th>
                                <th className="py-3 px-4 font-medium">Fecha</th>
                                <th className="py-3 px-4 font-medium">Estado</th>
                                <th className="py-3 px-4 font-medium text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservasPaginadas.map((r) => (
                                <tr key={r.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium text-gray-800">#{r.id}</td>
                                    <td className="py-3 px-4">{r.user_id}</td>
                                    <td className="py-3 px-4">
                                        {new Date(r.created_at).toLocaleString("es-CO", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td className="py-3 px-4 font-medium text-blue-600">
                                        {r.reservation_status}
                                    </td>
                                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                                        <button
                                            onClick={() => verDetalle(r.surplus_id)}
                                            className="text-gray-600 hover:text-blue-600"
                                            title="Ver detalle del producto"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() => verMapa(r)}
                                            className={`text-gray-600 ${r.user_id === companyId
                                                ? "opacity-40 cursor-not-allowed"
                                                : "hover:text-green-600"
                                                }`}
                                            title={
                                                r.user_id === companyId
                                                    ? "No puedes abrir el mapa de tus propias reservas"
                                                    : "Ver estado de entrega"
                                            }
                                            disabled={r.user_id === companyId}
                                        >
                                            <MapPin size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            )}

            {mostrarModal && reservaSeleccionada && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Estado de la Reserva #{reservaSeleccionada.id}
                        </h2>

                        <ul className="border-l-2 border-green-500 pl-4 space-y-3 text-sm">
                            <li className="text-green-700">
                                <strong>En proceso</strong>
                                <br />{new Date(reservaSeleccionada.created_at).toLocaleString("es-CO")}
                            </li>
                        </ul>

                        <div className="flex justify-end mt-6 gap-3">
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                                disabled={actualizando}
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={() => cambiarEstado(reservaSeleccionada.id)}
                                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm flex items-center gap-2"
                                disabled={actualizando}
                            >
                                <CheckCircle size={16} /> Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {reservasPaginadas.length > 0 && (
                <footer className="flex justify-center items-center mt-6">
                    <div className="flex items-center gap-2">
                        <button
                            disabled={pagina === 1}
                            onClick={() => setPagina((p) => p - 1)}
                            className={`px-3 py-1 border rounded-lg ${pagina === 1 ? "text-gray-400 border-gray-200" : "hover:bg-gray-100"
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
                            className={`px-3 py-1 border rounded-lg ${pagina === totalPaginas ? "text-gray-400 border-gray-200" : "hover:bg-gray-100"
                                }`}
                        >
                            →
                        </button>
                    </div>
                </footer>
            )}
        </section>
    );
};

export default ReservasActivas;
