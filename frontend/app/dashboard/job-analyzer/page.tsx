"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { JobDescriptionInput } from "@/app/dashboard/job-analyzer/job-description-input"
import { ResumeJobMatch } from "@/app/dashboard/job-analyzer/resume-job-match"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileUpload } from "@/components/file-upload"
import { ArrowLeft, ChevronDown, ChevronUp, FileText, Loader2, Plus, CheckCircle, Clock, X } from "lucide-react"
import { JobKeywordExtractionResult, JobMatchResult, PendingComparison } from "@/types/jobAnalyzer"
import { useGetResumesListByUserQuery, useUploadFileMutation } from "@/features/resume/apiSlice"
import {
  useMatchResumeWithJobMutation,
  useGetPendingComparisonsQuery,
  useAddPendingComparisonMutation,
  useRemovePendingComparisonMutation,
} from "@/features/jobAnalyzer/apiSlice"
import { useToast } from "@/hooks/use-toast"
import { get } from "lodash"
import moment from "moment"
import { sendPushNotification } from "@/utils/pushNotifications"
import { isSelectableStatus, notSelectableHint, statusBadgeVariant } from "./utility"

type Step = "input" | "select-resume" | "analysis"



export default function JobAnalyzerPage() {
  const user = useSelector((state: RootState) => state.auth.user) as { _id?: string; notifications?: { jobMatch?: boolean } } | null
  const userId = user?._id ?? ""
  const pushJobMatch = user?.notifications?.jobMatch ?? true

  const [step, setStep] = useState<Step>("input")
  const [extractionResult, setExtractionResult] = useState<JobKeywordExtractionResult | null>(null)
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null)
  const [matchingResumeId, setMatchingResumeId] = useState<string | null>(null)
  const [comparingPendingId, setComparingPendingId] = useState<string | null>(null)

  // Upload new resume state
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [newResumeFile, setNewResumeFile] = useState<File | null>(null)
  const [newResumeTitle, setNewResumeTitle] = useState("")
  const [titleError, setTitleError] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const { data: resumeData, isLoading: isLoadingResumes } = useGetResumesListByUserQuery(
    { userId, limit: 20 },
    { skip: !userId || step !== "select-resume" }
  )
  const { data: pendingData } = useGetPendingComparisonsQuery(undefined, { skip: !userId || step !== "input" })
  const [matchResume] = useMatchResumeWithJobMutation()
  const [addPending] = useAddPendingComparisonMutation()
  const [removePending] = useRemovePendingComparisonMutation()
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation()
  const { toast } = useToast()

  const handleAnalyze = (result: JobKeywordExtractionResult) => {
    setExtractionResult(result)
    setStep("select-resume")
  }

  const handleSelectResume = async (resumeId: string, status: string) => {
    if (!extractionResult || !isSelectableStatus(status)) return
    setMatchingResumeId(resumeId)
    try {
      const data = await matchResume({
        jobAnalysisId: extractionResult.jobAnalysisId,
        resumeId,
      }).unwrap()
      setMatchResult(data.matchResult)
      setStep("analysis")
      if (pushJobMatch) {
        sendPushNotification("Job Match Complete", `Score: ${data.matchResult.overallScore}% — ${data.matchResult.matchLabel}`)
      }
    } catch {
      toast({ title: "Match failed", description: "Could not compare resume with job. Please try again.", variant: "destructive" })
    } finally {
      setMatchingResumeId(null)
    }
  }

  const handleUploadNewResume = async () => {
    if (!newResumeFile || !newResumeTitle.trim() || !extractionResult) return
    try {
      const result = await uploadFile({
        file: newResumeFile,
        userId,
        title: newResumeTitle.trim(),
      }).unwrap()
      const code = get(result, "code", "")
      if (code !== "UPLOAD_SUC") throw new Error("Upload failed")
      const resumeId = get(result, "resume._id", "")
      const resumeTitle = newResumeTitle.trim()
      if (resumeId) {
        await addPending({
          jobAnalysisId: extractionResult.jobAnalysisId,
          jobTitle: extractionResult.title,
          resumeId,
          resumeTitle,
        }).unwrap()
      }
      setUploadSuccess(true)
      setNewResumeFile(null)
      setNewResumeTitle("")
      toast({
        title: "Resume uploaded",
        description: "Text extraction is running. Once status shows 'processed' you can select it for comparison.",
        duration: 6000,
      })
    } catch {
      toast({ title: "Upload failed", description: "Could not upload resume. Please try again.", variant: "destructive" })
    }
  }

  const handleComparePending = async (pending: PendingComparison) => {
    setComparingPendingId(pending._id)
    try {
      const data = await matchResume({
        jobAnalysisId: pending.jobAnalysisId,
        resumeId: pending.resumeId,
      }).unwrap()
      setMatchResult(data.matchResult)
      setExtractionResult({ jobAnalysisId: pending.jobAnalysisId, title: pending.jobTitle } as JobKeywordExtractionResult)
      setStep("analysis")
      if (pushJobMatch) {
        sendPushNotification("Job Match Complete", `Score: ${data.matchResult.overallScore}% — ${data.matchResult.matchLabel}`)
      }
    } catch {
      toast({ title: "Match failed", description: "Could not compare resume with job. Please try again.", variant: "destructive" })
    } finally {
      setComparingPendingId(null)
    }
  }

  const handleDiscardPending = async (id: string) => {
    try {
      await removePending(id).unwrap()
    } catch {
      toast({ title: "Error", description: "Could not discard. Please try again.", variant: "destructive" })
    }
  }

  const handleBack = () => {
    if (step === "analysis") setStep("select-resume")
    else if (step === "select-resume") setStep("input")
  }

  const resumes = resumeData?.resumes ?? []
  const pendingMatches: PendingComparison[] = pendingData?.pending ?? []

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        {step !== "input" ? (
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === "analysis" ? "Back to Resume Selection" : "Back to Job Input"}
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

      {step === "input" && pendingMatches.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-yellow-500" />
              Pending Comparisons
            </CardTitle>
            <CardDescription>
              These resumes were uploaded during a previous session but never matched. Compare or discard them.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingMatches.map((pending) => {
              const isComparing = comparingPendingId === pending._id
              return (
                <div
                  key={pending._id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-muted/30"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{pending.resumeTitle}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      for <span className="font-medium">{pending.jobTitle}</span>
                      {" · "}
                      {moment(pending.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={comparingPendingId !== null}
                      onClick={() => handleComparePending(pending)}
                    >
                      {isComparing
                        ? <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Comparing…</>
                        : "Compare Now"
                      }
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                      disabled={comparingPendingId !== null}
                      onClick={() => handleDiscardPending(pending._id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {step === "input" && (
        <JobDescriptionInput onAnalyze={handleAnalyze} />
      )}

      {step === "select-resume" && extractionResult && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Select a Resume to Compare</h2>
            <p className="text-muted-foreground">
              Choose which of your resumes to match against{" "}
              <span className="font-medium">{extractionResult.title}</span>.
            </p>
          </div>

          {isLoadingResumes && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoadingResumes && resumes.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {resumes.map((resume) => {
                const isMatching = matchingResumeId === resume._id
                const anyMatching = matchingResumeId !== null
                const canSelect = isSelectableStatus(resume.status)

                return (
                  <Card
                    key={resume._id}
                    className={`transition-all border-2 ${
                      canSelect && !anyMatching
                        ? "cursor-pointer hover:border-primary"
                        : "cursor-not-allowed opacity-60"
                    } ${isMatching ? "border-primary" : "border-transparent"}`}
                    onClick={() => handleSelectResume(resume._id, resume.status)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{resume.title}</CardTitle>
                        <Badge variant={statusBadgeVariant(resume.status)} className="shrink-0 text-xs">
                          {resume.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        Updated {moment(resume.updatedAt).fromNow()}
                        {!canSelect && (
                          <span className="ml-2 text-yellow-600">{notSelectableHint(resume.status)}</span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{resume.fileType ?? "PDF"} · {resume.size}</span>
                      </div>
                      {isMatching
                        ? <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        : <Button size="sm" variant="outline" disabled={!canSelect || anyMatching}>Compare</Button>
                      }
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {!isLoadingResumes && resumes.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium">No resumes found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a resume below to get started.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Upload new resume section */}
          <div className="border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setShowUploadForm((v) => !v)
                setUploadSuccess(false)
              }}
              className="w-full flex items-center justify-between px-5 py-4 bg-muted/40 hover:bg-muted/60 transition-colors text-left"
            >
              <div className="flex items-center gap-2 font-medium text-sm">
                <Plus className="h-4 w-4 text-primary" />
                Upload a New Resume
              </div>
              {showUploadForm
                ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                : <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </button>

            {showUploadForm && (
              <div className="p-5 space-y-4 bg-background">
                {uploadSuccess ? (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">Resume uploaded successfully</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Text extraction is underway. Once the status changes to <strong>processed</strong> it will be selectable for comparison.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="new-resume-title">Resume Title</Label>
                      <Input
                        id="new-resume-title"
                        value={newResumeTitle}
                        onChange={(e) => {
                          setNewResumeTitle(e.target.value)
                          if (titleError && e.target.value.trim()) setTitleError("")
                        }}
                        onBlur={(e) => {
                          if (!e.target.value.trim()) setTitleError("Title is required")
                        }}
                        placeholder="e.g. Senior Developer CV 2024"
                        className={titleError ? "border-red-500" : ""}
                      />
                      {titleError && <p className="text-xs text-red-500">{titleError}</p>}
                    </div>

                    <FileUpload
                      uploadedFile={newResumeFile}
                      setUploadedFile={setNewResumeFile}
                      onFileRemove={() => setNewResumeFile(null)}
                      acceptedFileTypes={[".pdf", ".doc", ".docx"]}
                    />

                    <Separator />

                    <div className="flex justify-end">
                      <Button
                        onClick={handleUploadNewResume}
                        disabled={!newResumeFile || !newResumeTitle.trim() || isUploading}
                      >
                        {isUploading
                          ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading…</>
                          : "Upload & Add to List"
                        }
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {step === "analysis" && matchResult && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Match Results</h2>
          <p className="text-muted-foreground">
            <span className="font-medium">{matchResult.resumeTitle}</span> vs{" "}
            <span className="font-medium">{extractionResult?.title}</span>
          </p>
          <ResumeJobMatch matchResult={matchResult} />
        </div>
      )}
    </div>
  )
}
