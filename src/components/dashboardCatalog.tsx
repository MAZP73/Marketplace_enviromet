import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllExcesses, createExcess } from "../services/catalogService";
import type { Excess } from "../services/catalogService";

const steps = ["Información Básica", "Cantidad", "Ubicación", "Confirmar"];

const Dashboard: React.FC = () => {
    const [excesses, setExcesses] = useState<Excess[]>([]);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);

    const [form, setForm] = useState<Excess>({
        empresaId: 1,
        productName: "",
        description: "",
        category: "",
        quantity: 0,
        unitMeasurement: "",
        city: "",
        address: "",
    });

    const fetchExcesses = async () => {
        try {
            const data = await getAllExcesses();
            setExcesses(data);
        } catch (err) {
            console.error("Error cargando excedentes:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExcesses();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "quantity" ? Number(value) : value,
        });
    };

    const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step !== 4) return;

        try {
            await createExcess(form);
            alert("Excedente creado correctamente 💚");
            fetchExcesses();
            setStep(1);
            setForm({
                empresaId: 1,
                productName: "",
                description: "",
                category: "",
                quantity: 0,
                unitMeasurement: "",
                city: "",
                address: "",
            });
        } catch (err) {
            console.error("Error al crear excedente:", err);
            alert("Ocurrió un error al crear el excedente.");
        }
    };

    const progress = (step / steps.length) * 100;

    return (
        <div className="min-h-screen px-6 py-10 flex flex-col items-center">
            {/* wizard */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-10 mb-16 border border-emerald-200"
            >
                <h1 className="text-3xl font-semibold text-emerald-800 mb-2 text-center">
                    Crear nuevo excedente
                </h1>
                <p className="text-emerald-600 mb-6 text-center">
                    Paso {step} de {steps.length}: {steps[step - 1]}
                </p>

                {/* Barra  */}
                <div className="w-full h-2 bg-emerald-100 rounded-full mb-8">
                    <div
                        className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Contenido */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                            >
                                <input
                                    name="productName"
                                    placeholder="Nombre del producto"
                                    value={form.productName}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                                />
                                <input
                                    name="category"
                                    placeholder="Categoría"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Descripción detallada del producto"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none resize-none"
                                />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                            >
                                <input
                                    name="quantity"
                                    type="number"
                                    placeholder="Cantidad"
                                    value={form.quantity}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                                />
                                <input
                                    name="unitMeasurement"
                                    placeholder="Unidad de medida (kg, litros, etc.)"
                                    value={form.unitMeasurement}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                            >
                                <input
                                    name="city"
                                    placeholder="Ciudad"
                                    value={form.city}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                                />
                                <input
                                    name="address"
                                    placeholder="Dirección"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                                />
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                            >
                                <h2 className="text-lg font-semibold text-emerald-800 mb-3">
                                    Confirmar información
                                </h2>
                                <ul className="text-emerald-700 space-y-1">
                                    <li><b>Producto:</b> {form.productName}</li>
                                    <li><b>Categoría:</b> {form.category}</li>
                                    <li><b>Descripción:</b> {form.description}</li>
                                    <li><b>Cantidad:</b> {form.quantity} {form.unitMeasurement}</li>
                                    <li><b>Ubicación:</b> {form.city}, {form.address}</li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Botones */}
                    <div className="flex justify-between pt-6">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
                            >
                                ← Atrás
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < steps.length ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
                            >
                                Siguiente →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition"
                            >
                                Crear Excedente ✅
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>

            {/* Lista de excedentes */}
            <div className="w-full max-w-6xl">
                <h2 className="text-2xl font-semibold text-emerald-800 mb-6 text-center">
                    Ofertas Disponibles
                </h2>

                {loading ? (
                    <p className="text-center text-emerald-500">Cargando...</p>
                ) : excesses.length === 0 ? (
                    <p className="text-center text-emerald-600">No hay excedentes aún</p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {excesses.map((item) => (
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
        </div>
    );
};

export default Dashboard;
