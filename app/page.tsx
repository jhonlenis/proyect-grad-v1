import Image from "next/image";
import Formulario from "./components/Formulario";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <header className="w-full">
        <div className="bg-green-600 text-white p-6 shadow-lg flex items-center justify-between px-10">
          <h1 className="text-2xl font-bold tracking-tight">SENA A UN CLIC</h1>
          <img 
            src="https://senasofiapluseduco.com/wp-content/uploads/2013/09/Estudie-gratis-en-el-SENA-Virtual-1.png"
            alt="SENA Logo"
            height={60}
            width={60}
            className="ml-auto bg-white rounded-full p-1"
          />
        </div>
      </header>

      {/* Reducimos p-8 a p-4 y eliminamos mt-4 para que suba el contenido */}
      <main className="w-full p-4 flex-grow flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-[2rem] shadow-xl text-center border border-green-100">
          <h1 className="text-xl font-semibold text-emerald-900 mb-2">
            Bienvenido a SENA a un clic querido aprendiz
          </h1>
          {/* El formulario ahora estará más cerca del título */}
          <div className="-mt-4"> 
            <Formulario />
          </div>
        </div>
      </main>

      <footer className="w-full bg-white p-4 text-center text-black border-t border-gray-200">
        <p className="text-sm text-gray-500 font-medium">
          &copy; 2026 SENA. Todos los derechos reservados.
        </p>
      </footer>

    </div>
  );
}