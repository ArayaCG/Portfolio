import { AppDataSource } from "../config/data-source";
import { Project } from "../entities/Project";

export const getProjectsService = async () => {
    const projects = await AppDataSource.getRepository(Project).find();
    return projects;
};
export const createProjectService = async () => {};
export const deleteProjectService = async () => {};
export const updateProjectService = async () => {};
