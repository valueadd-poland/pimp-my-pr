import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';

export const prRepositoryFactoryToken = Symbol('prRepositoryFactory');

export abstract class PrRepository {
  abstract findByRepository(repositoryId: string, token: string): Promise<PrEntity[]>;
}
