"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { JobDescriptionInput } from "@/components/job-description-input"
import { ResumeJobMatch } from "@/components/resume-job-match"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function JobAnalyzerPage() {
  const [analysisStep, setAnalysisStep] = useState<"input" | "analysis">("input")
  const [jobDescription, setJobDescription] = useState("")
  const [jobKeywords, setJobKeywords] = useState<string[]>([])

  const handleAnalyze = (description: string, keywords: string[]) => {
    setJobDescription(description)
    setJobKeywords(keywords)
    setAnalysisStep("analysis")
  }

  const handleBack = () => {
    setAnalysisStep("input")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="w-64 flex-shrink-0" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              {analysisStep === "analysis" ? (
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Job Input
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <a href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </a>
                </Button>
              )}
            </div>

            {/* Content */}
            {analysisStep === "input" ? (
              <JobDescriptionInput onAnalyze={handleAnalyze} />
            ) : (
              <ResumeJobMatch jobDescription={jobDescription} jobKeywords={jobKeywords} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
