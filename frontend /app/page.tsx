"use client"

import { useState, useEffect } from "react"
import { OnboardingWizard } from "@/components/onboarding-wizard"

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check if user is authenticated and needs onboarding
    const isAuthenticated = false // This would come from your auth system
    const hasCompletedOnboarding = false // This would come from user data

    if (isAuthenticated && !hasCompletedOnboarding) {
      setShowOnboarding(true)
    } else if (!isAuthenticated) {
      // Redirect to login
      window.location.href = "/login"
    } else {
      // Redirect to dashboard
      window.location.href = "/dashboard"
    }
  }, [])

  const handleOnboardingComplete = (data: any) => {
    console.log("Onboarding completed:", data)
    // Save user data and redirect to dashboard
    window.location.href = "/dashboard"
  }

  if (showOnboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
