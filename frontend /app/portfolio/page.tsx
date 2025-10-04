import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { GitHubAnalysis } from "@/components/github-analysis"
import { LinkedInAnalysis } from "@/components/linkedin-analysis"
import { PortfolioWebsiteAnalysis } from "@/components/portfolio-website-analysis"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Github, Linkedin, Globe } from "lucide-react"

export default function PortfolioPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
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
              <h1 className="text-3xl font-bold text-balance">Portfolio Analysis</h1>
              <p className="text-muted-foreground text-pretty">
                Analyze your online presence across GitHub, LinkedIn, and your portfolio website to showcase your
                professional brand.
              </p>
            </div>

            {/* Portfolio Analysis Tabs */}
            <Tabs defaultValue="github" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="github" className="flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </TabsTrigger>
                <TabsTrigger value="website" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Portfolio Website</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="github" className="mt-6">
                <GitHubAnalysis />
              </TabsContent>

              <TabsContent value="linkedin" className="mt-6">
                <LinkedInAnalysis />
              </TabsContent>

              <TabsContent value="website" className="mt-6">
                <PortfolioWebsiteAnalysis />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
