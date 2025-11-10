import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/userService";
import type { Logindt } from "../services/userService";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Logindt>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validate = (name: string, value: string) => {
        let message = "";
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) message = "El correo es obligatorio.";
            else if (!emailRegex.test(value)) message = "Formato de correo inválido.";
        }

        if (name === "password") {
            if (!value) message = "La contraseña es obligatoria.";
            else if (value.length < 8)
                message = "La contraseña debe tener al menos 8 caracteres.";
        }

        setErrors((prev) => ({ ...prev, [name]: message }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        validate("email", formData.email);
        validate("password", formData.password);

        if (Object.values(errors).some((err) => err)) {
            setError("Por favor corrige los errores antes de continuar.");
            return;
        }

        setLoading(true);

        try {
            const response = await loginUser(formData);
            console.log("Inicio de sesión exitoso:", response);
            setSuccess("Inicio de sesión exitoso. Redirigiendo...");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err: any) {
            console.error("Error en inicio de sesión:", err);
            setError(err.response?.data?.message || "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
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
                className="absolute top-6 left-8 font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
            >
                MarketMaaS
            </Link>

            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm p-6 mx-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Bienvenido de nuevo
                </h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Conectando agricultores y consumidores de forma sostenible
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* EMAIL */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={(e) => validate(e.target.name, e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:ring-emerald-500"
                                }`}
                            placeholder="usuario@empresa.com"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={(e) => validate(e.target.name, e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:ring-emerald-500"
                                }`}
                            placeholder="********"
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    {success && (
                        <p className="text-emerald-600 text-sm text-center">{success}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
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
