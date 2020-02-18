import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListRepositoryContributorsQuery } from '../list-repository-contributors.query';
import {
  PrModel,
  RepositoryUserStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/domain';
import { BaseListRepositoryUsersHandler } from './base-list-repository-users.handler';
import { GetUserPrsQuery } from '../get-user-prs.query';

@QueryHandler(ListRepositoryContributorsQuery)
export class ListRepositoryContributorsHandler extends BaseListRepositoryUsersHandler
  implements IQueryHandler<ListRepositoryContributorsQuery, RepositoryUserStatisticsReadModel[]> {
  async execute(
    query: ListRepositoryContributorsQuery
  ): Promise<RepositoryUserStatisticsReadModel[]> {
    const repositoryContributors = await this.repositoryRepository.getRepositoryContributors();
    const repositories = await this.repositoryRepository.find();
    const result = await Promise.all(
      repositoryContributors.map(user =>
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

    return result.flatMap<RepositoryUserStatisticsReadModel>(res => res);
  }
}
