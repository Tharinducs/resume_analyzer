"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Linkedin, Award, TrendingUp, ExternalLink, Briefcase } from "lucide-react"

interface LinkedInData {
  profileUrl: string
  headline: string
  connections: number
  endorsements: Array<{
    skill: string
    count: number
  }>
  experience: Array<{
    title: string
    company: string
    duration: string
  }>
  recommendations: number
  posts: number
  profileViews: number
  feedback: string
}

export function LinkedInAnalysis() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [linkedinData, setLinkedinData] = useState<LinkedInData | null>(null)

  const mockLinkedInData: LinkedInData = {
    profileUrl: "https://linkedin.com/in/johndoe",
    headline: "Senior Full Stack Developer | React & Node.js Expert | Building Scalable Web Applications",
    connections: 847,
    endorsements: [
      { skill: "React", count: 23 },
      { skill: "JavaScript", count: 19 },
      { skill: "Node.js", count: 17 },
      { skill: "TypeScript", count: 15 },
      { skill: "Leadership", count: 12 },
      { skill: "Team Management", count: 10 },
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        duration: "2 years 3 months",
      },
      {
        title: "Software Engineer",
        company: "StartupXYZ",
        duration: "1 year 6 months",
      },
      {
        title: "Junior Developer",
        company: "WebDev Solutions",
        duration: "1 year 2 months",
      },
    ],
    recommendations: 8,
    posts: 24,
    profileViews: 156,
    feedback:
      "Your LinkedIn profile shows good professional engagement with a strong headline and solid connection network. Consider posting more regularly to increase visibility and add more detailed descriptions to your experience sections. Your endorsements show strong technical credibility.",
  }

  const handleAnalyze = async () => {
    if (!linkedinUrl.trim()) return

    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setLinkedinData(mockLinkedInData)
      setIsAnalyzing(false)
    }, 2000)
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <div className="bg-blue-500/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Linkedin className="h-8 w-8 text-blue-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Analyzing LinkedIn Profile</h3>
            <p className="text-sm text-muted-foreground">Fetching profile data and analyzing engagement...</p>
          </div>
          <Progress value={45} className="w-full max-w-xs mx-auto" />
        </CardContent>
      </Card>
    )
  }

  if (!linkedinData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn Analysis</span>
          </CardTitle>
          <CardDescription>Analyze your LinkedIn profile to optimize your professional presence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="linkedin-url" className="text-sm font-medium">
              LinkedIn Profile URL
            </label>
            <div className="flex space-x-2">
              <Input
                id="linkedin-url"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
              <Button onClick={handleAnalyze} disabled={!linkedinUrl.trim()}>
                <Linkedin className="mr-2 h-4 w-4" />
                Analyze
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>We'll analyze:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Profile completeness and headline optimization</li>
              <li>Network size and professional connections</li>
              <li>Skills endorsements and recommendations</li>
              <li>Content engagement and posting activity</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn Profile Analysis</span>
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href={linkedinData.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Profile
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Professional Headline</h4>
            <p className="text-sm text-muted-foreground">{linkedinData.headline}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-500">{linkedinData.connections}</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-500">{linkedinData.recommendations}</div>
              <div className="text-sm text-muted-foreground">Recommendations</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-500">{linkedinData.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-orange-500">{linkedinData.profileViews}</div>
              <div className="text-sm text-muted-foreground">Profile Views</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Endorsements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Skills & Endorsements</span>
          </CardTitle>
          <CardDescription>Your most endorsed professional skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {linkedinData.endorsements.map((endorsement) => (
              <div key={endorsement.skill} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="font-medium">{endorsement.skill}</span>
                <Badge variant="secondary">{endorsement.count} endorsements</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Experience Summary</span>
          </CardTitle>
          <CardDescription>Your professional experience timeline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {linkedinData.experience.map((exp, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <h4 className="font-medium">{exp.title}</h4>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
              </div>
              <Badge variant="outline">{exp.duration}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>AI Feedback</span>
          </CardTitle>
          <CardDescription>Recommendations to improve your LinkedIn presence</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{linkedinData.feedback}</p>
        </CardContent>
      </Card>
    </div>
  )
}
