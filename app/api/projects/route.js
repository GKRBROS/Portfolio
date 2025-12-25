import { NextResponse } from "next/server";
import { getProjects } from "@/lib/projectsCache";

export async function GET() {
    try {
        // Try to use KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                let projectsData = await kv.get("portfolio:projects");
                if (projectsData) {
                    return NextResponse.json(projectsData);
                }
            } catch {}
        }
        // Fallback to shared cache
        const projectsData = getProjects();
        return NextResponse.json(projectsData);
    } catch (error) {
        console.error("Projects GET error:", error);
        return NextResponse.json({ projects: [] });
    }
}
