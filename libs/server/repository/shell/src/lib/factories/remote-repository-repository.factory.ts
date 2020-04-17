import {
  BitbucketRepositoryRepository,
  GithubRepositoryRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { Platform } from '@pimp-my-pr/shared/domain';

export const remoteRepositoryRepositoryFactoryFactory = (
  githubRepositoryRepository: GithubRepositoryRepository,
  bitbucketRepositoryRepository: BitbucketRepositoryRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubRepositoryRepository;

    case Platform.bitbucket:
      return bitbucketRepositoryRepository;

    default:
      throw new Error('No remote repository repository initialized');
  }
};
