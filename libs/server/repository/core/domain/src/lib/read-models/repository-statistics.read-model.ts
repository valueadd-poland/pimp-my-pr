import { RepositoryModel } from '../entities/repository.model';
import { PrWithChangesReadModel } from './pr-with-changes.read-model';
import { BaseRepositoryStatisticsReadModel } from './base-repository-statistics.read-model';

export class RepositoryStatisticsReadModel extends BaseRepositoryStatisticsReadModel {
  owner: string;
  pictureUrl: string;

  constructor(repository: RepositoryModel, prs: PrWithChangesReadModel[]) {
    super(repository, prs);
    this.owner = repository.owner;
    this.pictureUrl = repository.pictureUrl;
  }
}
