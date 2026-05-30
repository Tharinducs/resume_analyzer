import {
  getResumeById,
  getResumesListByUserId,
  getAnalysesByResumeIds,
  getFullAnalysesByResumeIds,
  AppError,
  API_CODES,
  ERROR_MESSAGES,
  get,
} from "@ra/shared";

export const getDashboardDataForUser = async (userId) => {
  try {
    // Single query: all resumes for user sorted newest first
    const allResumes = await getResumesListByUserId(userId);
    const totalResumes = allResumes.length;

    const analyzedResumes = allResumes.filter(
      (r) => r.status === "analyzed" && r.analysisId
    );
    const totalResumesAnalyzed = analyzedResumes.length;
    const analyzedResumeIds = analyzedResumes.map((r) => String(r._id));

    // Fetch analyses (scores + atsBreakdown) for all analyzed resumes in one query
    const analyses = analyzedResumeIds.length > 0
      ? await getFullAnalysesByResumeIds(analyzedResumeIds)
      : [];

    // Build a map: resumeId → analysis
    const analysisMap = Object.fromEntries(
      analyses.map((a) => [String(a.resumeId), a])
    );

    // ── Stats ──────────────────────────────────────────────────────────────
    const mostRecentAnalyzed = analyzedResumes[0]; // already sorted newest first
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
    // Last 5 resumes regardless of status, enriched with score if analyzed
    const recentActivity = allResumes.slice(0, 5).map((r) => {
      const analysis = analysisMap[String(r._id)];
      return {
        _id: r._id,
        title: r.title,
        status: r.status,
        score: analysis ? get(analysis, "scores.overall", null) : null,
        analysisId: r.analysisId || null,
        updatedAt: r.updatedAt || r.createdAt,
      };
    });

    // ── Resume Improvement (from most recent analysis) ─────────────────────
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
