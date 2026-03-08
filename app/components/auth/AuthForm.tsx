'use client';
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistroForm";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-emerald-900/20 overflow-hidden border border-emerald-100">
        
        <div className="h-3 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600" />

        <div className="p-10">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-emerald-950">
              {isLogin ? "Login" : "Registro"}
            </h2>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-700 font-semibold hover:text-emerald-500 underline"
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}