import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ListRepositoryReviewersQuery } from '../list-repository-reviewers.query';
import {
  PrModel,
  RepositoryUserStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { PrsService } from '../../services/prs.service';
import { RepositoryDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetUserPrsQuery } from '../get-user-prs.query';

@QueryHandler(ListRepositoryReviewersQuery)
export class ListRepositoryReviewersHandler
  implements IQueryHandler<ListRepositoryReviewersQuery, RepositoryUserStatisticsReadModel[]> {
  constructor(
    private prsService: PrsService,
    private queryBus: QueryBus,
    private repositoryRepository: RepositoryDataService
  ) {}

  async execute(query: ListRepositoryReviewersQuery): Promise<RepositoryUserStatisticsReadModel[]> {
    const repositoryReviewers = await this.repositoryRepository.getRepositoryReviewers();
    const repositories = await this.repositoryRepository.find();
    const result = await Promise.all(
      repositoryReviewers.map(user =>
        this.queryBus
          .execute<GetUserPrsQuery, PrModel[]>(new GetUserPrsQuery(user, repositories))
          .then(prs =>
            Promise.all(
              repositories.map(repository =>
                this.prsService
                  .getPrsWithChanges(repository, prs)
                  .then(
                    prsWithChanges => new RepositoryUserStatisticsReadModel(user, prsWithChanges)
                  )
              )
            )
          )
      )
    );

    return result.flatMap<RepositoryUserStatisticsReadModel>(res => res);
  }
}
