import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrRepositoryFetchParams } from '@pimp-my-pr/server/repository/core/domain';

export const prRepositoryFactoryToken = Symbol('prRepositoryFactory');

export abstract class PrRepository {
  abstract findByRepositoryId(
    repositoryId: string,
    token: string,
    params?: PrRepositoryFetchParams
  ): Promise<PrEntity[]>;
}
