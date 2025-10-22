import { Link } from "react-router-dom";
import { FaUserPlus, FaBullhorn, FaSearch, FaHandshake, FaNetworkWired, FaLightbulb, FaProjectDiagram, FaChartLine } from "react-icons/fa";
import bannerImg from "../assets/banner1.jpg";

const Home: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">

            <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
                <div className="flex-1 mb-10 lg:mb-0">
                    <h1 className="text-4xl font-extrabold mb-4 text-green-700 leading-tight">
                        Conecta, Colabora y Crece: Cómo Funciona Nuestro Marketplace
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Descubre cómo nuestra plataforma facilita la conexión entre organizaciones para impulsar el crecimiento y la sostenibilidad.
                    </p>
                    <Link
                        to="/about"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Únete a la Red y Empieza a Conectar Ahora
                    </Link>
                </div>

                <div className="flex-1">
                    <img
                        src={bannerImg}
                        alt="Marketplace conexión"
                        className="rounded-2xl shadow-lg"
                    />
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h2 className="text-2xl font-bold text-green-700 mb-10">
                        El Proceso de Conexión en 4 Sencillos Pasos
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <FaUserPlus className="text-green-600 text-5xl mb-3" />
                            <h3 className="font-semibold mb-2">Regístrate</h3>
                            <p className="text-gray-600 text-sm">
                                Crea el perfil de tu organización en minutos.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <FaBullhorn className="text-green-600 text-5xl mb-3" />
                            <h3 className="font-semibold mb-2">Publica</h3>
                            <p className="text-gray-600 text-sm">
                                Comparte tus necesidades o servicios con la comunidad.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <FaSearch className="text-green-600 text-5xl mb-3" />
                            <h3 className="font-semibold mb-2">Descubre</h3>
                            <p className="text-gray-600 text-sm">
                                Explora y encuentra organizaciones compatibles con tus intereses.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <FaHandshake className="text-green-600 text-5xl mb-3" />
                            <h3 className="font-semibold mb-2">Conecta</h3>
                            <p className="text-gray-600 text-sm">
                                Inicia conversaciones y establece alianzas estratégicas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h2 className="text-2xl font-bold text-green-700 mb-6">
                        Beneficios de Unirte a Nuestra Red
                    </h2>
                    <p className="text-gray-600 mb-10">
                        Al conectar con otras organizaciones en nuestro marketplace, accederás a una amplia gama de oportunidades y recursos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <FaNetworkWired className="text-green-600 text-4xl mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Expande tu Red</h3>
                            <p className="text-sm text-gray-600">
                                Conecta con una comunidad diversa de organizaciones.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <FaLightbulb className="text-green-600 text-4xl mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Encuentra Soluciones</h3>
                            <p className="text-sm text-gray-600">
                                Colabora con aliados que comparten tus metas.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <FaChartLine className="text-green-600 text-4xl mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Descubre Oportunidades</h3>
                            <p className="text-sm text-gray-600">
                                Identifica nuevas áreas de innovación y crecimiento.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <FaProjectDiagram className="text-green-600 text-4xl mb-3 mx-auto" />
                            <h3 className="font-semibold mb-2">Colabora en Proyectos</h3>
                            <p className="text-sm text-gray-600">
                                Participa en proyectos conjuntos de impacto social.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-green-50 py-16 text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                    ¿Listo para empezar?
                </h2>
                <p className="text-gray-600 mb-6">
                    Únete a cientos de organizaciones que ya están colaborando y creciendo juntas.
                </p>
                <Link
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    Regístrate Gratis
                </Link>
            </section>
        </div>
    );
};

export default Home;
