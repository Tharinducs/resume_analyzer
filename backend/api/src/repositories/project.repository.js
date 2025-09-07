import Project from "../models/project.model";

export const projectRepo = {
    async create(data) {
        return await Project.create(data)
    },

    async findById(id) {
        return await Project.findById(id).populate("owner members", "name email"); //for the ownners and members it will populate the
    },

    async findAllByUserId(userId) {
        return await Project.find({ $or: [{ ownner: userId }, { members: userId }] })
            .populate("owner members", "name email");
    },

    async update(id, data) {
        return await Project.findByIdAndUpdate(id, data, { new: true }) //new true to get the updated values
    },

    async delete(id) {
        return await Project.findByIdAndDelete(id)
    }
}
