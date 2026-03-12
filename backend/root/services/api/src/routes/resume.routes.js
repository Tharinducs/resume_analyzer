import express from "express";
import { RESUME_ROUTES } from "../constants/routes.js";
import { uploadResume, handleResumeUpload, getResumesListByUser, deleteResume, downloadResumeFile, getResumeByResumeId } from "../controllers/resume.controller.js";

const router = express.Router();

router.post(RESUME_ROUTES.UPLOAD, uploadResume, handleResumeUpload);
router.get(RESUME_ROUTES.LIST_BY_USER, getResumesListByUser);
router.get(RESUME_ROUTES.DOWNLOAD, downloadResumeFile);
router.get(RESUME_ROUTES.GET_BY_ID, getResumeByResumeId);
router.delete(RESUME_ROUTES.DELETE, deleteResume);
router.get(RESUME_ROUTES.DOWNLOAD, downloadResumeFile)

export default router;