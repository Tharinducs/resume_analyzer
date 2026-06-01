"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Target, FileText, Briefcase } from "lucide-react"
import { JobMatchResult, JobKeyword, ResumeKeyword } from "@/types/jobAnalyzer"

interface ResumeJobMatchProps {
  matchResult: JobMatchResult;
}

function importanceClass(importance: string): string {
  if (importance === "high") return "border-red-500 text-red-500";
  if (importance === "medium") return "border-yellow-500 text-yellow-500";
  return "border-green-500 text-green-500";
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
}

export function ResumeJobMatch({ matchResult }: Readonly<ResumeJobMatchProps>) {
  const { overallScore, matchLabel, matchDescription, resumeKeywords, jobKeywords, missingSkills, strongMatches, suggestions } = matchResult;

  return (
    <div className="space-y-6">
      {/* Overall Match Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Overall Job Match</span>
          </CardTitle>
          <CardDescription>How well your resume matches this job description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-muted stroke-current" strokeWidth="3" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className={`${scoreColor(overallScore)} stroke-current`} strokeWidth="3"
                  strokeDasharray={`${overallScore}, 100`} strokeLinecap="round" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${scoreColor(overallScore)}`}>{overallScore}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{matchLabel}</h3>
              <p className="text-sm text-muted-foreground">{matchDescription}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-500">{strongMatches.length}</div>
              <div className="text-sm text-muted-foreground">Strong Matches</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-yellow-500">{missingSkills.length}</div>
              <div className="text-sm text-muted-foreground">Missing Skills</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-500">{suggestions.length}</div>
              <div className="text-sm text-muted-foreground">Suggestions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
          <TabsTrigger value="missing">Missing Skills</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Your Resume Keywords</span>
                </CardTitle>
                <CardDescription>Skills and keywords found in your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {resumeKeywords.map((item: ResumeKeyword) => (
                  <div key={item.keyword} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {item.matched
                        ? <CheckCircle className="h-4 w-4 text-green-500" />
                        : <XCircle className="h-4 w-4 text-red-500" />}
                      <span className="font-medium">{item.keyword}</span>
                    </div>
                    <Badge variant="outline" className={importanceClass(item.importance)}>{item.importance}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Job Requirements</span>
                </CardTitle>
                <CardDescription>Skills and keywords from the job description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {jobKeywords.map((item: JobKeyword) => (
                  <div key={item.keyword} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {item.found
                        ? <CheckCircle className="h-4 w-4 text-green-500" />
                        : <XCircle className="h-4 w-4 text-red-500" />}
                      <span className="font-medium">{item.keyword}</span>
                    </div>
                    <Badge variant="outline" className={importanceClass(item.importance)}>{item.importance}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="missing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span>Missing Skills</span>
              </CardTitle>
              <CardDescription>Key skills from the job description not found in your resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {missingSkills.length === 0
                ? <p className="text-sm text-green-600 font-medium">No critical missing skills — great coverage!</p>
                : (
                  <div className="grid gap-3 md:grid-cols-2">
                    {missingSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                )}
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Recommendations:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Add these skills to your resume if you have experience with them</li>
                  <li>• Consider online courses or certifications to gain missing skills</li>
                  <li>• Highlight transferable skills that demonstrate similar capabilities</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span>Improvement Suggestions</span>
              </CardTitle>
              <CardDescription>AI-powered recommendations to improve your job match</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestions.map((suggestion, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <div className="bg-blue-500/10 p-1 rounded-full mt-0.5">
                    <TrendingUp className="h-3 w-3 text-blue-500" />
                  </div>
                  <p className="text-sm leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
