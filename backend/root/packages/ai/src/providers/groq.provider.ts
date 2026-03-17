import AIService from "../ai.service.js";
import Groq from "groq-sdk/index.mjs";
import { GenerateTextProps } from "../type.js";
import { buildResponse } from "./buildResponse.js";

class GroqProvider extends AIService {
  client: Groq;
  constructor(apiKey: string) {
    super();
    this.client = new Groq({ apiKey });
  }

  async generateText({ prompt }: GenerateTextProps) {
    console.log("Generating text with GroqProvider, prompt length:", prompt.length);
    const completion = await this.client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content || "";

    return buildResponse(result);
  }
}

export default GroqProvider;
