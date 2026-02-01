import GeminiProvider from "./providers/gemini.provider.js";
import GroqProvider from "./providers/groq.provider.js";

function createAIProvider(type) {
  switch (type) {
    case "gemini":
      return new GeminiProvider(process.env.GEMINI_API_KEY);
    case "groq":
      return new GroqProvider(process.env.GROQ_API_KEY);
    default:
      throw new Error(`Unsupported AI provider: ${type}`);
  }
}

export default createAIProvider;
