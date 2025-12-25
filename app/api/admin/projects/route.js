import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

let projectsCache = {
    projects: [
        {
            num: "01",
            category: "AI|ML",
            title: "Sample Project",
            description: "This is a sample project. Edit or delete to get started.",
            stack: [{ name: "React" }, { name: "Python" }],
            image: "/assets/work/project1.jpg",
            live: "https://example.com",
            github: "https://github.com/GKRBROS/sample"
        }
    ]
};

const defaultProjectsData = {
    projects: [
        {
            num: "01",
            category: "AI|ML",
            title: "Sample Project",
            description: "This is a sample project. Edit or delete to get started.",
            stack: [{ name: "React" }, { name: "Python" }],
            image: "/assets/work/project1.jpg",
            live: "https://example.com",
            github: "https://github.com/GKRBROS/sample"
        }
    ]
};

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Try to use KV if available, otherwise return cache
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                let projectsData = await kv.get("portfolio:projects");
                if (projectsData) {
                    projectsCache = projectsData; // Update cache
                    return NextResponse.json(projectsData);
                }
            } catch {}
        }
        // Fallback to cache
        return NextResponse.json(projectsCache);
    } catch (error) {
        console.error("Projects GET error:", error);
        return NextResponse.json(projectsCache);
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const newProject = await request.json();

        // Generate new project number
        const projectCount = projectsCache.projects.length + 1;
        newProject.num = projectCount.toString().padStart(2, '0');

        projectsCache.projects.push(newProject);

        // Try to sync to KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                await kv.set("portfolio:projects", projectsCache);
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
        const index = projectsCache.projects.findIndex(p => p.num === updatedProject.num);

        if (index === -1) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        projectsCache.projects[index] = updatedProject;

        // Try to sync to KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                await kv.set("portfolio:projects", projectsCache);
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

        projectsCache.projects = projectsCache.projects.filter(p => p.num !== projectNum);

        // Renumber projects
        projectsCache.projects.forEach((project, index) => {
            project.num = (index + 1).toString().padStart(2, '0');
        });

        // Try to sync to KV if available
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import("@vercel/kv");
                await kv.set("portfolio:projects", projectsCache);
            } catch {}
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Projects DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
