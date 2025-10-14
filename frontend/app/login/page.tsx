"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Brain, Mail, Lock } from "lucide-react"
import GoogleLogin from "./google-login"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useGoogleLoginMutation, useRefreshTokenMutation } from "@/features/auth/apiSlice";
import { useDispatch, useSelector, } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";
import { get, isEmpty, isEqual } from "lodash";
import { API_CODES } from "@/constants/apiCodes"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"
import { RootState } from "@/store/store"

const LoginPage = () => {
  const [googleLogin, { isLoading: isGoogleLoading, error, isError }] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      const errorCode = get(error, 'data.code', API_CODES.GEN.TECHNICAL_ERR);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (errorCode === API_CODES.AUTH.GOOGLE_LOGIN_FAILED) {
        errorMessage = "Google login failed. Please try again.";
      } else if (errorCode === API_CODES.AUTH.TECHNICAL_ERR) {
        errorMessage = "A technical error occurred. Please try again later.";
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        duration: 5000,
        variant: "destructive",
      });
    }
  }, [isError, error]);

  // Handler for Google Login

  const googleLoginHandler = async (credential: string) => {
    const user = await googleLogin(credential).unwrap();
    console.log("Google login successful: ", user);
    if (get(user, 'code') === API_CODES.AUTH.AUTH_GOOGLE_SUCCESS) {
      dispatch(loginSuccess(get(user, 'user', {})));
      toast({
        title: "Login Successful",
        description: "You have successfully logged in with Google.",
        duration: 3000,
        variant: "success",
      });
      // Redirect to dashboard after successful login
      router.replace("/dashboard")
    }
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
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                <div className="flex justify-center w-full">
                  <div className="w-full">
                    <GoogleLogin
                      handleGoogleLogin={googleLoginHandler}
                    />
                  </div>
                </div>
              </GoogleOAuthProvider>
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
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
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

export default LoginPage;
