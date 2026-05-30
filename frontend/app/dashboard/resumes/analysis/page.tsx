"use client"
import { ResumeReport } from "./report/resume-report"
import { AIFeedback } from "./feedback/ai-feedback"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, MessageSquare } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useGetAnalysisResultQuery } from "@/features/analysis/apiSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { hideLoader, showLoader } from "@/features/common/loaderSlice"
import Link from "next/link"
import { get } from "lodash"

export default function ResumeAnalysisPage() {
  const searchParams = useSearchParams();
  // Trim to a valid 24-char MongoDB ObjectId — guards against any share-link
  // concatenation that could append extra text to the query param value.
  const rawAnalysisId = searchParams.get("analysisId") ?? "";
  const anlysisId = rawAnalysisId.slice(0, 24);
  const resumeId = searchParams.get("resumeId");
  const { data: analysisResult, isLoading } = useGetAnalysisResultQuery(
    { analysisId: anlysisId },
    { skip: anlysisId.length !== 24 },
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading]);

  console.log("Analysis Result:", analysisResult);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/resumes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resumes
          </Link>
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
          <ResumeReport analysisResult={get(analysisResult, "analysis", undefined)} />
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <AIFeedback
            analysisId={anlysisId!}
            total={get(analysisResult, "analysis.scores.overall", 0)}
            aiFeedback={get(analysisResult, "analysis.aiFeedback", [])}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
