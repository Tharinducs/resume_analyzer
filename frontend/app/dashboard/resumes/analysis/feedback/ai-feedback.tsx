"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Lightbulb, TrendingUp, Save, RotateCcw, Filter } from "lucide-react"
import { aiFeedbackItem } from "@/types/analysis"
import { get, isEmpty } from "lodash"
import { getClassNameForAISuggestion, getIconForAIFeedback, getScoreColor } from "@/app/dashboard/resumes/utility"
import { useUpdateFeedbackDecisionsMutation } from "@/features/analysis/apiSlice"
import { useDispatch } from "react-redux"
import { hideLoader, showLoader } from "@/features/common/loaderSlice"

type AIFeedbackProps = {
  analysisId: string;
  aiFeedback: aiFeedbackItem[];
  total: number;
}

type SuggestionFilter = "all" | "accepted" | "rejected" | "pending";

export function AIFeedback({ analysisId, aiFeedback, total }: Readonly<AIFeedbackProps>) {
  const [feedbackSections, setFeedbackSections] = useState<aiFeedbackItem[]>([]);
  const [originalSections, setOriginalSections] = useState<aiFeedbackItem[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [filter, setFilter] = useState<SuggestionFilter>("all");
  const [updateFeedbackDecisions, { isLoading: isSaving }] = useUpdateFeedbackDecisionsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(aiFeedback) && aiFeedback.length > 0) {
      setFeedbackSections(aiFeedback);
      setOriginalSections(aiFeedback);
      setIsDirty(false);
    }
  }, [aiFeedback])

  useEffect(() => {
    if (isSaving) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isSaving]);

  const mapAndUpdateSuggestions = (section: aiFeedbackItem, suggestionId: string, accepted: boolean | null) => {
    return section.suggestions.map((suggestion) =>
      (suggestion.id === suggestionId || suggestion._id === suggestionId)
        ? { ...suggestion, accepted }
        : suggestion,
    )
  }

  const handleAcceptSuggestion = (sectionId: string, suggestionId: string) => {
    setFeedbackSections((sections) =>
      sections.map((section) =>
        (section.id === sectionId || section._id === sectionId)
          ? { ...section, suggestions: mapAndUpdateSuggestions(section, suggestionId, true) }
          : section,
      ),
    )
    setIsDirty(true);
  }

  const handleUndoSuggestion = (sectionId: string, suggestionId: string) => {
    setFeedbackSections((sections) =>
      sections.map((section) =>
        (section.id === sectionId || section._id === sectionId)
          ? { ...section, suggestions: mapAndUpdateSuggestions(section, suggestionId, null) }
          : section,
      ),
    )
    setIsDirty(true);
  }

  const handleRejectSuggestion = (sectionId: string, suggestionId: string) => {
    setFeedbackSections((sections) =>
      sections.map((section) =>
        (section.id === sectionId || section._id === sectionId)
          ? { ...section, suggestions: mapAndUpdateSuggestions(section, suggestionId, false) }
          : section,
      ),
    )
    setIsDirty(true);
  }

  const handleSave = async () => {
    try {
      await updateFeedbackDecisions({ analysisId, aiFeedback: feedbackSections }).unwrap();
      setOriginalSections(feedbackSections);
      setIsDirty(false);
    } catch (err) {
      console.error("Failed to save feedback decisions:", err);
    }
  }

  const handleDiscard = () => {
    setFeedbackSections(originalSections);
    setIsDirty(false);
    setFilter("all");
  }

  // Derived view only — feedbackSections is never mutated by filtering
  const filteredSections = feedbackSections
    .map((section) => ({
      ...section,
      suggestions: section.suggestions.filter((s) => {
        if (filter === "accepted") return s.accepted === true;
        if (filter === "rejected") return s.accepted === false;
        if (filter === "pending") return s.accepted === null || s.accepted === undefined;
        return true;
      }),
    }))
    .filter((section) => section.suggestions.length > 0);

  const allSuggestions = feedbackSections.flatMap((s) => s.suggestions);
  const filterCounts = {
    all: allSuggestions.length,
    accepted: allSuggestions.filter((s) => s.accepted === true).length,
    rejected: allSuggestions.filter((s) => s.accepted === false).length,
    pending: allSuggestions.filter((s) => s.accepted === null || s.accepted === undefined).length,
  };

  const renderSuggestionActions = (accepted: boolean | null | undefined, sectionKey: string, suggestionKey: string) => {
    if (accepted === null || accepted === undefined) {
      return (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleRejectSuggestion(sectionKey, suggestionKey)}>
            Reject
          </Button>
          <Button size="sm" onClick={() => handleAcceptSuggestion(sectionKey, suggestionKey)}>
            Accept
          </Button>
        </div>
      )
    }
    if (accepted === true) {
      return (
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" />
            Accepted
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs text-muted-foreground"
            onClick={() => handleUndoSuggestion(sectionKey, suggestionKey)}
          >
            Undo
          </Button>
        </div>
      )
    }
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="text-red-500 border-red-500">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs text-muted-foreground"
          onClick={() => handleUndoSuggestion(sectionKey, suggestionKey)}
        >
          Undo
        </Button>
      </div>
    )
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

  const overallScore = Math.round(total)

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
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Detailed Feedback</CardTitle>
              <CardDescription>Section-by-section analysis with specific suggestions</CardDescription>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Filter className="h-4 w-4 text-muted-foreground mr-1" />
              {(["all", "accepted", "rejected", "pending"] as SuggestionFilter[]).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  className="capitalize text-xs h-7 px-2"
                  onClick={() => setFilter(f)}
                >
                  {f}
                  <Badge
                    variant={filter === f ? "secondary" : "outline"}
                    className="ml-1 text-xs px-1 py-0 h-4"
                  >
                    {filterCounts[f]}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSections.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">
              No suggestions match the selected filter.
            </p>
          ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredSections.map((section) => {
              const sectionKey = get(section, "id") || get(section, "_id", "");
              const Icon = getIconForAIFeedback(section.id || "");
              return (
                <AccordionItem key={sectionKey} value={sectionKey}>
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
                        {section.suggestions.map((suggestion) => {
                          const suggestionKey = get(suggestion, "id") || get(suggestion, "_id", "");
                          const accepted = get(suggestion, "accepted");
                          return (
                            <div
                              key={suggestionKey}
                              className={`p-4 rounded-lg border ${getClassNameForAISuggestion(accepted)}`}
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
                                {renderSuggestionActions(accepted, sectionKey, suggestionKey)}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Save / Discard Actions */}
      {isDirty && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">Unsaved Changes</h3>
                <p className="text-sm text-muted-foreground">
                  You have pending accept/reject decisions. Save them to the analysis or discard to revert.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleDiscard} disabled={isSaving}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Discard
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Decisions"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
