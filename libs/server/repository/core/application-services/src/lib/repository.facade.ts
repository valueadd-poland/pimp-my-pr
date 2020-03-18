import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  RepositoriesStatisticsItemReadModel,
  ReviewersStatisticsItemReadModel,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import {
  ListReviewerStatisticsParams,
  ListSingleRepositoryParams
} from '@pimp-my-pr/shared/domain';
import { AddRepositoryCommand } from './commands/add-repository/add-repository.command';
import { GetRepositoryStatisticsQuery } from './queries/get-repository-statistics/get-repository-statistics.query';
import { GetReviewerStatisticsQuery } from './queries/get-reviewer-statistics/get-reviewer-statistics.query';
import { ListRepositoriesStatisticsQuery } from './queries/list-repositories-statistics/list-repositories-statistics.query';
import { ListReviewersStatisticsQuery } from './queries/list-reviewers-statistics/list-reviewers-statistics.query';
import { ListRepositoriesQuery } from './queries/list-repositories/list-repositories.query';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

@Injectable()
export class RepositoryFacade {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  addRepository(command: AddRepositoryCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

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

  listRepositories(): Promise<RepositoryEntity[]> {
    return this.queryBus.execute(new ListRepositoriesQuery());
  }

  listReviewersStatistics(): Promise<ReviewersStatisticsItemReadModel[]> {
    return this.queryBus.execute(new ListReviewersStatisticsQuery());
  }
}
