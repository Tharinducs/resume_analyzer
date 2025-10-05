"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { FileText, Download, Share, TrendingUp, Target, Award, CheckCircle, AlertTriangle } from "lucide-react"

const skillsRadarData = [
  { skill: "Technical Skills", current: 85, required: 90 },
  { skill: "Leadership", current: 65, required: 80 },
  { skill: "Communication", current: 78, required: 75 },
  { skill: "Problem Solving", current: 92, required: 85 },
  { skill: "Team Work", current: 70, required: 80 },
  { skill: "Innovation", current: 88, required: 85 },
]

const atsScoreData = [
  { category: "Format", score: 95 },
  { category: "Keywords", score: 73 },
  { category: "Structure", score: 88 },
  { category: "Content", score: 82 },
  { category: "Length", score: 90 },
]

const matchData = [
  { name: "Strong Match", value: 65, color: "#22c55e" },
  { name: "Partial Match", value: 25, color: "#eab308" },
  { name: "No Match", value: 10, color: "#ef4444" },
]

export function ResumeReport() {
  const overallScore = 87
  const atsScore = 86
  const jobMatchScore = 73

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log("Downloading PDF report...")
  }

  const handleShare = () => {
    // Simulate sharing functionality
    console.log("Sharing report...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Resume Analysis Report</h2>
          <p className="text-muted-foreground">Comprehensive analysis of your resume performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Executive Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${getScoreColor(overallScore)} stroke-current`}
                    strokeWidth="3"
                    strokeDasharray={`${overallScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Overall Score</h3>
                <p className="text-sm text-muted-foreground">Resume Quality</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${getScoreColor(atsScore)} stroke-current`}
                    strokeWidth="3"
                    strokeDasharray={`${atsScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${getScoreColor(atsScore)}`}>{atsScore}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">ATS Score</h3>
                <p className="text-sm text-muted-foreground">System Compatibility</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${getScoreColor(jobMatchScore)} stroke-current`}
                    strokeWidth="3"
                    strokeDasharray={`${jobMatchScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${getScoreColor(jobMatchScore)}`}>{jobMatchScore}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Job Match</h3>
                <p className="text-sm text-muted-foreground">Role Compatibility</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h4 className="font-semibold">Key Findings</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Strong technical skills alignment</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Excellent ATS compatibility</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Leadership experience needs emphasis</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Missing some key job requirements</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Skills vs Requirements</span>
          </CardTitle>
          <CardDescription>How your skills compare to job requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                <Radar
                  name="Your Skills"
                  dataKey="current"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Required"
                  dataKey="required"
                  stroke="hsl(var(--muted-foreground))"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm">Your Skills</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-muted-foreground"></div>
              <span className="text-sm">Required Level</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ATS Compatibility */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>ATS Compatibility</span>
            </CardTitle>
            <CardDescription>How well your resume works with applicant tracking systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={atsScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Job Match Breakdown</span>
            </CardTitle>
            <CardDescription>Distribution of skill matches with the target role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={matchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {matchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              {matchData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>Section-by-section performance breakdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Professional Summary</h4>
              <Badge variant="default">Excellent</Badge>
            </div>
            <Progress value={92} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Strong opening statement that clearly communicates your value proposition and career focus.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Work Experience</h4>
              <Badge variant="default">Good</Badge>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Well-structured experience section with good progression. Consider adding more quantifiable achievements.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Skills Section</h4>
              <Badge variant="secondary">Needs Improvement</Badge>
            </div>
            <Progress value={68} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Missing some key skills mentioned in the job description. Consider adding cloud technologies and
              leadership skills.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Education</h4>
              <Badge variant="default">Excellent</Badge>
            </div>
            <Progress value={95} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Education section is well-formatted and highly relevant to the target role.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Priority improvements to enhance your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-red-500">High Priority</h4>
                <p className="text-sm">Add AWS or cloud platform experience to match job requirements</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
              <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-yellow-500">Medium Priority</h4>
                <p className="text-sm">Include specific metrics and achievements in work experience descriptions</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-blue-500">Low Priority</h4>
                <p className="text-sm">Add leadership and team management examples to demonstrate soft skills</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
