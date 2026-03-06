import { Resume } from "../models/resume.model.js"

export const saveResume = async (resumeData: any) => {
  const resume = new Resume(resumeData);
  return await resume.save();
};

export const updateResume = async (resumeId: string, updateData: any) => {
  return await Resume.findByIdAndUpdate(resumeId, updateData, { new: true });
};

export const getResumeByUserIdWithPagination = async (
  filter: Record<string, any>,
  skip: number,
  limit: number
) => {
  return await Promise.all([
    Resume.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Resume.countDocuments(filter),
  ])
}

export const getResumesListByUserId = async (userId: string) => {
  return await Resume.find({ userId }).sort({ createdAt: -1 });
};

export const getResumeById = async (resumeId: string) => {
  return await Resume.findById(resumeId);
};

export const deleteResumeById = async (resumeId: string) => {
  return await Resume.findByIdAndDelete(resumeId);
};