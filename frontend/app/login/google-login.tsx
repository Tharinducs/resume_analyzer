import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google";
import { Mail } from "lucide-react";

type GoogleLoginProps = {
  handleGoogleLogin: (credential: string) => void;
};

const GoogleLogin = ({  handleGoogleLogin }: GoogleLoginProps) => {
  const googleSignIn = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleLogin(tokenResponse.access_token),
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <Button
      variant="outline"
      className="w-full h-11 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      onClick={() => googleSignIn()}
    >
      <Mail className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  )
}

export default GoogleLogin;
