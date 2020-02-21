import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BaseStatisticsReadModel } from '../../read-models/base-statistics.read-model';

export class RepositoriesStatisticsItemReadModel extends BaseStatisticsReadModel {
  owner: string;
  pictureUrl: string;

  constructor(repository: RepositoryEntity, prs: PrEntity[]) {
    super(repository, prs);
    this.owner = repository.owner;
    this.pictureUrl = repository.pictureUrl;
  }
}
