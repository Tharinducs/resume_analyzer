"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"

interface ProjectTimelineProps {
  projectId: string
}

export function ProjectTimeline({ projectId }: ProjectTimelineProps) {
  const milestones = [
    {
      id: "1",
      title: "Project Kickoff",
      description: "Initial planning and team setup",
      date: "2024-01-01",
      status: "completed",
      tasks: ["Team formation", "Requirements gathering", "Initial wireframes"],
    },
    {
      id: "2",
      title: "Design Phase",
      description: "UI/UX design and prototyping",
      date: "2024-01-15",
      status: "completed",
      tasks: ["Design system", "Mockups", "Prototype"],
    },
    {
      id: "3",
      title: "Development Sprint 1",
      description: "Core functionality implementation",
      date: "2024-02-01",
      status: "in-progress",
      tasks: ["Component library", "Authentication", "Dashboard layout"],
    },
    {
      id: "4",
      title: "Testing & QA",
      description: "Quality assurance and bug fixes",
      date: "2024-02-10",
      status: "pending",
      tasks: ["Unit tests", "Integration tests", "User testing"],
    },
    {
      id: "5",
      title: "Launch",
      description: "Production deployment and monitoring",
      date: "2024-02-15",
      status: "pending",
      tasks: ["Deployment", "Monitoring setup", "Documentation"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(milestone.status)}
                {index < milestones.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant="outline" className={getStatusColor(milestone.status)}>
                      {milestone.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{new Date(milestone.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  {milestone.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
