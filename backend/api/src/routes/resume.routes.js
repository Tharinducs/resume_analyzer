import express from "express";
import { RESUME_ROUTES } from "../constants/routes";
import { uploadResume, handleResumeUpload } from "../controllers/resume.controller.js";

const router = express.Router();

router.post(RESUME_ROUTES.UPLOAD, uploadResume, handleResumeUpload);

export default router;