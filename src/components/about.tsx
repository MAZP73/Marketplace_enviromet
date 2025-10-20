import { motion } from "framer-motion";

const steps = [
    {
        title: "Empresas Donantes",
        description:
            "Registra los alimentos o productos que están próximos a vencer y compártelos con la red de fundaciones. Así, reduces desperdicio y contribuyes al bienestar de la comunidad.",
    },
    {
        title: "Fundaciones Activas",
        description:
            "Reciben notificaciones en tiempo real de los alimentos disponibles, seleccionan lo que necesitan y coordinan la logística de recepción. Todo de manera sencilla y transparente.",
    },
    {
        title: "Logística Eficiente",
        description:
            "Organiza la distribución de los productos donados de forma rápida y efectiva, optimizando rutas y tiempos de entrega.",
    },
    {
        title: "Impacto Social",
        description:
            "Monitorea el impacto generado: alimentos donados, fundaciones beneficiadas y reducción de desperdicio. Cada acción suma para una comunidad más sostenible.",
    },
    {
        title: "Comunidad Sostenible",
        description:
            "Contribuye a un ecosistema más responsable, fomentando hábitos de consumo consciente y apoyo a quienes más lo necesitan.",
    },
];

const About = () => {
    return (
        <section className="relative ">
            <div className="flex items-center justify-center mb-12">
                <div className="flex-1 h-px bg-black mr-4"></div>
                <h2 className="text-4xl font-bold text-center">Cómo Funciona</h2>
                <div className="flex-1 h-px bg-black ml-4"></div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                        {/* Número */}
                        <div className="flex flex-col items-center mr-6 relative">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-black text-xl font-bold text-black bg-white shadow-lg">
                                {index + 1}
                            </div>
                            {index !== steps.length - 1 && (
                                <div className="flex-1 w-1 bg-gradient-to-b from-green-400 to-green-600 mt-3 rounded-full hidden md:block"></div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="bg-white p-6 rounded-3xl shadow-xl flex-1 hover:scale-105 transform transition duration-300">
                            <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default About;
