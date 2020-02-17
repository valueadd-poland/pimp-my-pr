import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ListRepositoriesQuery } from './queries/list-repositories.query';
import {
  RepositoryStatisticsReadModel,
  RepositoryUserStatisticsReadModel,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { ListRepositoryContributorsQuery } from './queries/list-repository-contributors.query';
import { ListRepositoryReviewersQuery } from './queries/list-repository-reviewers.query';
import { ListReviewerStatisticsQuery } from './queries/list-reviewer-statistics.query';
import {
  ListReviewerStatisticsParams,
  ListSingleRepositoryParams
} from '@pimp-my-pr/shared/domain';
import { ListSingleRepositoryQuery } from './queries/list-single-repository.query';

@Injectable()
export class RepositoryFacade {
  constructor(private queryBus: QueryBus) {}

  list(): Promise<RepositoryStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoriesQuery());
  }

  listSingleRepository(
    params: ListSingleRepositoryParams
  ): Promise<RepositoryStatisticsReadModel[]> {
    return this.queryBus.execute(new ListSingleRepositoryQuery(params.repositoryId));
  }

  listContributors(): Promise<RepositoryUserStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoryContributorsQuery());
  }

  listReviewers(): Promise<RepositoryUserStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoryReviewersQuery());
  }

  listReviewerStatistics(
    params: ListReviewerStatisticsParams
  ): Promise<ReviewerStatisticsReadModel> {
    return this.queryBus.execute(new ListReviewerStatisticsQuery(params));
  }
}
