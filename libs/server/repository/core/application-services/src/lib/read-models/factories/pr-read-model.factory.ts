import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrReadModel } from '../pr.read-model';
import { authorReadModelFactory } from './author-read-model.factory';
import { reviewerReadModelFactory } from './reviewer-read-model.factory';

export const prReadModelFactory = (prEntity: PrEntity): PrReadModel => {
  const prReadModel = new PrReadModel();

  prReadModel.additions = prEntity.additions;
  prReadModel.author = authorReadModelFactory(prEntity.author);
  prReadModel.changedFiles = prEntity.changedFiles;
  prReadModel.closedAt = prEntity.closedAt;
  prReadModel.commentsCount = prEntity.commentsCount;
  prReadModel.createdAt = prEntity.createdAt;
  prReadModel.deletions = prEntity.deletions;
  prReadModel.id = prEntity.id;
  prReadModel.reviewers = prEntity.reviewers.map(reviewer => reviewerReadModelFactory(reviewer));
  prReadModel.state = prEntity.state;
  prReadModel.title = prEntity.title;
  prReadModel.updatedAt = prEntity.updatedAt;
  prReadModel.url = prEntity.url;

  return prReadModel;
};
