import { db } from "@ra/config";

const analysisSchema = new db.Schema({
    resumeId: { type: db.Schema.Types.ObjectId, ref: "Resume" },
    userId: String,
    jobDescription: String,
    scores: {
        overall: Number,
        ats: Number,
        jobMatch: Number,
    },
    atsBreakdown: [{ category: String, score: Number }],
    skillsRadar: [{ skill: String, current: Number, required: Number }],
    jobMatchBreakdown: [{ name: String, value: Number, color: String }],
    sections: [{ id: String, title: String, score: Number, badge: String, feedback: String }],
    recommendations: [{ priority: String, text: String }],
    aiFeedback: [
        {
            id: String,
            title: String,
            score: Number,
            feedback: String,
            suggestions: [
                {
                    id: String,
                    text: String,
                    type: String,
                    accepted: { type: Boolean, default: null },
                },
            ],
        },
    ],
    keyFindings: [{ type: String, text: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Analysis = db.model('Analysis', analysisSchema)

export { Analysis }