"use client"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { ResumeReport } from "@/components/resume-report"
import { AIFeedback } from "@/components/ai-feedback"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, MessageSquare } from "lucide-react"

export default function ResumeAnalysisPage() {
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
                <a href="/resumes">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Resumes
                </a>
              </Button>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-balance">Resume Analysis Results</h1>
              <p className="text-muted-foreground text-pretty">
                Comprehensive analysis of your Software Engineer Resume with actionable insights and recommendations.
              </p>
            </div>

            {/* Analysis Tabs */}
            <Tabs defaultValue="report" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="report" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Visual Report</span>
                </TabsTrigger>
                <TabsTrigger value="feedback" className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>AI Feedback</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="report" className="mt-6">
                <ResumeReport />
              </TabsContent>

              <TabsContent value="feedback" className="mt-6">
                <AIFeedback />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
