import natural from 'natural'

export const assessATS = (resumeText, jobKeywords = []) => {
  const lowerText = resumeText.toLowerCase();
  const requiredSections = ["experience", "education", "skills", "projects", "summary"];
  
  // 1. Section coverage
  const presentSections = requiredSections.filter(s => lowerText.includes(s));
  const missingSections = requiredSections.filter(s => !presentSections.includes(s));
  const sectionScore = (presentSections.length / requiredSections.length) * 25;

  // 2. Keyword relevance (if job description available)
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(lowerText);
  const matchedKeywords = jobKeywords.filter(k => lowerText.includes(k.toLowerCase()));
  const keywordScore = Math.min((matchedKeywords.length / Math.max(jobKeywords.length, 1)) * 25, 25);

  // 3. Readability (word count, avg sentence length)
  const sentenceCount = (resumeText.match(/[.!?]/g) || []).length;
  const avgSentenceLength = words.length / Math.max(sentenceCount, 1);
  const readabilityScore = avgSentenceLength < 25 ? 25 : avgSentenceLength < 40 ? 20 : 10;

  // 4. Formatting (bullets, uppercase headers, no tables/images)
  const hasBullets = /[-•]/.test(resumeText);
  const hasTablesOrGraphics = /(table|<img|graphic|chart|photo)/i.test(resumeText);
  const formattingScore = hasBullets && !hasTablesOrGraphics ? 25 : 15;

  // 5. Suggestions
  const suggestions = [];
  if (missingSections.length > 0) suggestions.push(`Add sections: ${missingSections.join(", ")}`);
  if (!hasBullets) suggestions.push("Use bullet points for better ATS parsing.");
  if (hasTablesOrGraphics) suggestions.push("Avoid images/tables – ATS cannot parse them.");
  if (avgSentenceLength > 35) suggestions.push("Use shorter sentences for readability.");
  if (keywordScore < 20) suggestions.push("Add more job-relevant keywords.");

  const score = sectionScore + keywordScore + readabilityScore + formattingScore;

  return {
    score: Math.min(score, 100),
    sectionScore,
    keywordScore,
    readabilityScore,
    formattingScore,
    missingSections,
    suggestions,
  };
};
