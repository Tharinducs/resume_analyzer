import { projectRepo } from "../repositories/project.repository";
import { AppError } from "../errors/AppError"
import { ERROR_CODES } from "../errors/errorCodes"
import { ERROR_MESSAGES } from "../errors/errorMessages"

export const projectService = {
    async createProject(userId, projectData) {
        return await projectRepo.create({ ...projectData, owner: userId });
    },

    async getProjectById(projectId) {
        const project = await projectRepo.findById(projectId);
        if (!project) throw new AppError(ERROR_CODES.PROJECT.NOT_FOUND, ERROR_MESSAGES[ERROR_CODES.PROJECT.NOT_FOUND], 401);
        return project;
    },

    async getUserProjects(userId) {
        return await projectRepo.findAllByUserId(userId);
    },

    async updateProject(projectId, data) {
        const project = await projectRepo.update(projectId, data);
        if (!project) throw new AppError(ERROR_CODES.PROJECT.NOT_FOUND, ERROR_MESSAGES[ERROR_CODES.PROJECT.NOT_FOUND], 401);
        return project;
    },

    async deleteProject(projectId) {
        const project = await projectRepo.delete(projectId);
        if (!project) throw new AppError(ERROR_CODES.PROJECT.NOT_FOUND, ERROR_MESSAGES[ERROR_CODES.PROJECT.NOT_FOUND], 401);
        return project;
    }
}