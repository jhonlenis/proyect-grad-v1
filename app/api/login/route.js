import db from "@/lib/db";
import bcrypt from "bcrypt"; // Importante para comparar contraseñas encriptadas

export async function POST(request) {
    try {
        const { correo, tipo_documento, numero_documento, password } = await request.json();

        // 1. Buscamos al usuario por correo y documentos (filtros únicos)
        // No metemos la password en el WHERE porque está hasheada
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE correo = ? AND tipo_documento = ? AND numero_documento = ?", 
            [correo, tipo_documento, numero_documento]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ 
                error: "Usuario no encontrado o datos incorrectos" 
            }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = rows[0];

        // 2. Comparamos la contraseña ingresada con el hash de la base de datos
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            // 3. Login exitoso: Quitamos la password del objeto antes de enviar al front
            const { password: _, ...userWithoutPassword } = user;

            return new Response(JSON.stringify({ 
                message: "Login exitoso", 
                user: userWithoutPassword 
            }), { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            // 4. Contraseña incorrecta
            return new Response(JSON.stringify({ 
                error: "Contraseña incorrecta" 
            }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

    } catch (error) {
        console.error("Error en el login:", error);
        return new Response(JSON.stringify({ 
            error: "Error interno del servidor" 
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}