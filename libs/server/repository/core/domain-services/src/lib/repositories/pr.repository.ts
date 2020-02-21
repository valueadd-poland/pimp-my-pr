import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';

export abstract class PrRepository {
  abstract findByRepository(repositoryId: string): Promise<PrEntity[]>;
  abstract get(repositoryId: string, prId: number): Promise<PrEntity>;
}
