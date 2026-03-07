"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  nombre?: string;
  email: string;
  password: "";
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-emerald-900/20 overflow-hidden border border-emerald-100">
        {/* Decoración superior */}
        <div className="h-3 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600" />

        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-emerald-950 tracking-tight">
              {isLogin ? "Login" : "Registro"}
            </h2>
            <div className="h-1 w-12 bg-emerald-500 mx-auto mt-2 rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                className="w-full px-5 py-4 rounded-xl bg-emerald-50/50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all text-emerald-900 placeholder:text-black/50"
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full px-5 py-4 rounded-xl bg-emerald-50/50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all text-emerald-900 placeholder:text-black/50"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="Documento"
              placeholder="Número de documento"
              className="w-full px-5 py-4 rounded-xl bg-emerald-50/50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all text-emerald-900 placeholder:text-black/50"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full px-5 py-4 rounded-xl bg-emerald-50/50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all text-emerald-900 placeholder:text-black/50"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all mt-6 uppercase tracking-widest text-sm"
            >
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-700 font-semibold hover:text-emerald-500 transition-colors underline underline-offset-4"
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya eres miembro? Loguéate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
