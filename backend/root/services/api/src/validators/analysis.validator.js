import { body,param } from "express-validator";

export const newAnalysisValidator = [
    body("userId").
        notEmpty().
        withMessage("User Id is required."),

    param("resumeId").
        notEmpty().
        withMessage("Resume Id is required")

]