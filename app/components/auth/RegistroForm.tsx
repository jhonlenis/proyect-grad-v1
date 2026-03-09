"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface RegisterData {
  nombres: string;
  apellidos: string;
  email: string;
  documento: string;
  password: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    nombres: "",
    apellidos: "",
    email: "",
    documento: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      {/* Título en Negro */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Fila: Nombres y Apellidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
            required
          />
        </div>

        {/* Campo Documento */}
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
        <input
          type="text"
          name="documento"
          placeholder="Documento de identidad"
          value={formData.documento}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
          required
        />

        {/* Campo Correo */}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
          required
        />

        {/* Campo Contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white text-black outline-none transition-all placeholder:text-gray-400"
          required
        />

        {/* Botón de Acción */}
        <button
          type="submit"
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all uppercase tracking-widest mt-4"
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}