import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ListReviewerStatisticsQuery } from '../list-reviewer-statistics.query';
import {
  PrDetailsModel,
  PrModel,
  RepositoryPrsStatisticsReadModelFactory,
  SingleUserStatisticsReadModel,
  UserModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import {
  PrDataService,
  RepositoryDataService
} from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { GetPrDetailsQuery } from '../get-pr-details.query';
import { PrsService } from '../../services/prs.service';
import { GetUserQuery } from '../get-user.query';

@QueryHandler(ListReviewerStatisticsQuery)
export class ListReviewerStatisticsHandler
  implements IQueryHandler<ListReviewerStatisticsQuery, SingleUserStatisticsReadModel> {
  constructor(
    private prRepository: PrDataService,
    private prsService: PrsService,
    private queryBus: QueryBus,
    private repositoryRepository: RepositoryDataService,
    private repositoryPrsStatisticsFactory: RepositoryPrsStatisticsReadModelFactory
  ) {}
  async execute(query: ListReviewerStatisticsQuery): Promise<SingleUserStatisticsReadModel> {
    const repositories = await this.repositoryRepository.find();

    const user = await this.queryBus.execute<GetUserQuery, UserModel>(
      new GetUserQuery(query.payload.username)
    );
    const repositoryStatistics = await Promise.all(
      repositories.map(repository =>
        this.queryBus
          .execute<GetRepositoryPrsQuery, PrModel[]>(new GetRepositoryPrsQuery(repository.fullName))
          .then(prs => {
            return Promise.all(
              prs
                .filter(pr =>
                  pr.reviewers.some(reviewer => reviewer.name === query.payload.username)
                )
                .map(pr =>
                  this.queryBus.execute<GetPrDetailsQuery, PrDetailsModel>(
                    new GetPrDetailsQuery(repository.fullName, pr.id)
                  )
                )
            );
          })
          .then(prDetails => this.repositoryPrsStatisticsFactory.create(repository, prDetails))
      )
    );

    return new SingleUserStatisticsReadModel(user, repositoryStatistics);
  }
}
