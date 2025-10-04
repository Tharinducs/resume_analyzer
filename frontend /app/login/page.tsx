"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Brain, Linkedin, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Redirect to dashboard after successful login
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="bg-blue-600 rounded-xl p-3">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance text-gray-900">AI Resume Analyzer</h1>
            <p className="text-gray-600 text-pretty">Improve your resume and portfolio with AI-powered insights</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-gray-200 bg-white shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-900">Welcome back</CardTitle>
            <CardDescription className="text-center text-gray-600">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => handleSocialLogin("linkedin")}
                disabled={isLoading}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                Continue with LinkedIn
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email Login Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                <Lock className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Button variant="link" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700">
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}
