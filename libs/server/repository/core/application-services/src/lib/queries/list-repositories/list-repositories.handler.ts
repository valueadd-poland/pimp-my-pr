import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { ListRepositoriesQuery } from './list-repositories.query';
import { listRepositoriesReadModelFactory } from '../../read-models/factories/list-repositories-read-model.factory';
import { ListRepositoriesReadModel } from './list-repositories.read-model';

@QueryHandler(ListRepositoriesQuery)
export class ListRepositoriesHandler
  implements IQueryHandler<ListRepositoriesQuery, ListRepositoriesReadModel[]> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(query: ListRepositoriesQuery): Promise<ListRepositoriesReadModel[]> {
    const repositories = await this.repositoryRepository.findByUserId(query.currentUserId);

    return repositories.map(repository => listRepositoriesReadModelFactory(repository));
  }
}
