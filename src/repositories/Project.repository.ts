import { AppDataSource } from "../config/data-source";
import { Project } from "../entities/Project";

const ProjectRepository = AppDataSource.getRepository(Project);

export default ProjectRepository;
