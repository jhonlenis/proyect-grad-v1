import db from "@/lib/db";

export async function POST(request) {
    try {
        const { correo, password } = await request.json();

        // Buscamos al usuario por su email
        // IMPORTANTE: En producción, usa bcrypt.compare() para la contraseña
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE correo = ? AND password = ?", 
            [correo, password]
        );

        const usuarios = rows;

        if (usuarios.length > 0) {
            const user = usuarios[0];
            // No devolvemos la contraseña al frontend por seguridad
            const { password: _, ...userWithoutPassword } = user;

            return new Response(JSON.stringify({ 
                message: "Login exitoso", 
                user: userWithoutPassword 
            }), { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify({ 
                error: "Credenciales incorrectas" 
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