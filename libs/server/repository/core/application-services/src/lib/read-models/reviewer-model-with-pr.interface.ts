import { PrEntity, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';

export interface ReviewerModelWithPr {
  reviewer: ReviewerEntity;
  prs: PrEntity[];
}
