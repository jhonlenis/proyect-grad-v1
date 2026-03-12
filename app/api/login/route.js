import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const { correo, tipo_documento, numero_documento, password } = body;

        // LOG DE DEPURACIÓN: Verifica que el frontend está enviando lo que crees
        console.log("Intentando login para:", { correo, tipo_documento, numero_documento });

        // 1. Buscamos al usuario
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE correo = ? AND tipo_documento = ? AND numero_documento = ?", 
            [correo, tipo_documento, numero_documento]
        );

        if (!rows || rows.length === 0) {
            console.log("Resultado: Usuario no encontrado en la DB");
            return new Response(JSON.stringify({ 
                error: "Los datos de usuario no coinciden con nuestros registros." 
            }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = rows[0];

        // 2. Comparación de contraseña con manejo de errores
        // IMPORTANTE: Bcrypt fallará si user.password no es un hash válido
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        console.log("¿Contraseña coincide?:", isPasswordCorrect);
        console.log("Hash en DB:", user.password);

        if (isPasswordCorrect) {
            // 3. Login exitoso
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
                error: "La contraseña ingresada es incorrecta." 
            }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }

    } catch (error) {
        console.error("DETALLE DEL ERROR EN LOGIN:", error);
        return new Response(JSON.stringify({ 
            error: "Hubo un problema al procesar el ingreso." 
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}