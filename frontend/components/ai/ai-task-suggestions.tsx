"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Clock, Users } from "lucide-react"

interface TaskSuggestion {
  id: string
  title: string
  description: string
  estimatedTime: string
  priority: "high" | "medium" | "low"
  suggestedAssignee?: string
  reasoning: string
}

interface AITaskSuggestionsProps {
  projectId?: string
  className?: string
}

export function AITaskSuggestions({ projectId, className }: AITaskSuggestionsProps) {
  const suggestions: TaskSuggestion[] = [
    {
      id: "1",
      title: "Add error boundary components",
      description: "Implement React error boundaries to improve user experience during failures",
      estimatedTime: "4-6 hours",
      priority: "medium",
      suggestedAssignee: "Bob Smith",
      reasoning: "Based on recent error reports and Bob's React expertise",
    },
    {
      id: "2",
      title: "Optimize database queries",
      description: "Review and optimize slow database queries identified in performance monitoring",
      estimatedTime: "2-3 hours",
      priority: "high",
      suggestedAssignee: "Alice Johnson",
      reasoning: "Performance impact is high, Alice has database optimization experience",
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Update API documentation to reflect recent endpoint changes",
      estimatedTime: "1-2 hours",
      priority: "low",
      reasoning: "Documentation is outdated but not blocking development",
    },
  ]

  const getPriorityColor = (priority: TaskSuggestion["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
    }
  }

  const handleCreateTask = (suggestion: TaskSuggestion) => {
    // In a real app, this would integrate with the task creation system
    console.log("Creating task from AI suggestion:", suggestion)
    alert(`Task "${suggestion.title}" would be created with AI-generated details!`)
  }

  return (
    <Card className={`glass ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Task Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="space-y-3 p-4 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-balance">{suggestion.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 text-pretty">{suggestion.description}</p>
              </div>
              <Badge variant="outline" className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                {suggestion.priority}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{suggestion.estimatedTime}</span>
              </div>
              {suggestion.suggestedAssignee && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{suggestion.suggestedAssignee}</span>
                </div>
              )}
            </div>

            <div className="p-2 bg-muted/30 rounded text-xs text-muted-foreground">
              <strong>AI Reasoning:</strong> {suggestion.reasoning}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs glass bg-transparent"
              onClick={() => handleCreateTask(suggestion)}
            >
              <Plus className="w-3 h-3 mr-1" />
              Create Task
            </Button>
          </div>
        ))}

        <Button variant="outline" className="w-full glass bg-transparent">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate More Suggestions
        </Button>
      </CardContent>
    </Card>
  )
}
