import { ContributorEntity, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';

export const remoteContributorRepositoryFactoryToken = Symbol('contributorRepositoryFactory');

export abstract class RemoteContributorRepository {
  abstract get(username: string, token: string): Promise<ContributorEntity>;
}
