import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getProjects, setProjects } from "@/lib/projectsCache";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Try to use KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                let projectsData = await kv.get("portfolio:projects");
                if (projectsData) {
                    setProjects(projectsData); // Sync with local cache
                    return NextResponse.json(projectsData);
                }
            } catch {}
        }
        // Fallback to shared cache
        const projectsData = getProjects();
        return NextResponse.json(projectsData);
    } catch (error) {
        console.error("Projects GET error:", error);
        return NextResponse.json(getProjects());
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const newProject = await request.json();
        let projectsData = getProjects();

        // Generate new project number
        const projectCount = projectsData.projects.length + 1;
        newProject.num = projectCount.toString().padStart(2, '0');

        projectsData.projects.push(newProject);
        setProjects(projectsData);

        // Try to sync to KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                await kv.set("portfolio:projects", projectsData);
            } catch {}
        }

        return NextResponse.json({ success: true, project: newProject });
    } catch (error) {
        console.error("Projects POST error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const updatedProject = await request.json();
        let projectsData = getProjects();
        const index = projectsData.projects.findIndex(p => p.num === updatedProject.num);

        if (index === -1) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        projectsData.projects[index] = updatedProject;
        setProjects(projectsData);

        // Try to sync to KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                await kv.set("portfolio:projects", projectsData);
            } catch {}
        }

        return NextResponse.json({ success: true, project: updatedProject });
    } catch (error) {
        console.error("Projects PUT error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { projectNum } = await request.json();
        let projectsData = getProjects();

        projectsData.projects = projectsData.projects.filter(p => p.num !== projectNum);

        // Renumber projects
        projectsData.projects.forEach((project, index) => {
            project.num = (index + 1).toString().padStart(2, '0');
        });

        setProjects(projectsData);

        // Try to sync to KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                await kv.set("portfolio:projects", projectsData);
            } catch {}
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Projects DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
