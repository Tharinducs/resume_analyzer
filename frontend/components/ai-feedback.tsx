"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Lightbulb, User, Briefcase, GraduationCap, Award, TrendingUp } from "lucide-react"

interface FeedbackSection {
  id: string
  title: string
  icon: any
  score: number
  feedback: string
  suggestions: Array<{
    id: string
    text: string
    type: "improvement" | "addition" | "removal"
    accepted?: boolean
  }>
}

export function AIFeedback() {
  const [feedbackSections, setFeedbackSections] = useState<FeedbackSection[]>([
    {
      id: "work-experience",
      title: "Work Experience",
      icon: Briefcase,
      score: 85,
      feedback:
        "Your work experience section is strong with good progression and relevant roles. However, you could improve by adding more quantifiable achievements and specific technologies used.",
      suggestions: [
        {
          id: "1",
          text: "Add specific metrics: 'Improved application performance by 40%' instead of 'Improved application performance'",
          type: "improvement",
        },
        {
          id: "2",
          text: "Include the size of teams you've worked with or led",
          type: "addition",
        },
        {
          id: "3",
          text: "Mention specific technologies and frameworks used in each role",
          type: "addition",
        },
      ],
    },
    {
      id: "skills",
      title: "Skills",
      icon: Award,
      score: 72,
      feedback:
        "Your skills section covers the technical requirements well, but you're missing some key skills mentioned in the job description. Consider adding cloud technologies and leadership skills.",
      suggestions: [
        {
          id: "4",
          text: "Add AWS or other cloud platform experience",
          type: "addition",
        },
        {
          id: "5",
          text: "Include soft skills like 'Team Leadership' and 'Mentoring'",
          type: "addition",
        },
        {
          id: "6",
          text: "Remove outdated technologies like jQuery if not relevant",
          type: "removal",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      score: 90,
      feedback:
        "Your education section is well-formatted and relevant. The Computer Science degree aligns perfectly with the role requirements.",
      suggestions: [
        {
          id: "7",
          text: "Consider adding relevant coursework if you're a recent graduate",
          type: "addition",
        },
      ],
    },
    {
      id: "summary",
      title: "Professional Summary",
      icon: User,
      score: 78,
      feedback:
        "Your summary effectively highlights your experience and key skills. To make it more compelling, consider tailoring it more specifically to this role and adding a career objective.",
      suggestions: [
        {
          id: "8",
          text: "Mention specific years of experience with key technologies from the job description",
          type: "improvement",
        },
        {
          id: "9",
          text: "Add a sentence about your career goals and how they align with this role",
          type: "addition",
        },
      ],
    },
  ])

  const handleAcceptSuggestion = (sectionId: string, suggestionId: string) => {
    setFeedbackSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            suggestions: mapAndUpdateSuggestions(section, suggestionId, true),
          }
          : section,
      ),
    )
  }

  const handleRejectSuggestion = (sectionId: string, suggestionId: string) => {
    setFeedbackSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            suggestions: mapAndUpdateSuggestions(section, suggestionId, false),
            }
          : section,
      ),
    )
  }

  const mapAndUpdateSuggestions = (section: any, suggestionId: string, accepted: boolean) => {
    return section.suggestions.map((suggestion: any) =>
      suggestion.id === suggestionId ? { ...suggestion, accepted } : suggestion,
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "addition":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "removal":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
    }
  }

  const getSuggestionBadge = (type: string) => {
    switch (type) {
      case "improvement":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Improve
          </Badge>
        )
      case "addition":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Add
          </Badge>
        )
      case "removal":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Remove
          </Badge>
        )
      default:
        return <Badge variant="outline">Suggestion</Badge>
    }
  }

  const overallScore = Math.round(
    feedbackSections.reduce((acc, section) => acc + section.score, 0) / feedbackSections.length,
  )

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>AI Feedback Summary</span>
          </CardTitle>
          <CardDescription>Comprehensive analysis of your resume with actionable suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">Overall Score:</span>
                <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</span>
              </div>
              <p className="text-muted-foreground">
                Your resume shows strong potential with several areas for improvement to better match the job
                requirements.
              </p>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm text-muted-foreground">Suggestions</div>
              <div className="text-2xl font-bold">
                {feedbackSections.reduce((acc, section) => acc + section.suggestions.length, 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feedback</CardTitle>
          <CardDescription>Section-by-section analysis with specific suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {feedbackSections.map((section) => {
              const Icon = section.icon
              return (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${getScoreColor(section.score)}`}>{section.score}%</span>
                        <Badge variant="secondary" className="text-xs">
                          {section.suggestions.length} suggestions
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="pl-8 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.feedback}</p>

                      <Separator />

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Suggestions:</h4>
                        {section.suggestions.map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className={`p-4 rounded-lg border ${suggestion.accepted === true
                                ? "bg-green-500/5 border-green-500/20"
                                : suggestion.accepted === false
                                  ? "bg-red-500/5 border-red-500/20"
                                  : "bg-muted/50 border-border"
                              }`}
                          >
                            <div className="flex items-start justify-between space-x-4">
                              <div className="flex items-start space-x-3 flex-1">
                                {getSuggestionIcon(suggestion.type)}
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center space-x-2">
                                    {getSuggestionBadge(suggestion.type)}
                                  </div>
                                  <p className="text-sm leading-relaxed">{suggestion.text}</p>
                                </div>
                              </div>
                              {suggestion.accepted === undefined && (
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRejectSuggestion(section.id, suggestion.id)}
                                  >
                                    Reject
                                  </Button>
                                  <Button size="sm" onClick={() => handleAcceptSuggestion(section.id, suggestion.id)}>
                                    Accept
                                  </Button>
                                </div>
                              )}
                              {suggestion.accepted === true && (
                                <Badge variant="default" className="bg-green-500">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Accepted
                                </Badge>
                              )}
                              {suggestion.accepted === false && (
                                <Badge variant="outline" className="text-red-500 border-red-500">
                                  <XCircle className="mr-1 h-3 w-3" />
                                  Rejected
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Apply Suggestions</h3>
              <p className="text-sm text-muted-foreground">
                Generate an improved version of your resume based on accepted suggestions.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Preview Changes</Button>
              <Button>Apply & Download</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
