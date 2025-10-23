import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://th.bing.com/th/id/R.00e70e1bd5dc4db7595ee4ba3ce7c8b1?rik=6tzcFrD0%2bEkT5Q&pid=ImgRaw&r=0')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backgroundBlendMode: "darken",
            }}
        >
            <Link
                to="/"
                className="absolute top-6 left-8  font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
            >
                MarketMaaS
            </Link>

            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-md p-6 mx-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Bienvenido de nuevo
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Conectando agricultores y consumidores de forma sostenible
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Usuario"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder=""
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    ¿No tienes una cuenta?{" "}
                    <Link
                        to="/register"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        Crear cuenta
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;