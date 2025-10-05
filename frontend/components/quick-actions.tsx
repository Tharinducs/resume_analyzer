import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Search, Briefcase, History, BarChart3 } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Upload Resume",
      description: "Analyze a new resume with AI",
      icon: Upload,
      href: "/resumes/upload",
      primary: true,
    },
    {
      title: "Paste Job Description",
      description: "Compare with your resume",
      icon: Search,
      href: "/job-analyzer",
      primary: true,
    },
    {
      title: "View Reports",
      description: "See detailed analysis",
      icon: BarChart3,
      href: "/reports",
      primary: false,
    },
    {
      title: "Portfolio Review",
      description: "Analyze your online presence",
      icon: Briefcase,
      href: "/portfolio",
      primary: false,
    },
    {
      title: "Resume Library",
      description: "Manage your resumes",
      icon: FileText,
      href: "/resumes",
      primary: false,
    },
    {
      title: "Analysis History",
      description: "View past results",
      icon: History,
      href: "/history",
      primary: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with analyzing your resume and job opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant={action.primary ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start space-y-2 text-left"
                asChild
              >
                <a href={action.href}>
                  <div className="flex items-center space-x-2 w-full">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                    </div>
                  </div>
                </a>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
