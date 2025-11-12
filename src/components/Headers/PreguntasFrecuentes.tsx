import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
    categoria: string;
    pregunta: string;
    respuesta: string;
}

const faqs: FAQ[] = [
    {
        categoria: "Para quienes publican ofertas",
        pregunta: "¿Cómo creo una nueva oferta?",
        respuesta:
            "Inicia sesión → ve al panel “Mis Ofertas” → selecciona “Crear oferta” → completa los campos obligatorios (título, categoría, descripción, cantidad, empresa) → haz clic en “Publicar”.",
    },
    {
        categoria: "Para quienes publican ofertas",
        pregunta: "¿Cómo veo cuántas ofertas tengo publicadas?",
        respuesta:
            "En el dashboard, en el recuadro “Ofertas creadas”, verás el número total. También puedes ir a la sección “Mis Ofertas” para ver el listado.",
    },
    {
        categoria: "Para quienes publican ofertas",
        pregunta: "¿Puedo editar o eliminar una oferta publicada?",
        respuesta:
            "Sí — en “Mis Ofertas”, haz clic en el botón editar o eliminar junto a la oferta. Si hay solicitudes relacionadas, la edición puede estar limitada.",
    },

    {
        categoria: "Para quienes hacen solicitudes",
        pregunta: "¿Cómo hago una solicitud para una oferta?",
        respuesta:
            "Navega al producto que te interesa → haz clic en “Solicitar” → completa el formulario de solicitud → envíalo.",
    },
    {
        categoria: "Para quienes hacen solicitudes",
        pregunta: "¿Dónde veo mis solicitudes pendientes o rechazadas?",
        respuesta:
            "En el dashboard, en los recuadros “Solicitudes pendientes” y “Solicitudes rechazadas”.",
    },
    {
        categoria: "Para quienes hacen solicitudes",
        pregunta: "¿Por qué mi solicitud fue rechazada?",
        respuesta:
            "Puede deberse a que la oferta ya no está disponible o a que la cantidad excede la disponible.",
    },

    {
        categoria: "Cuenta y perfil",
        pregunta: "¿Cómo cambio mi contraseña o actualizo mi perfil?",
        respuesta:
            "En el menú de usuario, selecciona “Mi Perfil”, actualiza los datos y guarda los cambios.",
    },
    {
        categoria: "Cuenta y perfil",
        pregunta: "¿Qué pasa si olvido mi contraseña?",
        respuesta:
            "En la página de inicio de sesión haz clic en “¿Olvidaste tu contraseña?” y sigue las instrucciones.",
    },

    {
        categoria: "Soporte técnico / otros",
        pregunta: "¿La plataforma está optimizada para móviles?",
        respuesta:
            "Sí — utilizamos TailwindCSS para asegurar un diseño responsive para móviles, tablets y escritorio.",
    },
    {
        categoria: "Soporte técnico / otros",
        pregunta: "¿Dónde reporto un error o problema técnico?",
        respuesta:
            "En el centro de ayuda selecciona la sección “Contactar soporte” y envía un ticket con los detalles del problema.",
    },
];

const PreguntasFrecuentes = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Centro de Ayuda / Preguntas Frecuentes
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl shadow-sm bg-white transition hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
                            >
                                <div>
                                    <p className="text-xs text-emerald-600 font-medium uppercase mb-1">
                                        {faq.categoria}
                                    </p>
                                    <h2 className="text-gray-800 font-semibold text-base">
                                        {faq.pregunta}
                                    </h2>
                                </div>
                                {isOpen ? (
                                    <ChevronUp className="text-emerald-600 w-5 h-5" />
                                ) : (
                                    <ChevronDown className="text-gray-400 w-5 h-5" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 p-5 pt-0" : "max-h-0"
                                    }`}
                            >
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {faq.respuesta}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PreguntasFrecuentes;
