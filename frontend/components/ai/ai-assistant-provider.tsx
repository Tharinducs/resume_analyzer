"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { AIAssistant } from "./ai-assistant"
import { AIFloatingButton } from "./ai-floating-button"

interface AIAssistantContextType {
  isOpen: boolean
  openAssistant: () => void
  closeAssistant: () => void
  isMinimized: boolean
  toggleMinimize: () => void
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined)

export function useAIAssistant() {
  const context = useContext(AIAssistantContext)
  if (!context) {
    throw new Error("useAIAssistant must be used within AIAssistantProvider")
  }
  return context
}

interface AIAssistantProviderProps {
  children: React.ReactNode
}

export function AIAssistantProvider({ children }: AIAssistantProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const openAssistant = () => {
    setIsOpen(true)
    setIsMinimized(false)
  }

  const closeAssistant = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        openAssistant,
        closeAssistant,
        isMinimized,
        toggleMinimize,
      }}
    >
      {children}
      <AIFloatingButton />
      <AIAssistant
        isOpen={isOpen}
        onClose={closeAssistant}
        isMinimized={isMinimized}
        onToggleMinimize={toggleMinimize}
      />
    </AIAssistantContext.Provider>
  )
}
