import { Link } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel";
import disponiblesImg from "../assets/disponibles.jpg";
import fundacionesImg from "../assets/fundaciones.jpg";
import empresasImg from "../assets/empresas.jpg";
import impactoImg from "../assets/impacto.jpg";


const Home: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Banner */}
            <div className="relative">
                <BannerCarousel />
            </div>

            {/* Seccio */}
            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <img
                        src={disponiblesImg}
                        alt="Alimentos"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Alimentos Disponibles</h2>
                        <p className="text-gray-600 text-sm mb-3">
                            Productos recién hechos con excedente diario listos para donar o vender a bajo costo.
                        </p>
                        <Link to="/catalog" className="text-black font-medium hover:underline">
                            Explorar alimentos
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <img
                        src={fundacionesImg}
                        alt="Fundaciones"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Fundaciones Activas</h2>
                        <p className="text-gray-600 text-sm mb-3">
                            Alimentos cercanos a su fecha de vencimiento disponibles para fundaciones registradas.
                        </p>
                        <Link to="/foundations" className="text-black font-medium hover:underline">
                            Ver fundaciones
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <img
                        src={empresasImg}
                        alt="Empresas"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Empresas Donantes</h2>
                        <p className="text-gray-600 text-sm mb-3">
                            Frutas y verduras que no cumplen estándares comerciales pero están en excelente estado.
                        </p>
                        <Link to="/donors" className="text-black font-medium hover:underline">
                            Conocer más
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                    <img
                        src={impactoImg}
                        alt="Impacto"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Impacto Social</h2>
                        <p className="text-gray-600 text-sm mb-3">
                            Conoce las organizaciones que aprovechan los alimentos rescatados para ayudar comunidades.
                        </p>
                        <Link to="/impact" className="text-black font-medium hover:underline">
                            Ver más
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
