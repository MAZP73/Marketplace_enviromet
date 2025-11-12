import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { logoutUser, getUserProfile } from "../../services/userService";

interface UserProfile {
  name: string;
  user_type: string;
  avatar?: string;
}

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const loggedIn = isAuthenticated();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!loggedIn) return;

      try {
        const data = await getUserProfile();
        console.log("Perfil recibido:", data);

        setUser({
          name: data.user.name,
          user_type: data.user.user_type,
          avatar: data.user.avatar || "https://tse3.mm.bing.net/th/id/OIP.sP6-XJNUEy3Ddo5mceu_dwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        });
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setUser(null);
      }
    };

    fetchProfile();
  }, [loggedIn]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <Link to="/" className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-emerald-600 rounded-sm"></div>
          <span className="font-semibold text-gray-800">MarketMaaS</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-emerald-600 transition">Inicio</Link>

          {loggedIn && (
            <Link to="/food" className="hover:text-emerald-600 transition">
              Alimentos disponibles
            </Link>
          )}

        </div>

        <div className="flex items-center space-x-4">
          {!loggedIn ? (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-emerald-700 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-gray-200 text-gray-800 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Registrar
              </Link>
            </div>
          ) : (
            user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition"
                >
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <span className="font-medium">{user.name}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200">

                    <div className="flex flex-col items-center p-6 space-y-2">
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border-2 border-emerald-400 object-cover"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.user_type}</p>
                    </div>

                    <div className="flex flex-col p-4 space-y-2">
                      <Link
                        to="/dashboard"
                        className="w-full text-center py-2 px-4 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        Ir al Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-center py-2 px-4 text-gray-500 font-medium hover:text-gray-700 transition"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>

            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
