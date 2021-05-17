import { ContributorEntity, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';

export const contributorRepositoryFactoryToken = Symbol('contributorRepositoryFactory');

export abstract class ContributorRepository {
  abstract get(username: string): Promise<ReviewerEntity>;
  abstract save(contributor: ContributorEntity): Promise<void>;
}
