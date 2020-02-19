import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  PrEntity,
  RepositoryPrsStatisticsReadModel,
  RepositoryPrsStatisticsReadModelFactory
} from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetPrDetailsQuery } from '../get-pr-details.query';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { ListSingleRepositoryQuery } from '../list-single-repository.query';

@QueryHandler(ListSingleRepositoryQuery)
export class ListSingleRepositoryHandler
  implements IQueryHandler<ListSingleRepositoryQuery, RepositoryPrsStatisticsReadModel> {
  constructor(
    private repositoryRepository: RepositoryDataService,
    private queryBus: QueryBus,
    private repositoryPrsStatisticsFactory: RepositoryPrsStatisticsReadModelFactory
  ) {}

  async execute(query: ListSingleRepositoryQuery): Promise<RepositoryPrsStatisticsReadModel> {
    const repository = await this.repositoryRepository.getSingleRepository(query.repositoryId);

    return await this.queryBus
      .execute<GetRepositoryPrsQuery, PrEntity[]>(new GetRepositoryPrsQuery(repository.fullName))
      .then(prs => {
        return Promise.all(
          prs.map(pr =>
            this.queryBus.execute<GetPrDetailsQuery, PrEntity>(
              new GetPrDetailsQuery(repository.fullName, pr.id)
            )
          )
        );
      })
      .then((prs: PrEntity[]) =>
        this.repositoryPrsStatisticsFactory.createWithPrsReviewers(repository, prs)
      );
  }
}
