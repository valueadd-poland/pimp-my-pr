import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ListRepositoriesQuery } from './queries/list-repositories.query';
import {
  RepositoryStatisticsReadModel,
  RepositoryUserStatisticsReadModel,
  SingleUserStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { ListRepositoryContributorsQuery } from './queries/list-repository-contributors.query';
import { ListRepositoryReviewersQuery } from './queries/list-repository-reviewers.query';
import { ListReviewerStatisticsQuery } from './queries/list-reviewer-statistics.query';
import { ListReviewerStatisticsParams } from '@pimp-my-pr/shared/domain';

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

  listReviewerStatistics(
    params: ListReviewerStatisticsParams
  ): Promise<SingleUserStatisticsReadModel> {
    return this.queryBus.execute(new ListReviewerStatisticsQuery(params));
  }
}
