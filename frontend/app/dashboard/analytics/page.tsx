import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { TaskCompletionChart } from "@/components/analytics/task-completion-chart"
import { WorkloadDistributionChart } from "@/components/analytics/workload-distribution-chart"
import { ProjectStatusChart } from "@/components/analytics/project-status-chart"
import { NotificationsPanel } from "@/components/analytics/notifications-panel"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { AIInsightsCard } from "@/components/ai/ai-insights-card"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your team's performance and project progress
          </p>
        </div>

        {/* Overview Metrics */}
        <AnalyticsOverview />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskCompletionChart />
          <WorkloadDistributionChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProjectStatusChart />
          <PerformanceMetrics />
          <div className="space-y-6">
            <AIInsightsCard />
            <NotificationsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
