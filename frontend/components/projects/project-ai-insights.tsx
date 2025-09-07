"use client"

import { AIInsightsCard } from "@/components/ai/ai-insights-card"

interface ProjectAIInsightsProps {
  projectId: string
}

export function ProjectAIInsights({ projectId }: ProjectAIInsightsProps) {
  // Project-specific insights would be generated based on projectId
  const projectInsights = [
    {
      id: "1",
      type: "performance" as const,
      title: "Great Progress",
      description: "Project is 15% ahead of schedule. Team velocity is excellent.",
      priority: "low" as const,
      actionable: false,
    },
    {
      id: "2",
      type: "risk" as const,
      title: "Resource Alert",
      description: "Bob Smith has 3 overdue tasks. Consider redistributing workload.",
      priority: "high" as const,
      actionable: true,
    },
    {
      id: "3",
      type: "suggestion" as const,
      title: "Optimization Tip",
      description: "Consider breaking down 'Mobile Testing' task into smaller subtasks.",
      priority: "medium" as const,
      actionable: true,
    },
  ]

  return <AIInsightsCard insights={projectInsights} />
}
