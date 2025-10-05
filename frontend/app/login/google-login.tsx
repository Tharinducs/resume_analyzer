import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google";
import { Mail } from "lucide-react";
import { jwtDecode } from "jwt-decode";

type GoogleLoginProps = {
  isLoading: boolean;
  handleGoogleLogin: () => void;
};

const GoogleLogin = ({ isLoading, handleGoogleLogin }: GoogleLoginProps) => {

  const googleSignIn = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <Button
      variant="outline"
      className="w-full h-11 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      onClick={() => googleSignIn()}
      disabled={isLoading}
    >
      <Mail className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  )
}

export default GoogleLogin;
