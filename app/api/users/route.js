import db from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM usuarios");
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
    }
}
