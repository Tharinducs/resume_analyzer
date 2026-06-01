import { db } from "@ra/config";

const matchKeywordSchema = new db.Schema({
  keyword: String,
  importance: { type: String, enum: ["high", "medium", "low"] },
}, { _id: false });

const matchResultSchema = new db.Schema({
  resumeId: { type: db.Schema.Types.ObjectId, ref: "Resume" },
  resumeTitle: String,
  overallScore: Number,
  matchLabel: String,
  matchDescription: String,
  resumeKeywords: [{ ...matchKeywordSchema.obj, matched: Boolean }],
  jobKeywords: [{ ...matchKeywordSchema.obj, found: Boolean }],
  missingSkills: [String],
  strongMatches: [String],
  suggestions: [String],
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const jobAnalysisSchema = new db.Schema({
  userId: { type: db.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "Job Analysis" },
  extractedText: { type: String },
  keywords: [
    {
      keyword: String,
      importance: { type: String, enum: ["high", "medium", "low"] },
      category: { type: String, enum: ["technical", "soft", "tool", "certification"] },
    },
  ],
  aiSummary: { type: String },
  yearsOfExperience: { type: String, default: null },
  education: [String],
  fileUrl: { type: String, default: null },
  matchResults: [matchResultSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const JobAnalysis = db.model("JobAnalysis", jobAnalysisSchema);

export { JobAnalysis };
