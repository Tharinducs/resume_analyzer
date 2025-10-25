import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parsedText: { type: String },
  qualityAssessment: {
    atsScore: Number,
    formatScore: Number,
    contentQuality: Number,
    feedback: String,
  },
  status: { type: String, enum: ['Processing', 'Analyzed', 'Failed'], default: 'Processing' },
  extractedData: {
    personalInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      location: { type: String },
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
        year: { type: String},
        startDate: { type: String },
        endDate: { type: String },
        responsibilities: { type: String },
      }
    ],
    skills: [String]
  }
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
