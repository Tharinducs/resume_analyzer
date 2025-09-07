"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Send, Mic, X, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

export function AIAssistant({ isOpen, onClose, isMinimized, onToggleMinimize }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you with project planning, task optimization, team insights, and productivity suggestions. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my project progress",
        "Suggest task improvements",
        "Show team workload",
        "Help with planning",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content.trim())
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase()

    if (input.includes("project") && input.includes("progress")) {
      return {
        content:
          "Based on your current projects, you have 3 active projects with an average completion rate of 67%. The 'AI Dashboard Redesign' is performing exceptionally well at 75% completion and is ahead of schedule. However, I notice the 'Mobile App Development' project could benefit from additional resources as it's at 45% with an approaching deadline.",
        suggestions: ["View detailed project analytics", "Redistribute team workload", "Extend project timeline"],
      }
    }

    if (input.includes("task") && (input.includes("improve") || input.includes("optimize"))) {
      return {
        content:
          "I've analyzed your current tasks and found several optimization opportunities:\n\n1. Break down 'API integration for AI features' into smaller subtasks\n2. The 'Mobile responsive testing' task could be parallelized with development\n3. Consider adding code review checkpoints to reduce rework\n\nThese changes could improve your team's velocity by 20-30%.",
        suggestions: ["Apply suggested task breakdowns", "Create task templates", "Set up automated workflows"],
      }
    }

    if (input.includes("team") && input.includes("workload")) {
      return {
        content:
          "Current team workload analysis:\n\n• Alice Johnson: 4 active tasks (optimal load)\n• Bob Smith: 6 active tasks (overloaded - recommend redistribution)\n• Carol Davis: 2 active tasks (capacity available)\n\nI recommend moving 2 tasks from Bob to Carol to balance the workload and improve overall team efficiency.",
        suggestions: ["Redistribute tasks automatically", "Schedule team meeting", "View individual performance"],
      }
    }

    if (input.includes("plan") || input.includes("planning")) {
      return {
        content:
          "I can help you create a comprehensive project plan! Based on your project type and team size, I recommend:\n\n1. Start with a discovery phase (1-2 weeks)\n2. Design and architecture phase (2-3 weeks)\n3. Development sprints (4-6 weeks)\n4. Testing and refinement (1-2 weeks)\n\nWould you like me to create a detailed timeline with milestones?",
        suggestions: ["Generate project template", "Set up milestone tracking", "Create team assignments"],
      }
    }

    // Default response
    return {
      content:
        "I understand you're looking for assistance. I can help with project analysis, task optimization, team management, and strategic planning. Could you be more specific about what you'd like help with?",
      suggestions: [
        "Analyze current projects",
        "Optimize task workflow",
        "Review team performance",
        "Plan new project",
      ],
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  if (!isOpen) return null

  return (
    <Card
      className={`fixed bottom-4 right-4 z-50 glass-strong shadow-2xl transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          AI Assistant
          <Badge variant="secondary" className="text-xs">
            Online
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="h-8 w-8 p-0">
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                  {message.type === "assistant" && (
                    <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-secondary">
                      <AvatarFallback className="bg-transparent">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted/50 text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line text-pretty">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                  {message.type === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-secondary">
                    <AvatarFallback className="bg-transparent">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground px-1">Suggested actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 glass bg-transparent"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border/50">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputValue)
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your projects..."
                className="glass flex-1"
                disabled={isTyping}
              />
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Mic className="h-4 w-4" />
              </Button>
              <Button type="submit" size="sm" className="h-10 w-10 p-0" disabled={isTyping || !inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
