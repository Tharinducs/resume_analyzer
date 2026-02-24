import { Resume } from "../models/resume.model.js"

export const saveResume = async (resumeData: any) => {
  const resume = new Resume(resumeData);
  return await resume.save();
};

export const getResumeByUserId = async (userId: string) => {
  return await Resume.findOne({ userId }).sort({ createdAt: -1 });
};

export const getResumesListByUserId = async (userId: string) => {
  return await Resume.find({ userId }).sort({ createdAt: -1 });
};

export const getResumeById = async (resumeId: string) => {
  return await Resume.findById(resumeId);
};

export const deleteResumeById = async (resumeId: string) => {
  return await Resume.findByIdAndDelete(resumeId);
};