import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const { nombres, apellidos, email, documento, password, tipo_documento } = await request.json();
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ajustamos la consulta con los nombres correctos de las columnas
        const [result] = await db.query(
            "INSERT INTO usuarios (nombres, apellidos, correo, tipo_documento, numero_documento, password, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [
                nombres, 
                apellidos, 
                email, 
                tipo_documento || 'Cédula de Ciudadanía', // Valor por defecto si no viene del front
                documento, 
                hashedPassword, 
                2 // 2 es el ID para 'Aprendiz' según nuestro script
            ]
        );

        return new Response(JSON.stringify({ 
            message: "Usuario creado", 
            id: result.insertId 
        }), { status: 201 });

    } catch (error) {
        console.error("Error creando usuario:", error);
        return new Response(JSON.stringify({ 
            error: "Error al registrar: " + error.message 
        }), { status: 500 });
    }
}