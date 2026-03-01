import { db } from "@ra/config";
import { size } from "lodash";

const resumeSchema = new db.Schema({
  userId: { type: db.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  parsedText: { type: String },
  jobId: { type: String },
  size: { type: String },
  fileType: { type: String },
  qualityAssessment: {
    atsScore: Number,
    formatScore: Number,
    contentQuality: Number,
    feedback: String,
  },
  status: { type: String, enum: ['processing', 'analyzed', 'failed','processed'], default: 'processing' },
  extractedData: {
    personalInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      location: { type: String },
      summary: { type: String },
      linkedIn: { type: String },
      github: { type: String },
      portfolio: { type: String },
    },
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        grade: { type: String },
      }
    ],
    workExperience: [
      {
        company: { type: String },
        position: { type: String },
        year: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        responsibilities: { type: String },
        description: { type: String }
      }
    ],
    skills: [String],
  }
});

resumeSchema.index({"title": "text", "extractedData.personalInfo.name": "text", "extractedData.workExperience.company": "text" });

const Resume = db.model("Resume", resumeSchema);

export { Resume };
