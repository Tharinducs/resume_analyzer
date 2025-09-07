"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Zap, Award } from "lucide-react"

interface PerformanceMetric {
  title: string
  current: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
  category: "productivity" | "quality" | "efficiency" | "satisfaction"
}

export function PerformanceMetrics() {
  const metrics: PerformanceMetric[] = [
    {
      title: "Sprint Velocity",
      current: 42,
      target: 40,
      unit: "story points",
      trend: "up",
      category: "productivity",
    },
    {
      title: "Code Quality Score",
      current: 94,
      target: 90,
      unit: "%",
      trend: "up",
      category: "quality",
    },
    {
      title: "Task Cycle Time",
      current: 2.1,
      target: 3.0,
      unit: "days",
      trend: "down",
      category: "efficiency",
    },
    {
      title: "Team Satisfaction",
      current: 4.6,
      target: 4.0,
      unit: "/5",
      trend: "stable",
      category: "satisfaction",
    },
  ]

  const getCategoryIcon = (category: PerformanceMetric["category"]) => {
    switch (category) {
      case "productivity":
        return <Zap className="w-4 h-4 text-blue-500" />
      case "quality":
        return <Award className="w-4 h-4 text-green-500" />
      case "efficiency":
        return <TrendingUp className="w-4 h-4 text-primary" />
      case "satisfaction":
        return <Target className="w-4 h-4 text-secondary" />
    }
  }

  const getTrendColor = (trend: PerformanceMetric["trend"], isInverse = false) => {
    if (trend === "stable") return "text-muted-foreground"
    const isPositive = isInverse ? trend === "down" : trend === "up"
    return isPositive ? "text-green-500" : "text-red-500"
  }

  const getProgressPercentage = (current: number, target: number, isInverse = false) => {
    if (isInverse) {
      return Math.min(100, (target / current) * 100)
    }
    return Math.min(100, (current / target) * 100)
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric, index) => {
          const isInverse = metric.title === "Task Cycle Time" // Lower is better
          const progressPercentage = getProgressPercentage(metric.current, metric.target, isInverse)
          const isOnTarget = isInverse ? metric.current <= metric.target : metric.current >= metric.target

          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(metric.category)}
                  <span className="font-medium text-sm">{metric.title}</span>
                </div>
                <Badge variant={isOnTarget ? "default" : "secondary"} className="text-xs">
                  {isOnTarget ? "On Target" : "Needs Attention"}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Current: {metric.current} {metric.unit}
                </span>
                <span className="text-muted-foreground">
                  Target: {metric.target} {metric.unit}
                </span>
              </div>

              <Progress value={progressPercentage} className="h-2" />

              <div className="flex items-center justify-between text-xs">
                <span className={getTrendColor(metric.trend, isInverse)}>
                  {metric.trend === "up" && "↗ Trending up"}
                  {metric.trend === "down" && "↘ Trending down"}
                  {metric.trend === "stable" && "→ Stable"}
                </span>
                <span className="text-muted-foreground">{Math.round(progressPercentage)}% of target</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
