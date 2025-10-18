import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Lock } from "lucide-react"

interface LoginFormProps {
    handleRedirectToSignup: () => void;
}

const LoginForm = ({handleRedirectToSignup}:LoginFormProps) => {
    return (
        <>
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
                <Button onClick={()=>handleRedirectToSignup()} variant="link" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700">
                    Sign up
                </Button>
            </div>
        </>
    )
}
export default LoginForm