import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  DeleteRepositoryCommand,
  EditRepositoryCommand,
  RepositoriesStatisticsItemReadModel,
  ReviewersStatisticsItemReadModel,
  ReviewerStatisticsReadModel,
  SingleRepositoryDataReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { AddRepositoryCommand } from './commands/add-repository/add-repository.command';
import { GetRepositoryStatisticsQuery } from './queries/get-repository-statistics/get-repository-statistics.query';
import { GetReviewerStatisticsQuery } from './queries/get-reviewer-statistics/get-reviewer-statistics.query';
import { ListRepositoriesStatisticsQuery } from './queries/list-repositories-statistics/list-repositories-statistics.query';
import { ListRepositoriesQuery } from './queries/list-repositories/list-repositories.query';
import { ListReviewersStatisticsQuery } from './queries/list-reviewers-statistics/list-reviewers-statistics.query';
import { ListRepositoriesReadModel } from './queries/list-repositories/list-repositories.read-model';
import { GetSingleRepositoryDataQuery } from './queries/get-single-repository-data/get-single-repository-data.query';

@Injectable()
export class RepositoryFacade {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  addRepository(command: AddRepositoryCommand): Promise<SingleRepositoryDataReadModel> {
    return this.commandBus
      .execute(command)
      .then(_ =>
        this.queryBus.execute(
          new GetSingleRepositoryDataQuery(command.userId, command.repositoryName)
        )
      );
  }

  deleteRepository(command: DeleteRepositoryCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  editRepository(command: EditRepositoryCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  getRepositoryStatistics(
    repositoryId: string,
    token: string,
    platform: Platform
  ): Promise<RepositoriesStatisticsItemReadModel[]> {
    return this.queryBus.execute(new GetRepositoryStatisticsQuery(repositoryId, token, platform));
  }

  getReviewerStatistics(
    username: string,
    token: string,
    platform: Platform,
    userId: string
  ): Promise<ReviewerStatisticsReadModel> {
    return this.queryBus.execute(new GetReviewerStatisticsQuery(username, token, platform, userId));
  }

  listRepositoriesStatistics(
    token: string,
    platform: Platform,
    userId: string
  ): Promise<RepositoriesStatisticsItemReadModel[]> {
    return this.queryBus.execute(new ListRepositoriesStatisticsQuery(token, platform, userId));
  }

  listRepositories(currentUserId: string): Promise<ListRepositoriesReadModel[]> {
    return this.queryBus.execute(new ListRepositoriesQuery(currentUserId));
  }

  listReviewersStatistics(
    token: string,
    platform: Platform,
    userId: string
  ): Promise<ReviewersStatisticsItemReadModel[]> {
    return this.queryBus.execute(new ListReviewersStatisticsQuery(token, platform, userId));
  }
}
