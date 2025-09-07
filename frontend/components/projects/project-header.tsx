"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Edit, Share, MoreHorizontal, Star } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProjectHeaderProps {
  projectId: string
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
  // Mock data - in real app this would be fetched based on projectId
  const project = {
    name: "AI Dashboard Redesign",
    description: "Modernizing the user interface with AI-powered insights and glassmorphism design",
    status: "active",
    priority: "high",
    progress: 75,
    dueDate: "2024-02-15",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="glass bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="glass p-6 rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-balance">{project.name}</h1>
                <p className="text-muted-foreground mt-2 text-pretty">{project.description}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Star className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                {project.status}
              </Badge>
              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                {project.priority} priority
              </Badge>
              <span className="text-sm text-muted-foreground">
                Due: {new Date(project.dueDate).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-3" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="glass bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" className="glass bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="glass bg-transparent">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-strong">
                <DropdownMenuItem>Duplicate Project</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
