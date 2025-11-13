import { Link } from "react-router-dom";
import { Leaf, Handshake, Lightbulb, Calendar, Rocket, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
    return (
        <main className="bg-gray-50 text-gray-800">
            <Helmet>
                <title>Sobre Nosotros | Marketplace Enviromet</title>
                <meta
                    name="description"
                    content="Descubre cómo nació Marketplace Enviromet, una plataforma que impulsa la economía circular, conecta empresas y reduce el desperdicio."
                />
                <meta
                    name="keywords"
                    content="economía circular, sostenibilidad, colaboración empresarial, reducción de desperdicios, reutilización, marketplace ecológico"
                />
                <meta property="og:title" content="Sobre Nosotros | Marketplace Enviromet" />
                <meta
                    property="og:description"
                    content="Conectamos empresas para reducir desperdicios y fomentar la economía circular."
                />
                <meta property="og:image" content="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" />
                <meta property="og:type" content="website" />
            </Helmet>

            <section
                className="relative flex items-center justify-center text-center bg-emerald-800 text-white overflow-hidden h-[60vh] md:h-[70vh]"
                aria-labelledby="hero-heading"
            >
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                    alt="Fábrica sostenible representando la economía circular"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    loading="lazy"
                />
                <div className="relative z-10 max-w-3xl px-4 sm:px-6">
                    <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        Conectando Empresas, Reduciendo Desperdicios
                    </h1>
                    <p className="text-base sm:text-lg opacity-90">
                        Descubre cómo nació <strong>Marketplace Enviromet</strong> — una plataforma creada para impulsar
                        la economía circular, conectar empresas y aprovechar los excedentes de forma responsable.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-emerald-700">
                    Nuestra Misión y Valores
                </h2>
                <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12 sm:mb-14">
                    En Marketplace Enviromet trabajamos para reducir el desperdicio y fomentar el intercambio responsable
                    entre empresas y organizaciones. Cada acción está guiada por estos valores:
                </p>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {[
                        {
                            icon: Leaf,
                            title: "Sostenibilidad",
                            text: "Promovemos la sreutilización de excedentes, reduciendo el impacto ambiental y fomentando prácticas responsables."
                        },
                        {
                            icon: Handshake,
                            title: "Colaboración",
                            text: "Creamos un entorno colaborativo donde empresas y solicitantes se conectan para compartir recursos y generar impacto positivo."
                        },
                        {
                            icon: Lightbulb,
                            title: "Innovación",
                            text: "Usamos tecnología moderna para facilitar la gestión de ofertas, solicitudes y estadísticas en tiempo real."
                        }
                    ].map(({ icon: Icon, title, text }) => (
                        <article
                            key={title}
                            className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 text-center hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                        >
                            <Icon className="text-emerald-600 w-10 h-10 mx-auto mb-4" aria-hidden="true" />
                            <h3 className="font-semibold text-lg sm:text-xl mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                className="bg-gradient-to-br from-white to-emerald-50 py-16 md:py-20 border-t border-gray-200"
                aria-labelledby="trayectoria-heading"
            >
                <h2 id="trayectoria-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-14 text-emerald-700">
                    Nuestra Trayectoria
                </h2>
                <div className="max-w-3xl mx-auto space-y-10 px-4 sm:px-6">
                    {[
                        {
                            icon: Calendar,
                            year: "2024 — La Idea Nace",
                            desc: "Identificamos una necesidad: miles de empresas acumulaban productos sin salida comercial. Así surgió la idea de Enviromet, una plataforma para conectar esos recursos con quienes los necesitan."
                        },
                        {
                            icon: Rocket,
                            year: "2025 — Lanzamiento Oficial",
                            desc: "Se lanza Marketplace Enviromet, permitiendo a empresas publicar ofertas y a organizaciones solicitar recursos de manera sencilla y transparente."
                        },
                        {
                            icon: Globe,
                            year: "Futuro — Expansión Global",
                            desc: "Planeamos expandir nuestras funcionalidades con métricas de impacto ambiental, herramientas móviles y alianzas internacionales para fortalecer la economía circular."
                        }
                    ].map(({ icon: Icon, year, desc }) => (
                        <div key={year} className="flex items-start space-x-3 sm:space-x-4">
                            <Icon className="text-emerald-600 w-6 h-6 sm:w-7 sm:h-7 mt-1 flex-shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="font-semibold text-base sm:text-lg">{year}</h3>
                                <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-emerald-700 text-white py-16 md:py-20 text-center" aria-labelledby="cta-heading">
                <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold mb-4">
                    ¿Quieres saber más?
                </h2>
                <p className="text-base sm:text-lg opacity-90 mb-8">
                    Únete a Marketplace Enviromet y forma parte del cambio hacia una economía más sostenible.
                </p>
                <Link
                    to="/register"
                    className="inline-block bg-white text-emerald-700 font-semibold px-5 sm:px-6 py-3 rounded-full hover:bg-emerald-50 transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    Regístrate
                </Link>
            </section>
        </main>
    );
};

export default About;
