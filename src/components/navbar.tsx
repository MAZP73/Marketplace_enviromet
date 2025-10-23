import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  const user = {
    name: "fOOD cORP",
    role: "Empresa",
    avatar:
      "https://tse4.mm.bing.net/th/id/OIP.2fjfpvyy6AslG7GH5mipHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-emerald-600 rounded-sm"></div>
          <span className="font-semibold text-gray-800">MarketMaaS</span>
        </Link>

        {/* Menú central */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-emerald-600 transition">
            Inicio
          </Link>
          <Link to="/food" className="hover:text-emerald-600 transition">
            Alimentos disponibles
          </Link>
          <Link to="/expiring" className="hover:text-emerald-600 transition">
            Cercanos a vencer
          </Link>
          <Link to="/new" className="hover:text-emerald-600 transition">
            Nuevos alimentos
          </Link>
          <Link to="/rol" className="hover:text-emerald-600 transition">
            Empresas / Organizaciones
          </Link>
        </div>

        {/* Botón Login */}
        {/*
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-emerald-700 transition"
          >
            Iniciar sesión
          </Link>
        </div>
        */}

        {/* Perfil */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition"
          >
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-emerald-400"
            />
            <span>Mi perfil</span>
          </button>

          {/* Menú desplegable */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-50 border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full mx-auto border border-emerald-400"
                />
                <h3 className="text-center font-semibold mt-2 text-emerald-700">
                  {user.name}
                </h3>
                <p className="text-center text-sm text-gray-600">{user.role}</p>
              </div>
              <div className="p-4">
                <Link
                  to="/dashboard"
                  className="block w-full text-center bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
