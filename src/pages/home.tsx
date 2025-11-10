import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    FaUserPlus,
    FaBullhorn,
    FaSearch,
    FaHandshake,
    FaNetworkWired,
    FaLightbulb,
    FaProjectDiagram,
    FaChartLine,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bannerImg from "../assets/banner1.jpg";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
    const bannerTextRef = useRef<HTMLDivElement>(null);
    const bannerImgRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement[]>([]);
    const benefitsRef = useRef<HTMLDivElement[]>([]);
    const finalSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(bannerTextRef.current, {
            opacity: 0,
            x: -80,
            duration: 0.8,
            scrollTrigger: {
                trigger: bannerTextRef.current,
                start: "top 90%",
            },
        });

        gsap.from(bannerImgRef.current, {
            opacity: 0,
            x: 80,
            duration: 0.8,
            scrollTrigger: {
                trigger: bannerImgRef.current,
                start: "top 90%",
            },
        });

        stepsRef.current.forEach((el, i) => {
            gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                },
            });
        });

        benefitsRef.current.forEach((el, i) => {
            gsap.from(el, {
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                },
            });
        });

        gsap.from(finalSectionRef.current, {
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: finalSectionRef.current,
                start: "top 95%",
            },
        });
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 overflow-x-hidden">

            <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center">
                <div ref={bannerTextRef} className="flex-1 mb-10 lg:mb-0">
                    <h1 className="text-4xl font-extrabold mb-4 text-green-700 leading-tight text-center lg:text-left">
                        Conecta, Colabora y Crece: Cómo Funciona Nuestro Marketplace
                    </h1>
                    <p className="text-gray-600 mb-6 text-center lg:text-left">
                        Descubre cómo nuestra plataforma facilita la conexión entre
                        organizaciones para impulsar el crecimiento y la sostenibilidad.
                    </p>
                    <div className="text-center lg:text-left">
                        <Link
                            to="/register"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
                        >
                            Únete a la Red y Empieza a Conectar Ahora
                        </Link>
                    </div>
                </div>

                <div ref={bannerImgRef} className="flex-1">
                    <img
                        src={bannerImg}
                        alt="Marketplace conexión"
                        className="rounded-2xl shadow-lg w-full object-cover"
                    />
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h2 className="text-2xl font-bold text-green-700 mb-10">
                        El Proceso de Conexión en 4 Sencillos Pasos
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FaUserPlus />,
                                title: "Regístrate",
                                desc: "Crea el perfil de tu organización en minutos.",
                            },
                            {
                                icon: <FaBullhorn />,
                                title: "Publica",
                                desc: "Comparte tus necesidades o servicios con la comunidad.",
                            },
                            {
                                icon: <FaSearch />,
                                title: "Descubre",
                                desc: "Explora y encuentra organizaciones compatibles con tus intereses.",
                            },
                            {
                                icon: <FaHandshake />,
                                title: "Conecta",
                                desc: "Inicia conversaciones y establece alianzas estratégicas.",
                            },
                        ].map((step, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    if (el) stepsRef.current[i] = el;
                                }}
                                className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                            >
                                <Link to="/register" className="flex flex-col items-center group">
                                    <div className="text-green-600 text-5xl mb-3 group-hover:scale-110 transition">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-semibold mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm">{step.desc}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
|
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h2 className="text-2xl font-bold text-green-700 mb-6">
                        Beneficios de Unirte a Nuestra Red
                    </h2>
                    <p className="text-gray-600 mb-10">
                        Al conectar con otras organizaciones en nuestro marketplace, accederás a una
                        amplia gama de oportunidades y recursos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <FaNetworkWired />,
                                title: "Expande tu Red",
                                desc: "Conecta con una comunidad diversa de organizaciones.",
                            },
                            {
                                icon: <FaLightbulb />,
                                title: "Encuentra Soluciones",
                                desc: "Colabora con aliados que comparten tus metas.",
                            },
                            {
                                icon: <FaChartLine />,
                                title: "Descubre Oportunidades",
                                desc: "Identifica nuevas áreas de innovación y crecimiento.",
                            },
                            {
                                icon: <FaProjectDiagram />,
                                title: "Colabora en Proyectos",
                                desc: "Participa en proyectos conjuntos de impacto social.",
                            },
                        ].map((benefit, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    if (el) benefitsRef.current[i] = el;
                                }}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                            >
                                <div className="text-green-600 text-4xl mb-3 mx-auto">
                                    {benefit.icon}
                                </div>
                                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-600">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                ref={finalSectionRef}
                className="bg-green-50 py-16 text-center"
            >
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                    ¿Listo para empezar?
                </h2>
                <p className="text-gray-600 mb-6">
                    Únete a cientos de organizaciones que ya están colaborando y creciendo juntas.
                </p>
                <Link
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105"
                >
                    Regístrate Gratis
                </Link>
            </section>
        </div>
    );
};

export default Home;
