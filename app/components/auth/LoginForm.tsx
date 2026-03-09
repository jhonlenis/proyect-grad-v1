"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface LoginData {
  correo: string;
  documento: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    correo: "",
    documento: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  // Nuevo estado para los mensajes en pantalla
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null); // Limpiar mensajes anteriores

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // En lugar de alert(), usamos setStatus
        setStatus({ 
          type: 'success', 
          text: `¡Bienvenido, ${data.user.nombres || 'Aprendiz'}!` 
        });
        
        // Opcional: Redirigir después de 2 segundos
        // setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setStatus({ 
          type: 'error', 
          text: data.error || "Credenciales incorrectas" 
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        text: "Error de conexión con el servidor" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Renderizado condicional del mensaje */}
        {status && (
          <div className={`p-4 rounded-xl text-sm font-bold text-center animate-bounce ${
            status.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {status.text}
          </div>
        )}

        <div className="w-full">
          <input
            type="text"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <div>
          <select
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all cursor-pointer appearance-none"
          required
        >
          <option value="" disabled selected className="text-gray-400">
            Selecciona tipo de documento
          </option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="PPT">Permiso de Protección Temporal</option>
        </select>
        </div>

        <div>
          <input
            type="text"
            name="documento"
            placeholder="Número de documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <div className="w-full">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 ${loading ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all uppercase tracking-widest mt-2`}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}