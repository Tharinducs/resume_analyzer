export type GeneralAnalysisResult = {
    _id: string;
    resumeId: string;
    userId: string;
    scores: {
        ats: number;
        jobMatch: number;
        overall: number;
    };
    feedback: {
        overallFeedback: string;
        relevanceFeedback: string;
        experienceFeedback: string;
        skillsFeedback: string;
        educationFeedback: string;
    };
    createdAt: string;
    updatedAt: string;
    skillsRadar: skillsRadarItem[];
    sections: sectionsItem[];
    recommendations: recommendationsItem[];
    keyFindings: keyFindingsItem[];
    jobMatchBreakdown: jobMatchBreakdownItem[];
    atsBreakdown: atsBreakdownItem[];
    aiFeedback: aiFeedbackItem[];
}

export type GeneralAnalysisResponse = {
    analysis: GeneralAnalysisResult;
    code: string;
    message: string;
}

export type skillsRadarItem = {
    skill: string;
    current: number;
    required: number;
    _id?: string;
}

export type sectionsItem = {
    title: string;
    feedback: string;
    _id?: string;
    score: number;
    badge: "Good" | "Excellent" | "Needs Improvement";
    id?: string;
}

export type recommendationsItem = {
    priority: string;
    text: string;
    _id?: string;
}

export type keyFindingsItem = {
    text: string;
    type: string;
    _id?: string;
}

export type jobMatchBreakdownItem = {
    color: string;
    name: string;
    value: number;
    _id?: string;
}

export type atsBreakdownItem = {
    category: string;
    score: number;
    _id?: string;
}

export type aiFeedbackItem = {
    feedback: string;
    id?: string;
    title: string;
    score: number;
    _id?: string;
    suggestions: suggestionsItem[];
}

export type suggestionsItem = {
    accepted?: boolean | null;
    title: string;
    id?: string;
    text?: string;
    type: string;
    _id?: string;
}
