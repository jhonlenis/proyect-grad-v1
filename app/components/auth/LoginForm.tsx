"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; 

interface LoginData {
  correo: string;
  tipo_documento: string;
  numero_documento: string; 
  password: string;
}

export default function LoginForm() {
  const router = useRouter(); 
  const [formData, setFormData] = useState<LoginData>({
    correo: "",
    tipo_documento: "",
    numero_documento: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Petición a la API de login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ 
          type: 'success', 
          text: `¡Bienvenido, ${data.user?.nombres || 'Aprendiz'}! Redirigiendo...` 
        });
        
        // Forzamos la redirección al dashboard
        setTimeout(() => {
          router.push('/dashboard'); 
        }, 1500);
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
        
        {/* Mensaje de estado dinámico */}
        {status && (
          <div className={`p-4 rounded-xl text-sm font-bold text-center transition-all ${
            status.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200 animate-shake'
          }`}>
            {status.text}
          </div>
        )}

        {/* Input: Correo */}
        <div className="w-full">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        {/* Select: Tipo de Documento */}
        <div>
          <select
            name="tipo_documento"
            value={formData.tipo_documento}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all cursor-pointer appearance-none"
            required
          >
            <option value="" disabled>Selecciona tipo de documento</option>
            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
            <option value="Cédula de Extranjería">Cédula de Extranjería</option>
            <option value="PEP">PEP</option>
            <option value="Permiso por Protección Temporal">Permiso por Protección Temporal</option>
          </select>
        </div>

        {/* Input: Número de Documento */}
        <div>
          <input
            type="text"
            name="numero_documento"
            placeholder="Número de documento"
            value={formData.numero_documento}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        {/* Input: Contraseña */}
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

        {/* Botón de Enviar */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 ${loading ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all uppercase tracking-widest mt-2`}
        >
          {loading ? "Verificando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}