import { db } from "@ra/config";

const pendingComparisonSchema = new db.Schema(
  {
    userId: { type: db.Schema.Types.ObjectId, ref: "User", required: true },
    jobAnalysisId: { type: db.Schema.Types.ObjectId, ref: "JobAnalysis", required: true },
    jobTitle: { type: String, required: true },
    resumeId: { type: db.Schema.Types.ObjectId, ref: "Resume", required: true },
    resumeTitle: { type: String, required: true },
  },
  { timestamps: true }
);

const PendingComparison = db.model("PendingComparison", pendingComparisonSchema);

export { PendingComparison };
