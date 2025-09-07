import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectTabs } from "@/components/projects/project-tabs"
import { ProjectMembers } from "@/components/projects/project-members"
import { ProjectAIInsights } from "@/components/projects/project-ai-insights"
import { AITaskSuggestions } from "@/components/ai/ai-task-suggestions"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        <ProjectHeader projectId={params.id} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ProjectTabs projectId={params.id} />
          </div>
          <div className="space-y-6">
            <ProjectMembers projectId={params.id} />
            <ProjectAIInsights projectId={params.id} />
            <AITaskSuggestions projectId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
