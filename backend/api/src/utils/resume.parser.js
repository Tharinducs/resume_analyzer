import { PDF_EXTRACT_URL } from '../config/external.urls.js';
import { geminiModel } from './gemini.client.js';
import axios from 'axios';
import fs from 'fs';
import FormData from '../lib/custom.formdata.js'
import { get } from '../lib/custom.lodash.js';

const formData = new FormData();

export const resumeParser = async (file) => {
    try {
        let text = "";
        formData.append('file', fs.createReadStream(file.path));
        if (file.mimetype === "application/pdf") {
            const headers = {
                ...formData.getHeaders(),           // includes boundary
                'Content-Type': 'multipart/form-data', // optional — not needed but safe
                'X-File-Type': 'application/pdf',      // custom header example
                'X-Filename': file.name
            };
            const data = await axios.post(PDF_EXTRACT_URL, formData,headers)
            text = get(data,"data.text","")
        } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const result = await mammoth.extractRawText({ path: file.path });
            text = result.value;
        } else {
            throw "Unsuported File Type"
        }
        return text;
    }
    catch (err) {
        throw err
    }
}

export const extractResumeData = async (resumeText) => {
    const prompt = `
    You are a professional resume parser.
    Extract the following fields in JSON format:
    {
    "personalInfo": { "name": "", "email": "", "phone": "", "location": "" },
    "workExperience": [
        { "company": "", "position": "", "startDate": "", "endDate": "", "summary": "" }
    ],
    "skills": [],
    "education": [
        { "degree": "", "institution": "", "year": "","startDate": "", "endDate": "" }
    ]
    }

    Resume Text:
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