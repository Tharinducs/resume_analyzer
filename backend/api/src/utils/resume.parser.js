import { geminiModel } from './gemini.client.js';
import PDFParser from 'pdf2json';

const pdfParser = new PDFParser();

export const resumeParser = async () => {
    try {
        let text = "";
        if (file.mimetype === "application/pdf") {
            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                text = pdfParser.getRawTextContent();
            });
            pdfParser.loadPDF(req.file.path);
        } else if (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const result = await mammoth.extractRawText({ path: req.file.path });
            text = result.value;
        } else {
            throw "Unsuported File Type"
        }
        console.log("Extracted Text:", text);
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
        { "degree": "", "university": "", "year": "" }
    ]
    }

    Resume Text:
    ${resumeText}
    `;

    const result = await geminiModel.generateContent(prompt)
    const response = result.response.text()

    try {
        const jsonStart = response.indexOf("{");
        const jsonEnd = response.lastIndexOf("}");
        return JSON.parse(response.slice(jsonStart, jsonEnd + 1));
    } catch (error) {
        console.error("Gemini parse error:", error);
        return {};
    }
}