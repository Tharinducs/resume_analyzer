import express from "express";
import { RESUME_ROUTES } from "../constants/routes.js";
import { uploadResume, handleResumeUpload,getResumesListByUser } from "../controllers/resume.controller.js";

const router = express.Router();

router.post(RESUME_ROUTES.UPLOAD, uploadResume, handleResumeUpload);
router.get(RESUME_ROUTES.LIST_BY_USER, getResumesListByUser);

export default router;