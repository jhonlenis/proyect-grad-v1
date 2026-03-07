import Image from "next/image";
import Buttoms from "./components/Buttoms";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full">
        <div className="bg-green-600 text-white p-8 shadow-lg text-center w-full flex items-center justify-between gap-4">
          <h1>SENA A UN CLIC</h1>
          <img src="https://senasofiapluseduco.com/wp-content/uploads/2013/09/Estudie-gratis-en-el-SENA-Virtual-1.png"
            alt="SENA Logo"
            height={80}
            width={80}
            className="ml-auto"
          />
        </div>
      </header>
      <main className="w-full p-8">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center mt-4 text-black">
          <h1>Bienvenido a sena a un clic querido aprendiz</h1>
          <p>quieres iniciar sesión o registrarte?</p>
          <Buttoms />
        </div>
      </main>

      <div className="bg-gray-100 p-8 shadow-lg text-center mt-4 text-black w-full">
        <footer>
          <p>&copy; 2026 SENA. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
