import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

export const remoteRepositoryRepositoryFactoryToken = Symbol('remoteRepositoryRepositoryFactory');

export abstract class RemoteRepositoryRepository {
  abstract getSingleRepositoryById(
    id: string,
    token: string,
    workspace?: string
  ): Promise<RepositoryEntity>;

  abstract getSingleRepositoryByName(fullName: string, token: string): Promise<RepositoryEntity>;
}
