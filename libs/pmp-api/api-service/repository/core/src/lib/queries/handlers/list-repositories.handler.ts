import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ListRepositoriesQuery } from '../list-repositories.query';
import {
  PrChanges,
  PrModel,
  PrWithChangesReadModel,
  RepositoryModel,
  RepositoryStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { RepositoryDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { GetPrChangesQuery } from '../get-pr-changes.query';

@QueryHandler(ListRepositoriesQuery)
export class ListRepositoriesHandler
  implements
    IQueryHandler<ListRepositoriesQuery, RepositoryStatisticsReadModel[]> {
  constructor(
    private repositoryRepository: RepositoryDataService,
    private queryBus: QueryBus
  ) {}

  async execute(
    query: ListRepositoriesQuery
  ): Promise<RepositoryStatisticsReadModel[]> {
    const result: Promise<RepositoryStatisticsReadModel>[] = [];
    const repositories = await this.repositoryRepository.find();
    for (const repository of repositories) {
      const repositoryStatisticsPromise = this.queryBus
        .execute<GetRepositoryPrsQuery, PrModel[]>(
          new GetRepositoryPrsQuery(repository.fullName)
        )
        .then(prs => this.getPrsWithChanges(repository, prs))
        .then(
          prsWithChanges =>
            new RepositoryStatisticsReadModel(repository, prsWithChanges)
        );

      result.push(repositoryStatisticsPromise);
    }

    return Promise.all(result);
  }

  async getPrsWithChanges(
    repository: RepositoryModel,
    prs: PrModel[]
  ): Promise<PrWithChangesReadModel[]> {
    return Promise.all(
      prs.map(
        pr =>
          new Promise<PrWithChangesReadModel>(resolve => {
            return this.queryBus
              .execute<GetPrChangesQuery, PrChanges>(
                new GetPrChangesQuery(repository.fullName, pr.id)
              )
              .then(prChanges => {
                resolve(new PrWithChangesReadModel(pr, prChanges));
              });
          })
      )
    );
  }
}
