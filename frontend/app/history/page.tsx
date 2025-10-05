"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Search,
  Calendar,
  FileText,
  Briefcase,
  BarChart3,
  MoreVertical,
  Download,
  Eye,
  Trash2,
  RefreshCw,
  TrendingUp,
  Clock,
} from "lucide-react"

interface HistoryItem {
  id: string
  type: "resume" | "job" | "portfolio"
  title: string
  description: string
  score?: number
  date: string
  status: "completed" | "processing" | "failed"
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const historyItems: HistoryItem[] = [
    {
      id: "1",
      type: "resume",
      title: "Software Engineer Resume",
      description: "Resume analysis with ATS optimization",
      score: 87,
      date: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "job",
      title: "Senior Frontend Developer",
      description: "Job match analysis for React position",
      score: 73,
      date: "1 day ago",
      status: "completed",
    },
    {
      id: "3",
      type: "portfolio",
      title: "GitHub Portfolio Review",
      description: "Analysis of GitHub profile and repositories",
      score: 91,
      date: "2 days ago",
      status: "completed",
    },
    {
      id: "4",
      type: "resume",
      title: "Full Stack Developer Resume",
      description: "Resume optimization for startup role",
      score: 94,
      date: "3 days ago",
      status: "completed",
    },
    {
      id: "5",
      type: "job",
      title: "Product Manager Position",
      description: "Job compatibility analysis",
      date: "1 week ago",
      status: "processing",
    },
    {
      id: "6",
      type: "portfolio",
      title: "LinkedIn Profile Analysis",
      description: "Professional network optimization",
      score: 82,
      date: "1 week ago",
      status: "completed",
    },
    {
      id: "7",
      type: "resume",
      title: "Backend Engineer Resume",
      description: "Technical resume review",
      date: "2 weeks ago",
      status: "failed",
    },
  ]

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || item.type === activeTab
    return matchesSearch && matchesTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "resume":
        return <FileText className="h-4 w-4" />
      case "job":
        return <Briefcase className="h-4 w-4" />
      case "portfolio":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getScoreColor = (score?: number) => {
    if (!score) return "text-muted-foreground"
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const handleAction = (action: string, itemId: string) => {
    console.log(`${action} item ${itemId}`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </a>
              </Button>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-balance">Analysis History</h1>
              <p className="text-muted-foreground text-pretty">
                View and manage your past resume analyses, job matches, and portfolio reviews.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center justify-between space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search analyses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="resume">Resumes</TabsTrigger>
                  <TabsTrigger value="job">Jobs</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">
                        {historyItems.filter((item) => item.type === "resume").length}
                      </div>
                      <div className="text-xs text-muted-foreground">Resume Analyses</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">
                        {historyItems.filter((item) => item.type === "job").length}
                      </div>
                      <div className="text-xs text-muted-foreground">Job Matches</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">
                        {historyItems.filter((item) => item.type === "portfolio").length}
                      </div>
                      <div className="text-xs text-muted-foreground">Portfolio Reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          historyItems.filter((item) => item.score).reduce((acc, item) => acc + (item.score || 0), 0) /
                            historyItems.filter((item) => item.score).length,
                        )}
                        %
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* History List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Your analysis history and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-muted/50 hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-background p-2 rounded-lg">{getTypeIcon(item.type)}</div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{item.title}</h4>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{item.date}</span>
                            </div>
                            {item.score && (
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3" />
                                <span className={getScoreColor(item.score)}>Score: {item.score}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-3 w-3" />
                            View
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {item.status === "completed" && (
                              <>
                                <DropdownMenuItem onClick={() => handleAction("view", item.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("download", item.id)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Report
                                </DropdownMenuItem>
                              </>
                            )}
                            {item.status === "failed" && (
                              <DropdownMenuItem onClick={() => handleAction("retry", item.id)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retry Analysis
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleAction("delete", item.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No analyses found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? "Try adjusting your search terms"
                        : "Start by uploading a resume or analyzing a job"}
                    </p>
                    <Button asChild>
                      <a href="/resumes/upload">Get Started</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
