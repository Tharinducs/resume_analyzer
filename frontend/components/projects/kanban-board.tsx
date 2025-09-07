"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TaskCard } from "./task-card"
import { CreateTaskModal } from "./create-task-modal"
import { TaskFilters } from "./task-filters"
import { Search } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  assignee: {
    id: string
    name: string
    avatar: string
  }
  dueDate: string
  tags: string[]
  createdAt: string
}

interface KanbanBoardProps {
  projectId: string
}

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design system documentation",
      description: "Create comprehensive documentation for the design system components and guidelines",
      status: "done",
      priority: "high",
      assignee: { id: "1", name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
      dueDate: "2024-01-25",
      tags: ["documentation", "design"],
      createdAt: "2024-01-20",
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up JWT-based authentication with login, register, and password reset functionality",
      status: "in-progress",
      priority: "high",
      assignee: { id: "2", name: "Bob Smith", avatar: "/thoughtful-man.png" },
      dueDate: "2024-02-01",
      tags: ["backend", "security"],
      createdAt: "2024-01-22",
    },
    {
      id: "3",
      title: "Mobile responsive testing",
      description: "Test and optimize the application for various mobile devices and screen sizes",
      status: "todo",
      priority: "medium",
      assignee: { id: "3", name: "Carol Davis", avatar: "/diverse-woman-portrait.png" },
      dueDate: "2024-02-05",
      tags: ["testing", "mobile"],
      createdAt: "2024-01-23",
    },
    {
      id: "4",
      title: "API integration for AI features",
      description: "Integrate OpenAI API for task suggestions and project insights",
      status: "todo",
      priority: "high",
      assignee: { id: "2", name: "Bob Smith", avatar: "/thoughtful-man.png" },
      dueDate: "2024-02-10",
      tags: ["ai", "backend"],
      createdAt: "2024-01-24",
    },
    {
      id: "5",
      title: "Dashboard analytics charts",
      description: "Implement interactive charts for project progress and team performance metrics",
      status: "in-progress",
      priority: "medium",
      assignee: { id: "1", name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
      dueDate: "2024-02-08",
      tags: ["frontend", "analytics"],
      createdAt: "2024-01-25",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    priority: "all",
    assignee: "all",
    tags: "all",
  })

  const columns = [
    { id: "todo", title: "To Do", status: "todo" as const },
    { id: "in-progress", title: "In Progress", status: "in-progress" as const },
    { id: "done", title: "Done", status: "done" as const },
  ]

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filters.priority === "all" || task.priority === filters.priority
    const matchesAssignee = filters.assignee === "all" || task.assignee.id === filters.assignee
    const matchesTags = filters.tags === "all" || task.tags.includes(filters.tags)

    return matchesSearch && matchesPriority && matchesAssignee && matchesTags
  })

  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("text/plain")

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleCreateTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, task])
  }

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TaskFilters filters={filters} onFiltersChange={setFilters} tasks={tasks} />
          <CreateTaskModal onCreateTask={handleCreateTask} />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status)
          return (
            <Card
              key={column.id}
              className="glass min-h-[600px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{column.title}</span>
                  <span className="text-sm font-normal text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {columnTasks.map((task) => (
                  <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)} className="cursor-move">
                    <TaskCard task={task} />
                  </div>
                ))}
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
