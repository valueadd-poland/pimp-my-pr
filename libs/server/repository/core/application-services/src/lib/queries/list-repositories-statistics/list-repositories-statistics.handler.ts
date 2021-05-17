import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  PrRepository,
  prRepositoryFactoryToken,
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
    const repositories = await this.repositoryRepository.findByUserId(query.userId);

    const result = repositories.map(async repository => {
      const prs = await this.prRepository.findByRepositoryId(repository.fullName);

      return new RepositoriesStatisticsItemReadModel(repository, prs);
    });

    return Promise.all(result);
  }
}
