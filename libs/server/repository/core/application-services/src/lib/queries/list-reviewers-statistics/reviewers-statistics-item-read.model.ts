import { ApiProperty } from '@nestjs/swagger';
import { PrEntity, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BaseStatisticsReadModel } from '../../read-models/base-statistics.read-model';

export class ReviewersStatisticsItemReadModel extends BaseStatisticsReadModel {
  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  maxPrsWarning: boolean;

  constructor(
    userModel: ReviewerEntity,
    prsModel: PrEntity[],
    maxPrsWarning?: boolean,
    maxLinesWarning?: boolean,
    maxWaitingTimeWarning?: boolean
  ) {
    super(userModel, prsModel);
    this.maxPrsWarning = maxPrsWarning;
    this.avatarUrl = userModel.avatarUrl;
    this.maxLinesWarning = maxLinesWarning;
    this.maxWaitingTimeWarning = maxWaitingTimeWarning;
  }
}
