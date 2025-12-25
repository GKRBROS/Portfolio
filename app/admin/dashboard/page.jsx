"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiLogOut, FiEye, FiUpload, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    category: "",
    title: "",
    description: "",
    stack: [],
    image: "",
    live: "",
    github: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const [analyticsRes, projectsRes] = await Promise.all([
        fetch("/api/analytics"),
        fetch("/api/admin/projects")
      ]);

      const analyticsData = await analyticsRes.json();
      const projectsData = await projectsRes.json();

      setAnalytics(analyticsData);
      setProjects(projectsData.projects || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const response = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Resume uploaded successfully!");
        setResumeFile(null);
      } else {
        alert("Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Error uploading resume");
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.path;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        alert("Project created successfully!");
        setNewProject({
          category: "",
          title: "",
          description: "",
          stack: [],
          image: "",
          live: "",
          github: ""
        });
        fetchData();
      } else {
        alert("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (response.ok) {
        alert("Project updated successfully!");
        setEditingProject(null);
        fetchData();
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (projectNum) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectNum }),
      });

      if (response.ok) {
        alert("Project deleted successfully!");
        fetchData();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const addStackItem = (project, setProject) => {
    const stackInput = prompt("Enter technology name:");
    if (stackInput) {
      setProject({
        ...project,
        stack: [...project.stack, { name: stackInput }]
      });
    }
  };

  const removeStackItem = (project, setProject, index) => {
    setProject({
      ...project,
      stack: project.stack.filter((_, i) => i !== index)
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-2xl text-accent">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-accent">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2"
          >
            <FiLogOut />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="bg-[#27272c] p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
                <FiEye /> Portfolio Views
              </h2>
              
              {analytics && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white/80">Total Views</h3>
                      <p className="text-3xl font-bold text-accent mt-2">
                        {analytics.totalViews}
                      </p>
                    </div>
                    
                    {Object.entries(analytics.pageViews).map(([page, views]) => (
                      <div key={page} className="bg-primary p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white/80 capitalize">
                          {page} Page
                        </h3>
                        <p className="text-3xl font-bold text-accent mt-2">{views}</p>
                      </div>
                    ))}
                  </div>
                  
                  {analytics.lastUpdated && (
                    <p className="text-sm text-white/60 mt-4">
                      Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <div className="bg-[#27272c] p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
                <FiUpload /> Upload Resume
              </h2>
              
              <form onSubmit={handleResumeUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Select Resume PDF
                  </label>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={uploading || !resumeFile}
                  className="w-full"
                >
                  {uploading ? "Uploading..." : "Upload Resume"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-primary rounded-lg">
                <p className="text-sm text-white/80">
                  Current resume: <span className="text-accent">Gokul_Kiran_Resume.pdf</span>
                </p>
                <p className="text-xs text-white/60 mt-2">
                  Uploading a new resume will replace the existing one.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-6">
              {/* Create New Project */}
              <div className="bg-[#27272c] p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
                  <FiPlus /> Add New Project
                </h2>
                
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Category
                      </label>
                      <Input
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        placeholder="e.g., AI|ML, Website, Bot"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Title
                      </label>
                      <Input
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        placeholder="Project Title"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="Project Description"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Technology Stack
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newProject.stack.map((tech, index) => (
                        <span key={index} className="bg-accent text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {tech.name}
                          <button
                            type="button"
                            onClick={() => removeStackItem(newProject, setNewProject, index)}
                            className="hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addStackItem(newProject, setNewProject)}
                    >
                      Add Technology
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Project Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imagePath = await handleImageUpload(file);
                          if (imagePath) {
                            setNewProject({...newProject, image: imagePath});
                          }
                        }
                      }}
                    />
                    {newProject.image && (
                      <p className="text-sm text-green-500 mt-2">Image uploaded: {newProject.image}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Live Link (optional)
                      </label>
                      <Input
                        value={newProject.live}
                        onChange={(e) => setNewProject({...newProject, live: e.target.value})}
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        GitHub Repository
                      </label>
                      <Input
                        value={newProject.github}
                        onChange={(e) => setNewProject({...newProject, github: e.target.value})}
                        placeholder="https://github.com/username/repo"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Project
                  </Button>
                </form>
              </div>

              {/* Existing Projects */}
              <div className="bg-[#27272c] p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-accent mb-6">Manage Projects</h2>
                
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.num} className="bg-primary p-4 rounded-lg">
                      {editingProject?.num === project.num ? (
                        // Edit Form
                        <form onSubmit={handleUpdateProject} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              value={editingProject.category}
                              onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                              placeholder="Category"
                            />
                            <Input
                              value={editingProject.title}
                              onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                              placeholder="Title"
                            />
                          </div>
                          
                          <Textarea
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                            placeholder="Description"
                            rows={3}
                          />

                          <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {editingProject.stack.map((tech, index) => (
                                <span key={index} className="bg-accent text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                  {tech.name}
                                  <button
                                    type="button"
                                    onClick={() => removeStackItem(editingProject, setEditingProject, index)}
                                    className="hover:text-red-500"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addStackItem(editingProject, setEditingProject)}
                            >
                              Add Technology
                            </Button>
                          </div>

                          <Input
                            value={editingProject.image}
                            onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                            placeholder="Image Path"
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              value={editingProject.live}
                              onChange={(e) => setEditingProject({...editingProject, live: e.target.value})}
                              placeholder="Live Link"
                            />
                            <Input
                              value={editingProject.github}
                              onChange={(e) => setEditingProject({...editingProject, github: e.target.value})}
                              placeholder="GitHub Link"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button type="submit" className="flex-1">
                              Save Changes
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setEditingProject(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
                        // Display Mode
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-accent">
                              {project.num}. {project.title}
                            </h3>
                            <p className="text-sm text-white/60 mb-2">{project.category}</p>
                            <p className="text-white/80 mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {project.stack.map((tech, index) => (
                                <span key={index} className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">
                                  {tech.name}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-white/60">
                              <p>Image: {project.image}</p>
                              {project.live && <p>Live: {project.live}</p>}
                              <p>GitHub: {project.github}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingProject(project)}
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProject(project.num)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
