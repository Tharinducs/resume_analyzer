// import { geminiModel } from "./gemini.client.js";

export const analyzeQuality = async (resumeText) => {
    const prompt = `
    You are a resume expert. Evaluate this resume in 3 categories (1–10 scale each):
    1. Format and Structure
    2. Content Depth and Clarity
    3. Professional Tone

    Then provide 3–5 short feedback points.

    Resume:
    ${resumeText}

    Return JSON like:
    {
    "formatScore": 8,
    "contentQuality": 9,
    "feedback": ["...", "..."]
    }
    `;

    // const result = await geminiModel.generateContent(prompt);
    const text = {}

    try {
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}");
        return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    } catch {
        return { formatScore: 7, contentQuality: 8, feedback: ["Minor formatting improvements suggested."] };
    }
};
