import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  PrRepository,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { ListRepositoriesQuery } from './list-repositories.query';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

@QueryHandler(ListRepositoriesQuery)
export class ListRepositoriesHandler
  implements IQueryHandler<ListRepositoriesQuery, RepositoryEntity[]> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(query: ListRepositoriesQuery): Promise<RepositoryEntity[]> {
    return this.repositoryRepository.findAll();
  }
}
