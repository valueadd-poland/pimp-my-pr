import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ListRepositoriesQuery } from '../list-repositories.query';
import { PrModel, RepositoryStatisticsReadModel } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { PrsService } from '../../services/prs.service';

@QueryHandler(ListRepositoriesQuery)
export class ListRepositoriesHandler
  implements IQueryHandler<ListRepositoriesQuery, RepositoryStatisticsReadModel[]> {
  constructor(
    private prsService: PrsService,
    private repositoryRepository: RepositoryDataService,
    private queryBus: QueryBus
  ) {}

  async execute(query: ListRepositoriesQuery): Promise<RepositoryStatisticsReadModel[]> {
    const result: Promise<RepositoryStatisticsReadModel>[] = [];
    const repositories = await this.repositoryRepository.find();
    for (const repository of repositories) {
      const repositoryStatisticsPromise = this.queryBus
        .execute<GetRepositoryPrsQuery, PrModel[]>(new GetRepositoryPrsQuery(repository.fullName))
        .then(prs => this.prsService.getPrsWithChanges(repository, prs))
        .then(prsWithChanges => new RepositoryStatisticsReadModel(repository, prsWithChanges));

      result.push(repositoryStatisticsPromise);
    }

    return Promise.all(result);
  }
}
