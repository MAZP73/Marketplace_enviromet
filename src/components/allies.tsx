import React, { useState, useMemo } from "react";

interface Ally {
    id: number;
    name: string;
    type: string;
    location: string;
    image: string;
}

const Allies: React.FC = () => {
    const allAllies: Ally[] = [
        { id: 1, name: "EcoFood Rescue", type: "Fundación Benéfica", location: "Bogotá", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 2, name: "Fresh Grocers Inc.", type: "Supermercado", location: "Medellín", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 3, name: "Harvest Hope", type: "Organización Comunitaria", location: "Cali", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 4, name: "DailyBites Catering", type: "Restaurante", location: "Barranquilla", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 5, name: "Sustain Farms", type: "Productor Agrícola", location: "Cartagena", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 6, name: "The Golden Bakery", type: "Panadería", location: "Manizales", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 7, name: "City Food Bank", type: "Banco de Alimentos", location: "Pereira", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 8, name: "Share Plate Foundation", type: "Fundación Benéfica", location: "Bogotá", image: "https://img.freepik.com/premium-vector/buffering-icon-vector_942802-2590.jpg?w=2000" },
        { id: 8, name: "Share Plate Foundation", type: "Fundación Benéfica", location: "Bogotá", image: "https://via.placeholder.com/150/6EE7B7/000000?text=SharePlate" },
        { id: 9, name: "GreenLeaf Markets", type: "Supermercado", location: "Medellín", image: "https://via.placeholder.com/150/34D399/000000?text=GreenLeaf" },
        { id: 10, name: "Community Harvesters", type: "Organización Comunitaria", location: "Cali", image: "https://via.placeholder.com/150/F3F4F6/000000?text=Harvesters" },
        { id: 11, name: "UrbanEats Bistro", type: "Restaurante", location: "Barranquilla", image: "https://via.placeholder.com/150/F87171/FFFFFF?text=UrbanEats" },
        { id: 12, name: "AgroFresh Farms", type: "Productor Agrícola", location: "Cartagena", image: "https://via.placeholder.com/150/22C55E/FFFFFF?text=AgroFresh" },
        { id: 13, name: "Bread & Butter Co.", type: "Panadería", location: "Manizales", image: "https://via.placeholder.com/150/FBBF24/000000?text=Bread+%26+Butter" },
        { id: 14, name: "Neighborhood Food Bank", type: "Banco de Alimentos", location: "Pereira", image: "https://via.placeholder.com/150/A7F3D0/000000?text=Neighborhood+FB" },
    ];

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("Categoria");
    const [locationFilter, setLocationFilter] = useState("Ubicacion");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredAllies = useMemo(() => {
        return allAllies.filter(
            (ally) =>
                ally.name.toLowerCase().includes(search.toLowerCase()) &&
                (typeFilter === "Categoria" || ally.type === typeFilter) &&
                (locationFilter === "Ubicacion" || ally.location === locationFilter)
        );
    }, [search, typeFilter, locationFilter]);

    const totalPages = Math.ceil(filteredAllies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAllies = filteredAllies.slice(startIndex, startIndex + itemsPerPage);

    const types = ["Categoria", ...new Set(allAllies.map((a) => a.type))];
    const locations = ["Ubicacion", ...new Set(allAllies.map((a) => a.location))];

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-emerald-900">Conoce a Nuestros Aliados</h1>
                <p className="text-gray-600 mt-2">
                    Descubre las empresas y fundaciones que hacen posible la lucha contra el desperdicio de alimentos.
                </p>
            </div>

            {/* Buscador */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
                <input
                    type="text"
                    placeholder="Buscar por nombre de organización..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full sm:w-1/3 rounded-lg border border-emerald-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <select
                    value={typeFilter}
                    onChange={(e) => {
                        setTypeFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded-lg border border-emerald-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    {types.map((type) => (
                        <option key={type}>{type}</option>
                    ))}
                </select>
                <select
                    value={locationFilter}
                    onChange={(e) => {
                        setLocationFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded-lg border border-emerald-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    {locations.map((loc) => (
                        <option key={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            {/* Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {currentAllies.map((ally) => (
                    <div
                        key={ally.id}
                        className="bg-white shadow-md rounded-2xl overflow-hidden w-64 transition-transform hover:scale-105 border border-emerald-100"
                    >
                        <img src={ally.image} alt={ally.name} className="w-full h-40 object-cover" />
                        <div className="p-4 text-center">
                            <h3 className="font-semibold text-lg text-emerald-800">{ally.name}</h3>
                            <p className="text-gray-600 text-sm">{ally.type}</p>
                            <p className="text-gray-500 text-xs mt-1">{ally.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-emerald-200"}`}
                    >
                        &lt;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 rounded-md ${page === currentPage ? "bg-emerald-600 text-white" : "bg-gray-200 hover:bg-emerald-200"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-emerald-200"}`}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default Allies;
