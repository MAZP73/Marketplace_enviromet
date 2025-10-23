import { useState } from "react";
import { motion } from "framer-motion";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
        // Aquí puedes manejar el inicio de sesión (API, Auth, etc.)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center relative">
            {/* Fondo decorativo */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-25"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1604335399105-2e46acbdbb1f?auto=format&fit=crop&w=1920&q=80')",
                }}
            ></div>

            {/* Contenedor principal */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10"
            >
                <h2 className="text-2xl font-semibold text-emerald-700 text-center mb-2">
                    Bienvenido de nuevo
                </h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Conectamos agricultores y consumidores de forma sostenible 🌱
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Correo electrónico */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        <a
                            href="#"
                            className="block text-right text-sm text-emerald-600 mt-1 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                        Iniciar sesión
                    </button>

                    {/* Crear cuenta */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        ¿No tienes una cuenta?{" "}
                        <a
                            href="#"
                            className="text-emerald-600 font-medium hover:underline"
                        >
                            Crear cuenta
                        </a>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;