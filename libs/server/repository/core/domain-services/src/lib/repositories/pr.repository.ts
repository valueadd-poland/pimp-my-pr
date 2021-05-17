import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';

export const prRepositoryFactoryToken = Symbol('prRepositoryFactory');

export abstract class PrRepository {
  abstract findByRepositoryId(repositoryId: string): Promise<PrEntity[]>;

  abstract save(pr: PrEntity): Promise<void>;
}
