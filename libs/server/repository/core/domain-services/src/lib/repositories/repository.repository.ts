import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { Platform } from '@pimp-my-pr/shared/domain';

export abstract class RepositoryRepository {
  abstract async findAll(): Promise<RepositoryEntity[]>;

  abstract findByUserId(userId: string): Promise<RepositoryEntity[]>;

  abstract getById(id: string): Promise<RepositoryEntity>;

  abstract getByData(userId: string, name: string, owner: string): Promise<RepositoryEntity>;

  abstract loadRepositoryByName(
    fullName: string,
    token: string,
    platform: Platform
  ): Promise<RepositoryEntity>;

  abstract save(repository: RepositoryEntity): Promise<void>;

  abstract delete(repository: RepositoryEntity): Promise<void>;
}
