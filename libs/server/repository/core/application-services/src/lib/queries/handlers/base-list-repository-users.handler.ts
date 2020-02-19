import { QueryBus } from '@nestjs/cqrs';
import {
  PrEntity,
  RepositoryEntity,
  RepositoryUserStatisticsReadModel,
  ReviewerEntity
} from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetUserPrsQuery } from '../get-user-prs.query';

export abstract class BaseListRepositoryUsersHandler {
  constructor(
    protected queryBus: QueryBus,
    protected repositoryRepository: RepositoryDataService
  ) {}

  protected getRepositoryUsersStatistics(
    users: ReviewerEntity[],
    repositories: RepositoryEntity[]
  ): Promise<RepositoryUserStatisticsReadModel[][]> {
    return Promise.all(
      users.map(user =>
        this.queryBus
          .execute<GetUserPrsQuery, PrEntity[]>(new GetUserPrsQuery(user, repositories))
          .then(prs =>
            Promise.all(
              prs.length
                ? repositories.map(repository => new RepositoryUserStatisticsReadModel(user, prs))
                : []
            )
          )
      )
    );
  }
}
