import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const { nombres, apellidos, email, documento, password, tipo_documento } = await request.json();
        
        // 1. Verificar si el usuario ya existe para dar un error claro
        const [existing] = await db.query("SELECT id FROM usuarios WHERE correo = ? OR numero_documento = ?", [email, documento]);
        if (existing.length > 0) {
            return new Response(JSON.stringify({ error: "El correo o documento ya están registrados" }), { status: 400 });
        }

        // 2. Encriptar
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insertar
        const [result] = await db.query(
            "INSERT INTO usuarios (nombres, apellidos, correo, tipo_documento, numero_documento, password, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [
                nombres, 
                apellidos, 
                email, 
                tipo_documento || 'Cédula de Ciudadanía', 
                documento, 
                hashedPassword, 
                2 
            ]
        );

        return new Response(JSON.stringify({ 
            message: "Usuario creado exitosamente", 
            id: result.insertId 
        }), { status: 201 });

    } catch (error) {
        console.error("Error creando usuario:", error);
        return new Response(JSON.stringify({ 
            error: "Error interno: " + error.message 
        }), { status: 500 });
    }
}