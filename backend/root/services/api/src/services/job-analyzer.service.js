import axios from 'axios';
import FormData from 'form-data';
import fs from 'node:fs';
import { createAIProvider } from '@ra/ai';
import { provider as aiProviderType } from '@ra/config';
import { ENV } from '@ra/config';
import { AppError, saveJobAnalysis, getJobAnalysisById, getResumeById, saveJobMatchResult, updateResumeJobAnalysis, get } from '@ra/shared';
import { API_CODES } from '../constants/apiCodes.js';

const aiProvider = createAIProvider(aiProviderType);

const JOB_KEYWORD_EXTRACT_URL = `${ENV.AGENT_APP_URL}/extract-keywords`;

async function callPythonAgent(text, filePath) {
  const formData = new FormData();
  if (filePath) {
    formData.append('file', fs.createReadStream(filePath));
  } else {
    formData.append('text', text);
  }
  const response = await axios.post(JOB_KEYWORD_EXTRACT_URL, formData, {
    headers: formData.getHeaders(),
  });
  return response.data;
}

async function enhanceWithAI(jobText, baseKeywords) {
  const prompt = `
You are a job requirements expert. Analyze the following job description and extract structured data.

Return ONLY valid JSON. No markdown, no backticks, no extra text.

{
  "title": "<short role title derived from the job description, e.g. 'Senior Frontend Developer'>",
  "keywords": [
    { "keyword": "<term>", "importance": "high|medium|low", "category": "technical|soft|tool|certification" }
  ],
  "aiSummary": "<2-3 sentences summarizing what the role values most>",
  "yearsOfExperience": "<e.g. 5+ or null>",
  "education": ["<e.g. Bachelor's degree>"]
}

Rules:
- title: extract the job title from the description, max 60 chars
- importance "high" = explicitly required or mentioned multiple times
- importance "medium" = mentioned once or in "preferred"
- importance "low" = nice to have / bonus
- Include all technical skills, frameworks, tools, soft skills found
- aiSummary must be specific to THIS job description
- yearsOfExperience: string if found, null if not mentioned

Job Description:
${jobText}
`;

  const response = await aiProvider.generateText({ prompt });
  try {
    return response.json();
  } catch {
    const allKeywords = baseKeywords.all || [];
    return {
      title: 'Job Analysis',
      keywords: allKeywords.map((k) => ({ keyword: k, importance: 'medium', category: 'technical' })),
      aiSummary: 'AI summary unavailable.',
      yearsOfExperience: baseKeywords.yearsOfExperience || null,
      education: baseKeywords.education || [],
    };
  }
}

export const extractKeywordsFromJobDescription = async ({ userId, text, filePath }) => {
  if (!text && !filePath) {
    throw new AppError(API_CODES.JOB_ANALYZER.NO_INPUT, 'No job description text or file provided.', 400);
  }

  try {
    const agentResult = await callPythonAgent(text, filePath);
    const rawText = agentResult.extractedText || text;
    const baseKeywords = agentResult.keywords || {};

    const enhanced = await enhanceWithAI(rawText, baseKeywords);

    const keywords = enhanced.keywords || [];
    const aiSummary = enhanced.aiSummary || '';
    const yearsOfExperience = enhanced.yearsOfExperience || baseKeywords.yearsOfExperience || null;
    const education = enhanced.education || baseKeywords.education || [];
    const title = enhanced.title || 'Job Analysis';

    const saved = await saveJobAnalysis({
      userId,
      title,
      extractedText: rawText,
      keywords,
      aiSummary,
      yearsOfExperience,
      education,
      fileUrl: filePath || null,
    });

    return {
      jobAnalysisId: String(saved._id),
      title,
      keywords,
      aiSummary,
      yearsOfExperience,
      education,
      rawText,
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error('Job analyzer error:', err);
    throw new AppError(API_CODES.JOB_ANALYZER.EXTRACT_FAILED, 'Failed to extract keywords from job description.', 503);
  }
};

export const matchResumeWithJobKeywords = async ({ jobAnalysisId, resumeId }) => {
  const [jobAnalysis, resume] = await Promise.all([
    getJobAnalysisById(jobAnalysisId),
    getResumeById(resumeId),
  ]);

  if (!jobAnalysis) throw new AppError(API_CODES.JOB_ANALYZER.MATCH_NOT_FOUND, 'Job analysis not found.', 404);
  if (!resume) throw new AppError(API_CODES.JOB_ANALYZER.MATCH_NOT_FOUND, 'Resume not found.', 404);

  const extractedData = get(resume, 'extractedData', {});
  const resumeSkills = get(extractedData, 'skills', []);
  const workExperience = get(extractedData, 'workExperience', []);
  const jobKeywords = get(jobAnalysis, 'keywords', []);

  const resumeSkillsLower = resumeSkills.map((s) => s.toLowerCase());

  const workSummary = workExperience
    .slice(0, 3)
    .map((w) => `${w.position} at ${w.company}: ${w.description || ''}`)
    .join('\n');

  const prompt = `
You are a resume-to-job matching expert. Compare the resume against the job requirements below.

JOB KEYWORDS (with importance levels):
${JSON.stringify(jobKeywords, null, 2)}

RESUME SKILLS:
${JSON.stringify(resumeSkills, null, 2)}

RESUME WORK EXPERIENCE SUMMARY:
${workSummary}

Return ONLY valid JSON. No markdown. No extra text.

{
  "overallScore": <0-100 integer>,
  "matchLabel": "<Excellent Match|Good Match|Partial Match|Low Match>",
  "matchDescription": "<1-2 sentence summary of the match quality>",
  "resumeKeywords": [
    { "keyword": "<skill from resume>", "matched": <true if also in job keywords else false>, "importance": "<high|medium|low>" }
  ],
  "jobKeywords": [
    { "keyword": "<job keyword>", "found": <true if found in resume skills else false>, "importance": "<high|medium|low>" }
  ],
  "missingSkills": ["<job keywords with high/medium importance NOT found in resume>"],
  "strongMatches": ["<skills present in both resume and job keywords with high/medium importance>"],
  "suggestions": [
    "<specific, actionable suggestion to improve the resume for this job>"
  ]
}

Rules:
- overallScore: weight high-importance keyword matches more heavily
- resumeKeywords: list all skills from the resume (max 15 most relevant)
- jobKeywords: list all job keywords
- missingSkills: only high/medium importance job keywords not in resume
- strongMatches: skills in both with high/medium importance
- suggestions: 4-6 specific, actionable items referencing actual gaps
`;

  let matchData;
  try {
    const response = await aiProvider.generateText({ prompt });
    matchData = response.json();
  } catch (err) {
    console.error('Gemini match parse error:', err);
    // Deterministic fallback
    const jobKwLower = jobKeywords.map((k) => k.keyword.toLowerCase());
    const resumeKwForJob = jobKeywords.map((k) => ({
      keyword: k.keyword,
      found: resumeSkillsLower.includes(k.keyword.toLowerCase()),
      importance: k.importance,
    }));
    const strong = resumeKwForJob.filter((k) => k.found && k.importance !== 'low').map((k) => k.keyword);
    const missing = resumeKwForJob.filter((k) => !k.found && k.importance !== 'low').map((k) => k.keyword);
    const score = Math.round((strong.length / Math.max(jobKeywords.length, 1)) * 100);
    matchData = {
      overallScore: score,
      matchLabel: score >= 70 ? 'Good Match' : score >= 40 ? 'Partial Match' : 'Low Match',
      matchDescription: 'Match computed from skill overlap.',
      resumeKeywords: resumeSkills.slice(0, 15).map((s) => ({
        keyword: s,
        matched: jobKwLower.includes(s.toLowerCase()),
        importance: 'medium',
      })),
      jobKeywords: resumeKwForJob,
      missingSkills: missing,
      strongMatches: strong,
      suggestions: missing.slice(0, 5).map((s) => `Consider adding ${s} experience to your resume.`),
    };
  }

  const matchResult = {
    resumeId,
    resumeTitle: get(resume, 'title', 'Resume'),
    ...matchData,
    createdAt: new Date(),
  };

  await Promise.all([
    saveJobMatchResult(jobAnalysisId, matchResult),
    updateResumeJobAnalysis(resumeId, jobAnalysisId),
  ]);

  return matchResult;
};
