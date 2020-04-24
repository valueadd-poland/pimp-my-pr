import { Platform } from '@pimp-my-pr/shared/domain';
import { BitbucketUserRepository } from './bitbucket/bitbucket-user.repository';
import { GithubUserRepository } from './github/github-user.repository';
import { GitlabUserRepository } from './gitlab/gitlab-user.repository';

export const remoteUserRepositoryFactoryToken = Symbol('RemoteUserRepositoryFactoryToken');

export const remoteUserRepositoryFactory = (
  githubUserRepository: GithubUserRepository,
  bitbucketUserRepository: BitbucketUserRepository,
  gitlabUserRepository: GitlabUserRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubUserRepository;

    case Platform.bitbucket:
      return bitbucketUserRepository;

    case Platform.gitlab:
      return gitlabUserRepository;

    default:
      throw new Error('No User repository initialized');
  }
};
