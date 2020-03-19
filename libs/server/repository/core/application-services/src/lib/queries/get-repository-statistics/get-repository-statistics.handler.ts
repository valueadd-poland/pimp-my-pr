import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  RepositoryRepository,
  prRepositoryFactoryToken
} from '@pimp-my-pr/server/repository/core/domain-services';
import { repositoryPrsStatisticsReadModelFactory } from '../../read-models/factories/repository-prs-statistics-read-model.factory';
import { GetRepositoryStatisticsQuery } from './get-repository-statistics.query';
import { RepositoryStatisticsReadModel } from './repository-statistics.read-model';
import { Platform } from '@pimp-my-pr/shared/domain';

@QueryHandler(GetRepositoryStatisticsQuery)
export class GetRepositoryStatisticsHandler
  implements IQueryHandler<GetRepositoryStatisticsQuery, RepositoryStatisticsReadModel> {
  constructor(
    @Inject(prRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => PrRepository,
    private repositoryRepository: RepositoryRepository
  ) {}

  async execute(query: GetRepositoryStatisticsQuery): Promise<RepositoryStatisticsReadModel> {
    const repository = await this.repositoryRepository.getSingleRepository(
      query.repositoryId,
      query.token,
      query.platform
    );

    const prRepository = this.prRepositoryFactory(query.platform);

    return await prRepository
      .findByRepository(repository.fullName, query.token)
      .then((prs: PrEntity[]) => repositoryPrsStatisticsReadModelFactory(repository, prs));
  }
}
