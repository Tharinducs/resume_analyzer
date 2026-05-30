"use client"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useGetDashboardDataQuery } from "@/features/dashboard/apiSlice"
import { DashboardStats } from "@/components/dashboard-stats"
import { QuickActions } from "@/components/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, FileText, TrendingUp } from "lucide-react"
import DashboardWelcome from "./dashbord-welcome"
import { RecentActivityItem, ResumeImprovement } from "@/types/dashboard"
import { useEffect } from "react"
import { hideLoader, showLoader } from "@/features/common/loaderSlice"

function getActivityBadgeVariant(status: RecentActivityItem["status"]): "default" | "secondary" | "destructive" {
  if (status === "analyzed" || status === "processed") return "default"
  if (status === "failed") return "destructive"
  return "secondary"
}

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function ResumeImprovementSection({ improvement }: Readonly<{ improvement: ResumeImprovement }>) {
  if (!improvement) {
    return (
      <p className="text-sm text-muted-foreground">No analysis data yet. Analyze a resume to see improvement metrics.</p>
    )
  }

  const metrics = [
    { label: "ATS Compatibility", value: improvement.atsScore },
    { label: "Job Match Rate", value: improvement.jobMatchScore },
    { label: "Overall Score", value: improvement.overallScore },
  ]

  return (
    <div className="space-y-4">
      {improvement.resumeTitle && (
        <p className="text-xs text-muted-foreground">Based on: <span className="font-medium">{improvement.resumeTitle}</span></p>
      )}
      {metrics.map((m) => (
        <div key={m.label} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{m.label}</span>
            <span className="font-medium">{m.value ?? "—"}%</span>
          </div>
          <Progress value={m.value ?? 0} className="h-2" />
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user) as { _id?: string } | null
  const userId = user?._id ?? ""

  const { data, isLoading } = useGetDashboardDataQuery(
    { userId },
    { skip: !userId }
  )

  const dispatch = useDispatch();

  const recentActivity = data?.recentActivity ?? []

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    }else {
      dispatch(hideLoader())
    }
  },[isLoading])

  return (
    <>
      <DashboardWelcome />

      <DashboardStats stats={data?.stats} isLoading={isLoading} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest resume and job analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <p className="text-sm text-muted-foreground">Loading activity…</p>
            )}
            {!isLoading && recentActivity.length === 0 && (
              <p className="text-sm text-muted-foreground">No recent activity yet.</p>
            )}
            {recentActivity.map((activity) => (
              <div key={activity._id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 mt-1">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <Badge variant={getActivityBadgeVariant(activity.status)} className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                  {activity.score !== null && (
                    <p className="text-xs text-muted-foreground mt-1">Score: {activity.score}%</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(activity.updatedAt)}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Resume Improvement</span>
            </CardTitle>
            <CardDescription>Track your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading
              ? <p className="text-sm text-muted-foreground">Loading…</p>
              : <ResumeImprovementSection improvement={data?.resumeImprovement ?? null} />
            }
          </CardContent>
        </Card>
      </div>
    </>
  )
}
