import { Project } from '../entities/project.entitie';
import { Tokens } from '../interfaces/tokens';

export abstract class ProjectRepository {
  abstract getAllExternalProjects(tokens: Tokens): Promise<Project[]>;

  abstract createProject(project: Project): Promise<Project>;
}
