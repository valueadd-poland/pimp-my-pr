import { BaseRepositoryStatisticsReadModel } from './base-repository-statistics.read-model';
import { PrWithChangesReadModel } from './pr-with-changes.read-model';
import { ReviewerEntity } from '../entities/reviewer.entity';

export class RepositoryUserStatisticsReadModel extends BaseRepositoryStatisticsReadModel {
  avatarUrl: string;

  constructor(userModel: ReviewerEntity, prsModel: PrWithChangesReadModel[]) {
    super(userModel, prsModel);
    this.avatarUrl = userModel.avatarUrl;
  }
}
