import { Project, ProjectRepository } from '@pimp-my-pr/pmp-api/project/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectRepositoryImpl extends ProjectRepository {
  async createProject(project: Project): Promise<Project> {
    return project;
  }

  async getAllExternalProjects(): Promise<Project[]> {
    return [{ id: 'elo' }];
  }
}
