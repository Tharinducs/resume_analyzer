import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Upload, Search, MoreVertical, FileText, Calendar, TrendingUp, Download, Eye, Trash2 } from "lucide-react"

export default function ResumesPage() {
  const resumes = [
    {
      id: 1,
      name: "Software Engineer Resume",
      lastModified: "2 hours ago",
      score: 87,
      status: "analyzed",
      fileType: "PDF",
      size: "245 KB",
    },
    {
      id: 2,
      name: "Frontend Developer Resume",
      lastModified: "1 day ago",
      score: 73,
      status: "analyzed",
      fileType: "DOCX",
      size: "189 KB",
    },
    {
      id: 3,
      name: "Full Stack Resume v2",
      lastModified: "3 days ago",
      score: 94,
      status: "analyzed",
      fileType: "PDF",
      size: "267 KB",
    },
    {
      id: 4,
      name: "Product Manager Resume",
      lastModified: "1 week ago",
      score: 0,
      status: "processing",
      fileType: "PDF",
      size: "198 KB",
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "analyzed":
        return <Badge variant="default">Analyzed</Badge>
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      default:
        return <Badge variant="outline">Draft</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-balance">Resume Library</h1>
                <p className="text-muted-foreground text-pretty">
                  Manage and analyze your resumes with AI-powered insights.
                </p>
              </div>
              <Button asChild>
                <a href="/resumes/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </a>
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search resumes..." className="pl-10" />
              </div>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="analyzed">Analyzed</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Resume Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <Card key={resume.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base truncate">{resume.name}</CardTitle>
                          <CardDescription className="flex items-center space-x-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{resume.lastModified}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Score:</span>
                        {resume.status === "analyzed" ? (
                          <span className={`font-semibold ${getScoreColor(resume.score)}`}>{resume.score}%</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                      {getStatusBadge(resume.status)}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{resume.fileType}</span>
                      <span>{resume.size}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="mr-2 h-3 w-3" />
                        View
                      </Button>
                      {resume.status === "analyzed" && (
                        <Button size="sm" className="flex-1">
                          <TrendingUp className="mr-2 h-3 w-3" />
                          Analyze
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State for when no resumes */}
            {resumes.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload your first resume to get started with AI analysis.
                  </p>
                  <Button asChild>
                    <a href="/resumes/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
