import { projectRepo } from "../repositories/project.repository";

export const projectService = {
    async createProject(userId, projectData) {
        return await projectRepo.create({ ...projectData, owner: userId });
    },

    async getProjectById(projectId) {
        const project = await projectRepo.findById(projectId);
        if (!project) throw new Error("PROJECT_NOT_FOUND");
        return project;
    },

    async getUserProjects(userId) {
        return await projectRepo.findAllByUserId(userId);
    },

    async updateProject(projectId, data) {
        const project = await projectRepo.update(projectId, data);
        if (!project) throw new Error("PROJECT_NOT_FOUND");
        return project;
    },

    async deleteProject(projectId) {
        const project = await projectRepo.delete(projectId);
        if (!project) throw new Error("PROJECT_NOT_FOUND");
        return project;
    }
}