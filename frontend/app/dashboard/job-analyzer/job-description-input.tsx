"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/file-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Type, Zap, CheckCircle, Loader2 } from "lucide-react"
import { useExtractJobKeywordsMutation } from "@/features/jobAnalyzer/apiSlice"
import { ExtractedKeyword, JobKeywordExtractionResult } from "@/types/jobAnalyzer"
import { useToast } from "@/hooks/use-toast"

interface JobDescriptionInputProps {
  onAnalyze: (result: JobKeywordExtractionResult) => void;
}

function importanceBadgeClass(importance: ExtractedKeyword["importance"]): string {
  if (importance === "high") return "border-red-500 text-red-500";
  if (importance === "medium") return "border-yellow-500 text-yellow-500";
  return "border-green-500 text-green-500";
}

export function JobDescriptionInput({ onAnalyze }: Readonly<JobDescriptionInputProps>) {
  const [jobDescription, setJobDescription] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [result, setResult] = useState<JobKeywordExtractionResult | null>(null)
  const [fakeProgress, setFakeProgress] = useState(0)
  const keywordRef = useRef<HTMLDivElement>(null)

  const [extractKeywords, { isLoading }] = useExtractJobKeywordsMutation()
  const { toast } = useToast()

  useEffect(() => {
    if (result && keywordRef.current) {
      keywordRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [result])

  const runExtraction = async (body: FormData | { text: string }) => {
    setResult(null)
    setFakeProgress(0)

    const interval = setInterval(() => {
      setFakeProgress((p) => (p < 85 ? p + 8 : p))
    }, 300)

    try {
      const data = await extractKeywords(body).unwrap()
      clearInterval(interval)
      setFakeProgress(100)
      setResult(data)
    } catch {
      clearInterval(interval)
      setFakeProgress(0)
      toast({ title: "Extraction failed", description: "Could not extract keywords. Please try again.", variant: "destructive" })
    }
  }

  const handleTextExtract = async () => {
    if (!jobDescription.trim()) return
    await runExtraction({ text: jobDescription })
  }

  const handleFileExtract = async () => {
    if (!uploadedFile) return
    const formData = new FormData()
    formData.append("file", uploadedFile)
    await runExtraction(formData)
  }

  const keywords = result?.keywords ?? []
  const groupedKeywords = result
    ? {
        high: keywords.filter((k) => k.importance === "high"),
        medium: keywords.filter((k) => k.importance === "medium"),
        low: keywords.filter((k) => k.importance === "low"),
      }
    : null

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Job Description Analysis</h2>
        <p className="text-muted-foreground">
          Paste a job description or upload a PDF to extract key requirements and match with your resume.
        </p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="flex items-center space-x-2">
            <Type className="h-4 w-4" />
            <span>Paste Text</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Upload PDF</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Paste the complete job description below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{jobDescription.length} characters</span>
                <Button onClick={handleTextExtract} disabled={!jobDescription.trim() || isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                  Extract Keywords
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <FileUpload
            uploadedFile={uploadedFile}
            setUploadedFile={(file) => { setUploadedFile(file); setResult(null) }}
            onFileRemove={() => { setUploadedFile(null); setResult(null) }}
            acceptedFileTypes={[".pdf"]}
          />
          {uploadedFile && (
            <div className="flex justify-end">
              <Button onClick={handleFileExtract} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                Extract Keywords
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Progress bar while loading */}
      {isLoading && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="font-medium">Analyzing job description…</p>
                  <p className="text-sm text-muted-foreground">Extracting keywords and requirements</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analysis Progress</span>
                  <span>{fakeProgress}%</span>
                </div>
                <Progress value={fakeProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && !isLoading && groupedKeywords && (
        <div ref={keywordRef} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Extracted Keywords</span>
              </CardTitle>
              <CardDescription>
                {keywords.length} keywords found
                {result.yearsOfExperience ? ` · ${result.yearsOfExperience} years exp. required` : ""}
                {result.education.length > 0 ? ` · ${result.education.join(", ")}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(["high", "medium", "low"] as const).map((level) => (
                groupedKeywords[level].length > 0 && (
                  <div key={level}>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">{level} priority</p>
                    <div className="flex flex-wrap gap-2">
                      {groupedKeywords[level].map((kw) => (
                        <Badge key={kw.keyword} variant="outline" className={`text-sm ${importanceBadgeClass(kw.importance)}`}>
                          {kw.keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
              <CardDescription>What this job values most</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{result.aiSummary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Ready to Compare?</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare this job description with your resume to see how well you match.
                  </p>
                </div>
                <Button onClick={() => onAnalyze(result)} size="lg">
                  <Zap className="mr-2 h-4 w-4" />
                  Compare with Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
