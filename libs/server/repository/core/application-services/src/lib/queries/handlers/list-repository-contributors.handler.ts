import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  PrEntity,
  RepositoryUserStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/domain';
import { GetUserPrsQuery } from '../get-user-prs.query';
import { ListRepositoryContributorsQuery } from '../list-repository-contributors.query';
import { BaseListRepositoryUsersHandler } from './base-list-repository-users.handler';

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

    return result.flatMap<RepositoryUserStatisticsReadModel>(res => res);
  }
}
