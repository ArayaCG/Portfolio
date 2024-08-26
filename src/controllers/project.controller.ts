import { Request, Response } from "express";
import { createProjectService, getProjectsService, deleteProjectService, updateProjectService } from "../services/project.service";
import ProjectDto from "../dto/project.dto";


export const getProjects = async (req: Request, res: Response) => {
    const projects: ProjectDto[] = await getProjectsService();
    res.status(200).json(projects)
};
export const createProject = async () => {};
export const deleteProject = async () => {};
export const updateProject = async () => {};
