import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BaseStatisticsReadModel } from '../../read-models/base-statistics.read-model';

export class ReviewersStatisticsItemReadModel extends BaseStatisticsReadModel {
  avatarUrl: string;

  constructor(userModel: ReviewerEntity, prsModel: PrEntity[]) {
    super(userModel, prsModel);
    this.avatarUrl = userModel.avatarUrl;
  }
}
