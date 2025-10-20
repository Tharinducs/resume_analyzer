"use client"
import { ResumeReport } from "@/components/resume-report"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ReportsPage() {
  return (
    <>
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

        <ResumeReport />
      </div>
    </>
  )
}
