import { PrModel, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';

export interface UserModelWithPr {
  reviewer: ReviewerEntity;
  prs: PrModel[];
}
