import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { PrEntity, RepositoryStatisticsReadModel } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { ListRepositoriesQuery } from '../list-repositories.query';

@QueryHandler(ListRepositoriesQuery)
export class ListRepositoriesHandler
  implements IQueryHandler<ListRepositoriesQuery, RepositoryStatisticsReadModel[]> {
  constructor(private repositoryRepository: RepositoryDataService, private queryBus: QueryBus) {}

  async execute(query: ListRepositoriesQuery): Promise<RepositoryStatisticsReadModel[]> {
    const result: Promise<RepositoryStatisticsReadModel>[] = [];
    const repositories = await this.repositoryRepository.find();
    for (const repository of repositories) {
      const repositoryStatisticsPromise = this.queryBus
        .execute<GetRepositoryPrsQuery, PrEntity[]>(new GetRepositoryPrsQuery(repository.fullName))
        .then(prs => new RepositoryStatisticsReadModel(repository, prs));

      result.push(repositoryStatisticsPromise);
    }

    return Promise.all(result);
  }
}
