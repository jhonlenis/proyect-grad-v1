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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="nombres"
        placeholder="Nombre"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="documento"
        placeholder="Documento"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
      />

      <button type="submit">
        Crear Cuenta
      </button>

    </form>
  );
}