"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Clock } from "lucide-react"
import { useAIAssistant } from "./ai-assistant-provider"

interface AIInsight {
  id: string
  type: "performance" | "risk" | "suggestion" | "deadline"
  title: string
  description: string
  priority: "high" | "medium" | "low"
  actionable: boolean
}

interface AIInsightsCardProps {
  insights?: AIInsight[]
  className?: string
}

export function AIInsightsCard({ insights, className }: AIInsightsCardProps) {
  const { openAssistant } = useAIAssistant()

  const defaultInsights: AIInsight[] = [
    {
      id: "1",
      type: "performance",
      title: "Project Velocity Increase",
      description: "Your team's velocity has increased 23% this week. Great momentum!",
      priority: "low",
      actionable: false,
    },
    {
      id: "2",
      type: "risk",
      title: "Resource Bottleneck Detected",
      description: "Bob Smith has 6 active tasks. Consider redistributing workload.",
      priority: "high",
      actionable: true,
    },
    {
      id: "3",
      type: "suggestion",
      title: "Task Optimization Opportunity",
      description: "Break down 'API Integration' into 3 smaller tasks for better tracking.",
      priority: "medium",
      actionable: true,
    },
    {
      id: "4",
      type: "deadline",
      title: "Upcoming Deadline Alert",
      description: "2 tasks due in the next 48 hours require attention.",
      priority: "high",
      actionable: true,
    },
  ]

  const displayInsights = insights || defaultInsights

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "performance":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "risk":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "suggestion":
        return <Lightbulb className="w-4 h-4 text-blue-500" />
      case "deadline":
        return <Clock className="w-4 h-4 text-orange-500" />
    }
  }

  const getPriorityColor = (priority: AIInsight["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
    }
  }

  return (
    <Card className={`glass ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Insights
          </div>
          <Button variant="ghost" size="sm" onClick={openAssistant} className="text-xs">
            Ask AI
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayInsights.slice(0, 3).map((insight) => (
          <div key={insight.id} className="space-y-2 p-3 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                {getInsightIcon(insight.type)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-balance">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground text-pretty">{insight.description}</p>
                </div>
              </div>
              <Badge variant="outline" className={`text-xs ${getPriorityColor(insight.priority)}`}>
                {insight.priority}
              </Badge>
            </div>
            {insight.actionable && (
              <Button variant="outline" size="sm" className="w-full h-7 text-xs glass bg-transparent">
                Take Action
              </Button>
            )}
          </div>
        ))}

        {displayInsights.length > 3 && (
          <Button variant="outline" className="w-full glass bg-transparent" onClick={openAssistant}>
            View All Insights ({displayInsights.length})
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
