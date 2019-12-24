import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ListRepositoryUsersQuery } from '../list-repository-users.query';
import {
  PrModel,
  RepositoryUserStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { RepositoryDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetUserPrsQuery } from '../get-user-prs.query';
import { PrsService } from '../../services/prs.service';

@QueryHandler(ListRepositoryUsersQuery)
export class ListRepositoryUsersHandler
  implements IQueryHandler<ListRepositoryUsersQuery, RepositoryUserStatisticsReadModel[]> {
  constructor(
    private prsService: PrsService,
    private queryBus: QueryBus,
    private repositoryRepository: RepositoryDataService
  ) {}

  async execute(query: ListRepositoryUsersQuery): Promise<RepositoryUserStatisticsReadModel[]> {
    const repositories = await this.repositoryRepository.find();
    const repositoryUsers = await this.repositoryRepository.getRepositoryUsers();

    const result = await Promise.all(
      repositoryUsers.map(user =>
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
