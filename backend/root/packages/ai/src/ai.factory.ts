import GeminiProvider from "./providers/gemini.provider.js";
import GroqProvider from "./providers/groq.provider.js";
import { ENV } from "@ra/config";


export const createAIProvider = (type: string) => {
  switch (type) {
    case "gemini":
      return new GeminiProvider(ENV.GEMINI_API_KEY);
    case "groq":
      return new GroqProvider(ENV.GROQ_API_KEY);
    default:
      throw new Error(`Unsupported AI provider: ${type}`);
  }
}
