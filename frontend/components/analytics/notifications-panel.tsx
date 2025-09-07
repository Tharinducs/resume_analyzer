"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, CheckCircle, AlertTriangle, Clock, Users, X } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "deadline"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionable: boolean
}

export function NotificationsPanel() {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "deadline",
      title: "Upcoming Deadline",
      message: "API Integration task is due in 2 hours",
      timestamp: "2 min ago",
      read: false,
      actionable: true,
    },
    {
      id: "2",
      type: "success",
      title: "Task Completed",
      message: "Alice completed 'Design system documentation'",
      timestamp: "1 hour ago",
      read: false,
      actionable: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Overdue Task",
      message: "Mobile responsive testing is 2 days overdue",
      timestamp: "3 hours ago",
      read: true,
      actionable: true,
    },
    {
      id: "4",
      type: "info",
      title: "New Team Member",
      message: "Frank Miller joined the AI Dashboard project",
      timestamp: "1 day ago",
      read: true,
      actionable: false,
    },
    {
      id: "5",
      type: "warning",
      title: "High Workload Alert",
      message: "Bob Smith has 6 active tasks - consider redistribution",
      timestamp: "2 days ago",
      read: true,
      actionable: true,
    },
  ]

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "deadline":
        return <Clock className="w-4 h-4 text-red-500" />
      case "info":
        return <Users className="w-4 h-4 text-blue-500" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            Mark all read
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 p-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors ${
                  notification.read ? "bg-muted/20 border-border/30" : "bg-muted/40 border-border/50 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-medium ${notification.read ? "text-muted-foreground" : ""}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 text-pretty">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                {notification.actionable && (
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs glass bg-transparent">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs glass bg-transparent">
                      Take Action
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
