import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

export abstract class RepositoryRepository {
  abstract getSingleRepository(id: string): Promise<RepositoryEntity>;

  abstract async findAll(): Promise<RepositoryEntity[]>;
}
