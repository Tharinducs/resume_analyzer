import { createAIProvider } from '@ra/ai';
import { provider as aiProviderType } from '@ra/config';

const aiProvider = createAIProvider(aiProviderType);

export const runGeneralAnalysis = async (extractedData) => {
    const workCount = (extractedData.workExperience || []).length;
    const skillCount = (extractedData.skills || []).length;

    const cvSummary = `
    PERSONAL INFO:
    ${JSON.stringify(extractedData.personalInfo || {}, null, 2)}
    
    WORK EXPERIENCE (${workCount} entries):
    ${JSON.stringify(extractedData.workExperience || [], null, 2)}
    
    SKILLS (${skillCount} total):
    ${JSON.stringify(extractedData.skills || [], null, 2)}
    
    EDUCATION (${(extractedData.education || []).length} entries):
    ${JSON.stringify(extractedData.education || [], null, 2)}
    `.trim();

    const prompt = `
    You are an expert resume analyst. Perform a GENERAL analysis of this CV — evaluate its overall quality, 
    ATS readiness, and general professional fit WITHOUT comparing it to any specific job description.
    
    CV DATA:
    ${cvSummary}
    
    Return ONLY valid JSON. No markdown, no backticks, no extra text.
    
    {
    "scores": {
        "overall": <0-100>,
        "ats": <0-100>,
        "jobMatch": <0-100>
    },
    "atsBreakdown": [
        { "category": "Format", "score": <0-100> },
        { "category": "Keywords", "score": <0-100> },
        { "category": "Structure", "score": <0-100> },
        { "category": "Content", "score": <0-100> },
        { "category": "Length", "score": <0-100> }
    ],
    "skillsRadar": [
        { "skill": "Technical Skills", "current": <0-100>, "required": 80 },
        { "skill": "Leadership", "current": <0-100>, "required": 75 },
        { "skill": "Communication", "current": <0-100>, "required": 75 },
        { "skill": "Problem Solving", "current": <0-100>, "required": 80 },
        { "skill": "Team Work", "current": <0-100>, "required": 75 },
        { "skill": "Innovation", "current": <0-100>, "required": 70 }
    ],
    "jobMatchBreakdown": [
        { "name": "Strong Match", "value": <0-100>, "color": "#22c55e" },
        { "name": "Partial Match", "value": <0-100>, "color": "#eab308" },
        { "name": "No Match", "value": <remaining>, "color": "#ef4444" }
    ],
    "sections": [
        { "id": "summary", "title": "Professional Summary", "score": <0-100>, "badge": "Excellent|Good|Needs Improvement", "feedback": "<specific feedback based on the actual CV>" },
        { "id": "experience", "title": "Work Experience", "score": <0-100>, "badge": "Excellent|Good|Needs Improvement", "feedback": "<feedback on the ${workCount} experience entries>" },
        { "id": "skills", "title": "Skills Section", "score": <0-100>, "badge": "Excellent|Good|Needs Improvement", "feedback": "<feedback on the ${skillCount} skills listed>" },
        { "id": "education", "title": "Education", "score": <0-100>, "badge": "Excellent|Good|Needs Improvement", "feedback": "<feedback on education entries>" }
    ],
    "recommendations": [
        { "priority": "High", "text": "<actionable recommendation>" },
        { "priority": "Medium", "text": "<actionable recommendation>" },
        { "priority": "Low", "text": "<actionable recommendation>" }
    ],
    "aiFeedback": [
        {
        "id": "work-experience", "title": "Work Experience", "score": <0-100>,
        "feedback": "<paragraph referencing actual companies/roles>",
        "suggestions": [
            { "id": "1", "text": "<suggestion>", "type": "improvement" },
            { "id": "2", "text": "<suggestion>", "type": "addition" },
            { "id": "3", "text": "<suggestion>", "type": "addition" }
        ]
        },
        {
        "id": "skills", "title": "Skills", "score": <0-100>,
        "feedback": "<paragraph about the ${skillCount} skills>",
        "suggestions": [
            { "id": "4", "text": "<suggestion>", "type": "addition" },
            { "id": "5", "text": "<suggestion>", "type": "removal" }
        ]
        },
        {
        "id": "education", "title": "Education", "score": <0-100>,
        "feedback": "<paragraph about education>",
        "suggestions": [
            { "id": "6", "text": "<suggestion>", "type": "addition" }
        ]
        },
        {
        "id": "summary", "title": "Professional Summary", "score": <0-100>,
        "feedback": "<paragraph about the summary>",
        "suggestions": [
            { "id": "7", "text": "<suggestion>", "type": "improvement" },
            { "id": "8", "text": "<suggestion>", "type": "addition" }
        ]
        }
    ],
    "keyFindings": [
        { "type": "positive", "text": "<positive finding from the actual CV>" },
        { "type": "positive", "text": "<positive finding from the actual CV>" },
        { "type": "warning", "text": "<gap or issue in the CV>" },
        { "type": "warning", "text": "<gap or issue in the CV>" }
    ]
    }`;

    const response = await aiProvider.generateText({ prompt });
    console.log(response,"response")
    try {
        return JSON.parse(response);
    } catch (error) {
        console.error("Gemini parse error:", error);
        return {};
    }
}