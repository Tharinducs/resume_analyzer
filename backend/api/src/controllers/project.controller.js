import { projectService } from "../services/projectService.js";
import { get } from 'lodash'
import { AppError } from "../errors/AppError";
import { ERROR_CODES } from "../errors/errorCodes";
import { ERROR_MESSAGES } from "../errors/errorMessages";

export const projectController = {
    async create(req, res, next) {
        try {
            const project = await projectService.createProject(req.user.id, req.body);
            res.status(200).json({ success: true, data: project });
        } catch (err) {
            next(new AppError(ERROR_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[ERROR_CODES.GEN.TECHNICAL_ERR, 500]))
        }
    },

    async getById(req, res, next) {
        try {
            const project = await projectService.getProjectById(req.params.id);
            res.json({ success: true, data: project });
        } catch (err) {
            const status = get(err, "status", "")
            if (!isEmpty(status)) {
                next(err)
            }
            next(new AppError(ERROR_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[ERROR_CODES.GEN.TECHNICAL_ERR, 500]));
        }
    },

    async getUserProjects(req, res, next) {
        try {
            const projects = await projectService.getUserProjects(req.user.id);
            res.json({ success: true, data: projects });
        } catch (err) {
            next(new AppError(ERROR_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[ERROR_CODES.GEN.TECHNICAL_ERR, 500]))
        }
    },

    async update(req, res, next) {
        try {
            const project = await projectService.updateProject(req.params.id, req.body);
            res.json({ success: true, data: project });
        } catch (err) {
            const status = get(err, "status", "")
            if (!isEmpty(status)) {
                next(err)
            }
            next(new AppError(ERROR_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[ERROR_CODES.GEN.TECHNICAL_ERR, 500]))
        }
    },

    async delete(req, res, next) {
        try {
            await projectService.deleteProject(req.params.id);
            res.json({ success: true, message: "Project deleted successfully" });
        } catch (err) {
            const status = get(err, "status", "")
            if (!isEmpty(status)) {
                next(err)
            }
            next(new AppError(ERROR_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[ERROR_CODES.GEN.TECHNICAL_ERR, 500]))
        }
    }
};
