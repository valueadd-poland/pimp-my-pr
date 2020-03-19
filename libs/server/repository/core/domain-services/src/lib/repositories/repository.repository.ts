import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { Platform } from '@pimp-my-pr/shared/domain';

export abstract class RepositoryRepository {
  abstract getSingleRepository(
    id: string,
    token: string,
    platform: Platform
  ): Promise<RepositoryEntity>;

  abstract getSingleRepositoryByName(
    fullName: string,
    token: string,
    platform: Platform
  ): Promise<RepositoryEntity>;

  abstract async findAll(): Promise<RepositoryEntity[]>;

  abstract save(repository: RepositoryEntity): Promise<void>;
}
