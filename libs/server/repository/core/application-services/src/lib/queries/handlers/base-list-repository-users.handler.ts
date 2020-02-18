import { PrsService } from '../../services/prs.service';
import { QueryBus } from '@nestjs/cqrs';
import { RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetUserPrsQuery } from '../get-user-prs.query';
import {
  PrModel,
  RepositoryModel,
  RepositoryUserStatisticsReadModel,
  ReviewerEntity
} from '@pimp-my-pr/server/repository/core/domain';

export abstract class BaseListRepositoryUsersHandler {
  constructor(
    protected prsService: PrsService,
    protected queryBus: QueryBus,
    protected repositoryRepository: RepositoryDataService
  ) {}

  protected getRepositoryUsersStatistics(
    users: ReviewerEntity[],
    repositories: RepositoryModel[]
  ): Promise<RepositoryUserStatisticsReadModel[][]> {
    return Promise.all(
      users.map(user =>
        this.queryBus
          .execute<GetUserPrsQuery, PrModel[]>(new GetUserPrsQuery(user, repositories))
          .then(prs =>
            Promise.all(
              prs.length
                ? repositories.map(repository =>
                    this.prsService
                      .getPrsWithChanges(repository, prs)
                      .then(
                        prsWithChanges =>
                          new RepositoryUserStatisticsReadModel(user, prsWithChanges)
                      )
                  )
                : []
            )
          )
      )
    );
  }
}
