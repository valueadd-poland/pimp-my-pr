import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrRepositoryFetchParams } from '@pimp-my-pr/server/repository/core/domain';

export const remotePrRepositoryFactoryToken = Symbol('remotePrRepositoryFactory');

export abstract class RemotePrRepository {
  abstract findByRepositoryId(
    repositoryId: string,
    token: string,
    params?: PrRepositoryFetchParams
  ): Promise<PrEntity[]>;
}
