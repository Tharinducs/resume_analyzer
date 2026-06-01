import {
  getResumesListByUserId,
  getFullAnalysesByResumeIds,
  getRecentJobAnalysesByUserId,
  getJobAnalysesByUserId,
  AppError,
  API_CODES,
  ERROR_MESSAGES,
  get,
} from "@ra/shared";

export const getDashboardDataForUser = async (userId) => {
  try {
    const [allResumes, recentJobAnalyses] = await Promise.all([
      getResumesListByUserId(userId),
      getRecentJobAnalysesByUserId(userId, 10),
    ]);

    const totalResumes = allResumes.length;
    const analyzedResumes = allResumes.filter(
      (r) => r.status === "analyzed" && r.analysisId
    );
    const totalResumesAnalyzed = analyzedResumes.length;
    const totalJobsAnalyzed = recentJobAnalyses.length;
    const analyzedResumeIds = analyzedResumes.map((r) => String(r._id));

    const analyses = analyzedResumeIds.length > 0
      ? await getFullAnalysesByResumeIds(analyzedResumeIds)
      : [];

    const analysisMap = Object.fromEntries(
      analyses.map((a) => [String(a.resumeId), a])
    );

    // ── Stats ──────────────────────────────────────────────────────────────
    const mostRecentAnalyzed = analyzedResumes[0];
    const latestAnalysis = mostRecentAnalyzed
      ? analysisMap[String(mostRecentAnalyzed._id)]
      : null;

    const lastResumeScore = get(latestAnalysis, "scores.overall", null);
    const lastResumeTitle = get(mostRecentAnalyzed, "title", null);

    const avgJobMatchRate =
      analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, a) => sum + get(a, "scores.jobMatch", 0), 0) /
              analyses.length
          )
        : null;

    // ── Recent Activity ────────────────────────────────────────────────────
    const resumeActivity = allResumes.slice(0, 10).map((r) => {
      const analysis = analysisMap[String(r._id)];
      return {
        _id: r._id,
        title: r.title,
        type: "resume",
        status: r.status,
        score: analysis ? get(analysis, "scores.overall", null) : null,
        analysisId: r.analysisId || null,
        updatedAt: r.updatedAt || r.createdAt,
      };
    });

    const jobActivity = recentJobAnalyses.map((j) => ({
      _id: j._id,
      title: j.title || "Job Analysis",
      type: "job",
      status: "analyzed",
      score: null,
      analysisId: String(j._id),
      updatedAt: j.updatedAt || j.createdAt,
    }));

    const recentActivity = [...resumeActivity, ...jobActivity]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 10);

    // ── Resume Improvement ─────────────────────────────────────────────────
    const resumeImprovement = latestAnalysis
      ? {
          atsScore: get(latestAnalysis, "scores.ats", 0),
          jobMatchScore: get(latestAnalysis, "scores.jobMatch", 0),
          overallScore: get(latestAnalysis, "scores.overall", 0),
          resumeTitle: lastResumeTitle,
        }
      : null;

    return {
      stats: {
        lastResumeScore,
        lastResumeTitle,
        totalResumes,
        totalResumesAnalyzed,
        totalJobsAnalyzed,
        avgJobMatchRate,
      },
      recentActivity,
      resumeImprovement,
    };
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    throw new AppError(
      API_CODES.DASHBOARD.FETCH_FAILED,
      ERROR_MESSAGES[API_CODES.DASHBOARD.FETCH_FAILED],
      503
    );
  }
};

export const getActivityHistoryForUser = async (userId, page = 1, limit = 10) => {
  try {
    const [allResumes, allJobAnalyses] = await Promise.all([
      getResumesListByUserId(userId),
      getJobAnalysesByUserId(userId),
    ]);

    const analyzedResumes = allResumes.filter((r) => r.status === "analyzed" && r.analysisId);
    const analyzedResumeIds = analyzedResumes.map((r) => String(r._id));
    const analyses = analyzedResumeIds.length > 0
      ? await getFullAnalysesByResumeIds(analyzedResumeIds)
      : [];
    const analysisMap = Object.fromEntries(analyses.map((a) => [String(a.resumeId), a]));

    const resumeItems = allResumes.map((r) => {
      const analysis = analysisMap[String(r._id)];
      return {
        _id: r._id,
        title: r.title,
        type: "resume",
        status: r.status,
        score: analysis ? get(analysis, "scores.overall", null) : null,
        analysisId: r.analysisId || null,
        updatedAt: r.updatedAt || r.createdAt,
      };
    });

    const jobItems = allJobAnalyses.map((j) => ({
      _id: j._id,
      title: j.title || "Job Analysis",
      type: "job",
      status: "analyzed",
      score: null,
      analysisId: String(j._id),
      updatedAt: j.updatedAt || j.createdAt,
    }));

    const all = [...resumeItems, ...jobItems].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    const total = all.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const items = all.slice(skip, skip + limit);

    return { items, total, page, totalPages, limit };
  } catch (err) {
    console.error("Error fetching activity history:", err);
    throw new AppError(
      API_CODES.DASHBOARD.FETCH_FAILED,
      ERROR_MESSAGES[API_CODES.DASHBOARD.FETCH_FAILED],
      503
    );
  }
};
