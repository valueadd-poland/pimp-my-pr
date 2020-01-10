import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ListRepositoriesQuery } from './queries/list-repositories.query';
import {
  RepositoryStatisticsReadModel,
  RepositoryUserStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { ListRepositoryContributorsQuery } from './queries/list-repository-contributors.query';
import { ListRepositoryReviewersQuery } from './queries/list-repository-reviewers.query';

@Injectable()
export class RepositoryFacade {
  constructor(private queryBus: QueryBus) {}

  list(): Promise<RepositoryStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoriesQuery());
  }

  listContributors(): Promise<RepositoryUserStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoryContributorsQuery());
  }

  listReviewers(): Promise<RepositoryUserStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoryReviewersQuery());
  }
}
