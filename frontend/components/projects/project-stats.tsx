"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, CheckCircle, Clock } from "lucide-react"

export function ProjectStats() {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 from last month",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 new members",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Completed Tasks",
      value: "156",
      change: "+23 this week",
      icon: CheckCircle,
      color: "text-primary",
    },
    {
      title: "Avg. Completion",
      value: "87%",
      change: "+5% improvement",
      icon: Clock,
      color: "text-secondary",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            {stat.title === "Avg. Completion" && <Progress value={87} className="mt-3 h-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
