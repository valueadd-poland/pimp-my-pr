import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { ReviewerEntity } from '../entities/reviewer.entity';
import { BaseStatisticsReadModel } from './base-statistics.read-model';

export class RepositoryUserStatisticsReadModel extends BaseStatisticsReadModel {
  avatarUrl: string;

  constructor(userModel: ReviewerEntity, prsModel: PrEntity[]) {
    super(userModel, prsModel);
    this.avatarUrl = userModel.avatarUrl;
  }
}
