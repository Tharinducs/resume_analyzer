"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Brain } from "lucide-react"
import GoogleLogin from "./google-login"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useGoogleLoginMutation } from "@/features/auth/apiSlice";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";
import { get } from "lodash";
import { API_CODES } from "@/constants/apiCodes"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { hideLoader, showLoader } from "@/features/common/loaderSlice"
import LoginForm from "./login-form"

const LoginPage = () => {
  const [googleLogin, { isLoading: isGoogleLoading, error, isError }] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isGoogleLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isGoogleLoading]);

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
  
  // Handler to redirect to Signup page
  const handleRedirectToSignup = () => {
    router.push("/signup");
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
            <LoginForm handleRedirectToSignup={handleRedirectToSignup} />

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
