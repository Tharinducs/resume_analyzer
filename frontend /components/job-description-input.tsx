"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/file-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Type, Zap, CheckCircle } from "lucide-react"

interface JobDescriptionInputProps {
  onAnalyze: (jobDescription: string, keywords: string[]) => void
}

export function JobDescriptionInput({ onAnalyze }: JobDescriptionInputProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([])
  const [aiSummary, setAiSummary] = useState("")

  const handleTextAnalysis = async () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate keyword extraction and analysis
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Mock extracted keywords
          setExtractedKeywords([
            "React",
            "TypeScript",
            "Node.js",
            "AWS",
            "Leadership",
            "Agile",
            "REST APIs",
            "PostgreSQL",
            "Docker",
            "CI/CD",
            "Team Management",
            "Problem Solving",
          ])
          setAiSummary(
            "This role emphasizes full-stack development with modern technologies, requiring strong leadership skills and experience with cloud infrastructure. The position values collaborative team work and agile methodologies.",
          )
          setIsAnalyzing(false)
          return 100
        }
        return prev + 10
      })
    }, 150)
  }

  const handleFileUpload = async (file: File) => {
    // Simulate PDF parsing
    setJobDescription(
      `Senior Full Stack Developer

We are seeking an experienced Senior Full Stack Developer to join our growing engineering team. The ideal candidate will have 5+ years of experience building scalable web applications using modern technologies.

Key Responsibilities:
• Lead development of complex web applications using React and TypeScript
• Design and implement RESTful APIs using Node.js and Express
• Collaborate with cross-functional teams in an Agile environment
• Mentor junior developers and conduct code reviews
• Deploy and maintain applications on AWS infrastructure
• Implement CI/CD pipelines and automated testing

Required Skills:
• 5+ years of experience with React and modern JavaScript/TypeScript
• Strong backend development experience with Node.js
• Experience with PostgreSQL or similar relational databases
• Proficiency with AWS services (EC2, S3, RDS, Lambda)
• Experience with Docker and containerization
• Knowledge of CI/CD tools and practices
• Strong problem-solving and communication skills
• Experience leading development teams

Preferred Qualifications:
• Experience with microservices architecture
• Knowledge of GraphQL
• Familiarity with monitoring and logging tools
• Bachelor's degree in Computer Science or related field`,
    )
  }

  const handleAnalyze = () => {
    onAnalyze(jobDescription, extractedKeywords)
  }

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
                <Button onClick={handleTextAnalysis} disabled={!jobDescription.trim() || isAnalyzing}>
                  <Zap className="mr-2 h-4 w-4" />
                  Extract Keywords
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <FileUpload
            onFileUpload={handleFileUpload}
            onFileRemove={() => setJobDescription("")}
            acceptedFileTypes={[".pdf"]}
          />
        </TabsContent>
      </Tabs>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="font-medium">Analyzing job description...</p>
                  <p className="text-sm text-muted-foreground">Extracting keywords and requirements</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analysis Progress</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Extracted Keywords */}
      {extractedKeywords.length > 0 && !isAnalyzing && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Extracted Keywords</span>
              </CardTitle>
              <CardDescription>Key skills and requirements identified from the job description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {extractedKeywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
              <CardDescription>What this job values most</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{aiSummary}</p>
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
                <Button onClick={handleAnalyze} size="lg">
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
