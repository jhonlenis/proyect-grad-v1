import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const { nombres, apellidos, email, documento, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query("INSERT INTO usuarios (nombres, apellidos, correo, documento, password) VALUES (?, ?, ?, ?, ?)", [nombres, apellidos, email, documento, hashedPassword]);
        return new Response(JSON.stringify({ id: result.insertId, nombres, apellidos, email, documento }), { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response(JSON.stringify({ error: "Failed to create user" }), { status: 500 });
    }
}