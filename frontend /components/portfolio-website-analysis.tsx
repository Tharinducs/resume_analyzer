"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Globe, Zap, Shield, Smartphone, TrendingUp, ExternalLink, CheckCircle, AlertTriangle } from "lucide-react"

interface PortfolioData {
  url: string
  performanceScore: number
  accessibilityScore: number
  seoScore: number
  mobileScore: number
  loadTime: number
  issues: Array<{
    type: "error" | "warning" | "info"
    category: string
    message: string
  }>
  strengths: string[]
  feedback: string
}

export function PortfolioWebsiteAnalysis() {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)

  const mockPortfolioData: PortfolioData = {
    url: "https://johndoe.dev",
    performanceScore: 87,
    accessibilityScore: 94,
    seoScore: 76,
    mobileScore: 91,
    loadTime: 1.2,
    issues: [
      {
        type: "warning",
        category: "SEO",
        message: "Missing meta description on some pages",
      },
      {
        type: "info",
        category: "Performance",
        message: "Consider optimizing images for better loading speed",
      },
      {
        type: "warning",
        category: "SEO",
        message: "Some images missing alt text",
      },
    ],
    strengths: [
      "Excellent accessibility compliance",
      "Fast loading times",
      "Mobile-responsive design",
      "Clean, professional layout",
      "Good use of semantic HTML",
    ],
    feedback:
      "Your portfolio website shows strong technical implementation with excellent accessibility and mobile responsiveness. The performance is good but could be improved with image optimization. SEO could be enhanced with better meta descriptions and alt text for images. Overall, it demonstrates solid web development skills.",
  }

  const handleAnalyze = async () => {
    if (!websiteUrl.trim()) return

    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setPortfolioData(mockPortfolioData)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <div className="bg-green-500/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Globe className="h-8 w-8 text-green-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Analyzing Portfolio Website</h3>
            <p className="text-sm text-muted-foreground">Running performance and accessibility tests...</p>
          </div>
          <Progress value={75} className="w-full max-w-xs mx-auto" />
        </CardContent>
      </Card>
    )
  }

  if (!portfolioData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Portfolio Website Analysis</span>
          </CardTitle>
          <CardDescription>Analyze your portfolio website for performance, SEO, and accessibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="website-url" className="text-sm font-medium">
              Portfolio Website URL
            </label>
            <div className="flex space-x-2">
              <Input
                id="website-url"
                placeholder="https://yourportfolio.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
              <Button onClick={handleAnalyze} disabled={!websiteUrl.trim()}>
                <Globe className="mr-2 h-4 w-4" />
                Analyze
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>We'll analyze:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Performance and loading speed</li>
              <li>SEO optimization and meta tags</li>
              <li>Accessibility compliance</li>
              <li>Mobile responsiveness</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Website Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Website Analysis</span>
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href={portfolioData.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Site
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="relative w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${getScoreColor(portfolioData.performanceScore)} stroke-current`}
                    strokeWidth="3"
                    strokeDasharray={`${portfolioData.performanceScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <div className={`text-xl font-bold ${getScoreColor(portfolioData.performanceScore)}`}>
                  {portfolioData.performanceScore}
                </div>
                <div className="text-xs text-muted-foreground">Performance</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="relative w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${getScoreColor(portfolioData.accessibilityScore)} stroke-current`}
                    strokeWidth="3"
                    strokeDasharray={`${portfolioData.accessibilityScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <div className={`text-xl font-bold ${getScoreColor(portfolioData.accessibilityScore)}`}>
                  {portfolioData.accessibilityScore}
                </div>
                <div className="text-xs text-muted-foreground">Accessibility</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="relative w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${getScoreColor(portfolioData.seoScore)} stroke-current`}
                    strokeWidth="3"
                    strokeDasharray={`${portfolioData.seoScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <div className={`text-xl font-bold ${getScoreColor(portfolioData.seoScore)}`}>
                  {portfolioData.seoScore}
                </div>
                <div className="text-xs text-muted-foreground">SEO</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="relative w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${getScoreColor(portfolioData.mobileScore)} stroke-current`}
                    strokeWidth="3"
                    strokeDasharray={`${portfolioData.mobileScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <div className={`text-xl font-bold ${getScoreColor(portfolioData.mobileScore)}`}>
                  {portfolioData.mobileScore}
                </div>
                <div className="text-xs text-muted-foreground">Mobile</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">Load Time</div>
            <div className="text-2xl font-bold text-green-500">{portfolioData.loadTime}s</div>
          </div>
        </CardContent>
      </Card>

      {/* Issues & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Issues Found</span>
            </CardTitle>
            <CardDescription>Areas that need attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {portfolioData.issues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                {getIssueIcon(issue.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {issue.category}
                    </Badge>
                  </div>
                  <p className="text-sm">{issue.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Strengths</span>
            </CardTitle>
            <CardDescription>What your website does well</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {portfolioData.strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>AI Feedback</span>
          </CardTitle>
          <CardDescription>Overall assessment and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{portfolioData.feedback}</p>
        </CardContent>
      </Card>
    </div>
  )
}
