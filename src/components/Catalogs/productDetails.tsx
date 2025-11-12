import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Excess } from "../../services/catalogService";
import { getExcessById } from "../../services/catalogService";
import { ArrowLeft } from "lucide-react";
import RequestForm from "../Requests/request";

const ProductDetail: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [producto, setProducto] = useState<Excess | null>(state as Excess | null);
    const [loading, setLoading] = useState(!producto);
    const [error, setError] = useState<string | null>(null);
    const [showRequestForm, setShowRequestForm] = useState(false);

    useEffect(() => {
        if (producto) return;

        const fetchProducto = async () => {
            try {
                setLoading(true);
                const data = await getExcessById(Number(id));
                setProducto(data);
            } catch (err) {
                console.error(err);
                setError("No se pudo cargar el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id, producto]);

    if (loading)
        return (
            <p className="text-center mt-12 text-emerald-600 font-medium">
                Cargando producto...
            </p>
        );

    if (error || !producto)
        return (
            <p className="text-center mt-12 text-red-600 font-medium">
                Producto no encontrado
            </p>
        );

    return (
        <div className="max-w-6xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-emerald-600 hover:text-emerald-800 font-medium mb-6 transition-colors duration-300"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Volver al catálogo
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 transition-transform transform hover:scale-[1.01]">
                <div className="relative overflow-hidden rounded-xl">
                    <img
                        src="https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000"
                        alt={producto.productName}
                        className="w-full h-96 object-cover rounded-xl border border-emerald-200 transition-transform duration-500 hover:scale-105"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                            {producto.productName}
                        </h1>
                        <p className="text-emerald-600 font-semibold text-2xl mb-4">
                            {producto.quantity} {producto.unitMeasurement}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {producto.description}
                        </p>

                        <button
                            onClick={() => setShowRequestForm(true)}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 w-full"
                        >
                            Solicitar Producto
                        </button>
                    </div>

                    <div className="mt-8 border-t pt-4 text-sm text-gray-500 space-y-1">
                        <p>
                            <strong>Categoría:</strong> {producto.category}
                        </p>
                        <p>
                            <strong>Ubicación:</strong> {producto.city}, {producto.address}
                        </p>
                        <p>
                            <strong>Publicado el:</strong>{" "}
                            {producto.publishDate || "No disponible"}
                        </p>
                        <p>
                            <strong>Vence el:</strong>{" "}
                            {producto.expirationDate || "No disponible"}
                        </p>
                        <p>
                            <strong>Estado:</strong> {producto.status || "No disponible"}
                        </p>
                    </div>
                </div>
            </div>

            {showRequestForm && producto && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-50 overflow-auto">
                    <div className="relative w-full max-w-xl mx-4">
                        <button
                            onClick={() => setShowRequestForm(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
                        >
                            ×
                        </button>
                        <RequestForm
                            excess={producto}
                            onSuccess={() => setShowRequestForm(false)}
                            onClose={() => setShowRequestForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
