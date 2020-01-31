import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  PrDetailsModel,
  RepositoryPrsStatisticsReadModel,
  RepositoryPrsStatisticsReadModelFactory
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { RepositoryDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { PrsService } from '../../services/prs.service';
import { ListSingleRepositoryQuery } from '../list-single-repository.query';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { GetPrDetailsQuery } from '../get-pr-details.query';

@QueryHandler(ListSingleRepositoryQuery)
export class ListSingleRepositoryHandler
  implements IQueryHandler<ListSingleRepositoryQuery, RepositoryPrsStatisticsReadModel> {
  constructor(
    private prsService: PrsService,
    private repositoryRepository: RepositoryDataService,
    private queryBus: QueryBus,
    private repositoryPrsStatisticsFactory: RepositoryPrsStatisticsReadModelFactory
  ) {}

  async execute(query: ListSingleRepositoryQuery): Promise<RepositoryPrsStatisticsReadModel> {
    const repository = await this.repositoryRepository.getSingleRepository(query.repositoryId);

    return await this.queryBus
      .execute<GetRepositoryPrsQuery, PrDetailsModel[]>(
        new GetRepositoryPrsQuery(repository.fullName)
      )
      .then(prs => {
        return Promise.all(
          prs.map(pr =>
            this.queryBus.execute<GetPrDetailsQuery, PrDetailsModel>(
              new GetPrDetailsQuery(repository.fullName, pr.id)
            )
          )
        );
      })
      .then((prsDetails: PrDetailsModel[]) =>
        this.repositoryPrsStatisticsFactory.createWithPrsReviewers(repository, prsDetails)
      );
  }
}
