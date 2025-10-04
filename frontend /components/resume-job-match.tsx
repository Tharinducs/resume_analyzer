"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Target, FileText, Briefcase } from "lucide-react"

interface MatchData {
  overallScore: number
  resumeKeywords: Array<{ keyword: string; matched: boolean; importance: "high" | "medium" | "low" }>
  jobKeywords: Array<{ keyword: string; found: boolean; importance: "high" | "medium" | "low" }>
  missingSkills: string[]
  strongMatches: string[]
  suggestions: string[]
}

interface ResumeJobMatchProps {
  jobDescription: string
  jobKeywords: string[]
}

export function ResumeJobMatch({ jobDescription, jobKeywords }: ResumeJobMatchProps) {
  const [matchData] = useState<MatchData>({
    overallScore: 73,
    resumeKeywords: [
      { keyword: "React", matched: true, importance: "high" },
      { keyword: "TypeScript", matched: true, importance: "high" },
      { keyword: "Node.js", matched: true, importance: "high" },
      { keyword: "JavaScript", matched: true, importance: "medium" },
      { keyword: "Python", matched: false, importance: "low" },
      { keyword: "PostgreSQL", matched: true, importance: "medium" },
      { keyword: "AWS", matched: false, importance: "high" },
      { keyword: "Docker", matched: true, importance: "medium" },
      { keyword: "Git", matched: true, importance: "low" },
      { keyword: "Agile", matched: false, importance: "medium" },
    ],
    jobKeywords: [
      { keyword: "React", found: true, importance: "high" },
      { keyword: "TypeScript", found: true, importance: "high" },
      { keyword: "Node.js", found: true, importance: "high" },
      { keyword: "AWS", found: false, importance: "high" },
      { keyword: "Leadership", found: false, importance: "high" },
      { keyword: "PostgreSQL", found: true, importance: "medium" },
      { keyword: "Docker", found: true, importance: "medium" },
      { keyword: "CI/CD", found: false, importance: "medium" },
      { keyword: "Agile", found: false, importance: "medium" },
      { keyword: "REST APIs", found: true, importance: "medium" },
    ],
    missingSkills: ["AWS", "Leadership", "CI/CD", "Agile", "Team Management"],
    strongMatches: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    suggestions: [
      "Add AWS certifications or cloud experience to your resume",
      "Highlight any leadership or mentoring experience you have",
      "Include specific examples of CI/CD pipeline implementation",
      "Mention experience with Agile methodologies and team collaboration",
      "Quantify your impact in previous roles with specific metrics",
    ],
  })

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "border-red-500 text-red-500"
      case "medium":
        return "border-yellow-500 text-yellow-500"
      case "low":
        return "border-green-500 text-green-500"
      default:
        return "border-gray-500 text-gray-500"
    }
  }

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
                <path
                  className="text-muted stroke-current"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${getScoreColor(matchData.overallScore)} stroke-current`}
                  strokeWidth="3"
                  strokeDasharray={`${matchData.overallScore}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${getScoreColor(matchData.overallScore)}`}>
                  {matchData.overallScore}%
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Good Match</h3>
              <p className="text-sm text-muted-foreground">
                Your resume shows strong alignment with this role, with room for improvement in a few key areas.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-500">{matchData.strongMatches.length}</div>
              <div className="text-sm text-muted-foreground">Strong Matches</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-yellow-500">{matchData.missingSkills.length}</div>
              <div className="text-sm text-muted-foreground">Missing Skills</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-500">{matchData.suggestions.length}</div>
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
            {/* Resume Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Your Resume Keywords</span>
                </CardTitle>
                <CardDescription>Skills and keywords found in your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {matchData.resumeKeywords.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {item.matched ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium">{item.keyword}</span>
                    </div>
                    <Badge variant="outline" className={getImportanceColor(item.importance)}>
                      {item.importance}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Job Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Job Requirements</span>
                </CardTitle>
                <CardDescription>Skills and keywords from the job description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {matchData.jobKeywords.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {item.found ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium">{item.keyword}</span>
                    </div>
                    <Badge variant="outline" className={getImportanceColor(item.importance)}>
                      {item.importance}
                    </Badge>
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
              <div className="grid gap-3 md:grid-cols-2">
                {matchData.missingSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20"
                  >
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Recommendations:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consider adding these skills to your resume if you have experience with them</li>
                  <li>• Look for online courses or certifications to gain these skills</li>
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
              {matchData.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20"
                >
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

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Next Steps</h3>
              <p className="text-sm text-muted-foreground">
                Generate a detailed report or get AI feedback to improve your resume.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button>
                <TrendingUp className="mr-2 h-4 w-4" />
                Get AI Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
