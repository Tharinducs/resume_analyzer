import { DOC_EXTRACT_URL, PDF_EXTRACT_URL } from '../config/external.urls.js';
import { geminiModel } from './gemini.client.js';
import axios from 'axios';
import fs from 'fs';
import FormData from '../lib/custom.formdata.js'
import { get } from '../lib/custom.lodash.js';

export const resumeParser = async (file) => {
    try {
        let text = "";
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path));
        const headers = {
            ...formData.getHeaders(),           // includes boundary
            'Content-Type': 'multipart/form-data', // optional — not needed but safe
            'X-Filename': file.name,
            'X-File-Type': file.mimetype
        };
        console.log("heyyyy", file)
        if (file.mimetype === "application/pdf") {
            const data = await axios.post(PDF_EXTRACT_URL, formData, headers)
            text = get(data, "data.parsedText", "")
        } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.mimetype === "application/msword") {
            console.log("heeeeee1 ")
            const data = await axios.post(DOC_EXTRACT_URL, formData, headers)
            console.log(data, "data")
            text = get(data, "data.text", "")
        } else {
            throw "Unsuported File Type"
        }
        return text;
    }
    catch (err) {
        console.log("err", err)
        throw err
    }
}

export const extractResumeData = async (resumeText) => {
    const prompt = `
SYSTEM INSTRUCTIONS (DO NOT IGNORE):
You are an ATS-grade resume extraction engine.
You MUST follow every rule below.
If any rule is violated, your output is INVALID.

CRITICAL NON-NEGOTIABLE RULES:
- EVERY workExperience entry MUST contain a NON-EMPTY "description"
- Minimum 40 WORDS per description (count words carefully)
- NEVER leave description empty, null, or missing
- NEVER say "Not provided"
- NEVER skip a role
- If responsibilities, bullet points, achievements, or projects exist → MERGE ALL into ONE description
- If description text is fragmented → SUMMARIZE IT
- If description is COMPLETELY missing → INFER a realistic professional description from:
  (job title + company + common industry practices)
- LinkedIn CVs often split experience into sections — you MUST merge them

STRICT OUTPUT RULES:
- OUTPUT VALID JSON ONLY
- NO markdown
- NO explanations
- NO comments
- NO trailing commas

JSON SCHEMA (EXACT):
{
  "personalInfo": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "summary": "",
    linkedIn: "",
    github: "",
    portfolio: ""
  },
  "workExperience": [
    {
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "skills": [],
  "education": [
    {
      "degree": "",
      "institution": "",
      "startDate": "",
      "endDate": ""
    }
  ]
}

DESCRIPTION WRITING RULES:
- Write in professional resume language
- Use full sentences
- Minimum 40 words
- Summarize responsibilities, tools, impact, and scope
- Do NOT use bullet points
- Do NOT repeat job title verbatim

FINAL VALIDATION CHECK (MANDATORY):
Before returning JSON, VERIFY:
1) Every workExperience.description exists
2) description word count >= 40
3) JSON is valid and parsable

Resume Content:
${resumeText}
`;



    const result = await geminiModel.generateContent(prompt)
    const response = result.response.text();

    try {
        const jsonStart = response.indexOf("{");
        const jsonEnd = response.lastIndexOf("}");
        return JSON.parse(response.slice(jsonStart, jsonEnd + 1));
    } catch (error) {
        console.error("Gemini parse error:", error);
        return {};
    }
}