"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { FileText, Download, Share2, TrendingUp, Target, Award, Check, Loader2 } from "lucide-react"
import { get } from "lodash"
import { GeneralAnalysisResult } from "@/types/analysis"
import KeyFindings from "./key-findings"
import DetailsAnalysis from "./details-analysis"
import ActionItems from "./actions-items"
import { useToast } from "@/hooks/use-toast"
import { useRef, useState } from "react"

type ResumeReportProps = {
  analysisResult: GeneralAnalysisResult;
}

export function ResumeReport({ analysisResult }: ResumeReportProps | { analysisResult: undefined }) {
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const overallScore = get(analysisResult, "scores.overall", 0)
  const atsScore = get(analysisResult, "scores.ats", 0)
  const jobMatchScore = get(analysisResult, "scores.jobMatch", 0)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getShareIcon = () => {
    if (isSharing) return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
    if (copied) return <Check className="mr-2 h-4 w-4 text-green-500" />;
    return <Share2 className="mr-2 h-4 w-4" />;
  }

  const handleDownloadPDF = () => {
    document.body.classList.add("printing-report");
    globalThis.print();
    document.body.classList.remove("printing-report");
  }

  const handleShare = async () => {
    // Build a clean URL — no text payload to prevent share-sheet concatenation mangling the link
    const { origin, pathname, search } = globalThis.location;
    const cleanUrl = origin + pathname + search;

    setIsSharing(true);
    try {
      // Web Share API: title + url only — omitting `text` avoids platforms
      // that concatenate text+url when the user taps "Copy" in the share sheet,
      // which would embed "90% | ATS:…" into the URL and break analysisId parsing.
      if (navigator.share) {
        await navigator.share({ title: "Resume Analysis Report", url: cleanUrl });
        toast({ title: "Shared!", description: "Report shared successfully.", duration: 3000, variant: "success" });
      } else {
        await navigator.clipboard.writeText(cleanUrl);
        setCopied(true);
        toast({ title: "Link copied!", description: "Analysis URL copied to clipboard.", duration: 3000, variant: "success" });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(cleanUrl);
          setCopied(true);
          toast({ title: "Link copied!", description: "Analysis URL copied to clipboard.", duration: 3000, variant: "success" });
          setTimeout(() => setCopied(false), 2000);
        } catch {
          toast({ title: "Share failed", description: "Please copy the URL from the address bar.", variant: "destructive" });
        }
      }
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <div id="resume-report-section" ref={reportRef} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Resume Analysis Report</h2>
          <p className="text-muted-foreground">Comprehensive analysis of your resume performance</p>
        </div>
        <div className="flex space-x-2 print:hidden">
          <Button variant="outline" onClick={handleShare} disabled={isSharing}>
            {getShareIcon()}
            {copied ? "Copied!" : "Share"}
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

          <KeyFindings analysisResult={analysisResult} />
        </CardContent>
      </Card>

      {/* Skills Analysis */}
      {analysisResult?.skillsRadar && analysisResult.skillsRadar.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Skills vs Requirements</span>
            </CardTitle>
            <CardDescription>How your skills compare to job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Chart — hidden in print */}
            <div className="print:hidden">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={analysisResult.skillsRadar}>
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
            </div>
            {/* Print-only table */}
            <table className="print-data-table hidden print:table">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Your Level</th>
                  <th>Required</th>
                  <th>Gap</th>
                </tr>
              </thead>
              <tbody>
                {analysisResult.skillsRadar.map((item) => (
                  <tr key={item._id ?? item.skill}>
                    <td>{item.skill}</td>
                    <td>
                      <span className="print-score-bar" style={{ width: `${item.current}px` }} />
                      {item.current}%
                    </td>
                    <td>{item.required}%</td>
                    <td style={{ color: item.current >= item.required ? "#16a34a" : "#dc2626" }}>
                      {item.current >= item.required ? "+" : ""}{item.current - item.required}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>)}

      {/* ATS Compatibility + Job Match Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2 print:grid-cols-2">
        {analysisResult?.atsBreakdown && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>ATS Compatibility</span>
              </CardTitle>
              <CardDescription>How well your resume works with applicant tracking systems</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chart — hidden in print */}
              <div className="h-64 print:hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisResult.atsBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Print-only table */}
              <table className="print-data-table hidden print:table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResult.atsBreakdown.map((item) => (
                    <tr key={item._id ?? item.category}>
                      <td>{item.category}</td>
                      <td>
                        <span className="print-score-bar" style={{ width: `${item.score}px` }} />
                        {item.score}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>)}

        {analysisResult?.jobMatchBreakdown && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Job Match Breakdown</span>
              </CardTitle>
              <CardDescription>Distribution of skill matches with the target role</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chart — hidden in print */}
              <div className="print:hidden">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analysisResult.jobMatchBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {analysisResult.jobMatchBreakdown.map((entry) => (
                          <Cell key={`cell-${entry._id}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  {analysisResult.jobMatchBreakdown.map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Print-only table */}
              <table className="print-data-table hidden print:table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Match %</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResult.jobMatchBreakdown.map((item) => (
                    <tr key={item._id ?? item.name}>
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            marginRight: 6,
                            verticalAlign: "middle",
                          }}
                        />
                        {item.name}
                      </td>
                      <td>
                        <span className="print-score-bar" style={{ width: `${item.value}px` }} />
                        {item.value}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>)}
      </div>

      {/* Detailed Breakdown */}
      {analysisResult?.sections && (
        <DetailsAnalysis sections={analysisResult.sections} />
      )}
       
      {/* Action Items */}
      {analysisResult?.recommendations && (
        <ActionItems recommendations={analysisResult.recommendations} />
      )}
    </div>
  )
}
