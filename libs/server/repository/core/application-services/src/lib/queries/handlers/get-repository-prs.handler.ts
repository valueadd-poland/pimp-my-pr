import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';

@QueryHandler(GetRepositoryPrsQuery)
export class GetRepositoryPrsHandler implements IQueryHandler<GetRepositoryPrsQuery, PrEntity[]> {
  constructor(private repositoryRepository: RepositoryDataService) {}

  async execute(query: GetRepositoryPrsQuery): Promise<PrEntity[]> {
    return this.repositoryRepository.getRepositoryPrs(query.repositoryFullName);
  }
}
