import React from "react";
import frutasImg from "../assets/frutas.jpg";
import panImg from "../assets/pan.jpg";
import vegetalesImg from "../assets/vegetales.jpg";
import papaImg from "../assets/papa.jpg";

const productos = [
    {
        id: 1,
        nombre: "Frutas frescas excedentes",
        descripcion: "Cajas de frutas de temporada de alta calidad.",
        fecha: "2025-10-15",
        imagen: frutasImg,
        cantidad: "10 cajas disponibles",
        calificacion: 4,
    },
    {
        id: 2,
        nombre: "Pan y bollería",
        descripcion: "Pan recién horneado no vendido del día anterior.",
        fecha: "2025-10-15",
        imagen: panImg,
        cantidad: "50 unidades disponibles",
        calificacion: 5,
    },
    {
        id: 3,
        nombre: "Verduras y hortalizas",
        descripcion: "Verduras de granjas locales, listas para entregar.",
        fecha: "2025-10-15",
        imagen: vegetalesImg,
        cantidad: "20 cajas disponibles",
        calificacion: 3,
    },
    {
        id: 4,
        nombre: "Papas excedentes",
        descripcion: "Papas locales, listas para entregar.",
        fecha: "2025-10-15",
        imagen: papaImg,
        cantidad: "20 cajas disponibles",
        calificacion: 4,
    },
];

const categorias = [
    "Frutas y verduras",
    "Panadería",
    "Lácteos",
    "Carnes",
    "Bebidas",
    "Otros excedentes",
];

const Catalog: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* categorías */}
            <aside className="w-full md:w-1/4 bg-white p-4 rounded shadow">
                <h2 className="font-bold text-lg mb-4">Categorías</h2>
                <ul className="space-y-2">
                    {categorias.map((cat) => (
                        <li key={cat} className="hover:text-green-600 cursor-pointer">
                            {cat}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* productos */}
            <section className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map((prod) => (
                    <div
                        key={prod.id}
                        className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition transform hover:scale-105"
                        onClick={() => alert(`Ver detalles de: ${prod.nombre}`)}
                    >
                        <img
                            src={prod.imagen || "https://via.placeholder.com/400x300"}
                            alt={prod.nombre}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="font-bold text-lg text-center">{prod.nombre}</h3>
                        <p className="text-gray-600 text-sm text-center">{prod.descripcion}</p>
                        <p className="mt-2 text-gray-600 font-semibold">{prod.cantidad}</p>

                        {/* Calificación */}
                        <div className="flex mt-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${i <= prod.calificacion ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.037 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Catalog;
