import AIService from "../ai.service.js";
import Groq from "groq-sdk";

class GroqProvider extends AIService {
  constructor(apiKey) {
    super();
    this.client = new Groq({ apiKey });
  }

  async generateText(prompt) {
    const completion = await this.client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  }
}

export default GroqProvider;
