"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Briefcase, Clock, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useGetActivityHistoryQuery } from "@/features/dashboard/apiSlice"
import { RecentActivityItem } from "@/types/dashboard"
import moment from "moment"

const LIMIT = 10

function getActivityBadgeVariant(status: RecentActivityItem["status"]): "default" | "secondary" | "destructive" {
  if (status === "analyzed" || status === "processed") return "default"
  if (status === "failed") return "destructive"
  return "secondary"
}

export default function HistoryPage() {
  const user = useSelector((state: RootState) => state.auth.user) as { _id?: string } | null
  const userId = user?._id ?? ""
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching } = useGetActivityHistoryQuery(
    { userId, page, limit: LIMIT },
    { skip: !userId }
  )

  const items = data?.items ?? []
  const total = data?.total ?? 0
  const totalPages = data?.totalPages ?? 1

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <a href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </a>
        </Button>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Activity History</h1>
        <p className="text-muted-foreground">All your resume analyses and job matches in one place.</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                All Activity
              </CardTitle>
              <CardDescription className="mt-1">
                {isLoading ? "Loading…" : `${total} total item${total !== 1 ? "s" : ""}`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {(isLoading || isFetching) && items.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoading && items.length === 0 && (
            <div className="text-center py-16">
              <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium">No activity yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start by uploading a resume or running a job analysis.
              </p>
            </div>
          )}

          {items.map((item) => (
            <div
              key={String(item._id)}
              className={`flex items-start gap-3 p-4 rounded-lg border bg-muted/30 transition-opacity ${isFetching ? "opacity-60" : ""}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {item.type === "job"
                  ? <Briefcase className="h-4 w-4 text-orange-500" />
                  : <FileText className="h-4 w-4 text-muted-foreground" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge
                      variant="outline"
                      className={`text-xs ${item.type === "job" ? "border-orange-400 text-orange-500" : ""}`}
                    >
                      {item.type === "job" ? "Job" : "Resume"}
                    </Badge>
                    <Badge variant={getActivityBadgeVariant(item.status)} className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  {item.score !== null && (
                    <p className="text-xs text-muted-foreground">Score: <span className="font-medium">{item.score}%</span></p>
                  )}
                  <p className="text-xs text-muted-foreground">{moment(item.updatedAt).fromNow()}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || isFetching}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages || isFetching}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
