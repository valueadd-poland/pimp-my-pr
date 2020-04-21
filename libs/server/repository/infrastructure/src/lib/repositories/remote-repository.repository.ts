import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

export const remoteRepositoryRepositoryFactoryToken = Symbol('remoteRepositoryRepositoryFactory');

export abstract class RemoteRepositoryRepository {
  abstract getSingleRepositoryByName(fullName: string, token: string): Promise<RepositoryEntity>;
}
