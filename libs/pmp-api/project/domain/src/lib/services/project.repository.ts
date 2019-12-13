import { Project } from '../entities/project.entitie';

export abstract class ProjectRepository {
  abstract getAllExternalProjects(): Promise<Project[]>;

  abstract createProject(project: Project): Promise<Project>;
}
