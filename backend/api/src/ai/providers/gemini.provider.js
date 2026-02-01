import AIService from "../ai.service.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiProvider extends AIService {
  constructor(apiKey) {
    super();
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async generateText(prompt) {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}

export default GeminiProvider;
