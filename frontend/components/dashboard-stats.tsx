import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FileText, Target, Award } from "lucide-react"
import { DashboardStats as DashboardStatsType } from "@/types/dashboard"

interface DashboardStatsProps {
  stats: DashboardStatsType | undefined;
  isLoading: boolean;
}

export function DashboardStats({ stats, isLoading }: Readonly<DashboardStatsProps>) {
  const lastResumeScore = stats?.lastResumeScore ?? null;
  const totalResumesAnalyzed = stats?.totalResumesAnalyzed ?? 0;
  const avgJobMatchRate = stats?.avgJobMatchRate ?? null;

  const items = [
    {
      title: "Last Resume Score",
      value: lastResumeScore !== null ? `${lastResumeScore}%` : "—",
      description: stats?.lastResumeTitle ?? "No resume analyzed yet",
      icon: Award,
      color: "text-green-500",
      progress: lastResumeScore,
    },
    {
      title: "Resumes Analyzed",
      value: isLoading ? "—" : String(totalResumesAnalyzed),
      description: `${stats?.totalResumes ?? 0} total uploaded`,
      icon: FileText,
      color: "text-blue-500",
      progress: null,
    },
    {
      title: "Avg Job Match Rate",
      value: avgJobMatchRate !== null ? `${avgJobMatchRate}%` : "—",
      description: "Across all analyses",
      icon: Target,
      color: "text-purple-500",
      progress: null,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
      {items.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? <span className="text-muted-foreground text-lg">Loading…</span> : stat.value}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              {stat.progress !== null && (
                <Progress value={stat.progress} className="mt-3 h-2" />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
