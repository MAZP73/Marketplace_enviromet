import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/userService";
import type { User } from "../../services/userService";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState<User>({
        NIT: "",
        name: "",
        user_type: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        country: "Colombia",
    });

    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof User, string>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: "" });
    };

    const validateForm = (): boolean => {
        const errors: Partial<Record<keyof User, string>> = {};

        if (!formData.name.trim()) errors.name = "El nombre es obligatorio.";
        if (!formData.user_type) errors.user_type = "Selecciona un tipo.";
        if (!formData.NIT.trim()) errors.NIT = "El NIT es obligatorio.";

        if (!formData.email.trim()) {
            errors.email = "El correo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "El correo no es válido.";
        }

        if (!formData.password.trim()) {
            errors.password = "La contraseña es obligatoria.";
        } else if (formData.password.length < 6) {
            errors.password = "Debe tener al menos 6 caracteres.";
        }

        if (!formData.phone.trim()) {
            errors.phone = "El teléfono es obligatorio.";
        } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
            errors.phone = "El teléfono no es válido.";
        }

        if (!formData.city.trim()) errors.city = "La ciudad es obligatoria.";
        if (!formData.country.trim()) errors.country = "El país es obligatorio.";

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await registerUser(formData);
            console.log("Usuario registrado:", response);
            setTimeout(() => navigate("/login"), 1000);
        } catch (err: any) {
            console.error("Error en registro:", err);
            setError(err.response?.data?.message || "Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-stretch bg-gray-50 justify-center">

            <div
                className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center text-white rounded-l-xl"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80')",
                }}
            >
                <div className="bg-black/50 rounded-2xl p-6 text-center max-w-sm">
                    <h2 className="text-2xl font-bold mb-2">
                        Únete a nuestra comunidad.
                    </h2>
                    <p className="text-gray-200 text-sm">
                        Conecta tu negocio con consumidores que valoran la calidad y la sostenibilidad.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 rounded-r-xl shadow-md">
                <div className="w-full max-w-md">
                    <div className="mb-4 text-center">
                        <h1 className="text-xl font-bold text-gray-800">Crea tu cuenta</h1>
                        <p className="text-gray-500 text-sm">
                            Registra tu organización o empresa.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Nombre de la organización o empresa
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.name
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-emerald-500"
                                    }`}
                                placeholder="Mi Empresa S.A.S."
                            />
                            {fieldErrors.name && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Tipo
                            </label>
                            <select
                                name="user_type"
                                value={formData.user_type}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.user_type
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-emerald-500"
                                    }`}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="Organización">Organización</option>
                                <option value="Empresa">Empresa</option>
                            </select>
                            {fieldErrors.user_type && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.user_type}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                NIT o número tributario
                            </label>
                            <input
                                type="text"
                                name="NIT"
                                value={formData.NIT}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.NIT
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-emerald-500"
                                    }`}
                                placeholder="900.123.456-7"
                            />
                            {fieldErrors.NIT && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.NIT}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Correo corporativo
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.email
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-emerald-500"
                                    }`}
                                placeholder="contacto@miempresa.com"
                            />
                            {fieldErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.password
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-emerald-500"
                                    }`}
                            />
                            {fieldErrors.password && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Teléfono de contacto
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.phone
                                    ? "border-red-500 focus:ring-red-400"
                                    : "focus:ring-emerald-500"
                                    }`}
                                placeholder="+57 300 123 4567"
                            />
                            {fieldErrors.phone && (
                                <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Ciudad
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.city
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-emerald-500"
                                        }`}
                                    placeholder="Bogotá D.C."
                                />
                                {fieldErrors.city && (
                                    <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    País
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${fieldErrors.country
                                        ? "border-red-500 focus:ring-red-400"
                                        : "focus:ring-emerald-500"
                                        }`}
                                />
                                {fieldErrors.country && (
                                    <p className="text-red-500 text-xs mt-1">{fieldErrors.country}</p>
                                )}
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        {success && (
                            <p className="text-emerald-600 text-sm text-center">{success}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? "Registrando..." : "Registrar"}
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-3">
                            ¿Ya tienes una cuenta?{" "}
                            <Link
                                to="/login"
                                className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                Inicia sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
