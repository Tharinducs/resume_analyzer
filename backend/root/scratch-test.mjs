import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: "./env/development.env" });

const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key present:", !!apiKey);

const client = new GoogleGenerativeAI(apiKey);
const model = client.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json"
  }
});

const prompt = `
Return a valid JSON object representing a person's scores.
Return only valid JSON.

{
  "name": "Test",
  "score": 95
}
`;

try {
  console.log("Calling generateContent...");
  const result = await model.generateContent(prompt);
  console.log("Raw Response:", result);
  const text = result.response.text();
  console.log("Text Output:", text);
} catch (error) {
  console.error("Gemini Error caught:", error);
}
