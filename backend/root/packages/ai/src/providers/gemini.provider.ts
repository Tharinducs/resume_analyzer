import AIService from "../ai.service.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateTextProps } from "../type.js";
import { buildResponse } from "./buildResponse.js";

class GeminiProvider extends AIService {
  client: GoogleGenerativeAI;
  model: any;
  constructor(apiKey: string) {
    super();
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = this.client.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async generateText({ prompt }:GenerateTextProps) {
    console.log("Generating text with GeminiProvider, prompt length:", prompt.length);
    const result = await this.model.generateContent(prompt);
    const text = result.response.text();
    return buildResponse(text);
  }
}

export default GeminiProvider;
