import { ProjectGrid } from "@/components/projects/project-grid"
import { ProjectStats } from "@/components/projects/project-stats"
import { CreateProjectButton } from "@/components/projects/create-project-button"
import { AIInsightsCard } from "@/components/ai/ai-insights-card"
import { NotificationsPanel } from "@/components/analytics/notifications-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Project Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage and track your projects with AI-powered insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="glass bg-transparent">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </Link>
            <CreateProjectButton />
          </div>
        </div>

        {/* Stats and Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-2">
            <ProjectStats />
          </div>
          <div className="xl:col-span-1">
            <AIInsightsCard />
          </div>
          <div className="xl:col-span-1">
            <NotificationsPanel />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10 glass" />
          </div>
          <Button variant="outline" className="glass bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Projects Grid */}
        <ProjectGrid />
      </div>
    </div>
  )
}
