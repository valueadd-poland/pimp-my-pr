import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllExternalProjectsQuery } from '../queries/get-all-external-projects.query';
import { Project, ProjectRepository } from '@pimp-my-pr/pmp-api/project/domain';

@QueryHandler(GetAllExternalProjectsQuery)
export class GetAllExternalProjectsHandler
  implements IQueryHandler<GetAllExternalProjectsQuery, Project[]> {
  constructor(private projectRepository: ProjectRepository) {}
  execute(query: GetAllExternalProjectsQuery): Promise<Project[]> {
    return this.projectRepository.getAllExternalProjects(query.tokens);
  }
}
