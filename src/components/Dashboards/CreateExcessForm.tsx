import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createExcess } from "../../services/catalogService";
import { getUserProfile } from "../../services/userService";
import type { Excess } from "../../services/catalogService";

const steps = ["Información Básica", "Cantidad", "Ubicación", "Fechas y Estado", "Confirmar"];

interface Errors {
  productName?: string;
  category?: string;
  description?: string;
  quantity?: string;
  unitMeasurement?: string;
  city?: string;
  address?: string;
  publishDate?: string;
  expirationDate?: string;
}

const CreateExcess: React.FC = () => {
  const [step, setStep] = useState(1);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<Excess>({
    excessId: undefined,
    empresaId: undefined,
    productName: "",
    description: "",
    category: "",
    quantity: 0,
    unitMeasurement: "",
    publishDate: today,
    expirationDate: "",
    city: "",
    address: "",
    status: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const fetchUserProfile = async () => {
    try {
      const user = await getUserProfile();
      setCurrentUser(user);
      setForm((prev) => ({
        ...prev,
        empresaId: user.user?.id || 1,
      }));
    } catch (err) {
      console.error("❌ Error al obtener usuario:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "quantity" ? Number(value) : value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]:
        value === "" || (name === "quantity" && Number(value) <= 0)
          ? "Este campo es obligatorio"
          : "",
    }));
  };

  const validateStep = () => {
    const newErrors: Errors = {};
    if (step === 1) {
      if (!form.productName) newErrors.productName = "Por favor ingresa el nombre del producto";
      if (!form.category) newErrors.category = "Por favor selecciona una categoría";
      if (!form.description) newErrors.description = "Por favor agrega una descripción";
    }
    if (step === 2) {
      if (!form.quantity || form.quantity <= 0) newErrors.quantity = "Ingresa una cantidad válida";
      if (!form.unitMeasurement) newErrors.unitMeasurement = "Ingresa unidad de medida";
    }
    if (step === 3) {
      if (!form.city) newErrors.city = "Ingresa la ciudad";
      if (!form.address) newErrors.address = "Ingresa la dirección";
    }
    if (step === 4) {
      if (!form.publishDate) newErrors.publishDate = "Selecciona la fecha de publicación";
      if (!form.expirationDate) newErrors.expirationDate = "Selecciona la fecha de expiración";

      if (form.publishDate && form.expirationDate) {
        const pubDate = new Date(form.publishDate);
        const expDate = new Date(form.expirationDate);
        if (expDate < pubDate) {
          newErrors.expirationDate =
            "La fecha de expiración no puede ser anterior a la fecha de publicación";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const payload = {
      ...form,
      empresaId: currentUser?.user?.id || 1,
      publishDate: form.publishDate ? `${form.publishDate}T00:00:00` : undefined,
      expirationDate: form.expirationDate ? `${form.expirationDate}T00:00:00` : undefined,
    };

    try {
      await createExcess(payload);
      alert("✅ Excedente creado correctamente 💚");
      setStep(1);
      setForm({
        excessId: undefined,
        empresaId: currentUser?.user?.id || 1,
        productName: "",
        description: "",
        category: "",
        quantity: 0,
        unitMeasurement: "",
        publishDate: today,
        expirationDate: "",
        city: "",
        address: "",
        status: "",
      });
      setErrors({});
    } catch (err) {
      console.error("❌ Error al crear excedente:", err);
      alert("Ocurrió un error al crear el excedente.");
    }
  };

  const progress = (step / steps.length) * 100;

  return (
    <div className="min-h-screen px-6 py-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-10 border border-emerald-200"
      >
        <h1 className="text-3xl font-semibold text-emerald-800 mb-2 text-center">
          Crear nuevo excedente
        </h1>
        <p className="text-emerald-600 mb-6 text-center">
          Paso {step} de {steps.length}: {steps[step - 1]}
        </p>

        <div className="w-full h-2 bg-emerald-100 rounded-full mb-8">
          <div
            className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <form className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <input
                  name="productName"
                  placeholder="Nombre del producto"
                  value={form.productName}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                />
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Proteínas animales">Proteínas animales</option>
                  <option value="Frutas y verduras">Frutas y verduras</option>
                  <option value="Cereales y legumbres">Cereales y legumbres</option>
                  <option value="Procesados y preparados">Procesados y preparados</option>
                  <option value="Bebidas y otros">Bebidas y otros</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

                <textarea
                  name="description"
                  placeholder="Descripción detallada del producto"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none resize-none"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <input
                  name="quantity"
                  type="number"
                  placeholder="Cantidad"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

                <select
                  name="unitMeasurement"
                  value={form.unitMeasurement}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                >
                  <option value="">Selecciona la unidad de medida</option>
                  <option value="kg">kg</option>
                  <option value="litros">litros</option>
                  <option value="unidades">unidades</option>
                  <option value="gramos">gramos</option>
                </select>
                {errors.unitMeasurement && (
                  <p className="text-red-500 text-sm">{errors.unitMeasurement}</p>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <input
                  name="city"
                  placeholder="Ciudad"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

                <input
                  name="address"
                  placeholder="Dirección"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <input
                  type="date"
                  name="publishDate"
                  value={form.publishDate}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                />
                {errors.publishDate && <p className="text-red-500 text-sm">{errors.publishDate}</p>}

                <input
                  type="date"
                  name="expirationDate"
                  value={form.expirationDate}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none mb-4"
                />
                {errors.expirationDate && (
                  <p className="text-red-500 text-sm">{errors.expirationDate}</p>
                )}

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-4 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                >
                  <option value="">Disponible</option>
                  <option value="reservado">Reservado</option>
                  <option value="vendido">Vendido</option>
                </select>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-lg font-semibold text-emerald-800 mb-3">
                  Confirmar información
                </h2>
                <ul className="text-emerald-700 space-y-1">
                  <li><b>Producto:</b> {form.productName}</li>
                  <li><b>Categoría:</b> {form.category}</li>
                  <li><b>Descripción:</b> {form.description}</li>
                  <li><b>Cantidad:</b> {form.quantity} {form.unitMeasurement}</li>
                  <li><b>Ubicación:</b> {form.city}, {form.address}</li>
                  <li><b>Fecha publicación:</b> {form.publishDate}</li>
                  <li><b>Fecha expiración:</b> {form.expirationDate || "No definida"}</li>
                  <li><b>Estado:</b> {form.status || "Disponible"}</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
              >
                ← Atrás
              </button>
            ) : (
              <div />
            )}

            {step < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition"
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                Crear Excedente ✅
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateExcess;
