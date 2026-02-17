import GeminiProvider from "./providers/gemini.provider.js";
import GroqProvider from "./providers/groq.provider.js";
import { ENV } from "@ra/config";


export const createAIProvider = (type: string) => {
  switch (type) {
    case "gemini":
      console.log("Creating GeminiProvider with API key:", ENV.GEMINI_API_KEY ? "✅ Present" : "❌ Missing");
      return new GeminiProvider(ENV.GEMINI_API_KEY);
    case "groq":
      console.log("Creating GroqProvider with API key:", ENV.GROQ_API_KEY ? "✅ Present" : "❌ Missing");
      return new GroqProvider(ENV.GROQ_API_KEY);
    default:
      throw new Error(`Unsupported AI provider: ${type}`);
  }
}
