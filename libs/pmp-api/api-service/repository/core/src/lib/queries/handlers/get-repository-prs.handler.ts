import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { RepositoryDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';

@QueryHandler(GetRepositoryPrsQuery)
export class GetRepositoryPrsHandler implements IQueryHandler<GetRepositoryPrsQuery, PrModel[]> {
  constructor(private repositoryRepository: RepositoryDataService) {}

  async execute(query: GetRepositoryPrsQuery): Promise<PrModel[]> {
    return this.repositoryRepository.getRepositoryPrs(query.repositoryFullName);
  }
}
