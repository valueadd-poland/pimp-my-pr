import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  RepositoriesStatisticsItemReadModel,
  ReviewersStatisticsItemReadModel,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import {
  ListReviewerStatisticsParams,
  ListSingleRepositoryParams
} from '@pimp-my-pr/shared/domain';
import { ListRepositoriesStatisticsQuery } from './queries/list-repositories-statistics/list-repositories-statistics.query';
import { ListReviewersStatisticsQuery } from './queries/list-reviewers-statistics/list-reviewers-statistics.query';
import { GetReviewerStatisticsQuery } from './queries/get-reviewer-statistics/get-reviewer-statistics.query';
import { GetRepositoryStatisticsQuery } from './queries/get-repository-statistics/get-repository-statistics.query';

@Injectable()
export class RepositoryFacade {
  constructor(private queryBus: QueryBus) {}

  getRepositoryStatistics(
    params: ListSingleRepositoryParams
  ): Promise<RepositoriesStatisticsItemReadModel[]> {
    return this.queryBus.execute(new GetRepositoryStatisticsQuery(params.repositoryId));
  }

  getReviewerStatistics(
    params: ListReviewerStatisticsParams
  ): Promise<ReviewerStatisticsReadModel> {
    return this.queryBus.execute(new GetReviewerStatisticsQuery(params));
  }

  listRepositoriesStatistics(): Promise<RepositoriesStatisticsItemReadModel[]> {
    return this.queryBus.execute(new ListRepositoriesStatisticsQuery());
  }

  listReviewersStatistics(): Promise<ReviewersStatisticsItemReadModel[]> {
    return this.queryBus.execute(new ListReviewersStatisticsQuery());
  }
}
