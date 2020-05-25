import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { ReviewerReadModel } from '../reviewer.read-model';

export const reviewerReadModelFactory = (reviewerEntity: ReviewerEntity): ReviewerReadModel => {
  const reviewerReadModel = new ReviewerReadModel();

  reviewerReadModel.id = reviewerEntity.id;
  reviewerReadModel.name = reviewerEntity.name;
  reviewerReadModel.avatarUrl = reviewerEntity.avatarUrl;

  return reviewerReadModel;
};
