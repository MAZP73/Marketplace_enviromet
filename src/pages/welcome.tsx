import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BannerCarousel from "../components/BannerCarousel";
import disponiblesImg from "../assets/disponibles.jpg";
import fundacionesImg from "../assets/fundaciones.jpg";
import empresasImg from "../assets/empresas.jpg";
import impactoImg from "../assets/impacto.jpg";

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const Welcome: React.FC = () => {
    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Banner */}
            <motion.div
                className="relative"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <BannerCarousel />
            </motion.div>

            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {[
                    {
                        img: disponiblesImg,
                        alt: "Alimentos",
                        title: "Alimentos Disponibles",
                        desc: "Productos recién hechos con excedente diario listos para donar o vender a bajo costo.",
                        link: "/catalog",
                        text: "Explorar alimentos",
                    },
                    {
                        img: fundacionesImg,
                        alt: "Fundaciones",
                        title: "Fundaciones Activas",
                        desc: "Alimentos cercanos a su fecha de vencimiento disponibles para fundaciones registradas.",
                        link: "/foundations",
                        text: "Ver fundaciones",
                    },
                    {
                        img: empresasImg,
                        alt: "Empresas",
                        title: "Empresas Donantes",
                        desc: "Frutas y verduras que no cumplen estándares comerciales pero están en excelente estado.",
                        link: "/donors",
                        text: "Conocer más",
                    },
                    {
                        img: impactoImg,
                        alt: "Impacto",
                        title: "Impacto Social",
                        desc: "Conoce las organizaciones que aprovechan los alimentos rescatados para ayudar comunidades.",
                        link: "/impact",
                        text: "Ver más",
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={cardVariants}
                        transition={{ delay: i * 0.15, duration: 0.6 }}
                        className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col"
                    >

                        <motion.img
                            src={card.img}
                            alt={card.alt}
                            className="w-full h-48 sm:h-52 md:h-56 lg:h-48 object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />


                        <div className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center lg:text-left">
                                    {card.title}
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base mb-4 text-center lg:text-left">
                                    {card.desc}
                                </p>
                            </div>
                            <div className="text-center lg:text-left">
                                <Link
                                    to={card.link}
                                    className="text-green-700 font-medium hover:underline text-sm sm:text-base"
                                >
                                    {card.text}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Welcome;