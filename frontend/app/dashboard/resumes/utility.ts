import { RESUME_STATUS } from "@/constants/resume";
import { Award, Briefcase, GraduationCap, User } from "lucide-react";
import { title } from "process";

const checkIfResumeIsProcessed = (status: string) => {
    return status === RESUME_STATUS.PROCESSED || status === RESUME_STATUS.ANALYZED;
}

const getFindingsClassName = (type: string) => {
    switch (type) {
        case "positive":
            return "bg-green-500/5 border border-green-500/20";
        case "warning":
            return "bg-yellow-500/5 border border-yellow-500/20";
        default:
            return "";
    }
}

const getRecommendationClassName = (priority: string) => {
    switch (priority) {
        case "High":
            return { main: "bg-red-500/5 border border-red-500/20",child: "bg-red-500",title: "text-red-500" };
        case "Medium":
            return { main: "bg-yellow-500/5 border border-yellow-500/20",child: "bg-yellow-500",title: "text-yellow-500" };
        case "Low":
            return { main: "bg-blue-500/5 border border-blue-500/20",child: "bg-blue-500",title: "text-blue-500" };
        default:
            return { main: "", child: "", title: "" };
    }
}

const getIconForAIFeedback = (type: string | undefined) => {
    if (!type) return User; // Default icon if type is undefined or null
    switch (type) {
        case "work-experience":
            return Briefcase;
        case "skills":
            return Award;
        case "education":
            return GraduationCap;
        case "summary":
            return User;
        default:
            return User;
    }
}

 const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

const getClassNameForAISuggestion = (accepted: boolean | null | undefined ) => {
    if (accepted === true) return "bg-green-500/5 border-green-500/20"
    if (accepted === false) return "bg-red-500/5 border-red-500/20"
    return "bg-muted/50 border-border"
}

export { checkIfResumeIsProcessed, getFindingsClassName, getRecommendationClassName, getScoreColor,getIconForAIFeedback,getClassNameForAISuggestion }