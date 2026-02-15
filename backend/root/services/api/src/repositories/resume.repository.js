import Resume from "../models/resume.model.js"

export const saveResume = async (resumeData) => {
  const resume = new Resume(resumeData);
  return await resume.save();
};

export const getResumeByUserId = async (userId) => {
  return await Resume.findOne({ userId }).sort({ createdAt: -1 });
};

export const getResumesListByUserId = async (userId) => {
  return await Resume.find({ userId }).sort({ createdAt: -1 });
};

export const getResumeById = async (resumeId) => {
  return await Resume.findById(resumeId);
};

export const deleteResumeById = async (resumeId) => {
  return await Resume.findByIdAndDelete(resumeId);
};