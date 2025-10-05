import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react";

type GoogleLoginProps = {
  isLoading: boolean;
  handleGoogleLogin: () => void;
};

const GoogleLogin = ({ isLoading, handleGoogleLogin }: GoogleLoginProps) => {
  return (
    <Button
      variant="outline"
      className="w-full h-11 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <Mail className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  )
}

export default GoogleLogin;
