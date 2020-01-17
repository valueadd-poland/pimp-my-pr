import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ListRepositoryReviewersQuery } from '../list-repository-reviewers.query';
import { RepositoryUserStatisticsReadModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { PrsService } from '../../services/prs.service';
import { RepositoryDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';

@QueryHandler(ListRepositoryReviewersQuery)
export class ListRepositoryReviewersHandler
  implements IQueryHandler<ListRepositoryReviewersQuery, RepositoryUserStatisticsReadModel[]> {
  constructor(
    private prsService: PrsService,
    private queryBus: QueryBus,
    private repositoryRepository: RepositoryDataService
  ) {}

  async execute(query: ListRepositoryReviewersQuery): Promise<RepositoryUserStatisticsReadModel[]> {
    const repositoryReviewersWithPrs = await this.repositoryRepository.getRepositoryReviewersWithPrs();
    const repositories = await this.repositoryRepository.find();
    const result = await Promise.all(
      repositories.map(repository =>
        Promise.all(
          repositoryReviewersWithPrs.map(reviewerWithPrs =>
            this.prsService
              .getPrsWithChanges(repository, reviewerWithPrs.prs)
              .then(
                prsWithChanges =>
                  new RepositoryUserStatisticsReadModel(reviewerWithPrs.reviewer, prsWithChanges)
              )
          )
        )
      )
    );

    return result.flatMap<RepositoryUserStatisticsReadModel>(res => res);
  }
}
