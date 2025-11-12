import React, { useState } from "react";
import { createRequest, getCompanyRequests } from "../../services/requestService";
import type { Excess } from "../../services/catalogService";
import { motion, AnimatePresence } from "framer-motion";

interface RequestFormProps {
    excess: Excess;
    onClose: () => void;
    onSuccess?: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({
    excess,
    onClose,
    onSuccess,
}) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = (): boolean => {
        const newErrors: string[] = [];

        console.log("Validando formulario...");
        console.log("Datos recibidos:", { excess, message });

        const requesterCompanyId = Number(localStorage.getItem("companyId"));
        const productOwnerId = excess?.empresaId;

        if (!excess || excess.excessId === undefined) {
            newErrors.push("El producto seleccionado no tiene un ID válido.");
        }

        if (message.length > 255) {
            newErrors.push("El mensaje no puede tener más de 255 caracteres.");
        }

        if (!requesterCompanyId) {
            newErrors.push("No se pudo identificar tu empresa. Inicia sesión nuevamente.");
        }

        if (productOwnerId && requesterCompanyId === productOwnerId) {
            newErrors.push("No puedes enviar una solicitud a tu propio producto.");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);
        setErrors([]);

        if (!validateForm()) return;

        setLoading(true);

        try {
            const requesterCompanyId = Number(localStorage.getItem("companyId"));
            const productOwnerId = excess?.empresaId;

            if (productOwnerId && requesterCompanyId === productOwnerId) {
                setFeedback(" No puedes enviar una solicitud a tu propio producto.");
                setLoading(false);
                return;
            }

            const existingRequests = await getCompanyRequests(requesterCompanyId);
            const hasPendingOrAccepted = existingRequests.some(
                (r: any) =>
                    ["pending", "accepted"].includes(r.request_status) &&
                    r.surplus_id === excess.excessId
            );

            if (hasPendingOrAccepted) {
                setFeedback(
                    " Ya existe una solicitud pendiente o aceptada para este producto."
                );
                setLoading(false);
                return;
            }

            const requestData = {
                surplus_id: excess.excessId ?? 0,
                message: message.trim() || "Solicitud de contacto desde el catálogo",
                request_status: "pending",
                product_owner: productOwnerId,
            };

            console.log("📦 Enviando solicitud:", requestData);
            await createRequest(requestData);

            setFeedback("✅ ¡Solicitud enviada exitosamente!");
            setMessage("");
            onSuccess?.();

            setTimeout(() => onClose(), 1500);
        } catch (error: any) {
            console.error("Error al crear la solicitud:", error);
            setFeedback(
                error?.response?.data?.message || "No se pudo enviar la solicitud."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-200 p-8 relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                    >
                        ×
                    </button>

                    <h2 className="text-2xl font-semibold text-emerald-800 mb-6 text-center">
                        Confirmar solicitud
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h3 className="text-lg font-medium text-emerald-800">
                                {excess.productName}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{excess.description}</p>
                            <p className="text-sm text-emerald-700 mt-2">
                                <span className="font-semibold">Cantidad disponible:</span>{" "}
                                {excess.quantity} {excess.unitMeasurement}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {excess.city}, {excess.address}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                <span className="font-semibold">Categoría:</span>{" "}
                                {excess.category}
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Mensaje (opcional)
                            </label>
                            <textarea
                                id="message"
                                rows={3}
                                placeholder="Escribe alguna nota o detalle adicional..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none transition-all duration-200
                  ${message.length > 255
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                                    }`}
                            />
                            {message.length > 255 && (
                                <p className="text-red-500 text-xs mt-1">
                                    El mensaje supera el límite de 255 caracteres.
                                </p>
                            )}
                        </div>

                        {errors.length > 0 && (
                            <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-lg p-3 space-y-1">
                                {errors.map((err, idx) => (
                                    <p key={idx}>• {err}</p>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={onClose}
                                className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60"
                            >
                                {loading ? "Enviando..." : "Enviar solicitud"}
                            </button>
                        </div>

                        {feedback && (
                            <p
                                className={`text-center text-sm mt-4 ${feedback.includes("éxito") ||
                                    feedback.includes("exitosamente")
                                    ? "text-emerald-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {feedback}
                            </p>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RequestForm;
