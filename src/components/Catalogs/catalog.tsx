import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Excess } from "../../services/catalogService";
import { getAllExcesses } from "../../services/catalogService";
import { Search } from "lucide-react";

const Catalog: React.FC = () => {
  const [productos, setProductos] = useState<Excess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

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
    const coincideBusqueda =
      p.productName.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.description.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  if (loading)
    return <p className="text-center mt-6 text-emerald-600 animate-pulse">Cargando productos...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div className="flex flex-col gap-8 rounded-lg p-6 bg-white min-h-screen">

      <div className="relative w-full max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-emerald-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400 transition"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        <aside className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
          <h2 className="font-bold text-lg mb-4 text-emerald-700 flex items-center gap-2">
            Categorías
          </h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer rounded-lg px-3 py-2 transition ${!categoriaSeleccionada
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              onClick={() => setCategoriaSeleccionada(null)}
            >
              Todos los productos
            </li>
            {categorias.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer rounded-lg px-3 py-2 transition ${categoriaSeleccionada === cat
                    ? "bg-emerald-100 text-emerald-700 font-semibold"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.length === 0 ? (
            <p className="col-span-full text-center text-emerald-700 font-medium">
              No hay productos que coincidan con la búsqueda
            </p>
          ) : (
            productosFiltrados.map((prod) => (
              <div
                key={prod.excessId ?? `${prod.productName}-${prod.city}`}
                onClick={() => navigate(`/producto/${prod.excessId ?? 0}`, { state: prod })}
                className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center cursor-pointer border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="w-full h-36 rounded-xl overflow-hidden mb-3">
                  <img
                    src="https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000"
                    alt={prod.productName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-base text-center text-emerald-700 line-clamp-1">
                  {prod.productName}
                </h3>
                <p className="text-gray-600 text-sm text-center mt-1 line-clamp-2">
                  {prod.description}
                </p>
                <p className="mt-2 text-emerald-600 font-semibold text-sm">
                  {prod.quantity} {prod.unitMeasurement}
                </p>
                <p className="text-gray-500 text-xs mt-1">{prod.city}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Catalog;
