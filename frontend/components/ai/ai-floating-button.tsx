"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useAIAssistant } from "./ai-assistant-provider"

export function AIFloatingButton() {
  const { isOpen, openAssistant } = useAIAssistant()

  if (isOpen) return null

  return (
    <Button
      onClick={openAssistant}
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
    >
      <Sparkles className="h-6 w-6 text-primary-foreground" />
    </Button>
  )
}
