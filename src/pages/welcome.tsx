import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BannerCarousel from "../components/Headers/BannerCarousel";

import disponiblesImg from "../assets/disponibles.jpg";
import fundacionesImg from "../assets/fundaciones.jpg";
import empresasImg from "../assets/empresas.jpg";
import impactoImg from "../assets/impacto.jpg";

const cards = [
    {
        img: disponiblesImg,
        alt: "Alimentos disponibles",
        title: "Alimentos Disponibles",
        desc: "Productos frescos con excedente diario listos para donar o vender a bajo costo.",
        text: "Explorar alimentos",
    },
    {
        img: fundacionesImg,
        alt: "Fundaciones activas",
        title: "Fundaciones Activas",
        desc: "Acceso a alimentos cercanos a su fecha de vencimiento para fundaciones registradas.",
        text: "Ver fundaciones",
    },
    {
        img: empresasImg,
        alt: "Empresas donantes",
        title: "Empresas Donantes",
        desc: "Compañías que donan alimentos en perfecto estado pero fuera de estándares comerciales.",
        text: "Conocer más",
    },
    {
        img: impactoImg,
        alt: "Impacto social",
        title: "Impacto Social",
        desc: "Historias y resultados de cómo las donaciones ayudan a comunidades vulnerables.",
        text: "Ver más",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
};

const Welcome: React.FC = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 text-gray-800">
            {/* Banner principal */}
            <motion.section
                className="relative"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <BannerCarousel />
            </motion.section>

            {/* Tarjetas principales */}
            <motion.section
                className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {cards.map((card, i) => (
                    <motion.article
                        key={i}
                        variants={cardVariants}
                        whileHover={{ scale: 1.03, y: -6 }}
                        transition={{ type: "spring", stiffness: 150, damping: 14 }}
                        className="relative group bg-white border border-emerald-100 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                    >
                        {/* Imagen con overlay */}
                        <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-3xl">
                            <motion.img
                                src={card.img}
                                alt={card.alt}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-60 transition"></div>
                        </div>

                        {/* Contenido */}
                        <div className="flex flex-col flex-1 p-6 justify-between">
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 group-hover:text-emerald-700 transition-colors">
                                    {card.title}
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                                    {card.desc}
                                </p>
                            </div>
                            <Link
                                to="/food"
                                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-full text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
                            >
                                {card.text}
                            </Link>
                        </div>

                        {/* Decoración sutil */}
                        <div className="absolute -top-20 -right-20 w-44 h-44 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>
                    </motion.article>
                ))}
            </motion.section>
        </main>
    );
};

export default Welcome;
