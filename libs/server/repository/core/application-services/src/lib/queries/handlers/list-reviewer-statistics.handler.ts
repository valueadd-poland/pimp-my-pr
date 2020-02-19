import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  PrEntity,
  RepositoryPrsStatisticsReadModelFactory,
  ReviewerEntity,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/domain';
import { PrDataService, RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetPrDetailsQuery } from '../get-pr-details.query';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { GetUserQuery } from '../get-user.query';
import { ListReviewerStatisticsQuery } from '../list-reviewer-statistics.query';

@QueryHandler(ListReviewerStatisticsQuery)
export class ListReviewerStatisticsHandler
  implements IQueryHandler<ListReviewerStatisticsQuery, ReviewerStatisticsReadModel> {
  constructor(
    private prRepository: PrDataService,
    private queryBus: QueryBus,
    private repositoryRepository: RepositoryDataService,
    private repositoryPrsStatisticsFactory: RepositoryPrsStatisticsReadModelFactory
  ) {}
  async execute(query: ListReviewerStatisticsQuery): Promise<ReviewerStatisticsReadModel> {
    const repositories = await this.repositoryRepository.find();

    const user = await this.queryBus.execute<GetUserQuery, ReviewerEntity>(
      new GetUserQuery(query.payload.username)
    );
    const repositoryStatistics = await Promise.all(
      repositories.map(repository =>
        this.queryBus
          .execute<GetRepositoryPrsQuery, PrEntity[]>(
            new GetRepositoryPrsQuery(repository.fullName)
          )
          .then(prs => {
            return Promise.all(
              prs
                .filter(pr =>
                  pr.reviewers.some(reviewer => reviewer.name === query.payload.username)
                )
                .map(pr =>
                  this.queryBus.execute<GetPrDetailsQuery, PrEntity>(
                    new GetPrDetailsQuery(repository.fullName, pr.id)
                  )
                )
            );
          })
          .then(prDetails => this.repositoryPrsStatisticsFactory.create(repository, prDetails))
      )
    );

    return new ReviewerStatisticsReadModel(user, repositoryStatistics);
  }
}
