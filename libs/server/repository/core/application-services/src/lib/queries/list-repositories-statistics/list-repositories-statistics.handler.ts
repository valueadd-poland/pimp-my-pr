import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import {
  PrRepository,
  RepositoryRepository,
  prRepositoryFactoryToken
} from '@pimp-my-pr/server/repository/core/domain-services';
import { ListRepositoriesStatisticsQuery } from './list-repositories-statistics.query';
import { RepositoriesStatisticsItemReadModel } from './repositories-statistics-item.read-model';
import { Platform } from '@pimp-my-pr/shared/domain';

@QueryHandler(ListRepositoriesStatisticsQuery)
export class ListRepositoriesStatisticsHandler
  implements IQueryHandler<ListRepositoriesStatisticsQuery, RepositoriesStatisticsItemReadModel[]> {
  constructor(
    @Inject(prRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => PrRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(
    query: ListRepositoriesStatisticsQuery
  ): Promise<RepositoriesStatisticsItemReadModel[]> {
    const prRepository = this.prRepositoryFactory(query.platform);
    const result: Promise<RepositoriesStatisticsItemReadModel>[] = [];

    const repositories = await this.repositoryRepository.findAll();

    for (const repository of repositories) {
      const repositoryStatisticsPromise = prRepository
        .findByRepository(repository.fullName, query.token)
        .then(prs => new RepositoriesStatisticsItemReadModel(repository, prs));

      result.push(repositoryStatisticsPromise);
    }

    return Promise.all(result);
  }
}
