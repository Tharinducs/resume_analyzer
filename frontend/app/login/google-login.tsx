import { GoogleLogin as GoogleLoginButton } from "@react-oauth/google";
import { Mail } from "lucide-react";

type GoogleLoginProps = {
  handleGoogleLogin: (credential: string) => void;
};

const GoogleLogin = ({ handleGoogleLogin }: GoogleLoginProps) => (
  <GoogleLoginButton
    onSuccess={credentialResponse => {
      if (credentialResponse.credential) {
        handleGoogleLogin(credentialResponse.credential);
      }
    }}
    onError={() => {
      console.log("Google Login Failed");
    }}
    text="continue_with"
    shape="rectangular"
    size="large"
    width="100%"
  />
);

export default GoogleLogin;