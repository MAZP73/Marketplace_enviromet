import React, { useEffect, useState, useMemo } from "react";
import type { Excess } from "../services/catalogService";
import { getAllExcesses } from "../services/catalogService";

const Catalog: React.FC = () => {
  const [productos, setProductos] = useState<Excess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchExcesses = async () => {
      try {
        const data = await getAllExcesses();
        setProductos(data);
      } catch (err) {
        console.error("Error al obtener los excedentes:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchExcesses();
  }, []);

  const categorias = useMemo(() => {
    const uniqueCats = new Set(productos.map((p) => p.category));
    return Array.from(uniqueCats);
  }, [productos]);

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = categoriaSeleccionada ? p.category === categoriaSeleccionada : true;
    const coincideBusqueda = p.productName.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  if (loading) return <p className="text-center mt-6 text-emerald-600">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div className="flex flex-col gap-6 rounded-lg p-5">
      {/* 🔍 Buscador elegante */}
      <div className="w-full bg-white p-4 rounded-lg shadow-md border border-emerald-200 flex items-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-3 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categorías */}
        <aside className="w-full md:w-1/4 bg-white p-5 rounded-lg shadow-md border border-emerald-200">
          <h2 className="font-bold text-lg mb-4 text-emerald-700">Categorías</h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer transition ${!categoriaSeleccionada
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
              onClick={() => setCategoriaSeleccionada(null)}
            >
              Todos los productos
            </li>
            {categorias.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer transition ${categoriaSeleccionada === cat
                    ? "text-emerald-600 font-semibold"
                    : "text-gray-600 hover:text-emerald-600"
                  }`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Productos */}
        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.length === 0 ? (
            <p className="col-span-full text-center text-emerald-700 font-medium">
              No hay productos que coincidan con la búsqueda
            </p>
          ) : (
            productosFiltrados.map((prod) => (
              <div
                key={prod.excessId}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer border border-emerald-200 hover:shadow-xl hover:border-emerald-400 transition transform hover:scale-105"
                onClick={() => alert(`Ver detalles de: ${prod.productName}`)}
              >
                <img
                  src={
                    "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000"
                  }
                  alt={prod.productName}
                  className="w-full h-48 object-cover rounded mb-4 border border-emerald-100"
                />
                <h3 className="font-bold text-lg text-center text-emerald-700">
                  {prod.productName}
                </h3>
                <p className="text-gray-600 text-sm text-center">{prod.description}</p>
                <p className="mt-2 text-emerald-600 font-semibold">
                  {prod.quantity} {prod.unitMeasurement}
                </p>
                <p className="text-gray-500 text-sm mt-1">{prod.city}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Catalog;
