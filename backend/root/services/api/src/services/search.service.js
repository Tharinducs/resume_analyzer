import { Resume, JobAnalysis, PendingComparison } from "@ra/shared";

export const searchAll = async (userId, query) => {
  if (!query || query.trim().length < 2) return { resumes: [], analyses: [], jobs: [], pending: [] };

  const regex = new RegExp(query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  const [allResumes, jobs, pending] = await Promise.all([
    Resume.find({ userId, title: regex })
      .select("_id title status analysisId updatedAt")
      .sort({ updatedAt: -1 })
      .limit(6)
      .lean(),
    JobAnalysis.find({ userId, title: regex })
      .select("_id title updatedAt")
      .sort({ updatedAt: -1 })
      .limit(6)
      .lean(),
    PendingComparison.find({
      userId,
      $or: [{ jobTitle: regex }, { resumeTitle: regex }],
    })
      .select("_id jobTitle resumeTitle jobAnalysisId resumeId createdAt")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean(),
  ]);

  // Resumes without an analysis → "resume" type
  const resumes = allResumes.map((r) => ({
    _id: String(r._id),
    title: r.title,
    status: r.status,
    updatedAt: r.updatedAt,
  }));

  // Resumes that have been analysed → "analysis" type (navigate to analysis page)
  const analyses = allResumes
    .filter((r) => r.analysisId)
    .map((r) => ({
      _id: String(r.analysisId),
      resumeId: String(r._id),
      title: r.title,
      updatedAt: r.updatedAt,
    }));

  return {
    resumes,
    analyses,
    jobs: jobs.map((j) => ({ _id: String(j._id), title: j.title, updatedAt: j.updatedAt })),
    pending: pending.map((p) => ({
      _id: String(p._id),
      jobTitle: p.jobTitle,
      resumeTitle: p.resumeTitle,
      jobAnalysisId: String(p.jobAnalysisId),
      resumeId: String(p.resumeId),
      createdAt: p.createdAt,
    })),
  };
};
