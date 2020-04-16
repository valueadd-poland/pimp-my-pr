import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';

export const reviewerRepositoryFactoryToken = Symbol('reviewerRepositoryFactory');

export abstract class ReviewerRepository {
  abstract get(username: string, token: string): Promise<ReviewerEntity>;
}
