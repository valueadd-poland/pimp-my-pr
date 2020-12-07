import { RepositoryEntity } from '../entities/repository.entity';

export abstract class PrChangedWebHookCreator {
  abstract create(repo: RepositoryEntity): Promise<void>;
}
