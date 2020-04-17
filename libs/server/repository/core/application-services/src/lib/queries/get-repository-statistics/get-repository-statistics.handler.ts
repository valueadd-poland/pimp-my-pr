import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  prRepositoryFactoryToken,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { repositoryPrsStatisticsReadModelFactory } from '../../read-models/factories/repository-prs-statistics-read-model.factory';
import { GetRepositoryStatisticsQuery } from './get-repository-statistics.query';
import { RepositoryStatisticsReadModel } from './repository-statistics.read-model';

@QueryHandler(GetRepositoryStatisticsQuery)
export class GetRepositoryStatisticsHandler
  implements IQueryHandler<GetRepositoryStatisticsQuery, RepositoryStatisticsReadModel> {
  constructor(
    @Inject(prRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => PrRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(query: GetRepositoryStatisticsQuery): Promise<RepositoryStatisticsReadModel> {
    const repository = await this.repositoryRepository.getById(query.repositoryId);

    const prRepository = this.prRepositoryFactory(query.platform);

    return await prRepository
      .findByRepositoryId(repository.fullName, query.token)
      .then((prs: PrEntity[]) => repositoryPrsStatisticsReadModelFactory(repository, prs));
  }
}
