import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", searchTerm);
  };

  return (
    <nav className="bg-black text-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          NombreApp
        </Link>
        {/* Buscador */}
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-md mx-6 bg-white rounded-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Buscar alimentos o empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-black focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-gray-500 text-white font-semibold hover:bg-gray-400"
          >
            Buscar
          </button>
        </form>

        {/* Login */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="hover:underline">
            Iniciar sesión
          </Link>
          <Link to="/register" className="hover:underline">
            Registrarse
          </Link>
        </div>
      </div>

      {/* menú */}
      <div className="bg-gray-500 text-sm py-2 px-6 flex space-x-6 overflow-x-auto">
        <Link to="/" className="hover:underline">
          Todo
        </Link>
        <Link to="/catalog" className="hover:underline">
          Alimentos disponibles
        </Link>
        <Link to="/expiring" className="hover:underline">
          Cercanos a vencer
        </Link>
        <Link to="/foundations" className="hover:underline">
          Fundaciones activas
        </Link>
        <Link to="/donors" className="hover:underline">
          Empresas donantes
        </Link>
        <Link to="/new" className="hover:underline">
          Nuevas donaciones
        </Link>
        <Link to="/impact" className="hover:underline">
          Impacto social
        </Link>
        <Link to="/about" className="hover:underline">
          Cómo funciona
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
