"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectTimeline } from "./project-timeline"
import { KanbanBoard } from "./kanban-board"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface ProjectTabsProps {
  projectId: string
}

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="glass">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">12</span>
                <span className="text-sm text-muted-foreground">/ 16 total</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold">3</span>
                <span className="text-sm text-muted-foreground">active tasks</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-2xl font-bold">1</span>
                <span className="text-sm text-muted-foreground">needs attention</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                action: "Task completed",
                task: "Design system documentation",
                time: "2 hours ago",
                user: "Alice Johnson",
              },
              { action: "Milestone reached", task: "UI Components Phase", time: "1 day ago", user: "Team" },
              { action: "Task assigned", task: "Mobile responsive testing", time: "2 days ago", user: "Bob Smith" },
              { action: "Comment added", task: "Color palette review", time: "3 days ago", user: "Carol Davis" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {activity.action}: {activity.task}
                  </p>
                  <p className="text-xs text-muted-foreground">by {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tasks">
        <KanbanBoard projectId={projectId} />
      </TabsContent>

      <TabsContent value="timeline">
        <ProjectTimeline projectId={projectId} />
      </TabsContent>

      <TabsContent value="files">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Project Files</CardTitle>
            <CardDescription>Documents, assets, and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">File management coming soon.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
