"use client";

import Image from "next/image";
import Link from "next/link"; // Importamos Link para la navegación

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black font-sans">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-green-600 text-white p-4 shadow-lg flex items-center justify-between px-10">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">SENA A UN CLIC</h1>
        <img 
          src="https://senasofiapluseduco.com/wp-content/uploads/2013/09/Estudie-gratis-en-el-SENA-Virtual-1.png"
          alt="SENA Logo"
          height={50}
          width={50}
          className="ml-auto bg-white rounded-full p-1"
        />
      </header>

      {/* --- SECCIÓN 1: SOBRE NOSOTROS --- */}
      <section className="mt-24 pt-16 pb-12 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-6 uppercase tracking-tighter">
          ¿Qué es SENA a un Clic?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Somos una iniciativa tecnológica dedicada a centralizar y simplificar la experiencia 
          educativa del aprendiz. Nuestra plataforma ofrece un acceso directo a servicios 
          institucionales, optimizando la gestión de información.
        </p>
        
        {/* BOTÓN QUE REDIRECCIONA AL LOGIN */}
        <Link href="/login">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg active:scale-95">
            Empezar ahora / Iniciar Sesión
          </button>
        </Link>
      </section>

      {/* --- SECCIÓN 2: EQUIPO --- */}
      <section className="py-16 bg-white w-full border-y border-gray-100 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-12">Nuestro Equipo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* INTEGRANTE 1 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-[2rem] border border-emerald-50 shadow-sm">
              <div className="w-24 h-24 bg-emerald-100 rounded-full mb-4 flex items-center justify-center border-2 border-emerald-500">
                <span className="text-emerald-700 font-bold italic text-xs">Foto Aquí</span>
              </div>
              <h3 className="font-bold text-xl">Integrante 1</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-2">Desarrollador Fullstack</p>
              <div className="flex gap-2">
                 <a href="#" className="text-emerald-600 hover:underline text-xs">LinkedIn</a>
                 <a href="#" className="text-emerald-600 hover:underline text-xs">GitHub</a>
              </div>
            </div>

            {/* INTEGRANTE 2 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-[2rem] border border-emerald-50 shadow-sm">
              <div className="w-24 h-24 bg-emerald-100 rounded-full mb-4 flex items-center justify-center border-2 border-emerald-500">
                <span className="text-emerald-700 font-bold italic text-xs">Foto Aquí</span>
              </div>
              <h3 className="font-bold text-xl">Integrante 2</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-2">Diseño UI/UX</p>
              <div className="flex gap-2">
                 <a href="#" className="text-emerald-600 hover:underline text-xs">LinkedIn</a>
                 <a href="#" className="text-emerald-600 hover:underline text-xs">GitHub</a>
              </div>
            </div>

            {/* INTEGRANTE 3 */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-[2rem] border border-emerald-50 shadow-sm">
              <div className="w-24 h-24 bg-emerald-100 rounded-full mb-4 flex items-center justify-center border-2 border-emerald-500">
                <span className="text-emerald-700 font-bold italic text-xs">Foto Aquí</span>
              </div>
              <h3 className="font-bold text-xl">Integrante 3</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-2">Backend Developer</p>
              <div className="flex gap-2">
                 <a href="#" className="text-emerald-600 hover:underline text-xs">LinkedIn</a>
                 <a href="#" className="text-emerald-600 hover:underline text-xs">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="mt-auto w-full bg-white p-6 text-center text-black border-t border-gray-200">
        <p className="text-sm text-gray-500 font-medium">
          &copy; 2026 SENA. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}