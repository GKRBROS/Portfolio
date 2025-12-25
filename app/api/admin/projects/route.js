import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const projectsFile = path.join(dataDir, "projects.json");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = fs.readFileSync(projectsFile, "utf-8");
        const projects = JSON.parse(data);

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read projects" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const newProject = await request.json();

        const data = fs.readFileSync(projectsFile, "utf-8");
        const projectsData = JSON.parse(data);

        // Generate new project number
        const projectCount = projectsData.projects.length + 1;
        newProject.num = projectCount.toString().padStart(2, '0');

        projectsData.projects.push(newProject);

        fs.writeFileSync(projectsFile, JSON.stringify(projectsData, null, 2));

        return NextResponse.json({ success: true, project: newProject });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const updatedProject = await request.json();

        const data = fs.readFileSync(projectsFile, "utf-8");
        const projectsData = JSON.parse(data);

        const index = projectsData.projects.findIndex(p => p.num === updatedProject.num);

        if (index === -1) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        projectsData.projects[index] = updatedProject;

        fs.writeFileSync(projectsFile, JSON.stringify(projectsData, null, 2));

        return NextResponse.json({ success: true, project: updatedProject });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { projectNum } = await request.json();

        const data = fs.readFileSync(projectsFile, "utf-8");
        const projectsData = JSON.parse(data);

        projectsData.projects = projectsData.projects.filter(p => p.num !== projectNum);

        // Renumber projects
        projectsData.projects.forEach((project, index) => {
            project.num = (index + 1).toString().padStart(2, '0');
        });

        fs.writeFileSync(projectsFile, JSON.stringify(projectsData, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
