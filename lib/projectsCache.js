// Shared projects cache for both admin and public endpoints
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

export function getProjects() {
    return projectsCache;
}

export function setProjects(data) {
    projectsCache = data;
}

export function getProjectsData() {
    return projectsCache;
}
