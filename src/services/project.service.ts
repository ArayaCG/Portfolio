
import ProjectDto from "../dto/project.dto";
import { Project } from "../entities/Project";
import ProjectRepository from "../repositories/Project.repository";
import cloudinary from "../config/cloudinary-config";

export const getProjectsService = async (): Promise<Project[]> => {
    const projects = await ProjectRepository.find();
    return projects;
};

export const getProjectService = async (id: number): Promise<Project | null> => {
    const project = await ProjectRepository.findOne({ 
        where: { id } 
    });
    return project;
};

export const createProjectService = async (projectData: ProjectDto, imageFile: Express.Multer.File): Promise<Project> => {
    try {
        const result = await cloudinary.v2.uploader.upload(imageFile.path);

        const newProject = ProjectRepository.create({
            ...projectData,
            image_url: result.secure_url,  
        });

        const savedProject = await ProjectRepository.save(newProject);

        return savedProject;
    } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Unable to create project.");
    }
};

export const deleteProjectService = async (id: number): Promise<void> => {
    const project = await getProjectService(id);
    if (project) {
        await ProjectRepository.remove(project);
    }
};
