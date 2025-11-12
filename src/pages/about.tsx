import { Link } from "react-router-dom";
import { Leaf, Handshake, Lightbulb, Calendar, Rocket, Globe } from "lucide-react";

const About = () => {
    return (
        <div className="bg-gray-50 text-gray-800">

            <section className="relative h-[70vh] flex items-center justify-center text-center bg-emerald-800 text-white overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                    alt="Economía circular"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 max-w-3xl px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        Conectando Empresas, Reduciendo Desperdicios
                    </h1>
                    <p className="text-lg opacity-90">
                        Descubre cómo nació <strong>Marketplace Enviromet</strong> — una plataforma creada para impulsar
                        la economía circular, conectar empresas y aprovechar los excedentes de forma responsable.
                    </p>
                </div>
            </section>

            <section className="py-20 max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-emerald-700">
                    Nuestra Misión y Valores
                </h2>
                <p className="text-center max-w-3xl mx-auto text-gray-600 mb-14">
                    En Marketplace Enviromet trabajamos para reducir el desperdicio y fomentar
                    el intercambio responsable entre empresas y organizaciones. Cada acción está guiada por estos valores:
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition">
                        <Leaf className="text-emerald-600 w-10 h-10 mx-auto mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Sostenibilidad</h3>
                        <p className="text-gray-600">
                            Promovemos la reutilización de excedentes, reduciendo el impacto ambiental
                            y fomentando prácticas responsables.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition">
                        <Handshake className="text-emerald-600 w-10 h-10 mx-auto mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Colaboración</h3>
                        <p className="text-gray-600">
                            Creamos un entorno colaborativo donde empresas y solicitantes se conectan
                            para compartir recursos y generar impacto positivo.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition">
                        <Lightbulb className="text-emerald-600 w-10 h-10 mx-auto mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Innovación</h3>
                        <p className="text-gray-600">
                            Usamos tecnología moderna para facilitar la gestión de ofertas,
                            solicitudes y estadísticas en tiempo real.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-white to-emerald-50 py-20 border-t border-gray-200">
                <h2 className="text-3xl font-bold text-center mb-14 text-emerald-700">
                    Nuestra Trayectoria
                </h2>
                <div className="max-w-3xl mx-auto space-y-10 px-6">
                    <div className="flex items-start space-x-4">
                        <Calendar className="text-emerald-600 w-7 h-7 mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">2024 — La Idea Nace</h4>
                            <p className="text-gray-600">
                                Identificamos una necesidad: miles de empresas acumulaban productos sin salida comercial.
                                Así surgió la idea de <strong>Enviromet</strong>, una plataforma para conectar esos recursos con quienes los necesitan.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <Rocket className="text-emerald-600 w-7 h-7 mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">2025 — Lanzamiento Oficial</h4>
                            <p className="text-gray-600">
                                Se lanza <strong>Marketplace Enviromet</strong>, permitiendo a empresas publicar ofertas y
                                a organizaciones solicitar recursos de manera sencilla y transparente.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <Globe className="text-emerald-600 w-7 h-7 mt-1" />
                        <div>
                            <h4 className="font-semibold text-lg">Futuro — Expansión Global</h4>
                            <p className="text-gray-600">
                                Planeamos expandir nuestras funcionalidades con métricas de impacto ambiental,
                                herramientas móviles y alianzas internacionales para fortalecer la economía circular.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-emerald-700 text-white py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">¿Quieres saber más?</h2>
                <p className="text-lg opacity-90 mb-8">
                    Únete a Marketplace Enviromet y forma parte del cambio hacia una economía más sostenible.
                </p>

                <Link
                    to="/register"
                    className="inline-block bg-white text-emerald-700 font-semibold px-6 py-3 rounded-full hover:bg-emerald-50 transition shadow-md hover:shadow-lg"
                >
                    Regístrate
                </Link>
            </section>
        </div>
    );
};

export default About;
