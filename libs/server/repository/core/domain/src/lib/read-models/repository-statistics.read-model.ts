import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryEntity } from '../entities/repository.entity';
import { BaseStatisticsReadModel } from './base-statistics.read-model';

export class RepositoryStatisticsReadModel extends BaseStatisticsReadModel {
  owner: string;
  pictureUrl: string;

  constructor(repository: RepositoryEntity, prs: PrEntity[]) {
    super(repository, prs);
    this.owner = repository.owner;
    this.pictureUrl = repository.pictureUrl;
  }
}
