"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, Clock, Users, CheckCircle } from "lucide-react"

interface AnalyticsMetric {
  title: string
  value: string | number
  change: number
  changeType: "increase" | "decrease"
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export function AnalyticsOverview() {
  const metrics: AnalyticsMetric[] = [
    {
      title: "Task Completion Rate",
      value: "87%",
      change: 12,
      changeType: "increase",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Active Projects",
      value: 12,
      change: 8,
      changeType: "increase",
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Team Productivity",
      value: "94%",
      change: 5,
      changeType: "increase",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Avg. Task Duration",
      value: "2.3 days",
      change: 15,
      changeType: "decrease",
      icon: Clock,
      color: "text-secondary",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {metric.changeType === "increase" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-xs ${metric.changeType === "increase" ? "text-green-500" : "text-red-500"}`}>
                {metric.change}% from last month
              </span>
            </div>
            {metric.title === "Task Completion Rate" && <Progress value={87} className="mt-3 h-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
