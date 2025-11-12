import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllExcesses } from "../../services/catalogService";
import { getUserProfile } from "../../services/userService";
import type { Excess } from "../../services/catalogService";

const MyOffers: React.FC = () => {
    const [excesses, setExcesses] = useState<Excess[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUserProfile();
                setCurrentUser(user);
                const data = await getAllExcesses();
                setExcesses(data);
            } catch (err) {
                console.error("Error cargando datos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const userExcesses = currentUser
        ? excesses.filter((item) => item.empresaId === currentUser.user?.id)
        : [];

    return (
        <div className="min-h-screen px-6 py-10">
            <h2 className="text-3xl font-semibold text-emerald-800 mb-8 text-center">
                Mis Ofertas
            </h2>

            {loading ? (
                <p className="text-center text-emerald-500">Cargando...</p>
            ) : userExcesses.length === 0 ? (
                <p className="text-center text-emerald-600">No has creado excedentes aún</p>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {userExcesses.map((item) => (
                        <motion.div
                            key={item.excessId}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-xl border border-emerald-200 shadow-md p-6 hover:shadow-lg transition"
                        >
                            <div>
                                <h3 className="font-semibold text-emerald-800 text-lg">
                                    {item.productName}
                                </h3>
                                <p className="text-sm text-emerald-700 mt-1">
                                    {item.category} • {item.quantity} {item.unitMeasurement}
                                </p>
                                <p className="text-xs text-emerald-600 mt-1">{item.city}</p>
                                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                            </div>
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full mt-3 inline-block ${item.status === "reservado"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-emerald-100 text-emerald-700"
                                    }`}
                            >
                                {item.status ?? "Disponible"}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MyOffers;
