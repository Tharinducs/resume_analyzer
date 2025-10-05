"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Github, Star, GitFork, Calendar, Code, TrendingUp, ExternalLink } from "lucide-react"

interface GitHubData {
  username: string
  profileUrl: string
  repositories: Array<{
    name: string
    description: string
    language: string
    stars: number
    forks: number
    url: string
    lastUpdated: string
  }>
  languages: Array<{
    name: string
    percentage: number
    color: string
  }>
  stats: {
    totalRepos: number
    totalStars: number
    totalForks: number
    contributions: number
  }
  feedback: string
}

export function GitHubAnalysis() {
  const [githubUrl, setGithubUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [githubData, setGithubData] = useState<GitHubData | null>(null)

  const mockGitHubData: GitHubData = {
    username: "johndoe",
    profileUrl: "https://github.com/johndoe",
    repositories: [
      {
        name: "react-dashboard",
        description: "Modern React dashboard with TypeScript and Tailwind CSS",
        language: "TypeScript",
        stars: 45,
        forks: 12,
        url: "https://github.com/johndoe/react-dashboard",
        lastUpdated: "2 days ago",
      },
      {
        name: "node-api-server",
        description: "RESTful API server built with Node.js and Express",
        language: "JavaScript",
        stars: 23,
        forks: 8,
        url: "https://github.com/johndoe/node-api-server",
        lastUpdated: "1 week ago",
      },
      {
        name: "python-ml-toolkit",
        description: "Machine learning utilities and data processing tools",
        language: "Python",
        stars: 67,
        forks: 15,
        url: "https://github.com/johndoe/python-ml-toolkit",
        lastUpdated: "3 days ago",
      },
      {
        name: "portfolio-website",
        description: "Personal portfolio website built with Next.js",
        language: "TypeScript",
        stars: 12,
        forks: 3,
        url: "https://github.com/johndoe/portfolio-website",
        lastUpdated: "1 month ago",
      },
    ],
    languages: [
      { name: "TypeScript", percentage: 35, color: "#3178c6" },
      { name: "JavaScript", percentage: 28, color: "#f7df1e" },
      { name: "Python", percentage: 22, color: "#3776ab" },
      { name: "CSS", percentage: 10, color: "#1572b6" },
      { name: "HTML", percentage: 5, color: "#e34f26" },
    ],
    stats: {
      totalRepos: 24,
      totalStars: 147,
      totalForks: 38,
      contributions: 1247,
    },
    feedback:
      "Your GitHub profile shows strong technical diversity with modern technologies. The repository activity is good, but consider adding more detailed README files and documentation. Your contribution graph shows consistent activity, which is excellent for demonstrating ongoing learning and development.",
  }

  const handleAnalyze = async () => {
    if (!githubUrl.trim()) return

    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setGithubData(mockGitHubData)
      setIsAnalyzing(false)
    }, 2000)
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Github className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Analyzing GitHub Profile</h3>
            <p className="text-sm text-muted-foreground">Fetching repositories and analyzing code...</p>
          </div>
          <Progress value={60} className="w-full max-w-xs mx-auto" />
        </CardContent>
      </Card>
    )
  }

  if (!githubData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Github className="h-5 w-5" />
            <span>GitHub Analysis</span>
          </CardTitle>
          <CardDescription>Analyze your GitHub profile to showcase your coding skills and projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="github-url" className="text-sm font-medium">
              GitHub Profile URL
            </label>
            <div className="flex space-x-2">
              <Input
                id="github-url"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
              <Button onClick={handleAnalyze} disabled={!githubUrl.trim()}>
                <Github className="mr-2 h-4 w-4" />
                Analyze
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>We'll analyze:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Repository activity and contributions</li>
              <li>Programming languages and technologies</li>
              <li>Project quality and documentation</li>
              <li>Community engagement (stars, forks)</li>
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
              <Github className="h-5 w-5" />
              <span>GitHub Profile: {githubData.username}</span>
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <a href={githubData.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Profile
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-500">{githubData.stats.totalRepos}</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-yellow-500">{githubData.stats.totalStars}</div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-500">{githubData.stats.totalForks}</div>
              <div className="text-sm text-muted-foreground">Total Forks</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-500">{githubData.stats.contributions}</div>
              <div className="text-sm text-muted-foreground">Contributions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Top Languages</span>
          </CardTitle>
          <CardDescription>Programming languages used across your repositories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {githubData.languages.map((language) => (
            <div key={language.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: language.color }}></div>
                  <span className="font-medium">{language.name}</span>
                </div>
                <span className="text-muted-foreground">{language.percentage}%</span>
              </div>
              <Progress value={language.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Repositories */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Repositories</CardTitle>
          <CardDescription>Your most popular and recent projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {githubData.repositories.map((repo) => (
            <div key={repo.name} className="p-4 rounded-lg border bg-muted/50 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-primary">{repo.name}</h4>
                    <Badge variant="outline">{repo.language}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{repo.description}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="h-3 w-3" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {repo.lastUpdated}</span>
                </div>
              </div>
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
          <CardDescription>Recommendations to improve your GitHub presence</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{githubData.feedback}</p>
        </CardContent>
      </Card>
    </div>
  )
}
