import { Helmet } from "react-helmet-async";

const ImpactoSocial = () => {
    return (
        <main className="bg-gray-50 text-gray-800">

            <Helmet>
                <title>Impacto Social | Marketplace Enviromet</title>
                <meta
                    name="description"
                    content="Conoce el impacto social y ambiental de Marketplace Enviromet. Reducimos desperdicio alimentario, fortalecemos comunidades y fomentamos la economía circular."
                />
                <meta
                    name="keywords"
                    content="impacto social, economía circular, sostenibilidad, reducción de desperdicios, recuperación de alimentos, responsabilidad ambiental"
                />
                <meta property="og:title" content="Impacto Social | Marketplace Enviromet" />
                <meta
                    property="og:description"
                    content="Descubre cómo Enviromet impulsa la economía circular y beneficia a miles de familias y empresas sostenibles."
                />
                <meta
                    property="og:image"
                    content="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80"
                />
                <meta property="og:type" content="website" />
            </Helmet>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center" aria-labelledby="pilares-heading">
                <h1 id="pilares-heading" className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    Nuestros Pilares de Impacto
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
                    En <span className="font-semibold text-emerald-600">Marketplace Enviromet</span> trabajamos para reducir el desperdicio alimentario y construir una economía circular que beneficie a las personas, las empresas y el planeta.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Sostenibilidad Ambiental",
                            img: "https://cdn-icons-png.flaticon.com/512/2833/2833181.png",
                            desc: "Reducimos el desperdicio de alimentos y promovemos prácticas responsables que disminuyen las emisiones de CO₂ y fomentan un consumo consciente.",
                        },
                        {
                            title: "Impacto Social",
                            img: "https://cdn-icons-png.flaticon.com/512/2977/2977898.png",
                            desc: "Apoyamos a comunidades y organizaciones sociales facilitando la redistribución de excedentes alimentarios hacia quienes más lo necesitan.",
                        },
                        {
                            title: "Economía Circular",
                            img: "https://cdn-icons-png.flaticon.com/512/1048/1048943.png",
                            desc: "Impulsamos un modelo en el que los alimentos y recursos mantienen su valor el mayor tiempo posible, beneficiando al medio ambiente y la sociedad.",
                        },
                    ].map(({ title, img, desc }) => (
                        <article
                            key={title}
                            className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-transform hover:-translate-y-1"
                        >
                            <img
                                src={img}
                                alt={title}
                                className="w-16 h-16 mx-auto mb-4"
                                loading="lazy"
                            />
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
                            <p className="text-sm text-gray-600">{desc}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-white py-16 border-t border-gray-200" aria-labelledby="iniciativas-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 id="iniciativas-heading" className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10">
                        Nuestras Iniciativas en Acción
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Recuperación de Alimentos",
                                img: "https://www.servindi.org/sites/default/files/editor/imagenes/recuperacion_alimentos_ok.png",
                                desc: "Rescatamos excedentes alimentarios y los redirigimos a instituciones sociales, evitando su desperdicio y ayudando a cientos de familias.",
                            },
                            {
                                title: "Alianzas Solidarias",
                                img: "https://tse3.mm.bing.net/th/id/OIP.aNeP5vF1pmkJ7jGuto4uvgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
                                desc: "Colaboramos con empresas y ONGs locales para redistribuir recursos a quienes más lo necesitan.",
                            },
                            {
                                title: "Capacitación Sostenible",
                                img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
                                desc: "Promovemos la educación y concientización sobre consumo responsable y gestión de recursos.",
                            },
                        ].map(({ title, img, desc }) => (
                            <article
                                key={title}
                                className="rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition-transform hover:-translate-y-1"
                            >
                                <img
                                    src={img}
                                    alt={title}
                                    className="w-full h-48 sm:h-52 object-cover"
                                    loading="lazy"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                                    <p className="text-sm text-gray-600">{desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="bg-emerald-700 text-white py-16"
                aria-labelledby="metricas-heading"
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                    <div>
                        <h3 className="text-4xl font-bold">5,000+</h3>
                        <p className="text-base sm:text-lg opacity-90">Familias beneficiadas</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold">12 toneladas</h3>
                        <p className="text-base sm:text-lg opacity-90">de CO₂ evitadas</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold">100+</h3>
                        <p className="text-base sm:text-lg opacity-90">Empresas aliadas</p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16" aria-labelledby="testimonios-heading">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 id="testimonios-heading" className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10">
                        Voces de Nuestra Comunidad
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        {[
                            {
                                text: "Gracias a Enviromet, logramos aprovechar alimentos que antes se desperdiciaban. Ahora apoyamos a más familias y reducimos nuestro impacto ambiental.",
                                img: "https://randomuser.me/api/portraits/women/68.jpg",
                                name: "María López",
                                role: "Coordinadora de Fundación Verde Vida",
                            },
                            {
                                text: "Publicar nuestros excedentes fue muy fácil. En pocos días conectamos con organizaciones que realmente los necesitaban.",
                                img: "https://randomuser.me/api/portraits/men/75.jpg",
                                name: "Carlos Méndez",
                                role: "Gerente de Alimentos EcoMarket",
                            },
                        ].map(({ text, img, name, role }) => (
                            <blockquote
                                key={name}
                                className="bg-white rounded-xl p-6 shadow border flex flex-col sm:flex-row sm:items-center sm:space-x-4"
                            >
                                <img
                                    src={img}
                                    alt={`Foto de ${name}`}
                                    className="w-12 h-12 rounded-full mb-4 sm:mb-0 flex-shrink-0"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="text-gray-600 italic mb-4 sm:mb-2">“{text}”</p>
                                    <footer>
                                        <p className="font-semibold text-gray-800">{name}</p>
                                        <p className="text-sm text-gray-500">{role}</p>
                                    </footer>
                                </div>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ImpactoSocial;
