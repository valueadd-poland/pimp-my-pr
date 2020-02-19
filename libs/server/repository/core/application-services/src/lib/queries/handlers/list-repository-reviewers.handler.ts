import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { RepositoryUserStatisticsReadModel } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { ListRepositoryReviewersQuery } from '../list-repository-reviewers.query';

@QueryHandler(ListRepositoryReviewersQuery)
export class ListRepositoryReviewersHandler
  implements IQueryHandler<ListRepositoryReviewersQuery, RepositoryUserStatisticsReadModel[]> {
  constructor(private queryBus: QueryBus, private repositoryRepository: RepositoryDataService) {}

  async execute(query: ListRepositoryReviewersQuery): Promise<RepositoryUserStatisticsReadModel[]> {
    const repositoryReviewersWithPrs = await this.repositoryRepository.getRepositoryReviewersWithPrs();
    const repositories = await this.repositoryRepository.find();
    const result = await Promise.all(
      repositories.map(repository =>
        Promise.all(
          repositoryReviewersWithPrs.map(
            reviewerWithPrs =>
              new RepositoryUserStatisticsReadModel(reviewerWithPrs.reviewer, reviewerWithPrs.prs)
          )
        )
      )
    );

    return result.flatMap<RepositoryUserStatisticsReadModel>(res => res);
  }
}
