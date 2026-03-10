import AuthForm from "../components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-green-100">
        <h2 className="text-3xl font-black text-black text-center mb-2 tracking-tight">
          ACCESO
        </h2>
        <p className="text-center text-gray-500 mb-8 font-medium">
          Ingresa tus credenciales para continuar
        </p>
        <div className="-mt-4"> 
          <AuthForm />
        </div>
      </div>
    </div>
  );
}