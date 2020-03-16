import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  PrRepository,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { ListRepositoriesStatisticsQuery } from './list-repositories-statistics.query';
import { RepositoriesStatisticsItemReadModel } from './repositories-statistics-item.read-model';

@QueryHandler(ListRepositoriesStatisticsQuery)
export class ListRepositoriesStatisticsHandler
  implements IQueryHandler<ListRepositoriesStatisticsQuery, RepositoriesStatisticsItemReadModel[]> {
  constructor(
    private prRepository: PrRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(
    query: ListRepositoriesStatisticsQuery
  ): Promise<RepositoriesStatisticsItemReadModel[]> {
    const result: Promise<RepositoriesStatisticsItemReadModel>[] = [];
    const repositories = await this.repositoryRepository.findAll();
    for (const repository of repositories) {
      const repositoryStatisticsPromise = this.prRepository
        .findByRepository(repository.fullName)
        .then(prs => new RepositoriesStatisticsItemReadModel(repository, prs));

      result.push(repositoryStatisticsPromise);
    }

    return Promise.all(result);
  }
}
