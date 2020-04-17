import { Platform } from '@pimp-my-pr/shared/domain';
import { BitbucketUserRepository } from './bitbucket/bitbucket-user.repository';
import { GithubUserRepository } from './github/github-user.repository';

export const remoteUserRepositoryFactoryToken = Symbol('RemoteUserRepositoryFactoryToken');

export const remoteUserRepositoryFactory = (
  githubUserRepository: GithubUserRepository,
  bitbucketUserRepository: BitbucketUserRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubUserRepository;

    case Platform.bitbucket:
      return bitbucketUserRepository;

    default:
      throw new Error('No User repository initialized');
  }
};
