"use client"

import { ProjectCard } from "./project-card"

// Mock data - in real app this would come from API/database
const mockProjects = [
  {
    id: "1",
    name: "AI Dashboard Redesign",
    description: "Modernizing the user interface with AI-powered insights and glassmorphism design",
    progress: 75,
    status: "active",
    dueDate: "2024-02-15",
    members: [
      { id: "1", name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
      { id: "2", name: "Bob Smith", avatar: "/thoughtful-man.png" },
      { id: "3", name: "Carol Davis", avatar: "/diverse-woman-portrait.png" },
    ],
    tasksCompleted: 12,
    totalTasks: 16,
    priority: "high",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Building responsive mobile experience for task management platform",
    progress: 45,
    status: "active",
    dueDate: "2024-03-01",
    members: [
      { id: "4", name: "David Wilson", avatar: "/thoughtful-man.png" },
      { id: "5", name: "Eva Brown", avatar: "/diverse-woman-portrait.png" },
    ],
    tasksCompleted: 9,
    totalTasks: 20,
    priority: "medium",
  },
  {
    id: "3",
    name: "API Integration",
    description: "Connecting third-party services and AI models for enhanced functionality",
    progress: 90,
    status: "review",
    dueDate: "2024-01-30",
    members: [{ id: "6", name: "Frank Miller", avatar: "/thoughtful-man.png" }],
    tasksCompleted: 18,
    totalTasks: 20,
    priority: "high",
  },
  {
    id: "4",
    name: "User Research Study",
    description: "Conducting user interviews and usability testing for new features",
    progress: 25,
    status: "planning",
    dueDate: "2024-02-28",
    members: [
      { id: "7", name: "Grace Lee", avatar: "/diverse-woman-portrait.png" },
      { id: "8", name: "Henry Chen", avatar: "/thoughtful-man.png" },
    ],
    tasksCompleted: 3,
    totalTasks: 12,
    priority: "low",
  },
]

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {mockProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
