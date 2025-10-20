import Resume from "../models/resume.model.js"

export const saveResume = async (resumeData) => {
  const resume = new Resume(resumeData);
  return await resume.save();
};

export const getResumeByUserId = async (userId) => {
  return await Resume.findOne({ userId }).sort({ createdAt: -1 });
};