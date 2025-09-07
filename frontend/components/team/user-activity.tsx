"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, CheckCircle, MessageSquare, FileText, Users } from "lucide-react"

interface ActivityItem {
  id: string
  type: "task" | "comment" | "project" | "team"
  action: string
  target: string
  timestamp: string
}

export function UserActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "task",
      action: "Completed task",
      target: "Design system documentation",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "comment",
      action: "Added comment to",
      target: "API Integration task",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      type: "project",
      action: "Created project",
      target: "Mobile App Redesign",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "team",
      action: "Invited member",
      target: "john@company.com",
      timestamp: "2 days ago",
    },
    {
      id: "5",
      type: "task",
      action: "Updated task",
      target: "User authentication flow",
      timestamp: "3 days ago",
    },
  ]

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "task":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "comment":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case "project":
        return <FileText className="w-4 h-4 text-primary" />
      case "team":
        return <Users className="w-4 h-4 text-secondary" />
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 p-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
