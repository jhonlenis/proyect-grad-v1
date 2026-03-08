import { useState, ChangeEvent, FormEvent } from "react";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
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

    const res = await fetch("/api/login", {
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
        type="email"
        name="email"
        placeholder="Correo electrónico"
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
        Iniciar Sesión
      </button>

    </form>
  );
}