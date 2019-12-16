import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllExternalProjectsQuery } from '../get-all-external-projects.query';
import { Project } from '@pimp-my-pr/pmp-api/project/domain';
import { ProjectRepository } from '@pimp-my-pr/pmp-api/project/data-access';

@QueryHandler(GetAllExternalProjectsQuery)
export class GetAllExternalProjectsHandler
  implements IQueryHandler<GetAllExternalProjectsQuery, Project[]> {
  constructor(private projectRepository: ProjectRepository) {}
  execute(query: GetAllExternalProjectsQuery): Promise<Project[]> {
    return this.projectRepository.getAllExternalProjects(query.tokens);
  }
}
