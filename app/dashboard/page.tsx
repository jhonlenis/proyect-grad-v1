"use client";

import { useState } from "react";

// Datos simulados (Luego los traerás con un fetch a tu API)
const PROGRAMAS_DISPONIBLES = [
  { id: 1, nombre: "Análisis y Desarrollo de Software", modalidad: "Virtual", duracion: "24 meses" },
  { id: 2, nombre: "Gestión Empresarial", modalidad: "Presencial", duracion: "18 meses" },
  { id: 3, nombre: "Diseño Gráfico Digital", modalidad: "Híbrida", duracion: "24 meses" },
];

export default function DashboardPage() {
  const [inscritos, setInscritos] = useState<number[]>([]);

  const inscribirPrograma = (id: number) => {
    if (!inscritos.includes(id)) {
      setInscritos([...inscritos, id]);
      alert("¡Inscripción exitosa!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-black">
      
      {/* HEADER DEL DASHBOARD */}
      <nav className="bg-emerald-600 text-white p-4 px-10 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold tracking-tight">SENA A UN CLIC - Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Hola, Aprendiz</span>
          <button className="bg-emerald-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-900 transition">Cerrar Sesión</button>
        </div>
      </nav>

      <main className="p-6 md:p-12 max-w-7xl mx-auto w-full">
        
        {/* SECCIÓN: MIS PROGRAMAS INSCRITOS */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 border-l-4 border-emerald-500 pl-4">Mis Inscripciones</h2>
          {inscritos.length === 0 ? (
            <div className="bg-white p-10 rounded-[2rem] border-2 border-dashed border-gray-200 text-center text-gray-400">
              Aún no estás inscrito en ningún programa.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROGRAMAS_DISPONIBLES.filter(p => inscritos.includes(p.id)).map(prog => (
                <div key={prog.id} className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-200 flex justify-between items-center shadow-sm">
                   <div>
                      <h3 className="font-bold text-emerald-900">{prog.nombre}</h3>
                      <p className="text-xs text-emerald-600 font-bold uppercase">{prog.modalidad}</p>
                   </div>
                   <span className="text-emerald-500 text-2xl">✅</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECCIÓN: PROGRAMAS DISPONIBLES */}
        <section>
          <h2 className="text-2xl font-black mb-6 border-l-4 border-emerald-500 pl-4">Catálogo de Programas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMAS_DISPONIBLES.filter(p => !inscritos.includes(p.id)).map((prog) => (
              <div key={prog.id} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all border-b-8 border-b-emerald-600">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase bg-gray-100 px-3 py-1 rounded-full text-gray-600 tracking-widest">
                      {prog.modalidad}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 italic">{prog.duracion}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4 leading-tight">{prog.nombre}</h3>
                  <p className="text-gray-500 text-sm mb-6">Inscríbete para comenzar tu formación técnica con los mejores estándares.</p>
                </div>

                <button 
                  onClick={() => inscribirPrograma(prog.id)}
                  className="w-full py-4 bg-black hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg uppercase text-xs tracking-widest"
                >
                  Inscribirme
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}