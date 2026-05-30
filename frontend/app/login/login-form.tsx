"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Lock, Loader2 } from "lucide-react"

interface LoginFormProps {
    handleRedirectToSignup: () => void;
    onSubmit: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
}

const LoginForm = ({ handleRedirectToSignup, onSubmit, isLoading }: Readonly<LoginFormProps>) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(email, password);
    };

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

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Lock className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <div className="text-center text-sm">
                <span className="text-gray-600">Don&apos;t have an account? </span>
                <Button onClick={() => handleRedirectToSignup()} variant="link" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700">
                    Sign up
                </Button>
            </div>
        </>
    )
}

export default LoginForm
